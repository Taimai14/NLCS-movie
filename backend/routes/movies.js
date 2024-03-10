const router = require("express").Router();
const Movie = require("../models/Movie");
const verify = require("../verifyToken");

//them phim
router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newMovie = new Movie(req.body);

    try {
      const savedMovie = await newMovie.save();
      res.status(201).json(savedMovie);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("ko co quyen truy cap");
  }
});

//cap nhat phim

router.put("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const updatedMovie = new Movie(req.body);

    try {
      const updatedMovie = await Movie.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedMovie);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("ko co quyen truy cap");
  }
});

//xoa phim
router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await Movie.findByIdAndDelete(req.params.id);
      res.status(200).json("da xoa phim");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("ko co quyen truy cap");
  }
});

//tim phim
router.get("/find/:id", verify, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.status(201).json(movie);
  } catch (err) {
    res.status(403).json(err);
  }
});

//tim phim ngau nhien
router.get("/random", verify, async (req, res) => {
  const type = req.query.type;
  let movie;
  try {
    if (type === "series") {
      movie = await Movie.aggregate([
        { $match: { isSeries: true } },
        { $sample: { size: 1 } },
      ]);
    } else {
      movie = await Movie.aggregate([
        { $match: { isSeries: false } },
        { $sample: { size: 1 } },
      ]);
    }
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
});

//lay ra tat ca cac phim
router.get("/", verify, async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies.reverse());
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/like/:id", verify, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    const userId = req.user.id;
    if (
      movie.likes.filter((like) => like.user.toString() == userId).length > 0
    ) {
      return res.status(400).json("da like");
    }

    movie.likes.unshift({ user: userId });

    await movie.save();

    res.json(movie.likes);
  } catch (err) {
    res.status(403).json(err);
  }
});

router.put("/unlike/:id", verify, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (
      movie.likes.filter((like) => like.user.toString() == req.user.id)
        .length === 0
    ) {
      return res.status(400).json("chua co like");
    }

    const removeMovie = movie.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    movie.likes.splice(removeMovie, 1);

    await movie.save();

    res.json(movie.likes);
  } catch (err) {
    res.status(403).json(err);
  }
});

module.exports = router;
