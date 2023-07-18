const mongoose = require('mongoose');
const schema = mongoose.Schema;
const studentSchema = new schema({
    firstName:{
        type: String,
        required:[true,'firstname is required']
    },
    lastName:{
        type:String,
        required:[true,'secondname is required']
    },
    email:{
        type:String,
        required:[true,'email is required']
    },
    password:{
        type:String,
        required:[true,'password is required']
    }
});
const Student = mongoose.model('students',studentSchema)
module.exports=Student;