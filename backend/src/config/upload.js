const multer = require('multer');
const path = require('path');

module.exports = {
    //how multer save the files/images
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename: (req, file, callback) => {
            const ext = path.extname(file.originalname);
            const name = path.basename(file.originalname, ext);

            callback(null, `${name}-${Date.now()}${ext}`);
        },
    })
}