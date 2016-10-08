var express = require('express');
var router = express.Router();
var noteController = require('../controller/note-controller');

/* GET home page. */
router.get("/", noteController.showNotes);
router.get("/create", noteController.createNote);
router.get("/edit", noteController.editNote);

module.exports = router;
