var Note = require("../model/note");
var noteService = require("../services/note-service");
var noteUtils = require("../core/util/note-util");

module.exports.showNotes = function (req, res){
    var sortKey = req.query.sort || "dueDate";
    var orderValue = req.query.order || "asc";
    var showFinished = req.query.showFinished == "false" ? false : true;

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
            var sortedNoteList = noteUtils.sortNotes(notes, sortKey, orderValue);
            res.render("index", { notes : sortedNoteList, orderValue : orderValue, showFinished : showFinished}, function(err, html){
                if(err){
                    res.send(err);
                    return;
                }
                res.send(html);
            });
    });
};

module.exports.showCreateNoteView = function(req, res){
    res.render("updateNoteDetail.hbs");
};

module.exports.saveNote = function(req, res){
    var title = req.body.title;
    var description = req.body.description;
    var priority = req.body.priority;
    var dueDate = req.body.dueDate;
    var isFinished = req.body.isFinished;
    try{
        var newNode = new Note(undefined, title, description, priority, dueDate, isFinished, null, null);
        noteService.add(newNode, function(err, data){
            if(err){
                res.send(err);
            } else{
                res.send(data);
            }
        });
    } catch(err) {
        console.log(err);
        res.send(err);
        return;
    }
};

module.exports.showEditNoteView = function(req, res){

};