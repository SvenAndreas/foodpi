const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Recipe', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey:true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary:{
      type: DataTypes.STRING,
      allowNull:false
    },
    healthScore:{
      type: DataTypes.INTEGER
    },
    analyzedInstructions:{
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    diets:{
      type: DataTypes.STRING
    },
    isFromLocalDB:{
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }
  });
};
