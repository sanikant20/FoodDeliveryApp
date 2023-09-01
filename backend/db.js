const mongoose = require("mongoose");
const url = 'mongodb://127.0.0.1:27017/gofoodmern';

// Connect to MongoDB
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', (error) => {
    console.error('Error connecting to MongoDB:', error);
});

db.once('open', async () => {
    try {
        console.log('Connected successfully to MongoDB');
        const fetch_data = mongoose.connection.db.collection("food_items");
        const data = await fetch_data.find({}).toArray();

        const foodCategory = mongoose.connection.db.collection("foodCategory");
        const categoryData = await foodCategory.find({}).toArray()
        global.food_items = data;
        global.foodCategory = categoryData;
    } catch (error) {
            console.error("Something went wrong:", error);
        }
    });






