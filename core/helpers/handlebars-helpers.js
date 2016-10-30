var hbs = require('hbs');
var moment = require('moment');

hbs.registerHelper('dateFormat', function(date, format){
    return moment(date).format(format);
});

hbs.registerHelper('checkboxState', function(boolean){
    console.log("checkbox state: " + boolean);
   return boolean ? "checked" : "";
});

hbs.registerHelper('switchStyle', function(currentStyle){
    if(currentStyle == "dark"){
        return "light";
    } else {
        return "dark";
    }
});

hbs.registerHelper('typesOfNotesText', function(showFinished){
    return showFinished == false ? "hide finished notes" : "show all notes";
});

hbs.registerHelper('sortOrderStyle', function(sort, orderValue, currentButtonValue){
    if(sort == currentButtonValue){
        if(orderValue == "asc"){
            return "glyphicon-triangle-top"
        } else {
            return "glyphicon-triangle-bottom";
        }
    }
    return "";
});

