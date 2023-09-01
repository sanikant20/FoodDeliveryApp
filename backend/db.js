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


// const router = require("./Routes/DisplayData");

// const mongooseURI = 'mongodb+srv://kushsani508:gofood508@cluster0.ic9brxy.mongodb.net/gofoodmern?retryWrites=true&w=majority';
// const mongooseURI = 'mongodb://kushsani508:gofood508@ac-ger2m7f-shard-00-00.ic9brxy.mongodb.net:27017,ac-ger2m7f-shard-00-01.ic9brxy.mongodb.net:27017,ac-ger2m7f-shard-00-02.ic9brxy.mongodb.net:27017/gofoodmern?ssl=true&replicaSet=atlas-b25mtj-shard-0&authSource=admin&retryWrites=true&w=majority'
// const SALT = 10;

// const ConnectDB = async () => {
//     try {
//         await mongoose.connect(mongooseURI, { useNewUrlParser: true });
//         console.log("MongoDB Connected");
//         const fetch_data = await mongoose.connection.db.collection("food_items");
//         const data = await fetch_data.find({}).toArray()
//         console.log(data)
//     } catch (error) {
//         console.error("Something went wrong:", error);
//     }
// }
// module.exports = ConnectDB;


// //Code to connect with mongodb compass
// mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => {
//         console.log('Connected to MongoDB');
//         const fetch_data = mongoose.connection.db.collection("food_items");
//         return fetch_data.find({}).toArray(); // Return the promise chain 
//     })
//     .then(()=>{
//         const foodcategory = mongoose.connection.db.collection("foodCategory");
//         return foodcategory.find({}).toArray();
//     })
//     //Handle the promise
//     .then(data => {
//         global.food_items = data; // Store the fetched data in the local variable
//     })
//     .then(categoryData => {
//         global.foodcategory = categoryData;
//     })
//     .catch(error => {
//         console.error('Error connecting to MongoDB:', error);
//     });

//     module.exports = router;





