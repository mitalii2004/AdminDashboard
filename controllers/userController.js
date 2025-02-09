const Models = require("../models/index");
const helper = require('../helpers/fileUpload');
const bcrypt = require("bcrypt")

module.exports = {

    logIn: async (req, res) => {
        try {
            res.render("loginPage");
        } catch (error) {
            throw error
        }
    },

    logInDone: async (req, res) => {
        try {
            console.log("req.body", req.body);

            let user = await Models.userModel.findOne({
                where: {
                    email: req.body.email,
                    password: req.body.password,
                    role: 0
                }, raw: true
            })
            console.log("user======", user);
            const hashedPassword = await bcrypt.compare(password)
            if (!user) {
                return res.send("User not found")
            } else {
                req.session.user = user
                res.redirect("/dashboard")
            }
        } catch (error) {
            throw error
        }
    },

    logout: async (req, res) => {
        try {
            res.render("loginPage")
        } catch (error) {
            throw error
        }
    },

    dashboard: async (req, res) => {
        try {
            const title = "Dashboard";

            const userCount = await Models.userModel.count();
            const musicCount = await Models.musicModel.count();
            const challengeCount = await Models.challengeModel.count();
            const contactCount = await Models.contactUsModel.count();
            const faqCount = await Models.faqModel.count();

            res.render("dashboard", {
                title,
                userCount,
                musicCount,
                challengeCount,
                contactCount,
                faqCount
            });
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
            res.status(500).send("Internal Server Error");
        }
    },

    user: async (req, res) => {
        try {
            const title = "Users";
            const userData = await Models.userModel.findAll();
            res.render("user/userListings", { title, userData });
        } catch (error) {
            console.error("Error fetching user data:", error);
            res.render("user/userListings", { title: "Users", userData: [] });
        }
    },

    addUser: async (req, res) => {
        try {
            const title = "Users";
            res.render("user/addUserListings", { title });
        } catch (error) {
            throw error;
        }
    },

    createUser: async (req, res) => {
        try {
            const { name, nickName, email, password, status, role } = req.body;
            const userFile = req.files?.image;
            var userFilePath
            if (req.files && req.files.image) {
                userFilePath = await helper.imageUpload(userFile, "Users");
            }

            const objToSave = {
                name,
                nickName,
                email,
                password,
                status,
                role,
                image: userFilePath,
            };

            await Models.userModel.create(objToSave);

            res.redirect("/user");
        } catch (error) {
            console.error("Error adding music:", error);
            res.redirect("/user");
        }
    },

    editUser: async (req, res) => {
        try {
            const { id } = req.params;
            const title = "Users";

            const user = await Models.userModel.findOne({
                where: {
                    id: id
                }
            })

            console.log(user, "useruser")

            res.render("user/editUserListings", { title, users: user });
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    },

    updateUser: async (req, res) => {
        try {
            const userId = req.params.id;
            if (!userId) {
                return res.status(400).send("User ID is required");
            }

            const user = await Models.userModel.findOne({ where: { id: userId } });
            if (!user) {
                return res.status(404).send("User not found");
            }

            let userFilePath = user.image;
            if (req.files && req.files.image) {
                const userFile = req.files.image;
                userFilePath = await helper.imageUpload(userFile, "Users"); // Upload new image
            }

            const updatedUser = await Models.userModel.update(
                {
                    image: userFilePath,
                    name: req.body.name,
                    nickName: req.body.nickName,
                    email: req.body.email,
                },
                { where: { id: userId } }
            );

            console.log(updatedUser, "updatedUserupdatedUser");

            res.redirect("/user");
        } catch (error) {
            console.error(error);
            res.status(500).send("Error updating user");
        }
    },

    viewUser: async (req, res) => {
        try {
            const title = "Users";
            console.log('Query Params:', req.query);

            const { id } = req.params;

            if (!id) {
                return res.status(400).send('ID is required');
            }

            console.log("Received ID: ", id);

            const user = await Models.userModel.findOne({
                where: {
                    id: id
                }
            });

            if (!user) {
                return res.status(404).send('User not found');
            }

            res.render("user/viewUserListings", { title, user });
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    },

    viewUser: async (req, res) => {
        try {
            const title = "Users";
            res.render("user/viewUserListings", { title });
        } catch (error) {
            throw error;
        }
    },

    deleteUser: async (req, res) => {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({ error: "User ID is required." });
            }
            const deletedUser = await Models.userModel.destroy({
                where: { id },
            });

            if (!deletedUser) {
                return res.status(404).json({ error: "User not found." });
            }

            return res.status(200).json({ status: 200, message: "User deleted successfully." });
        } catch (error) {
            throw error
        }
    },

    music: async (req, res) => {
        try {
            const title = "Musics";
            const musicData = await Models.musicModel.findAll();
            res.render("music/musicListings", { title, musicData });
        } catch (error) {
            console.error("Error fetching music data:", error);
            res.render("music/musicListings", { title: "Musics", musicData: [] });
        }
    },

    addMusic: async (req, res) => {
        try {
            const title = "Musics";
            res.render("music/addMusicListings", { title });
        } catch (error) {
            throw error;
        }
    },

    createMusic: async (req, res) => {
        try {
            const { MusicTitle: title, MusicDescription: description } = req.body;
            const musicFile = req.files?.myfile;

            if (!musicFile) {
                console.error("No music file uploaded.");
                return res.redirect("/music");
            }

            console.log("Uploaded file:", musicFile);

            const allowedMimeTypes = ["audio/mpeg", "audio/wav", "audio/mp3"];
            if (!allowedMimeTypes.includes(musicFile.mimetype)) {
                console.error("Invalid MIME type.");
                return res.redirect("/music");
            }

            const maxFileSize = 10 * 1024 * 1024;
            if (musicFile.size > maxFileSize) {
                console.error("File size exceeds the limit.");
                return res.redirect("/music");
            }
            const musicFilePath = await helper.fileUpload(musicFile, "Musics");

            if (!musicFilePath) {
                console.error("File upload failed.");
                return res.redirect("/music");
            }
            const objToSave = {
                title,
                description,
                music: musicFilePath,
            };
            console.log("Saving object:", objToSave);

            await Models.musicModel.create(objToSave);

            res.redirect("/music");
        } catch (error) {
            console.error("Error adding music:", error);
            res.redirect("/music");
        }
    },

    editMusic: async (req, res) => {
        try {
            const { id } = req.params;
            const title = "Musics";

            const music = await Models.musicModel.findOne({
                where: { id: id }
            });

            console.log(music, "music");

            if (!music) {
                return res.status(404).send("Music not found");
            }

            res.render("music/editMusicListings", { title, music });
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    },

    updateMusic: async (req, res) => {
        try {
            console.log("rewqbdiy", req.body);
            console.log("rewq.files", req.files);
            // return
            const musicId = req.body.id;
            if (!musicId) {
                return res.status(400).send("Music ID is required");
            }

            const music = await Models.musicModel.findOne({ where: { id: musicId } });
            if (!music) {
                return res.status(404).send("Music not found");
            }

            let musicFilePath = music.music;

            if (req.files && req.files.music) {
                const musicFile = req.files.music;
                musicFilePath = await helper.fileUpload(musicFile, "Musics");
            }

            await Models.musicModel.update(
                {
                    title: req.body.title,
                    description: req.body.description,
                    music: musicFilePath,
                },
                { where: { id: musicId } }
            );

            console.log("Music updated successfully!");

            res.redirect("/music");
        } catch (error) {
            console.error(error);
            res.status(500).send("Error updating music");
        }
    },

    deleteMusic: async (req, res) => {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({ error: "Music ID is required." });
            }
            const deletedMusic = await Models.musicModel.destroy({
                where: { id },
            });

            if (!deletedMusic) {
                return res.status(404).json({ error: "Music not found." });
            }

            return res.status(200).json({ status: 200, message: "Music deleted successfully." });
        } catch (error) {
            throw error
        }
    },

    challenges: async (req, res) => {
        try {
            const title = "Challenges";
            const challengeData = await Models.challengeModel.findAll();
            res.render("challenges/challengeListings", { title, challengeData });
        } catch (error) {
            console.error("Error fetching challenge data:", error);
            res.render("challenges/challengeListings", { title: "Challenges", challengeData: [] });
        }
    },

    addChallenges: async (req, res) => {
        try {
            const title = "Challenges";
            res.render("challenges/addChallengeListings", { title });
        } catch (error) {
            throw error;
        }
    },

    createChallenge: async (req, res) => {
        try {
            const { title, description } = req.body;

            const objToSave = {
                title,
                description,
            };

            await Models.challengeModel.create(objToSave);

            res.redirect("/challenges");
        } catch (error) {
            console.error("Error adding challenge:", error);
            res.redirect("/challenges");
        }
    },

    editChallenge: async (req, res) => {
        try {
            const { id } = req.params;
            const title = "Challenges";

            const challenge = await Models.challengeModel.findOne({
                where: {
                    id: id
                }
            })

            console.log(challenge, "challengechallenge")

            res.render("challenges/editChallengeListings", { title, challenge });
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    },

    updateChallenge: async (req, res) => {
        try {
            console.log("rewqbdiy", req.body);
            //  return
            const userId = req.params.id;

            if (!userId) {
                return res.status(400).send("User ID is required");
            }

            const user = await Models.challengeModel.findOne({ where: { id: userId } });
            if (!user) {
                return res.status(404).send("User not found");
            }


            const updatedChallenge = await Models.challengeModel.update(
                {
                    title: req.body.title,
                    description: req.body.description,
                },
                { where: { id: userId } }
            );

            console.log(updatedChallenge, "updatedChallengeupdatedChallenge");

            res.redirect("/challenges");
        } catch (error) {
            console.error(error);
            res.status(500).send("Error updating challenge");
        }
    },

    deleteChallenge: async (req, res) => {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({ error: "Challenge ID is required." });
            }
            const deletedChallenge = await Models.challengeModel.destroy({
                where: { id },
            });

            if (!deletedChallenge) {
                return res.status(404).json({ error: "Music not found." });
            }

            return res.status(200).json({ status: 200, message: "Music deleted successfully." });
        } catch (error) {
            throw error
        }
    },

    contactUs: async (req, res) => {
        try {
            const title = "ContactUs";
            const contactData = await Models.contactUsModel.findAll();
            res.render("contactUs/contactUsListings", { title, contactData });
        } catch (error) {
            console.error("Error fetching contact data:", error);
            res.render("contactUs/contactUsListings", { title: "ContactUs", contactData: [] });
        }
    },

    addContact: async (req, res) => {
        try {
            const title = "ContactUs";
            res.render("contactUs/addContactUsListings", { title });
        } catch (error) {
            throw error;
        }
    },

    createContact: async (req, res) => {
        try {
            const { name, nickName, email, message, date } = req.body;

            const objToSave = {
                name,
                nickName,
                email,
                message,
                date
            };

            await Models.contactUsModel.create(objToSave);

            res.redirect("/contactUs");
        } catch (error) {
            console.error("Error adding contact:", error);
            res.redirect("/contactUs");
        }
    },

    editContact: async (req, res) => {
        try {
            const { id } = req.params;
            const title = "ContactUs";

            const contact = await Models.contactUsModel.findOne({
                where: {
                    id: id
                }
            })

            console.log(contact, "contactcontact")

            res.render("contactUs/editContactUsListings", { title, contact });
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    },

    updateContact: async (req, res) => {
        try {
            console.log("rewqbdiy", req.body);
            //  return
            const userId = req.params.id;

            if (!userId) {
                return res.status(400).send("User ID is required");
            }

            const user = await Models.contactUsModel.findOne({ where: { id: userId } });
            if (!user) {
                return res.status(404).send("User not found");
            }


            const updatedContact = await Models.contactUsModel.update(
                {
                    name: req.body.name,
                    nickName: req.body.nickName,
                    email: req.body.email,
                    message: req.body.message,
                    date: req.body.date,
                },
                { where: { id: userId } }
            );

            console.log(updatedContact, "updatedContactupdatedContact");

            res.redirect("/contactUs");
        } catch (error) {
            console.error(error);
            res.status(500).send("Error updating contact");
        }
    },

    deleteContact: async (req, res) => {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({ error: "Challenge ID is required." });
            }
            const deletedContact = await Models.contactUsModel.destroy({
                where: { id },
            });

            if (!deletedContact) {
                return res.status(404).json({ error: "contact not found." });
            }

            return res.status(200).json({ status: 200, message: "contact deleted successfully." });
        } catch (error) {
            throw error
        }
    },

    faq: async (req, res) => {
        try {
            const title = "FAQ";
            const faqData = await Models.faqModel.findAll();
            res.render("faq/faqListings", { title, faqData });
        } catch (error) {
            throw error;
        }
    },

    addfaq: async (req, res) => {
        try {
            const title = "FAQ";
            res.render("faq/addFaqListings", { title });
        } catch (error) {
            throw error;
        }
    },

    createFaq: async (req, res) => {
        try {
            const { question, answer, } = req.body;

            const objToSave = {
                question,
                answer,

            };

            await Models.faqModel.create(objToSave);

            res.redirect("/faq");
        } catch (error) {
            console.error("Error adding faq:", error);
            res.redirect("/faq");
        }
    },

    editFaq: async (req, res) => {
        try {
            const { id } = req.params;
            const title = "FAQ";

            const faq = await Models.faqModel.findOne({
                where: {
                    id: id
                }
            })

            console.log(faq, "faqfaq")

            res.render("faq/editFaqListings", { title, faq });
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    },

    updateFaq: async (req, res) => {
        try {
            console.log("rewqbdiy", req.body);
            //  return
            const userId = req.params.id;

            if (!userId) {
                return res.status(400).send("User ID is required");
            }

            const user = await Models.faqModel.findOne({ where: { id: userId } });
            if (!user) {
                return res.status(404).send("User not found");
            }


            const updatedFaq = await Models.faqModel.update(
                {
                    question: req.body.question,
                    answer: req.body.answer,

                },
                { where: { id: userId } }
            );

            console.log(updatedFaq, "updatedFaqupdatedFaq");

            res.redirect("/faq");
        } catch (error) {
            console.error(error);
            res.status(500).send("Error updating faq");
        }
    },

    deleteFaq: async (req, res) => {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({ error: "Faq ID is required." });
            }
            const deletedFaq = await Models.faqModel.destroy({
                where: { id },
            });

            if (!deletedFaq) {
                return res.status(404).json({ error: "faq not found." });
            }

            return res.status(200).json({ status: 200, message: "faq deleted successfully." });
        } catch (error) {
            throw error
        }
    },

    banner: async (req, res) => {
        try {
            const title = "Banners";
            const bannerData = await Models.bannerModel.findAll();
            res.render("banners/bannerListings", { title, bannerData });
        } catch (error) {
            throw error;
        }
    },

    addBanner: async (req, res) => {
        try {
            const title = "Banners";
            res.render("banners/addBannerListings", { title });
        } catch (error) {
            throw error;
        }
    },

    createBanner: async (req, res) => {
        try {
            const bannerFile = req.files?.image;
            var bannerFilePath
            if (req.files && req.files.image) {
                bannerFilePath = await helper.bannerImageUpload(bannerFile, "Banners");
            }

            const objToSave = {
                bannerImage: bannerFilePath,

            };

            await Models.bannerModel.create(objToSave);

            res.redirect("/banners");
        } catch (error) {
            console.error("Error adding banner:", error);
            res.redirect("/banners");
        }
    },

    editBanner: async (req, res) => {
        try {
            const { id } = req.params;
            const title = "Banners";

            const banner = await Models.bannerModel.findOne({
                where: {
                    id: id
                }
            })

            console.log(banner, "bannerbanner")

            res.render("banners/editBannerListings", { title, banner: banner });
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    },

    updateBanner: async (req, res) => {
        try {
            console.log(req.params, "bannerIdbannerIdbannerId")
            // return
            const bannerId = req.params.id;
            if (!bannerId) {
                return res.status(400).send("Banner ID is required");
            }

            const user = await Models.bannerModel.findOne({ where: { id: bannerId } });
            if (!user) {
                return res.status(404).send("User not found");
            }

            if (req.files && req.files.image) {
                const bannerFile = req.files.image;
                bannerFilePath = await helper.bannerImageUpload(bannerFile, "Banners");
            }

            const updatedBanner = await Models.bannerModel.update(
                {
                    bannerImage: bannerFilePath,
                },
                { where: { id: bannerId } }
            );

            console.log(updatedBanner, "updatedBannerupdatedBanner");

            res.redirect("/banners");
        } catch (error) {
            console.error(error);
            res.status(500).send("Error updating banner");
        }
    },

    deleteBanner: async (req, res) => {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({ error: "User ID is required." });
            }
            const deletedBanner = await Models.bannerModel.destroy({
                where: { id },
            });

            if (!deletedBanner) {
                return res.status(404).json({ error: "User not found." });
            }

            return res.status(200).json({ status: 200, message: "banner deleted successfully." });
        } catch (error) {
            throw error
        }
    },

    termsConditions: async (req, res) => {
        try {
            const title = "TermsConditions";
            const termsData = await Models.cmsModel.findOne({ where: { type: 1 } });
            console.log("teramData0", termsData)
            res.render("termsConditions/termConditionListings", { title, termsData });
        } catch (error) {
            throw error;
        }
    },

    updateTerms: async (req, res) => {
        try {
            const { id, description } = req.body;


            const findcms = await Models.cmsModel.findOne({
                where: {
                    type: 3
                }
            })

            if (findcms) {
                const updated = await Models.cmsModel.update(
                    { description: description },
                    { where: { type: 1 } }
                );
            } else {
                await Models.cmsModel.create({
                    title: "Terms & Conditions",
                    description: description,
                    type: 1
                })
            }

            res.redirect("/termsConditions");
        } catch (error) {
            throw error
        }
    },

    privacyPolicy: async (req, res) => {
        try {
            const title = "PrivacyPolicy";
            const privacyData = await Models.cmsModel.findOne({ where: { type: 2 } });
            console.log("privacyData0", privacyData)
            res.render("privacyPolicy/privacyPolicyListings", { title, privacyData });
        } catch (error) {
            throw error;
        }
    },

    updatePrivacy: async (req, res) => {
        try {
            const { id, description } = req.body;
            console.log(description);


            const findcms = await Models.cmsModel.findOne({
                where: {
                    type: 2
                }
            })

            if (findcms) {
                const updated = await Models.cmsModel.update(
                    { description: description },
                    { where: { type: 2 } }
                );
            } else {
                await Models.cmsModel.create({
                    title: "Privacy Policy",
                    description: description,
                    type: 2
                })
            }

            res.redirect("/privacyPolicy");
        } catch (error) {
            throw error
        }
    },

    aboutUs: async (req, res) => {
        try {
            const title = "AboutUs";
            const aboutUsData = await Models.cmsModel.findOne({ where: { type: 3 } });
            console.log("aboutUsData0", aboutUsData)
            res.render("aboutUs/aboutUsListings", { title, aboutUsData });
        } catch (error) {
            throw error;
        }
    },

    updateAbout: async (req, res) => {
        try {
            const { id, description } = req.body;


            const findcms = await Models.cmsModel.findOne({
                where: {
                    type: 3
                }
            })

            if (findcms) {
                const updated = await Models.cmsModel.update(
                    { description: description },
                    { where: { type: 3 } }
                );
            } else {
                await Models.cmsModel.create({
                    title: "About Us",
                    description: description,
                    type: 3
                })
            }

            res.redirect("/aboutUs");
        } catch (error) {
            throw error
        }
    },

    test: async (req, res) => {
        try {
            let objToSave = {
                email: "mitali@gmail.com",
                password: hashedPassword,
                role: 0
            }
            await Models.userModel.create(objToSave)
        } catch (error) {
            throw error
        }
    }

}

