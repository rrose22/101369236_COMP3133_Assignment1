const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required:  [true, "First name is required!"],
        trim: true

    },
    last_name: {
        type: String,
        required:  [true, "Last name is required!"],
        trim: true

    },
    email: {
        type: String,
        required:  [true, "Email is required!"],
        validate: {
            validator: function (v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
              },
              message: "Please enter a valid email",
        },
        unique: true,
        trim: true        
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    salary: {
        type: Number,
        required: true,
       

    },
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
