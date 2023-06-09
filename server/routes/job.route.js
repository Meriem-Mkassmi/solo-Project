const JobController= require("../controllers/Job.controller")
module.exports = app => {

    app.get('/api/job', JobController.findAllAvailable);

    app.post('/api/job', JobController.create);
    app.get('/api/job/:id', JobController.findOne);
    app.put('/api/job/:id', JobController.updateJob);
    app.delete('/api/job/:id', JobController.delete);


}