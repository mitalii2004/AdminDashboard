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
            res.render("users/userListings", { title });
        } catch (error) {
            throw error;
        }
    },
    music: async (req, res) => {
        try {
            const title = "Musics";
            const musicData = await Models.musicModel.findAll(); // Fetch music data
            res.render("music/musicListings", { title, musicData }); // Pass musicData to the template
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
            const { title, description } = req.body;
            const musicFile = req.files?.music;

            if (!musicFile) {
                console.error("No music file uploaded.");
                return res.redirect("/music");
            }

            console.log(musicFile, "musicFilemusicFile");

            const allowedMimeTypes = ["audio/mpeg", "audio/wav", "audio/mp3"];
            console.log("Uploaded file MIME type:", musicFile.mimetype);

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

            let objToSave = {
                title: title,
                description: description,
                music: musicFilePath
            };

            await Models.musicModel.create(objToSave);

            const musicData = await Models.musicModel.findAll();

            res.render("music/musicListings", { title: "Musics", musicData });
        } catch (error) {
            console.error("Error adding music:", error);

            const musicData = await Models.musicModel.findAll();

            res.render("music/musicListings", { title: "Musics", musicData });
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

