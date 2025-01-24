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
    musics: async (req, res) => {
        try {
            const title = "Musics";
            res.render("musics/musicListings", { title });
        } catch (error) {
            throw error;
        }
    },
    addMusics: async (req, res) => {
        try {
            const title = "Musics";
            res.render("musics/addMusicListings", { title });
        } catch (error) {
            throw error;
        }
    },
    createMusics: async (req, res) => {
        try {
            let objToSave = {
                title: req.body.title,
                description: req.body.description,
            }


            const title = "Musics";
            res.render("musics/musicListings", { title });
        } catch (error) {

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
