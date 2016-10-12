var Note = require("../model/note");
var noteService = require("../services/note-service");

module.exports.showNotes = function (req, res){
   noteService.getAll(function(err, notes){
       if(err){
           res.send(err);
           return;
       }
      res.render("index", { notes : notes }, function(err, html){
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