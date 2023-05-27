const express = require('express')
const mediaController = require('../Controllers/MediaController')
const router = express.Router({mergeParams: true})

router.get('/search', mediaController.search)

router.get('/genres', mediaController.getGenres)

router.get('/detail/:mediaId', mediaController.getDetail)

router.get('/:mediaCategory', mediaController.getList)

module.exports = router
