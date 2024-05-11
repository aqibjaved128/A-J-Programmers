const express = require('express');
const { getSingleProjectDetails, createProject, getAllProjects, deleteProject, getAllAdminProjects } = require('../../controllers/projectsControllers/projectsControllers');
const { isAuthenticated } = require('../../middlewares/authentications');
const router = express.Router();




router.route('/admin/project/create').post(isAuthenticated,createProject);

router.route('/projects').get(getAllProjects);

router.route('/admin/projects').get(isAuthenticated,getAllAdminProjects);

router.route('/project/:id').get(getSingleProjectDetails);

router.route('/admin/project/:id').delete(isAuthenticated,deleteProject);


module.exports = router