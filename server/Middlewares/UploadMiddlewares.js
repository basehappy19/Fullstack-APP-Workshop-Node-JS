const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req,file,cb) {
        cb(null, './Uploads')
    },
    filename: function (req,file,cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, 'File-'+uniqueSuffix+file.originalname)
    }
})

exports.upload = multer({ storage: storage}).single('file')