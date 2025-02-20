// Staffer model definition. Every is similar with definition attributes, during creation SQL tables

const sequelize = require("../../db")
const {DataTypes} = require("sequelize")


const Staffer = sequelize.define("staffer", {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        name: {type: DataTypes.STRING, unique: true, allowNull: false},
        post: {type: DataTypes.STRING, allowNull: false},
        academic_degree: {type: DataTypes.STRING},
        academic_title: {type: DataTypes.STRING},
        directions_bac: {type: DataTypes.ARRAY(DataTypes.STRING)},
        programs_add: {type: DataTypes.ARRAY(DataTypes.STRING)},
        bio_text: {type: DataTypes.TEXT},
        disciplines_and_courses_text: {type: DataTypes.TEXT},
        publications_text: {type: DataTypes.TEXT},
        projects_text: {type: DataTypes.TEXT},
        email: {type: DataTypes.STRING, allowNull: false},
        phone_number: {type: DataTypes.STRING, allowNull: false},
        adress: {type: DataTypes.STRING, allowNull: false},
        img: {type: DataTypes.STRING, allowNull: false},
    }
)

module.exports = {Staffer}
