const express = require('express')
const passport = require('passport')

const multerConfig = require('./config/multer')
const multer = require('multer')(multerConfig).single('file')

const jwtAuth = passport.authenticate('jwt', {session: false})

const routes = express.Router()

const UserController = require('./controllers/UserController')
const MovieController = require('./controllers/MovieController')
const SessionController = require('./controllers/SessionController')
const RatingController = require('./controllers/RatingController')

routes.post('/user', UserController.store)
routes.post('/user/photo',[jwtAuth, multer], UserController.update)

routes.post('/login', SessionController.store)
routes.post('/token', SessionController.checkToken)

routes.post('/movie', jwtAuth , MovieController.store)
routes.get('/movie/:id', jwtAuth , MovieController.show)

routes.get('/rating', jwtAuth, RatingController.index)
routes.post('/rating', jwtAuth, RatingController.store)

module.exports = routes