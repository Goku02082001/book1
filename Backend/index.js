require("dotenv").config();
const express = require("express");
const connectToDB = require("./src/configs/db");
const UserRouter = require("./src/routes/user.routes");
const bookRouter = require("./src/routes/book.routes");
const cors = require("cors");


const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(cors());

app.use("/users", UserRouter);
app.use("/books", bookRouter);


app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(port, async () => {
    try {
        await connectToDB(process.env.DB_URL);
        console.log("Connected to database successfully");
        console.log(`Server is running at http://localhost:${port}`);
    } catch (err) {
        console.log("Error connecting to the database: ", err.message);
    }
});
