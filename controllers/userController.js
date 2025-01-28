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
            console.log(req.files, "hiiiiiiiii")
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
            const title = "Users";
            res.render("users/editUserListings", { title });
        } catch (error) {
            throw error;
        }
    },


    // editUser: async (req, res) => {
    //     try {
    //         const { id } = req.body;
    //         if (!id) {
    //             return res.status(400).json({ error: "User ID is required." });
    //         }

    //         const user = await Models.userModel.findOne({ where: { id } });
    //         if (!user) {
    //             return res.status(404).json({ error: "User not found." });
    //         }

    //         const title = "Users";
    //         res.render("users/editUserListings", { title, user });
    //     } catch (error) {
    //         console.error("Error fetching user details:", error);
    //         res.redirect("/users");
    //     }
    //},

    // updateUser: async (req, res) => {
    //     try {
    //         const { id } = req.params;
    //         const { name, nickName, email, status } = req.body;
    //         const userFile = req.files?.image;

    //         if (!id) {
    //             return res.status(400).json({ error: "User ID is required." });
    //         }

    //         const user = await Models.userModel.findOne({ where: { id } });
    //         if (!user) {
    //             return res.status(404).json({ error: "User not found." });
    //         }

    //         let userFilePath = user.image;
    //         if (userFile) {
    //             userFilePath = await helper.imageUpload(userFile, "Users");
    //         }

    //         const updatedData = {
    //             name,
    //             nickName,
    //             email,
    //             status,
    //             image: userFilePath,
    //         };

    //         await Models.userModel.update(updatedData, { where: { id } });

    //         res.redirect("/users");
    //     } catch (error) {
    //         console.error("Error updating user:", error);
    //         res.redirect("/users");
    //     }
    // },


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

            // Redirect to the music listing page
            res.redirect("/music");
        } catch (error) {
            console.error("Error adding music:", error);
            res.redirect("/music");
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
            res.render("challenges/challengeListings", { title });
        } catch (error) {
            throw error;
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

