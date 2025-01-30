const Models = require("../models/index");
const helper = require('../helpers/fileUpload');

module.exports = {

    logIn: async (req, res) => {
        try {
            res.render("loginPage");
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

    dashbaord: async (req, res) => {
        try {
            const title = 'dashboard'
            res.render("dashboard", { title });
        } catch (error) {
            throw error;
        }
    },

    users: async (req, res) => {
        try {
            const title = "Users";
            const userData = await Models.userModel.findAll();
            res.render("users/userListings", { title, userData });
        } catch (error) {
            console.error("Error fetching user data:", error);
            res.render("users/userListings", { title: "Users", userData: [] });
        }
    },

    addUser: async (req, res) => {
        try {
            const title = "Users";
            res.render("users/addUserListings", { title });
        } catch (error) {
            throw error;
        }
    },

    createUser: async (req, res) => {
        try {
            const { name, nickName, email, status } = req.body;
            const userFile = req.files?.image;
            var userFilePath
            if (req.files && req.files.image) {
                userFilePath = await helper.imageUpload(userFile, "Users");
            }

            const objToSave = {
                name,
                nickName,
                email,
                status,
                image: userFilePath,
            };

            await Models.userModel.create(objToSave);

            res.redirect("/users");
        } catch (error) {
            console.error("Error adding music:", error);
            res.redirect("/users");
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

            res.render("users/editUserListings", { title, users: user });
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

            res.redirect("/users");
        } catch (error) {
            console.error(error);
            res.status(500).send("Error updating user");
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
            res.render("contactUs/contactUsListings", { title });
        } catch (error) {
            throw error;
        }
    },

    faq: async (req, res) => {
        try {
            const title = "FAQ";
            res.render("faq/faqListings", { title });
        } catch (error) {
            throw error;
        }
    },

    banners: async (req, res) => {
        try {
            const title = "Banners";
            res.render("banners/bannerListings", { title });
        } catch (error) {
            throw error;
        }
    },

    termsConditions: async (req, res) => {
        try {
            const title = "TermsConditions";
            res.render("termsConditions/termConditionListings", { title });
        } catch (error) {
            throw error;
        }
    },

    privacyPolicy: async (req, res) => {
        try {
            const title = "PrivacyPolicy";
            res.render("privacyPolicy/privacyPolicyListings", { title });
        } catch (error) {
            throw error;
        }
    },

    aboutUs: async (req, res) => {
        try {
            const title = "AboutUs";
            res.render("aboutUs/aboutUsListings", { title });
        } catch (error) {
            throw error;
        }
    },

}

