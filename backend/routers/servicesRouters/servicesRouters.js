const express = require('express');
const { createService, getAllServices, getSingleServiceDetails, deleteService } = require('../../controllers/servicesControllers/servicesControllers');
const { isAuthenticated } = require('../../middlewares/authentications');
const router = express.Router();


router.route('/admin/service/create').post(isAuthenticated,createService);

router.route('/services').get(getAllServices);

router.route('/service/:id').get(getSingleServiceDetails);

router.route('/admin/service/:id').delete(isAuthenticated,deleteService);

module.exports = router;