var express = require('express');
var router = express.Router();
const controller = require("../controllers/userController");

router.get("/", controller.logIn)
router.get("/dashboard", controller.dashbaord);
router.get("/users", controller.users);
router.get("/addUser", controller.addUser)
router.post("/createUser", controller.createUser);
// router.get("/editUser", controller.editUser)
router.get("/editUser/:id", controller.editUser);
router.post("/updateUser/:id", controller.updateUser);
router.delete("/deleteUser/:id", controller.deleteUser)
router.get("/music", controller.music);
router.get("/addMusic", controller.addMusic);
router.post("/createMusic", controller.createMusic);
router.delete("/deleteMusic/:id", controller.deleteMusic);
router.get("/challenges", controller.challenges);
router.get("/addChallenges", controller.addChallenges)
router.get("/contactUs", controller.contactUs);
router.get("/faq", controller.faq);
router.get("/banners", controller.banners);
router.get("/termsConditions", controller.termsConditions);
router.get("/privacyPolicy", controller.privacyPolicy);
router.get("/aboutUs", controller.aboutUs);
router.get("/logout", controller.logout);

module.exports = router;