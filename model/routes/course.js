const DataModel = require('../data_model');
const express = require('express');
const router = express.Router();

// // middleware specific to this router
// router.use(function timeLog(req, res, next) {
//   console.log('Time: ', Date.now());
//   next();
// });

// define the home page route
router.get('/', function(req, res) {
  res.send('Birds home page');
});

// define the about route
router.get('/:id', function(req, res) {
    DataModel.course
        .findById(req.params.id)
        .populate({
            model: 'User',
            path: 'authors'
        })
        .populate({
            model: 'Lectures',
            path: 'lectures'
        })
        .populate({
            model: 'Comments',
            path: 'comments'
        })
        .exec((err, data)=>{
        if(err){
            res.send("404 data found");
        }else{
            res.send(data);
        }
    });
});

router.get('/:id/lec', function(req, res) {
    DataModel.course
        .findById(req.params.id)
        .populate({
            model: 'Lectures',
            path: 'lectures'
        })
        .exec((err, data)=>{
        if(err){
            res.send("404 data found");
        }else{
            res.send(data);
        }
    });
});

module.exports = router;