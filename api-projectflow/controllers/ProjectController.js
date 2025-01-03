const User = require('../models/User');
const Project = require('../models/Project');
const MailHelper = require('../helpers/mail');

module.exports = {
    addProject: async (req, res)=>{
        try {
            const { role } = req.user;
            const { name, description, members } = req.body;
            if (role !== 'Admin') {
                return res.status(403).send({ success: false, message: 'Only Admin can create a project', data: null});
            }

            const project = new Project({
                name,
                description,
                createdBy: req.user._id,
                members,
                status: 'Active'
            });
            await project.save();
            const memberDetails = await User.find({ _id: { $in: members } });
            memberDetails.forEach(async (member) => {
                const emailContext = {
                    projectName: name,
                    description,
                    userName: member.name
                };
                await MailHelper.sendEmail( member.email,member.name, 'New Project Shared With You','project-shared', emailContext);
            });
            return res.status(201).send({ success: true, message: 'Project created successfully', data: null});
        } catch (error) {
            return res.status(500).send({ success: false, message: 'Internal Server Error', data: error.message });
        }
    },
    updateProject: async (req, res) => {
        try {
            const { role } = req.user;
            const { projectId, name, description, members } = req.body;
    
            if (role !== 'Admin') {
                return res.status(403).send({ success: false, message: 'Only Admin can update a project', data: null });
            }
    
            const project = await Project.findById(projectId);
    
            if (!project) {
                return res.status(404).send({ success: false, message: 'Project not found', data: null });
            }
    
            const currentMembers = project.members.map((id) => id.toString());
            const newMembers = members.filter((id) => !currentMembers.includes(id));
            const removedMembers = currentMembers.filter((id) => !members.includes(id));
    
            project.name = name || project.name;
            project.description = description || project.description;
            project.members = members || project.members;
    
            await project.save();
    
            if (newMembers.length > 0) {
                const addedMemberDetails = await User.find({ _id: { $in: newMembers } });
                addedMemberDetails.forEach(async (member) => {
                    const emailContext = {
                        projectName: project.name,
                        description: project.description,
                        userName: member.name,
                    };
                    await MailHelper.sendEmail(
                        member.email,
                        member.name,
                        'You Have Been Added to a Project',
                        'project-added',
                        emailContext
                    );
                });
            }
            if (removedMembers.length > 0) {
                const removedMemberDetails = await User.find({ _id: { $in: removedMembers } });
                removedMemberDetails.forEach(async (member) => {
                    const emailContext = {
                        projectName: project.name,
                        userName: member.name,
                    };
                    await MailHelper.sendEmail(
                        member.email,
                        member.name,
                        'You Have Been Removed from a Project',
                        'project-removed',
                        emailContext
                    );
                });
            }
    
            return res.status(200).send({
                success: true,
                message: 'Project updated successfully',
                data: project,
            });
        } catch (error) {
            return res.status(500).send({ success: false, message: 'Internal Server Error', data: error.message });
        }
    },
    changeStatus: async (req, res) => {
        try {
            const { role } = req.user;
            if (role !== 'Admin') {
                return res.status(403).send({ success: false, message: 'Only Admin can update a project', data: null });
            }
            const project = await Project.findOne({_id: req.params.id});
            if(!project) return res.status(400).send({ success: false, message: 'Project Not Found', data: null });
            project.status = req.body.status
            await project.save();
            return res.status(200).send({
                success: true,
                message: 'Project status updated successfully',
                data: project.status,
            });
        } catch (error) {
            return res.status(500).send({ success: false, message: 'Internal Server Error', data: error.message });
        }
    },
    getProjects: async (req, res) => {
        try {
            const { role, _id } = req.user;
            let projects;
            if (role === 'Admin') {
                projects = await Project.find({}).populate('createdBy', 'name email').populate('members', 'name email')
            } else {
                projects = await Project.find({ members: _id }).populate('createdBy', 'name email').populate('members', 'name email');
            }
            return res.status(200).send({ success: true, message: 'Projects retrieved successfully', data: projects });
        } catch (error) {
            return res.status(500).send({ success: false, message: 'Internal Server Error',data: error.message});
        }
    },
    getProjectDetail: async (req, res) => {
        try {
            console.log(req.params.id)
            const projectId = req.params.id;
            const { role, _id } = req.user;
            let project;
            if (role === 'Admin') {
                project = await Project.findById(projectId).populate('createdBy', 'name email').populate('members', 'name email')
            } else {
                project = await Project.findOne({ _id: projectId, members: _id }).populate('createdBy', 'name email').populate('members', 'name email')
                if (!project) {
                    return res.status(403).send({
                        success: false,
                        message: 'Access denied. You are not a member of this project.',
                        data: null
                    });
                }
            }
            if (!project) {
                return res.status(404).send({
                    success: false,
                    message: 'Project not found',
                    data: null
                });
            }
            return res.status(200).send({
                success: true,
                message: 'Project details retrieved successfully',
                data: project
            });
        } catch (error) {
            return res.status(500).send({
                success: false,
                message: 'Internal Server Error',
                data: error.message
            });
        }
    }        
}