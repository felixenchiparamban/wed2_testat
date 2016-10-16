'use strict';

module.exports.sortNotes = function(notes, sortKey, orderValue){
    return notes.sort(function(noteA, noteB){
        var comp = noteA[sortKey] - noteB[sortKey];
        return (orderValue == "asc") ? comp : -1 * comp;
    });
};

