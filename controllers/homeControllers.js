const user = require('../models/user')
//@route      GET /
//@desc       Get home page
//@access     Public
const getHomePage = async (req, res) => {
  res.render("index", {
    title: "Home page",
    url: process.env.URL,
    user: req.session.user,
    isLogged: req.session.isLogged,
    isHome: true,
  });
};

module.exports = {
  getHomePage,
};
