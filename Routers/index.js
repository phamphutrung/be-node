const express = require('express')
const userRouter = require('./UserRoute')
const reviewRouter = require('./ReviewRouter')
const mediaRouter = require('./MediaRouter')
const personRouter = require('./PersonRouter')

const router = express.Router()

router.use('/user', userRouter)
router.use('/reviews', reviewRouter)
router.use('/:mediaType', mediaRouter)
router.use('/person', personRouter)


module.exports = router 