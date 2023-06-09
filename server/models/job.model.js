const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
    isAvailable: {
        type: Boolean,
        default: true
    },
    title: {
        type: String,
        required: [true, "Title is required"],
        minlength: [3, "It must be more than three characters"],
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        minlength: [10, "It must be more than ten characters"],
    },
    location: {
        type: String,
        required: [true, "Location is required"],
        validate: {
            validator: function (value) {
                return value.trim().length > 0;
            },
            message: "Location must not be blank",
        },
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
}, { timestamps: true });

const Job = mongoose.model("Job", JobSchema);
module.exports = Job;
