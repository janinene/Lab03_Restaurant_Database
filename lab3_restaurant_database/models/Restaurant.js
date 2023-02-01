const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
    building: {
      type: String,
    },
    street: {
        type: String,
        required: [true, "Please enter street"]
      },
    zipcode: {
        type: String,
    },
})


const RestaurantSchema = new mongoose.Schema({
  address: {
    type: AddressSchema,
    ref: 'Address'
  },
  city: {
    type: String,
    required: [true, "Please enter city"]
  },
  cuisine: {
    type: String,
    required: [true, "Please enter cuisine"]
  },
  name: {
    type: String,
    required: [true, "Please enter name"]
  },
  restaurant_id: {
    type: String,
    required: [true, "Please enter restaurant id"]
  },

});



// ======= Query Operation =======
// ***** Get Restaurant Details By Cuisine *****
RestaurantSchema.query.getRestaurantByCuisine = function(name) {
  return this.where({'cuisine' : name})
}

// ***** Get Restaurant Sorted By a Parameter  Using Query *****
RestaurantSchema.query.sortBy = function(flag) {
  return this.sort({'restaurant_id' : flag})
}

// ===== Static Method =====

// ***** *****
// ***** *****
// ***** *****

                                                            //this inserts as a collection name to the mongodb
const Restaurant = mongoose.model("Restaurant", RestaurantSchema, "Restaurant");
module.exports = Restaurant;