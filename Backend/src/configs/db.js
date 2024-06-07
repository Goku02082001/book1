const mongoose = require("mongoose");

const connectToDB = async (url) => {
    try {
        await mongoose.connect(url);
    } catch (error) {
        console.log(error);
    }
};

module.exports = connectToDB;
