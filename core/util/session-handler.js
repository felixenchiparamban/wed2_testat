
function initializeUserPreferences(req){
    var session = req.session;

    /* set default session value */
    if(!session.visitCount){
        session.sort = "dueDate";
        session.showFinished= true;
        session.orderValue = "asc";
        session.style = "dark";
        session.visitCount = 1;
    }

    if(req.query.sort){
        var sortOptions = req.query.sort.split('/');
        session.sort = sortOptions[0];
        session.orderValue = sortOptions[1];
    }



    if(req.query.style){
        session.style = req.query.style;
    }

    if(req.query.showFinished === "true"){
        session.showFinished = true;
    } else if(req.query.showFinished === "false"){
        session.showFinished = false;
    }
}

module.exports = { initializeUserPreferences : initializeUserPreferences };