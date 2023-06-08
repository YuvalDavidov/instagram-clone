const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { getUser, getUsers, deleteUser, updateUser, updatePassword } = require('./user.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getUsers)
router.get('/:_id', getUser)
router.put('/password', requireAuth, updatePassword)
router.put('/:_id', requireAuth, updateUser)
router.delete('/:_id', requireAuth, requireAdmin, deleteUser)

module.exports = router