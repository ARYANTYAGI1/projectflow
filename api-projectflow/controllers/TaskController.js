const User = require('../models/User');
const Task = require('../models/Task');
const CommonHelper = require('../helpers/Common');
const MailHelper = require('../helpers/mail')
const bcrypt = require('bcryptjs');
const { registerValidationSchema } = require('../validations/userValidation');

module.exports = {
    addTask: async (req, res) =>{
        try {
            const { role, id} = req.user;
            if(!role=='Admin' || !role=='Project Manager') return res.status(400).send({ success:false, message: 'Not Right Access to create task', data: null });
            const { title, description, project, assignedTo, status, priority, dueDate } = req.body;
            const task = new Task({
                title: title,
                description: description,
                project: project,
                assignedTo: assignedTo,
                status: status,
                priority: priority,
                createdBy: id
            })
            await task.save();
            return res.status(200).send({ success: true, message: "Task Created Successfully", data: task._id });
        } catch (error) {
            res.status(500).send({ success:false, message: 'Internal Server Error', data: error.message });
        }
    },
    updateTask: async (req, res) => {
        try {
            const { role, id} = req.user;
            if(!role=='Admin' || !role=='Project Manager') return res.status(400).send({ success:false, message: 'Not Right Access to Update task', data: null });
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
    taskList: async (req, res) => {
        try {
            const { role, _id } = req.user;
            const { page = 1 } = req.query;
            const limit = 10;
            const skip = (page - 1) * limit;
            let projectFilter = {};
            if (role !== 'Admin') {
                const userProjects = await Project.find({ members: _id }).select('_id');
                const projectIds = userProjects.map((project) => project._id);
                projectFilter = { project: { $in: projectIds } };
            }
            const tasks = await Task.find(projectFilter).skip(skip).limit(limit).populate({path: 'project',select: 'name'}).populate({path: 'createdBy',select: 'name email'});
            const totalTasks = await Task.countDocuments(projectFilter);
            const totalPages = Math.ceil(totalTasks / limit);
            return res.status(200).send({ success: true, message: 'Task list retrieved successfully',data: { tasks, pagination: { currentPage: parseInt(page), totalPages, totalTasks}}});
        } catch (error) {
            return res.status(500).send({ success: false, message: 'Internal Server Error', data: error.message });
        }
    },
    taskDetail: async (req, res)=>{
        try {
            
        } catch (error) {
            
        }
    }

}
