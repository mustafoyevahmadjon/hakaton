const { Router } = require("express");
const router = Router();
const { getTestPage } = require("../controllers/testControllers");
const { protected
} = require("../middlewares/auth")
router.get("/", protected, getTestPage);

module.exports = router;
