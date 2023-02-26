//@route      GET /test
//@desc       Get tests page
//@access     Private
const getTestPage = async (req, res) => {
  res.render("test", {
    title: "test page",
    url: process.env.URL,
    isTest: true,
    user: req.session.user
  });
};

module.exports = {
    getTestPage,
};
