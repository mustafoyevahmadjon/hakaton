const { Router } = require('express')
const router = Router()
const { getBlogPage, getaddPage, addNewBlog, geteditPage, updatePoster, deletePoster } = require('../controllers/blogControllers')
const upload = require('../utils/fileUpload')
const { protected } = require('../middlewares/auth')

router.get('/', getBlogPage)
router.get('/add', protected, getaddPage)
router.post('/add', protected, upload.single("image"), addNewBlog)
router.get('/:id/edit', protected, geteditPage)
router.post('/:id/edit', protected, updatePoster)
router.post('/:id/delete', protected, deletePoster)

module.exports = router