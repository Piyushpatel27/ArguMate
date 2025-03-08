const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const debateRouter = require("./routes/debate");
const userRouter = require("./routes/user");
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());


app.use("/api", debateRouter);
app.use("/test", userRouter);
app.listen(3000, () => {
    console.log("App listening at port 3000");
});

