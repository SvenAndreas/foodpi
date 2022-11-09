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
      type: DataTypes.INTEGER,
      allowNull:false
    },
    analyzedInstructions:{
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    dishTypes:{
      type: DataTypes.STRING,
      allowNull:false
    },
    readyInMinutes:{
      type: DataTypes.INTEGER,
      allowNull:false
    },
    image:{
      type: DataTypes.STRING,
      allowNull:false
    },
    isFromLocalDB:{
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }
  });
};
