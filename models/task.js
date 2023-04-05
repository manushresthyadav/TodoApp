// here we want to create a task schema 

const mongoose = require('mongoose');
const TaskSchema = mongoose.Schema;


const taskSchema  = new TaskSchema({
    tasks : {type : String , required : true},
}, {timestamps : true}) 

module.exports = taskSchema ; 