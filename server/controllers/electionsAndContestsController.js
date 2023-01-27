/* Функции создания и получения данных между сервером и БД. Ссылки, по которым они работают написаны в electionsAndContestsRouter
*/

const uuid = require("uuid")
const path = require("path")
const ApiError = require("../error/ApiError")
const {ElectionsAndContests} = require("../models/electionsAndContestsModel");



class ElectionsAndContestsController {
    async create(req, res, next) {
        try{
            let {name, kind, applicationsAcceptanceDateStart, applicationsAcceptanceDateEnd, applicationsAcceptancePlace, eventDate, eventTime, eventPlace} = req.body

            let values = {name, kind, applicationsAcceptanceDateStart, applicationsAcceptanceDateEnd, applicationsAcceptancePlace, eventDate, eventTime, eventPlace}

            const electionsAndContests = await ElectionsAndContests.create(values)

            return res.json(electionsAndContests)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req, res) {
        let {limit, page} = req.query
        page = page || 1
        limit = limit || 10000
        let offset = limit * (page - 1)
        let electionsAndContests = await ElectionsAndContests.findAndCountAll({limit, offset})
        return res.json(electionsAndContests)
    }
}

module.exports = new ElectionsAndContestsController