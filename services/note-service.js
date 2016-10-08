var Datastore = require('nedb');
var db = new Datastore({ filename: './data/notes.db', autoload: true });

function addNote(noteObj, callback){
    db.insert(noteObj, callback);
}

function editNote(noteObj,callback){

}

function getNote(noteID, callback){

}

function getAllNotes(callback){

}

module.exports = { add : addNote, edit : editNote, get : getNote, get : getAllNotes };