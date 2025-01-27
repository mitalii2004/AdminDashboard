const path = require('path');
const { v4: uuid } = require('uuid');
const fs = require('fs');
module.exports = {
    fileUpload: async (file, folder = "Musics") => {
        try {
            if (!file || !file.name) return null;

            const fileExtension = file.name.split(".").pop().toLowerCase();

            const allowedExtensions = {
                music: ["mp3", "wav"],
            };

            if (!allowedExtensions[folder]) {
                throw new Error("Invalid folder type specified for file upload.");
            }

            if (!allowedExtensions[folder].includes(fileExtension)) {
                throw new Error(
                    `Invalid file type. Allowed types for ${folder} are: ${allowedExtensions[
                        folder
                    ].join(", ")}`
                );
            }

            const name = `${uuid()}.${fileExtension}`;

            const filePath = path.join(__dirname, "..", "public", folder, name);

            await file.mv(filePath);

            return `/${folder}/${name}`;
        } catch (error) {
            console.error("Error during file upload:", error);
            return null;
        }
    },
}