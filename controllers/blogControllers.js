const Poster = require("../models/posterModel")
//@route      GET /blog
//@desc       Get All blogs page
//@access     Public
const getBlogPage = async (req, res) => {
  try {
    const posters = await Poster
      .find()
      .populate("author")
      .limit(8)
      .lean()
    res.render('blog/blog', {
      title: 'blog page',
      isBlog: true,
      user: req.session.user,
      author: posters.author,  
      url: process.env.URL,
      posters: posters.reverse(),
    })
  } catch (error) {
    console.log(error);
  }
}
//@route      GET /blog/add
//@desc       Get add page
//@access     Private
const getaddPage = async (req, res) => {
  try {
    res.render('blog/add', {
      title: 'blog page',
      isAdded: true,
      url: process.env.URL,
      user: req.session.user,
    })
  } catch (error) {
    console.log(error);
  }
}

//@route      post /blog/add
//@desc       Get add blogs page
//@access     Private
const addNewBlog = async (req, res) => {
  try {
    const poster = {
      title: req.body.title,
      description: req.body.title,
      image: "uploads/" + req.file.filename,
      author: req.session.user
    }
    await Poster.create(poster)
    res.redirect("/")
  } catch (error) {
    console.log(error);
  }
}

//@route      GET /blog/edit
//@desc       Get add page
//@access     Private
const geteditPage = async (req, res) => {
  try {
    const posters = await Poster.findById(req.params.id).lean()
    res.render('blog/edit', {
      title: 'blog edit page',
      url: process.env.URL,
      user: req.session.user,
      posters
    })
  } catch (error) {
    console.log(error);
  }
}

//@route      POST /posters/:id/edit
//@desc       Edit poster by id
//@access     Private (Own)
const updatePoster = async (req, res) => {
  try {
    const editedPoster = {
      title: req.body.title,
      image: req.body.image,
      description: req.body.description
    }
    await Poster.findByIdAndUpdate(req.params.id, editedPoster)
    res.redirect('/blog')
  } catch (err) {
    console.log(err)
  }
}
//@route      POST /posters/:id/delete
//@desc       Delete poster by id
//@access     Private (Own)
const deletePoster = async (req, res) => {
  try {
    await Poster.findByIdAndRemove(req.params.id).lean()
    res.redirect('/blog')
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  getBlogPage,
  addNewBlog,
  getaddPage,
  geteditPage,
  updatePoster,
  deletePoster
}