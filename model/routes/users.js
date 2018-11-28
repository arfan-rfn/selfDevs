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
  res.send(req.params.id);
});

// define the about route 5bb5755216efef22d9d88e6a
router.get('/:id', function(req, res) {
    var userInfo = {
        info: {},
        course: [],
    };
    DataModel.user.aggregate([
        {
            $match: {'_id': req.params.id}
        },
        // {
        //     $lookup:
        //       {
        //         from: 'Courses',
        //         localField: req.params.id,
        //         foreignField:'authors',
        //         as: 'lala'
        //       }
        //  }
        ]).exec((err, result)=> res.send(result));


        // .findById(req.params.id)
        // // .populate({
        // //     model: 'Courses',
        // //     match: {'authors': {'$in': req.params.id}},
        // //     path: 'teach'
        // // })
        // .exec((err, result)=>{
        //     userInfo.info = result;
        //     DataModel.course.findById('5bee312566d1a36e62ff9b82')
        //     .exec(result => userInfo.course = result)
        //     res.send(userInfo);

        // });
    // DataModel.course.find({'authors': {'$in': req.params.id}}).exec((err, result)=> res.send(result));
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