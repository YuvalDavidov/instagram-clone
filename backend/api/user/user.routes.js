const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { getUser, getUsers, deleteUser, updateUser, updatePassword, addToViewCount } = require('./user.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getUsers)
router.get('/:userId', getUser)
router.post('/:userId', addToViewCount)
router.put('/password', updatePassword)
router.put('/:userId', updateUser)
router.delete('/:userId', requireAuth, requireAdmin, deleteUser)

module.exports = router