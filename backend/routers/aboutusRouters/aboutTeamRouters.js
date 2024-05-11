const express = require('express');
const { isAuthenticated } = require('../../middlewares/authentications');
const { createMemberCard, getAllMembersCards, deleteMemberCard } = require('../../controllers/aboutusControllers/aboutTeamControllers');
const { createVideoLink, getVideoLink, deleteVideoLink } = require('../../controllers/aboutusControllers/videoLinkController');
const router = express.Router();


router.route('/admin/card/create').post(isAuthenticated,createMemberCard);

router.route('/member/cards').get(getAllMembersCards);

router.route('/admin/member/card/:id').delete(isAuthenticated,deleteMemberCard);

router.route('/admin/video/create').post(isAuthenticated,createVideoLink);

router.route('/video').get(getVideoLink)

router.route('/admin/video/:id').delete(isAuthenticated,deleteVideoLink)

module.exports = router;