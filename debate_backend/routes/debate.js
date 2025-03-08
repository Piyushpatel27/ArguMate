const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { translateText } = require('./translate');
const {GoogleGenerativeAI} = require('@google/generative-ai')
dotenv.config();

const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

async function generateDebateResponse(topic, userStance, userArgument, language) {
    try {
        const aiStance = userStance === 'for' ? 'against' : 'for';
        const translatedUserArgument = language !== 'en' ? await translateText(userArgument, 'en') : userArgument;

        let prompt = `We are debating the topic: "${topic}". You are arguing ${aiStance} this topic.
        The user, who is arguing ${userStance} the topic, said: "${translatedUserArgument}"
        Respond to their argument with a counterargument of about 100 words.`;

        if (language === 'hi') {
            prompt += " Please provide your response in Hindi.";
        }

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();

        const words = text.split(/\s+/);
        const truncatedResponse = words.slice(0, 100).join(' ') + (words.length > 100 ? '...' : '');

        return language === 'hi' && !isHindi(truncatedResponse)
            ? await translateText(truncatedResponse, 'hi')
            : truncatedResponse;
    } catch (error) {
        console.error('Error generating debate response:', error);
        throw new Error('An error occurred while generating the debate response.');
    }
}

async function evaluateDebate(topic, userStance, debateHistory, language) {
    try {
        const translatedHistory = await Promise.all(debateHistory.map(async (entry) => {
            if (language !== 'en') {
                const translatedText = await translateText(entry.text, 'en');
                return { ...entry, text: translatedText };
            }
            return entry;
        }));

        const prompt = `
            Evaluate the following debate on the topic: "${topic}".
            The user's stance was: ${userStance}.
            
            Debate history:
            ${translatedHistory.map(entry => `${entry.type.toUpperCase()}: ${entry.text}`).join('\n')}
            
            Based on the arguments presented, provide a score for the user's performance in the debate.
            Score should be between 0 and 100, where 0 is the lowest and 100 is the highest.
            Only return the numeric score, without any additional text.
        `;

        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return parseInt(response.text().trim(), 10);
    } catch (error) {
        console.error('Error evaluating debate:', error);
        throw new Error('An error occurred while evaluating the debate.');
    }
}

router.post('/debate', async (req, res) => {
    try {
        const { topic, userStance, userArgument, language } = req.body;
        const aiResponse = await generateDebateResponse(topic, userStance, userArgument, language);
        res.json({ aiResponse });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/end-debate', async (req, res) => {
    try {
        const { topic, userStance, debateHistory, language } = req.body;
        const score = await evaluateDebate(topic, userStance, debateHistory, language);
        res.json({ score });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

function isHindi(text) {
    return /[\u0900-\u097F]/.test(text);
}
module.exports = router;