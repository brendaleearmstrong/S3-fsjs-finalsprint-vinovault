// routes/api/fullText.js
const express = require('express');
const router = express.Router();
const mDal = require('../../services/m.fulltext.dal');
const pDal = require('../../services/p.fulltext.dal');
const myEventEmitter = require('../../services/logEvents.js');

router.get('/m/:text', async (req, res) => {
    try {
        let theText = await mDal.getFullText(req.params.text); 
        if(theText.length === 0) {
          res.status(404).json({message: "Not Found", status: 404});
        } else {
          myEventEmitter.emit('event', 'api.fulltext.router.get /api/full/m/:text', 'INFO', `Mongodb full text for ${req.params.text} was displayed.`);
          res.json(theText);
        }
    } catch (error) {
        console.error('Error in MongoDB full-text search:', error);
        res.status(503).json({message: "Service Unavailable", status: 503});
    }
});

router.get('/p/:text', async (req, res) => {
  try {
      let theText = await pDal.getFullText(req.params.text); 
      if(theText.length === 0) {
        res.status(404).json({message: "Not Found", status: 404});
      } else {
        myEventEmitter.emit('event', 'api.fulltext.router.get /api/full/p/:text', 'INFO', `Postgresql full text for ${req.params.text} was displayed.`);
        res.json(theText);
      }
  } catch (error) {
      console.error('Error in PostgreSQL full-text search:', error);
      res.status(503).json({message: "Service Unavailable", status: 503});
  }
});

module.exports = router;
