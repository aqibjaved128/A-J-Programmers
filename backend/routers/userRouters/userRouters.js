const express = require('express');
const {  loginUser, logoutUser, forgotPassword, resetPassword, myDetails, updateAdminPassword, updateAdminProfile } = require('../../controllers/userControllers/userControllers');
const { isAuthenticated } = require('../../middlewares/authentications');
const router = express.Router();



router.route('/admin/login').post(loginUser);

router.route('/admin/logout').get(logoutUser);

router.route('/admin/password/forgot').post(forgotPassword);

router.route('/admin/password/reset/:token').put(resetPassword);

router.route('/admin/me').get(isAuthenticated,myDetails);

router.route('/admin/password/update').put(isAuthenticated,updateAdminPassword);

router.route('/admin/profile/update').put(isAuthenticated,updateAdminProfile);

module.exports = router; 