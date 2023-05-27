const express = require('express')
const personController = require('../Controllers/PersonController')

const router = express.Router({mergeParams: true})

router.get('/:personId', personController.personDetail)

router.get('/:personId/medias', personController.personMedias)

module.exports = router