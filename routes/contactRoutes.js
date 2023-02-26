const { Router } = require("express");
const router = Router();
const { getContactPage } = require("../controllers/contactControllers");

router.get("/", getContactPage);

module.exports = router;
