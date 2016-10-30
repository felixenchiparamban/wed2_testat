var Datastore = require('nedb');
var db = new Datastore({filename: "./data/notes.db", autoload: true});

function insertNote(noteObj, callback) {
    noteObj.createdDate = new Date();
    db.insert(noteObj, callback);
}

function updateNote(noteObj, callback) {
    db.update(
        {_id: noteObj._id},
        {
            $set: {
                title: noteObj.title,
                description: noteObj.description,
                priority: noteObj.priority,
                dueDate: noteObj.dueDate,
                isFinished: noteObj.isFinished,
                modifiedDate: new Date()
            }
        }, {}, callback);
}

function insertOrUpdate(noteObj, callback) {
    if (typeof noteObj._id === "undefined") {
        insertNote(noteObj, callback);
    } else {
        updateNote(noteObj, callback);
    }
}

function getNote(noteID, callback) {
    db.findOne({_id: noteID}, callback);
}

function getAllNotes(callback) {
    db.find({}, callback);
}

function findNotesBy(conditions, callback) {
    db.find(conditions, callback);
}

module.exports = {
    add: insertNote,
    update: updateNote,
    insertOrUpdate: insertOrUpdate,
    get: getNote,
    getAll: getAllNotes,
    findNotesBy: findNotesBy
};