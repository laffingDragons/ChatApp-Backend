const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const response = require('./../libs/responseLib')
const logger = require('./../libs/loggerLib');
const validateInput = require('../libs/paramsValidationLib')
const check = require('../libs/checkLib')

const TaskModel = mongoose.model('Task');


//Getting all task
let getAllTask = (req, res) => {

    TaskModel.find()
        .select(' -__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'TaskController: getAllTask', 10)
                let apiResponse = response.generate(true, 'Failed To Find Task Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No Task Found', 'TaskController: getAllTask')
                let apiResponse = response.generate(true, 'No Task Found', 404, null)
                res.send(apiResponse)
            } else {

                let apiResponse = response.generate(false, 'All Task Details Found', 200, result);
                res.send(apiResponse);
            }
        })
}// end get all Tasks


//Getting single task
let getSingleTask = (req, res) => {
    TaskModel.findOne({ 'taskId': req.params.taskId })
        .select('-password -__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'TaskController: getSingleTask', 10)
                let apiResponse = response.generate(true, 'Failed To Find Task Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No Task Found', 'TaskController:getSingleTask')
                let apiResponse = response.generate(true, 'No Task Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'Task Details Found', 200, result)
                res.send(apiResponse)
            }
        })
}// end get single Task


//Deleting a Task
let deleteTask = (req, res) => {

    TaskModel.findOneAndRemove({ 'taskId': req.params.taskId }).select(' -__v -_id').exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'taskController: deletetask', 10)
            let apiResponse = response.generate(true, 'Failed To delete task', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No Task Found', 'TaskController: deleteTask')
            let apiResponse = response.generate(true, 'No Task Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Deleted the Task successfully', 200, result)
            res.send(apiResponse)
        }
    });// end Task model find and remove
}


//edit Task
let editTask = (req, res) => {

    let options = req.body;
    TaskModel.update({ 'taskId': req.params.taskId }, options).select('-password -__v -_id').exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'taskController:editTask', 10)
            let apiResponse = response.generate(true, 'Failed To edit Task details', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No Task Found', 'TaskController: editTask')
            let apiResponse = response.generate(true, 'No Task Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Task details edited', 200, result)
            res.send(apiResponse)
        }
    });// end Task model update


}// end edit Task


//Createing a task
let createTask = (req, res) => {
    
        let obj = JSON.parse(req.body.tasks)
       
        let newTask = new TaskModel({
            
            taskId: shortid.generate(),
            title: req.body.title,
            type: req.body.type,
            tasks: obj,
            createdBy: req.body.createdBy,
            createdByUserId: req.body.createdByUserId,
            modifiedBy: req.body.modifiedBy,
            createdOn: time.now(),
            modifiedOn: time.now()
        })
        
        // saving the new task
        newTask.save((err, newTask) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'taskController: createTask', 10)
                let apiResponse = response.generate(true, 'Failed to create new Task', 500, null)
                res.send(apiResponse)
            } else {
                let newTaskObj = newTask.toObject();
                let apiResponse = response.generate(true, 'Successfully created new Task', 200, newTaskObj)
                res.send(apiResponse)
            }
        })

}

module.exports = {

    getAllTask: getAllTask,
    getSingleTask: getSingleTask,
    deleteTask: deleteTask,
    editTask: editTask,
    createTask: createTask,

}