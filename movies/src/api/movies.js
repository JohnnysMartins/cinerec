const express = require('express')
const status = require('http-status')
const router = express.Router()

module.exports = ({ repo }) => {
  router.get('/movies', async (req, res, next) => {
    try {
      const movies = await repo.getAllMovies()
      res.status(status.OK).json(movies)
    } catch (error) {
      res.status(status.INTERNAL_SERVER_ERROR).json(error)
      console.error('Vamos ver => ', error)
    }
    next()
  })

  router.get('/movies/premieres', async (req, res, next) => {
    try {
      const movies = await repo.getMoviePremiers()
      res.status(status.OK).json(movies)
    } catch (error) {
      res.status(status.INTERNAL_SERVER_ERROR).json(error)
    }
    next()
  })

  router.get('/movies/:id', async (req, res, next) => {
    try {
      const movie = await repo.getMovieById(req.params.id)
      res.status(status.OK).json(movie)
    } catch (error) {
      res.status(status.INTERNAL_SERVER_ERROR).json(error)
    }
    next()
  })

  return router
}
