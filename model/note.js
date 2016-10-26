'use strict';
var moment = require('moment');

class Note {

    constructor(_id, title, description, priority, dueDate, isFinished) {
        this.setId(_id);
        this.setTitle(title);
        this.description = description;
        this.setPriority(priority);
        this.setDueDate(dueDate);
        this.setIsFinished(isFinished);

        // additional meta information
        this.createdDate, this.modifiedDate;
    }

    setId(_id){
        if(!_id){
            this._id = undefined;
        }else{
            this._id = _id;
        }
    }

    setTitle(title) {
        /* check if title is undefined, null or empty string.*/
        if (!title) {
            throw "Title is required.";
        }
        this.title = title;
    }

    setPriority(priority) {
        /* check if prority is string or the range is between one and five. */
        if (isNaN(priority) || priority < 1 || priority > 5) {
            throw "Priority ${priority} is not in range(1 - 5)."
        }
        this.priority = priority;
    }

    setDueDate(dueDate) {
        var date = moment(dueDate); //format("YYYY-MM-DD");
        if (!date.isValid()) {
            throw `Invalid due Date ${dueDate}.`
        }
        /* check due date format*/
        var datetime = new Date(date.year(), date.month(), date.date());
        this.dueDate = datetime;
    }

    setIsFinished(isFinished) {
        /* check boolean typeof */
        if (!isFinished) {
            this.isFinished = false;
        } else {
            this.isFinished = true;
        }
    }
}

module.exports = Note;