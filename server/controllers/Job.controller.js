const Job = require("../models/job.model")
// Read all
module.exports.findAllAvailable = (req, res) => {
    Job.find({ isAvailable: true }).populate("createdBy").then(allJob => res.json(allJob))
        .catch(err => {
            console.log("Error", err);
            res.json(err)
        })
}

// create new 
module.exports.create = (req, res) => {
    Job.create(req.body)
        .then((newjob) => {
            console.log("SERVER SUCCESS (CREATE)✅✅");
            res.json(newjob)
        })
        .catch((err) => {
            console.log("----------", err);
            return res.status(400).json(err)
        })
}

// READ ONLY ONE 
module.exports.findOne = (req, res) => {

    Job.findById(req.params.id).populate("createdBy").then(oneJob => {
        console.log(" job Found : ", oneJob);
        res.json(oneJob)
    }).catch(err => {
        console.log("Error", err);
        res.json(err)
    })
}

// DELETE
module.exports.delete = (req, res) => {
    console.log(req.body);
    Job.findByIdAndDelete(req.params.id)
        .then(result => {
            console.log("SERVER SUCCESS (DELETE)✅✅");
            res.json(result)
        })
        .catch(err => {
            console.log("SERVER ERROR (DELETE) ❌❌❌");
            res.json(err)
        })
}
// update
module.exports.updateJob = (req, res) => {
    Job.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        {isAvailable:false},
        { new: true, runValidators: true }.exec()
    )
        .then(updateJob => res.json(updateJob))
        .catch((err) => {
            console.log("----------", err);
            return res.status(400).json(err)
        })
}
