
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
        if(session.sort == req.query.sort){
            session.orderValue = session.orderValue == "asc" ? "desc" : "asc";
        } else {
            session.sort = req.query.sort;
            session.orderValue = "asc";
        }
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