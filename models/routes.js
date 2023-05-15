const { Router } = require("express");
const router = express.Router();
const { Show, User } = require('./models/index')

//USERS
app.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

app.get('/users/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  res.json(user);
});

app.get('/users/:id/shows', async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    include: Show,
  });
  res.json(user.shows);
});

app.put('/users/:id/shows', async (req, res) => {
  const { showId, rating } = req.body;
  const user = await User.findByPk(req.params.id);
  const show = await Show.findByPk(showId);
  await user.addShow(show, { through: { rating } });

  res.json({ message: 'Show added successfully' });
});

//SHOWS

app.get('/shows', async (req, res) => {
  const shows = await Show.findAll();
  res.json(shows);
});

app.get('/shows/:id', async (req, res) => {
  const show = await Show.findByPk(req.params.id);
  res.json(show);
});

app.get('/shows/genre/:genre', async (req, res) => {
    const shows = await Show.findAll({
        where: { genre: req.params.genre },
    });
    res.json(shows);
});

app.put('shows/:id/rating', async (req, res) => {
    const { rating } = req.body;
    const show = await Show.findByPk(req.params.id);
    show.rating = rating;
    await show.save();
    res.json(show);
});

app.put('shows/:id/status', async (req, res) => {
    const { status } = req.body;
    const show = await Show.findByPk(req.params.id);
    show.status = status;
    await show.save();
    res.json(show);
});

app.delete('/shows/:id', async (req, res) => {
  const show = await Show.findByPk(req.params.id);
  await show.destroy();
  res.json({ message: "Show has been deleted."});
});

module.exports = app;