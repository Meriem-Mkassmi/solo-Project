const userController= require("../controllers/user.controller")
module.exports = app => {

    // Authenticate user
app.post("/api/authenticate", userController.authenticate);

// Create a new user
app.post("/api/register", userController.register);
app.get("/api/users/:id",userController.findUserWithJobs)
app.post("/api/users",userController.addJobToUser)
app.delete("/api/users",userController.deleteJobFromUser)
   

}

