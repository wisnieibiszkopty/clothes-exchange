const express = require('express');
const router = express.Router();
const db = require("../queries");
const utils = require("../utils");

router.get('/', (req, res) => {

});

// for now if other user upload file with same name it will override existing file, fix it
router.post('/', utils.verifyToken, utils.productPicturesUpload.array('pictures', 10),
    async (req, res) => {
    let filesNames = [];
    req.files.forEach((file) => {
        filesNames.push(file.originalname);
    });
    const data = req.body;
    data.filesNames = filesNames;

    try{
        await db.addProduct(req.body);
        res.sendStatus(201).send({"message": "Product created"});
    } catch(err){
        console.error(err.message);
    }
});

router.put('/', (req, res) => {

});

router.delete('/:id', async (req, res) => {
    try{
    await db.deleteProduct(req.params.id)
    res.status(200).send({"message": "Product deleted"});
  } catch(err){
    console.error(err.message);
  }
});

module.exports = router;
