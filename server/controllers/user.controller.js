const User = require("../models/user.model");
const Job = require("../models/job.model")

// Authenticate user
module.exports.authenticate = (req, res) => {
    const { email, password } = req.body;

    // Check if user exists
    User.findOne({ email })
        .then((user) => {
          console.log({user})
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            console.log("pppppp")
            // Check password
            if (user.password !== password) {
                return res.status(401).json({ message: "Incorrect password" });
            }
            console.log("ssssss auth")
            // Authentication successful
            res.json({ message: "Authentication successful", user });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ message: "Server error" });
        });
};

// register a new user
module.exports.register = (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }

    // Create new user
    User.create({ firstName, lastName, email, password, confirmPassword })
        .then((newUser) => {
            res.json({ message: "User created successfully", user: newUser });
        })
        .catch((err) => {
            console.log(err);
            return res.status(400).json(err)
        });
};
// Find user with jobs and populate
module.exports.findUserWithJobs = (req, res) => {

    User.findById(req.params.id).select("-password -confirmPassword")
    .populate("jobs").then(oneUser => {
        console.log(" UserFound : ", oneUser);
        res.json(oneUser)
    }).catch(err => {
        console.log("Error", err);
        res.json(err)
    })
}



module.exports.addJobToUser = (req, res) => {
  const { userId, jobId } = req.body;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.jobs.push(jobId);

      return user.save();
    }).then((user)=>{
      console.log("teste",jobId);
        // change job isAvailable status to false
         Job.findOneAndUpdate(

            { _id: jobId },
            
            { isAvailable :false},
            { upsert: true, new: true }
          );
      
          console.log(Job._id)
          
        
        return user;
    })
    .then((user) => {
      res.json({ user });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    });
};
module.exports.deleteJobFromUser = (req, res) => {
    const { userId, jobId } = req.body;
  
    User.findById(userId)
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
  
   
        const jobIndex = user.jobs.indexOf(jobId);

        if (jobIndex === -1) {
          throw new Error("Job not found in user's job list");
        }
    
        // Remove the job from the user's jobs array
        user.jobs.splice(jobIndex, 1);
  
        return user.save();
      })
      .then((user) => {// Delete the job from the database
         Job.findByIdAndDelete(jobId);
    
        return user;
       
      }).then ((user)=> res.json({ user }))
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: "Server error" });
      });
  };





