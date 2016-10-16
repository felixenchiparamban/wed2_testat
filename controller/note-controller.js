var Note = require("../model/note");
var noteService = require("../services/note-service");
var noteUtils = require("../core/util/note-util");


module.exports.showNotes = function (req, res){
    var sortKey = req.query.sort || "dueDate";
    var orderValue = req.query.order || "asc";
    var showFinished = req.query.showFinished == "false" ? false : true;
    var style = req.query.style;

    if(showFinished){
        var queryObj = {};
    } else {
        queryObj = {isFinished : showFinished};
    }

    noteService.findNotesBy(queryObj ,function(err, notes){
            if(err){
                res.send(err);
                return;
            }
            console.log(notes.length);
            var sortedNoteList = noteUtils.sortNotes(notes, sortKey, orderValue);
            res.render("index", { notes : sortedNoteList, orderValue : orderValue, showFinished : showFinished, style: style}, function(err, html){
                        if(err){
                    res.send(err);
                    return;
                }
                res.send(html);
            });
    });
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
        var note = new Note(_id, title, description, priority, dueDate, isFinished);
        // save the note in database
        noteService.insertOrUpdate(note, function (err, data) {
            if (err) {
                res.send(err);
            } else {
                console.log("Insert/Update successful: ", data);
                res.redirect("/");
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