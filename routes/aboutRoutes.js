const { Router } = require("express");
const router = Router();
const { getAboutPage } = require("../controllers/aboutControllers");

router.get("/", getAboutPage);

module.exports = router;
