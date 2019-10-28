//jshint esversion:6

const mongoose = require('mongoose');

//need a connection URL
mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true });

//after creating the mongoDB database, we need to create a new schema
const fruitSchema = new mongoose.Schema ({
    name: String,
    rating: Number,
    review: String
});

//after creating the schema, we need to makea  Mongoose model
//ask yourself what is the name of the collection for this schema?
const Fruit = mongoose.model("Fruit", fruitSchema);

//create a new document based on the "Fruit" model above
const fruit = new Fruit({
    name: "Apple",
    rating: 7,
    review: "Pretty solid as a fruit"
});

//fruit.save saves the fruit document inside the fruit collection inside the fruits DB
fruit.save();
