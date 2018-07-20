const status = require('http-status')

module.exports = (app, { repo }) => {
  app.get('/movies', async (req, res, next) => {
    try {
      const movies = await repo.getAllMovies()
      res.status(status.OK).json(movies)
    } catch (error) {
      res.status(500).json(error)
      console.error('Vamos ver => ', error)
    }
    next()
  })

  app.get('/movies/premieres', async (req, res, next) => {
    try {
      const movies = await repo.getMoviePremiers()
      res.status(status.OK).json(movies)
    } catch (error) {}
    next()
  })

  app.get('/movies/:id', async (req, res, next) => {
    try {
      const movie = await repo.getMovieById(req.params.id)
      res.status(status.OK).json(movie)
    } catch (error) {}
    next()
  })
}
