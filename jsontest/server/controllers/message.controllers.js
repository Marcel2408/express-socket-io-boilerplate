const services = require('../services/index');

exports.getMessages = async (req, res) => {
  try {
    const data = await services.getMessages();
    res.status(200);
    res.send(data);
  } catch (e) {
    res.status(500);
    res.send(e);
  }
};

exports.postMessage = async (req, res) => {
  try {
    const { socketId, message } = req.body;
    const postedMessage = await services.postMessage(socketId, message);
    res.status(201);
    res.send(postedMessage);
  } catch (e) {
    res.status(500);
    res.send(e);
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    await services.deleteMessage(id);
    res.sendStatus(204);
  } catch (e) {
    res.status(500);
    res.send(e);
  }
};

exports.updateMessage = async (req, res) => {
  try {
    const { id, message } = req.body;
    const updatedMessage = await services.updateMessage(id, message);
    res.status(200);
    res.send(updatedMessage);
  } catch (e) {
    res.status(500);
    res.send(e);
  }
};
