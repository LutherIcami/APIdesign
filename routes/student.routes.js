const express =require('express');
const { getAllStudents, getStudentById, postStudent, replaceStudentById, deleteStudent, updateStudent } = require('../controller/student.controller');
const routes = express.Router();
routes.get('/',getAllStudents);
routes.get('/:id',getStudentById);
routes.post('/',postStudent);
routes.put('/:id',replaceStudentById);
routes.delete('/:id',deleteStudent);
routes.patch('/:id',updateStudent);
routes.get('/:firstName,')
module.exports=routes;