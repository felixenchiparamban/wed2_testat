var express = require('express');
var router = express.Router();
var noteController = require('../controller/note-controller');

/* GET home page. */
router.get("/", noteController.showNotes);

/* GET create note page*/
router.get("/create", noteController.showCreateNoteView);

/* POST save note*/
router.post("/save", noteController.saveNote);

/* GET edit note*/
router.get("/edit/:id", noteController.showEditNoteView);

module.exports = router;