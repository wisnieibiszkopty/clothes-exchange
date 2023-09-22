const jwt = require("jsonwebtoken");
const multer = require('multer');

const avatarStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/avatars/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const productPicturesStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/products/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const avatarUpload = multer({storage: avatarStorage});
const productPicturesUpload = multer({storage: productPicturesStorage});

// temporary
const secretKey = 'twojastararobimiloda';

function generateToken(user){
    return jwt.sign({'data': user}, secretKey, {"expiresIn": '1h'});
}

function verifyToken(req, res, next){
    const token = req.header('Authorization');

    if(!token){
        res.sendStatus(401);
    }
    else{
        try{
            const decoded = jwt.verify(token, secretKey);
            req.user = decoded;
            next();
        } catch(err){
            res.sendStatus(403);
        }
    }

}

module.exports = {
    avatarUpload,
    productPicturesUpload,
    generateToken,
    verifyToken
}