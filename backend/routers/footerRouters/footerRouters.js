const express = require('express');
const {  getFooterDetails, UpdateFooterDetails } = require('../../controllers/footerControllers/footerControllers');
const { isAuthenticated } = require('../../middlewares/authentications');
const router = express.Router();



router.route('/footer').get(getFooterDetails);

router.route('/admin/footer/:id').put(isAuthenticated,UpdateFooterDetails);

module.exports = router;