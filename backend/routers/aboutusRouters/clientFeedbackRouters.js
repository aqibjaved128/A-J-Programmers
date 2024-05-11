const express = require('express');
const { isAuthenticated } = require('../../middlewares/authentications');
const { createFeedback, getAllFeedbacks, deleteFeedback } = require('../../controllers/aboutusControllers/clientFeedbackControllers');
const { createJob, getAllJobs, deleteJob } = require('../../controllers/aboutusControllers/completeJobControllers');
const router = express.Router();


router.route('/admin/feedback/create').post(isAuthenticated,createFeedback);

router.route('/feedbacks').get(getAllFeedbacks);

router.route('/admin/feedback/:id').delete(isAuthenticated,deleteFeedback);


router.route('/admin/job/create').post(isAuthenticated,createJob);

router.route('/jobs').get(getAllJobs);

router.route('/admin/job/:id').delete(isAuthenticated,deleteJob);


module.exports = router;