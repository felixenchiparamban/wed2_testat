var Note = require("../model/note");
var noteService = require("../services/note-service");

module.exports.showNotes = function (req, res) {
    res.send('test');
};

module.exports.showCreateNoteView = function (req, res) {
    res.render("updateNoteDetail.hbs");
};

module.exports.saveNote = function (req, res) {
    var _id = req.body._id;
    var title = req.body.title;
    var description = req.body.description;
    var priority = req.body.priority;
    var dueDate = req.body.dueDate;
    var isFinished = req.body.isFinished;
    try {
        // create a model
        var newNode = new Note(_id, title, description, priority, dueDate, isFinished, null, null);
        noteService.add(newNode, function (err, data) {
            if (err) {
                res.send(err);
            } else {
                res.send(data);
            }
        });
    } catch (err) {
        console.log(err);
        res.send(err);
        return;
    }
};

module.exports.showEditNoteView = function (req, res) {
    var _id = req.params.id;
    res.send(_id);
};