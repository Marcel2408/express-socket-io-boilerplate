const router = require('express').Router();
const {
  getMessages, postMessage, deleteMessage, updateMessage,
} = require('../controllers/message.controllers');

router.get('/message', getMessages);
router.post('/message', postMessage);
router.patch('/message', updateMessage);
router.delete('/message/:id', deleteMessage);

module.exports = router;
