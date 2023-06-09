const express=require("express")
const app=express();
const PORT=5000;
const DB="stack_db"
const cors=require("cors")
app.use(cors())
app.use(express.json(),express.urlencoded({extended:true}));

require("./config/mongosse.config")(DB)
require("./routes/job.route")(app)
require("./routes/user.route")(app)

app.listen(PORT,()=>{console.log("SERVER IS RUNING LES AMOURS ")})