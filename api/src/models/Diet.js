const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  
  sequelize.define('diet', {
    name: {
    //   type: DataTypes.ENUM("Gluten free","Ketogenic","Vegetarian","Lacto-Vegetarian","Ovo-Vegetarian","Vegan","Pescetarian","Paleo","Primal","Low FODMAP","Whole30")
        type: DataTypes.STRING
    }
  });
};