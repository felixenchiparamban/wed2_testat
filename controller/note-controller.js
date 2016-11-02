var Note = require("../model/note");
var noteService = require("../services/note-service");
var noteUtils = require("../core/util/note-util");
var sessionHandler = require("../core/util/session-handler");

module.exports.showNotes = function (req, res) {

    sessionHandler.initializeUserPreferences(req);

    var session = req.session;

    /* conditions for nedb query */
    if (session.showFinished) {
        var queryConditions = {};
    } else {
        queryConditions = {isFinished: session.showFinished};
    }

    noteService.findNotesBy(queryConditions, function (err, notes) {
        if (err) {
            res.send(err);
            return;
        }

        var sortedNoteList = noteUtils.sortNotes(notes, session.sort, session.orderValue);

        res.render("index", {
            title: "Notes",
            notes: sortedNoteList,
            sort: session.sort,
            showFinished: !session.showFinished,
            orderValue: session.orderValue,
            style: session.style
        }, function (err, html) {
            if (err) {
                res.send(err);
                return;
            }
            res.send(html);
        });
    });
};

module.exports.showCreateNoteView = function (req, res) {
    let viewData = {
        title: "Create a note",
        style: req.session.style
    };

    res.render("updateNoteDetail.hbs", viewData);
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
                res.send("note service insert/update error:", err);
            } else {
                res.redirect("/");
            }
        });
    } catch (err) {
        console.log("save error", err);
        res.send(err);
        return;
    }
};

module.exports.showEditNoteView = function (req, res, next) {
    var _id = req.params.id;
    var style = req.session.style;

    noteService.get(_id, function (err, doc) {
        if (err) {
            res.statusCode = 500;
            res.send(err);
        } else {

            // check if docs found
            if (!doc) {
                next(new Error("Note not found. ID:" + _id));
            } else {

                let viewData = {
                    title: "Edit note",
                    note: doc,
                    style: style
                };

                res.render("updateNoteDetail.hbs", viewData);
            }
        }
    });
};