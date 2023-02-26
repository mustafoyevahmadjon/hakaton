const user = require('../models/user')
//@route      GET / about
//@desc       Get about page
//@access     Public
const getContactPage = async (req, res) => {
  res.render("contact", {
    title: "biznes haqida tushunchalar",
    url: process.env.URL,
    isContact: true,
    user: req.session.user
  });
};

module.exports = {
  getContactPage,
};
