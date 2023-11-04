const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Hello there: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    const recipeOne = {
      "title": "Cruffin",
      "level": "Easy Peasy",
      "ingredients": [
        "50g Oats",
        "30g grated carrot",
        "25g protein powder",
        "100ml any milk",
        "1 egg white",
        "4ml Stevia",
        "salt to taste",
        "3 Vanilla drops",
        "1 spoon peanut butter"
      ],
      "cuisine": "Occidental cuisine",
      "dishType": "breakfast",
      "image": "https://run2food.com/wp-content/uploads/2020/05/Photo-24-4-20-10-36-24-am-1024x1024.jpg",
      "duration": 15,
      "creator": "Clara Tesmon"
    }

    return Recipe.create(recipeOne)

  })

  .then((recipeOneAdded) => {
    return Recipe.insertMany(data);
    
  })

  .then(() => {   ////// if pass previus return as argument, recipe won't update
    Recipe.findOneAndUpdate({title:"Rigatoni alla Genovese"}, {duration: 100}, {new: true})
    .then(()=>{
     
      console.log("Success, recipe updated!!")

    })
    .catch(error => {
      console.error('Error connecting to the database', error);
    });
    
    
  })

  .then(() =>{
    Recipe.deleteOne({title:"Carrot Cake"}) ///console.log recipe deleted?
      .then((recipe)=> console.log("Recipe deleted!"))
  })

  mongoose.connection.close()


  .catch(error => {
    console.error('Error connecting to the database', error);
  });

