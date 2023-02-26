const user = require('../models/user')
//@route      GET / about
//@desc       Get about page
//@access     Public
const getAboutPage = async (req, res) => {
  res.render("about", {
    title: "about",
    url: process.env.URL,
    isAbout: true,
    user: req.session.user
  });
};

module.exports = {
  getAboutPage,
};
