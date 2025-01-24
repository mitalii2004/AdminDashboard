var express = require('express');
var router = express.Router();
const controller = require("../controllers/userController");

router.get("/",controller.logIn)
router.get("/dashboard", controller.dashbaord);
router.get("/users", controller.users);
router.get("/musics", controller.musics);
router.get("/addMusicListings",controller.addMusics)
router.get("/challenges", controller.challenges);
router.get("/contactUs", controller.contactUs);
router.get("/faq", controller.faq);
router.get("/banners", controller.banners);
router.get("/termsConditions", controller.termsConditions);
router.get("/privacyPolicy", controller.privacyPolicy);
router.get("/aboutUs", controller.aboutUs);
router.get("/logout", controller.logout);

module.exports = router;
