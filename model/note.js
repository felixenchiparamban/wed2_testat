'use strict';

class Note{

    constructor(_id, title, description, priority, dueDate, isFinished, createdDate){
        this._id = _id;
        this.setTitle(title);
        this.description = description;
        this.setPriority(priority);
        this.setDueDate(dueDate);
        this.setIsFinished(isFinished);
        this.createdDate = createdDate;
        this.modifiedDate = new Date();
    }

    setTitle(title){
        /* check if title is undefined, null or empty string.*/
        if(!title) {
            throw "Title is required.";
        }
        this.title = title;
    }

    setPriority(priority){
        /* check if prority is string or the range is between one and five. */
        if(isNaN(priority) || priority < 1 || priority > 5 ){
            throw "Priority is not in range(1 - 5)."
        }
        this.priority = priority;
    }

    setDueDate(dueDate){
        /* check due date format*/
        var datetime = Date.parse(dueDate);
        if(isNaN(datetime)){
            throw "Invalid due Date."
        }
        this.dueDate = datetime;
    }

    setIsFinished(isFinished){
        /* check boolean typeof */
        if(!isFinished){
            this.isFinished = false;
        } else {
            this.isFinished = false;
        }
    }
}

module.exports = Note;