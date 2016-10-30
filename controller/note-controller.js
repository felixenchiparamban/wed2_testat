var Note = require("../model/note");
var noteService = require("../services/note-service");
var noteUtils = require("../core/util/note-util");

module.exports.showNotes = function (req, res){
    var session = req.session;

    if(!session.visitCount){
       session.sort = "dueDate";
        session.showFinished= true;
        session.orderValue = "asc";
        session.style = "dark";
        session.visitCount = 1;
    } else {
        session.visitCount++;
    }

    if(req.query.sort){
       if(session.sort == req.query.sort){
           session.orderValue = session.orderValue == "asc" ? "desc" : "asc";
       } else {
           session.sort = req.query.sort;
           session.orderValue = "asc";
       }
    }
    if(req.query.style){
        session.style = req.query.style;
    }

    if(req.query.showFinished === "true"){
        session.showFinished = true;
    } else if(req.query.showFinished === "false"){
        session.showFinished = false;
    }

    if(session.showFinished){
        var queryObj = {};
    } else {
        queryObj = {isFinished : session.showFinished};
    }

    noteService.findNotesBy(queryObj ,function(err, notes){
            if(err){
                res.send(err);
                return;
            }
            console.log(notes.length);

            var sortedNoteList = noteUtils.sortNotes(notes, session.sort, session.orderValue);

            res.render("index", { notes : sortedNoteList, sort : session.sort, showFinished : !session.showFinished, orderValue : session.orderValue, style: session.style}, function(err, html){
                        if(err){
                    res.send(err);
                    return;
                }
                res.send(html);
            });
    });
};

module.exports.showCreateNoteView = function (req, res) {
    let viewData = {
        title : "Create a note"
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
                res.send("note service insert/update error:",err);
            } else {
                console.log("Insert/Update successful: ", data);
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
    var style = req.query.style;

    noteService.get(_id, function(err, doc){
        if(err){
            res.statusCode = 500;
            res.send(err);
        }else{

            // check if docs found
            if(!doc){
                next(new Error("Note not found. ID:"+ _id));
            }else{

                let viewData = {
                    title : "Edit note",
                    note : doc,
                    style: style
                };

                res.render("updateNoteDetail.hbs", viewData);
            }
        }
    });
};