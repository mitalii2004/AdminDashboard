var express = require('express');
var router = express.Router();
const controller = require("../controllers/userController");

router.get("/", controller.logIn)
router.get("/dashboard", controller.dashboard);

router.get("/user", controller.user);
router.get("/addUser", controller.addUser)
router.post("/createUser", controller.createUser);
router.get("/editUser/:id", controller.editUser);
router.post("/updateUser/:id", controller.updateUser);
router.get('/viewUser/:id', controller.viewUser); 
router.delete("/deleteUser/:id", controller.deleteUser)

router.get("/music", controller.music);
router.get("/addMusic", controller.addMusic);
router.post("/createMusic", controller.createMusic);
router.get("/editMusic/:id", controller.editMusic);
router.post("/updateMusic", controller.updateMusic);
router.delete("/deleteMusic/:id", controller.deleteMusic);

router.get("/challenges", controller.challenges);
router.get("/addChallenges", controller.addChallenges);
router.post("/createChallenge", controller.createChallenge);
router.get("/editChallenge/:id", controller.editChallenge);
router.post("/updateChallenge/:id", controller.updateChallenge);
router.delete("/deleteChallenge/:id", controller.deleteChallenge);

router.get("/contactUs", controller.contactUs);
router.get("/addContact", controller.addContact);
router.post("/createContact", controller.createContact);
router.get("/editContact/:id", controller.editContact);
router.post("/updateContact/:id", controller.updateContact);
router.delete("/deleteContact/:id", controller.deleteContact);

router.get("/faq", controller.faq);
router.get("/addFaq", controller.addfaq);
router.post("/createFaq", controller.createFaq);
router.get("/editFaq/:id", controller.editFaq);
router.post("/updateFaq/:id", controller.updateFaq);
router.delete("/deleteFaq/:id", controller.deleteFaq);

router.get("/banner", controller.banner);
router.get("/addBanner", controller.addBanner)
router.post("/createBanner", controller.createBanner);
router.get("/editBanner/:id", controller.editBanner);
router.post("/updateBanner/:id", controller.updateBanner);
router.delete("/deleteBanner/:id", controller.deleteBanner);

router.get("/termsConditions", controller.termsConditions);
router.post("/updateTerms", controller.updateTerms);

router.get("/privacyPolicy", controller.privacyPolicy);
router.post("/updatePrivacy", controller.updatePrivacy);


router.get("/aboutUs", controller.aboutUs);
router.post("/updateAbout", controller.updateAbout);

router.get("/logout", controller.logout);

module.exports = router;