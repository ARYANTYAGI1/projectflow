const User = require('../models/User');
const Task = require('../models/Task');
const CommonHelper = require('../helpers/Common');
const MailHelper = require('../helpers/mail')
const bcrypt = require('bcryptjs');
const { registerValidationSchema } = require('../validations/userValidation');

module.exports = {
    addTask: async (req, res) =>{
        try {
            const {id} = req.user;
            const { title, description, project, assignedTo, status, priority, dueDate } = req.body;
            const task = new Task({
                title: title,
                description: description,
                project: project,
                assignedTo: assignedTo,
                status: status,
                priority: priority,
                createdBy: id,
                dueDate: dueDate
            })
            await task.save();
            return res.status(200).send({ success: true, message: "Task Created Successfully", data: task._id });
        } catch (error) {
            res.status(500).send({ success:false, message: 'Internal Server Error', data: error.message });
        }
    },
    updateTask: async (req, res) => {
        try {
            console.log(req.body)
            const { title, description, project, assignedTo, status, priority, dueDate } = req.body
            const task = await Task.findById(req.params.id);
            if (!task) {
                return res.status(404).send({ success: false, message: 'Task not found', data: null });
            }

            task.title = title || task.title;
            task.description = description || task.description;
            task.project = project || task.project;
            task.assignedTo = assignedTo || task.assignedTo;
            task.status = status || task.status;
            task.priority = priority || task.priority;
            task.dueDate = dueDate || task.dueDate;
    
            await task.save();

            return res.status(200).send({ success: true, message: 'Task updated successfully', data: task});
        } catch (error) {
            return res.status(500).send({ success: false, message: 'Internal Server Error', data: error.message });
        }
    },
    getTaskList: async (req, res) => {
        try {
            let query = {};
            const offset = req.query.page ? (req.query.page - 1) * req.query.limit : 0;
            const limit = req.query.limit ? parseInt(req.query.limit) : 10;
            if (!query.$and) query.$and = [];
            if (req.query.name) {
                const name = req.query.name;
                if (!query.$and) query.$and = [];
                query.$and.push({
                    $or: [
                        { title: { $regex: new RegExp(name, 'i') } },
                        { description: { $regex: new RegExp(name, 'i') } }
                    ]
                });
            }
            if (req.query.status) {
                query.status = req.query.status;
            }
            if (!query.$and.length) {
                query = {};
            }
            const [totalCount, task] = await Promise.all([
                Task.countDocuments(query),
                Task.find(query)
                    .populate('createdBy', 'name email')
                    .populate('project', 'name')
                    .populate('assignedTo', 'name')
                    .sort('-createdAt')
                    .skip(offset)
                    .limit(limit)
            ]); 
            return res.status(200).send({
                success: true,
                message: 'Task retrieved successfully',
                data: task,
                totalCount
            });
        } catch (error) {
            return res.status(500).send({
                success: false,
                message: 'Internal Server Error',
                error: error.message
            });
        }
    },
    taskDetail: async (req, res)=>{
        try {
            const task = await Task.findOne({_id: req.params.id}).populate('createdBy', '_id name').populate('assignedTo', '_id name').populate('project', '_id name');
            if(!task) return res.status(404).send({ success: false, message: 'Task not found', data: null });
            return res.status(200).send({ success: true, message: 'Success', data: task})
        } catch (error) {
            console.log(error)
            return res.status(500).send({
                success: false,
                message: 'Internal Server Error',
                error: error.message
            });
        }
    },
    deleteTask: async (req, res) => {
        try {
            const task = await Task.findById(req.params.id);
    
            if (!task) {
                return res.status(404).send({
                    success: false,
                    message: 'Task not found',
                    data: null,
                });
            }
    
            await Task.findByIdAndDelete(req.params.id); // Deletes the task by ID
    
            return res.status(200).send({
                success: true,
                message: 'Task deleted successfully',
                data: null,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).send({
                success: false,
                message: 'Internal Server Error',
                error: error.message,
            });
        }
    }    
}
