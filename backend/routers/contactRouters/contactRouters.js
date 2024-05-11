const express = require('express');
const { createContactPage, getContactPageData, deleteContactPageDetails } = require('../../controllers/contactControllers/contactControllers');
const { contactUs, contactUsCompany  } = require('../../controllers/contactControllers/contactUsControllers');
const { isAuthenticated } = require('../../middlewares/authentications');
const router = express.Router();


router.route('/admin/contact/create').post(isAuthenticated,createContactPage);

router.route('/contact').get(getContactPageData);

router.route('/admin/contact/:id').delete(isAuthenticated,deleteContactPageDetails);

router.route('/contactUs').post(contactUs);

router.route('/company/contactUs').post(contactUsCompany);




module.exports = router;