const express = require('express');
const router = express.Router();
const db = require("../queries");
const utils = require("../utils");

// for now if other user upload file with same name it will override existing file, fix it
router.post('/', utils.productPicturesUpload.array('pictures', 10),
    async (req, res) => {
    let filesNames = [];
    req.files.forEach((file) => {
        filesNames.push(file.originalname);
    });
    const data = req.body;
    data.filesNames = filesNames;

    try{
        const data = await db.addProduct(req.body);
        res.send({"message": "Product created", "id": data.id});
    } catch(err){
        console.error(err.message);
        res.send("Cannot add product");
    }
});

// user can change name, description, price, brand category and photos (these will be added later)
router.put('/:id', async (req, res) => {
    const field = req.query.field;
    const value = req.query.value;
    const id = req.params.id;
    try{
        await db.editProduct(id, field, value);
        res.sendStatus(200);
    } catch(err){
        console.error(err);
        res.sendStatus(400);
    }
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
