module.exports = {

    logIn:async(req,res)=>{
        try {
            res.render("loginPage");
        } catch (error) {
            throw error
        }
    },
    dashbaord: async (req, res) => {
        try {
            const title = 'dashboard'
            res.render("dashboard", {title});
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
            res.render("musics/musicListings");
        } catch (error) {
            throw error;
        }
    },
    challenges: async (req, res) => {
        try {
            res.render("challenges/challengeListings");
        } catch (error) {
            throw error;
        }
    },
    contactUs: async (req, res) => {
        try {
            res.render("contactUs/contactUsListings");
        } catch (error) {
            throw error;
        }
    },
    faq: async (req, res) => {
        try {
            res.render("faq/faqListings");
        } catch (error) {
            throw error;
        }
    },
    banners: async (req, res) => {
        try {
            res.render("banners/bannerListings");
        } catch (error) {
            throw error;
        }
    },
    termsConditions: async (req, res) => {
        try {
            res.render("termsConditions/termConditionListings");
        } catch (error) {
            throw error;
        }
    },
    privacyPolicy: async (req, res) => {
        try {
            res.render("privacyPolicy/privacyPolicyListings");
        } catch (error) {
            throw error;
        }
    },
    aboutUs: async (req, res) => {
        try {
            res.render("aboutUs/aboutUsListings");
        } catch (error) {
            throw error;
        }
    },
}
