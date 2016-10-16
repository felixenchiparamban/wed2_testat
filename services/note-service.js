var Datastore = require('nedb');
var db = new Datastore({ filename: './data/notes.db', autoload: true });

function addNote(noteObj, callback){
    db.insert(noteObj, callback);
}

function editNote(noteObj,callback){

}

function getNote(noteID, callback){
    db.findOne({_id: id}, callback);
}

function getAllNotes(callback){
    db.find({}, callback);
}

function findNotesBy(conditions, callback){
    db.find(conditions, callback);
}

module.exports = { add : addNote, edit : editNote, get : getNote, getAll : getAllNotes , findNotesBy : findNotesBy };