var Datastore = require('nedb');
var db = new Datastore({ filename: './data/notes.db', autoload: true });

function addNote(noteObj, callback){
    db.insert(noteObj, callback);
}

function editNote(noteObj,callback){

}

function getNote(noteID, callback){
    db.findOne({_id: id}, function(err, notes){
       callback(err, notes);
    });
}

function getAllNotes(callback){
    db.find({}, function (err, notes) {
       callback(err, notes);
    });
}

module.exports = { add : addNote, edit : editNote, get : getNote, getAll : getAllNotes };