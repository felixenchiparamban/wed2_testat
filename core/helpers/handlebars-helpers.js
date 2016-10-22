var hbs = require('hbs');
var moment = require('moment');

hbs.registerHelper('dateFormat', function(date, format){
    return moment(date).format(format);
});

hbs.registerHelper('checkedState', function(order, currentValue){
    if (order == currentValue) {
        return 'checked';
    } else {
        return '';
    }
});

hbs.registerHelper('checkboxState', function(boolean){
   return boolean ? "checked" : "";
});

hbs.registerHelper('switchStyle', function(currentStyle){
    if(currentStyle == "dark"){
        return "light";
    } else {
        return "dark";
    }
});