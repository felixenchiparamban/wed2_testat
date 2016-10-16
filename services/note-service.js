var Datastore = require('nedb');
var db = new Datastore({ filename: './data/notes.db', autoload: true });

function addNote(noteObj, callback){
    db.insert(noteObj, callback);
}

function updateNote(noteObj, callback){

}

function getNote(noteID, callback){

}

function getAllNotes(callback){

}

module.exports = { add : addNote, update : updateNote, get : getNote, get : getAllNotes };