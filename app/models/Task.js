/**
 * module dependencies
 */
const mongoose = require('mongoose')

const Schema = mongoose.Schema

let taskSchema = new Schema({

  taskId: { type: String, unique: true, required: true },
  title:{type:String, default:''},
  type:{type:String, default:'public'},
  status:{type:String, default:'pending'},
  tasks: [],
  createdBy: { type: String, default: '' },
  createdByUserId: { type: String, default: '' },
  modifiedBy: { type: String, default: '' },
  createdOn: { type: Date, default: Date.now },
  modifiedOn: { type: Date, default: Date.now }

})

mongoose.model('Task', taskSchema)
