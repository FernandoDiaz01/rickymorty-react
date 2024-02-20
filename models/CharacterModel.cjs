const { DataTypes} = require('sequelize')
const sequelize = require('../db/dbase.cjs')

const Character = sequelize.define('Characters',{
    /* id:{
        type: sequelize.UUID,
        defaultValue: sequelize.UUIDV4,
        autoIncrement:true,
        allowNull:true,
    }, */
    name: {
        type:DataTypes.STRING,
        allowNull: false,
    },
    gender: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    species:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    status:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    image:{
        type: DataTypes.STRING,
        allowNull:false
    }
})

module.exports = Character;