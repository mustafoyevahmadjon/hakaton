const { Router } = require("express");
const router = Router();
const { getProfilePage } = require("../controllers/profileControllers");
const { protected } = require('../middlewares/auth')

router.get("/:name", protected, getProfilePage);

module.exports = router;
