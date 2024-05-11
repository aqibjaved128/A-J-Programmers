const express = require('express');
const { createHomePage, getHomeDetails, deleteHomeDetails } = require('../../controllers/homeControllers/homeControllers');
const { isAuthenticated } = require('../../middlewares/authentications');
const { createMedia, getAllMediaLinks, deleteMedia } = require('../../controllers/homeControllers/mediaControllers');
const router = express.Router();


router.route('/admin/home/create').post(isAuthenticated,createHomePage);

router.route('/home').get(getHomeDetails);

router.route('/admin/home/:id').delete(isAuthenticated,deleteHomeDetails);

router.route('/admin/media/create').post(isAuthenticated,createMedia);

router.route('/media').get(getAllMediaLinks);

router.route('/admin/media/:id').delete(isAuthenticated,deleteMedia);

module.exports = router;