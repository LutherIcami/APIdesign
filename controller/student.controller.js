const Student = require ('../models/students')
module.exports={
    getAllStudents: async (req,res,next)=>{
        try{
            const result = await Student.find()
            res.send(result)
        }
        catch (error){
            console.log(error.message)
        }
    },
    getStudentById: async (req,res,next)=>{
        const id = req.params.id;
        try{
            const student = await Student.findById(id)
            res.send(student)
        }
        catch (error){
            console.log(error.message)
        }
    },
    postStudent: async(req,res,next)=>{
        try{
            const student = new Student(req.body)
            const result = await student.save()
            res.send(result)
        }
        catch (error){
            console.log(error.message)
        }
    },
    replaceStudentById: async(req,res,next)=>{
        try{
            const student = new Student(req.body)
            const result = await student.save()
            res.send(result)
        }
        catch (error){
            console.log(error.message)
        }
    },
    deleteStudent: async(req,res,next)=>{
        try{
            const student = new Student(req.body)
            const result = await student
            res.send(result)
        }
        catch (error){
            console.log(error.message)
        }
    },
    updateStudent: async(req,res,next)=>{
        try{
            const id = req.params.id;
            const update=req.body;
            const result = await Student.findByIdAndUpdate(id,update,this.options)
        }
        catch(error){
            console.log(error.message)
        }
    },
    getStudentByName: async(req,res,next)=>{
        const Name = req.params.firstName;
        try{
            const student = await Student.findOne(Name)
            res.send(student)     
        }
        catch(error){
            console.log(error.message)
        }
    }
}