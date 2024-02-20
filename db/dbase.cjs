const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('rickyandmorty','fernandodiaz','43941486f',{
    dialect: 'postgres'
})
module.exports = sequelize;



