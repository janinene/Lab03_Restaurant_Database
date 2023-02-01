const express = require('express');
const restaurantModel = require('../models/Restaurant');
const app = express();

//===== 4. - Read ALL =====
//http://localhost:3000/restaurants
app.get('/restaurants', async (req, res) => {
  const restaurant = await restaurantModel.find({});
  try {
    // console.log(restaurant[0].fullname)
    res.status(200).send(restaurant);
  } catch (err) {
    res.status(500).send(err);
  }
});

//===== 5. - Search By Cuisine Name - PATH Parameter =====
//http://localhost:3000/restaurants/cuisine/Japanese

app.get('/restaurants/cuisine/:cuisine', async (req, res) => {
  const cuisine = req.params.cuisine

// ***** Without Using Query Helper *****
//   const restaurant = await restaurantModel.find({cuisine : cuisine});
// ***** Using Query Helper *****
  const restaurant = await restaurantModel.find({}).getRestaurantByCuisine(cuisine)

  
  try {
    if(restaurant.length != 0){
      res.send(restaurant);
    }else{
      res.send(JSON.stringify({status:false, message: "No data found"}))
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

//===== 6. - Read All then Sort using Restaurant ID based on Parameter Passed - QUERY Parameter =====
//http://localhost:3000/restaurant?sortBy=ASC

app.get('/restaurant', async (req, res) => {
    const sortByQuery = req.query.sortBy
  
    const restaurant = await restaurantModel.find({})
            .sortBy(sortByQuery)
            // selected columns must include id, cuisines, name, city, resturant_id
            .select("_id cuisine name city restaurant_id")
    
    try {
      if(restaurant.length != 0){
        res.send(restaurant);
      }else{
        res.send(JSON.stringify({status:false, message: "No data found"}))
      }
    } catch (err) {
      res.status(500).send(err);
    }
  });


  //===== Read All then Sort using Cuisine as Parameter Passed - PATH Parameter  =====
//http://localhost:3000/restaurants/Delicatessen
app.get('/restaurants/:cuisine', async (req, res) => {
    const cuisine = req.params.cuisine
  try {
    const restaurant = restaurantModel.
                        find({})
                        // where cuisine is equal to cuisine params
                        .where('cuisine').equals(cuisine)
                        // where city is not equal to Brooklyn
                        .where('city').ne('Brooklyn')
                        // sort the results by name (ascending is default)                       
                        .sort('name')
                        // .sort([['name', -1]])  // to use descending order
                        // selected columns must include cuisines, name and city excluding _id
                        .select('cuisine name city -_id')
                        .exec((err, data) => {
                          if (err){
                              res.send(JSON.stringify({status:false, message: "No data found"}));
                          }else{
                              res.send(data);
                          }
                        });
    } catch (err) {
      res.status(500).send(err);
    }
});

// ===== Create New Record =====
/*
    //Sample Input as JSON
    //application/json as Body
    {
        "address": {
	        "building": "1008",
	        "street": "Morris Park Ave",
	        "zipcode": "10462"
        },
        "city": "Bronx",
        "cuisine": "Bakery",
        "name": "Morris Park Bake Shop",
        "restaurant_id": "30075445"
    }
*/
//http://localhost:8081/restaurant
app.post('/', async (req, res) => {
  
    console.log(req.body)
    const restaurant = new restaurantModel(req.body);
    
    try {
      await restaurant.save((err) => {
        if(err){
          res.send(err)
        }else{
          res.send(restaurant);
        }
      });
    } catch (err) {
      res.status(500).send(err);
    }
  });


module.exports = app
