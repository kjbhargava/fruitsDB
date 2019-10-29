//jshint esversion:6

const mongoose = require('mongoose');

//need a connection URL
mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true });

//after creating the mongoDB database, we need to create a new schema


const fruitSchema = new mongoose.Schema ({
    name: {
        type: String,
        min: 1,
        //required: [true, "You're into nameless fruit?! No way. Try again"]
    },
    rating: {
        type: Number,
        required: true,
        min: [1, "Number is too low"],
        max: [10, "Too high.  Keep it a normal number"]
    },
    review: String
});

//after creating the schema, we need to makea  Mongoose model
//ask yourself what is the name of the collection for this schema?
const Fruit = mongoose.model("Fruit", fruitSchema);

//create a new document based on the "Fruit" model above
const fruit = new Fruit({
    //name: "Peach",
    rating: 10,
    review: "Peaches are yummy!"
});


//fruit.save saves the fruit document inside the fruit collection inside the fruits DB
//fruit.save();

const peopleSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favoriteFruit: fruitSchema
});

const Person = mongoose.model("Person", peopleSchema);

const pineapple = new Fruit({
    name: "Pineapple",
    rating: 8,
    review: "Great fruityyyyyy"
});

const mango = new Fruit({
    name: "Mango",
    rating: 10,
    review: "The best fruit out there"
});

//pineapple.save();
mango.save();

const person = new Person({
    name: "Amy",
    age: 12,
    favoriteFruit: pineapple
});

// Person.deleteMany({name: "John"}, function(err){
//     if (err){
//         console.log(err);
//     }
//
//     else{
//         console.log("Successfully deleted");
//     }
// });

Person.updateOne({name: "John"}, {favoriteFruit: mango}, function(err){
    if (err){
        console.log(err);
    }
    else {
        console.log("John successfully updated");
    }
});

//person.save();
//
// const kiwi = new Fruit({
//     name: "Kiwi",
//     score: 10,
//     review: "The best fruit!"
// });
//
// const orange = new Fruit({
//     name: "Orange",
//     score: 4,
//     review: "Too sour for me"
// });
//
// const banana = new Fruit({
//     name: "Banana",
//     score: 3,
//     review: "Weird texture"
// });

// Fruit.insertMany([kiwi, orange, banana], function(err){
//     if(err) {
//         console.log(err);
//     }
//     else {
//         console.log("Successfully saved all fruits to fruitsDB");
//     }
// });

//the find function can accept a callback

    Fruit.find(function(err, fruits){
        if (err){
        console.log(err);
        } else{
            //close the connection so that the server isn't left hanging
            mongoose.connection.close();

            fruits.forEach(function(fruit){
                console.log(fruit.name);
            });
        }
    });


    // Fruit.updateOne({_id: "5db6b1503b41b54694bf59eb"}, {name: "Peach"}, function(err){
    //     if (err){
    //         console.log(err);
    //     }
    //     else {
    //         console.log("Successfully updated");
    //     }
    // });

    // Fruit.deleteOne({_id: "5db6b0390c2fb53088385489"}, function(err){
    //     if (err){
    //         console.log(err);
    //     }
    //     else {
    //         console.log("Successfully deleted");
    //     }
    // });
