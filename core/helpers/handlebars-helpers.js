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

hbs.registerHelper('switchOrderValue', function(orderValue){
    return orderValue == "asc" ? "desc" : "asc";
});

hbs.registerHelper('priorityTimes', function(n) {
    var text = '';
    for(var i = 0; i < n; ++i)
        text += "<span class='glyphicon glyphicon-fire priority'></span>";
    return text;
});

