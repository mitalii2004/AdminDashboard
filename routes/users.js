var express = require('express');
var router = express.Router();
const controller = require("../controllers/userController");
// const helper = require('../helpers/fileUpload')

router.get("/",controller.logIn)
router.get("/dashboard", controller.dashbaord);
router.get("/users", controller.users);
router.get("/music", controller.music);
router.get("/addMusicListings",controller.addMusic);
router.post("/createMusic",controller.createMusic);
router.get("/challenges", controller.challenges);
router.get("/contactUs", controller.contactUs);
router.get("/faq", controller.faq);
router.get("/banners", controller.banners);
router.get("/termsConditions", controller.termsConditions);
router.get("/privacyPolicy", controller.privacyPolicy);
router.get("/aboutUs", controller.aboutUs);
router.get("/logout", controller.logout);

module.exports = router;


/* 
app.get('/musicListings', (req, res) => {
  const musicData = [
    { id: 1, title: 'Song 1', description: 'Music Description 1', file: '/music/4792aeb8-d598-4a55-be1a-bf690b6c18bd.mp3' },
    { id: 2, title: 'Song 2', description: 'Music Description 2', file: '/music/another-song.mp3' },
    // Add more songs here
  ];

  res.render('musicListings', { musicData });
});

*/