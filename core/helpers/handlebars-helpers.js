var hbs = require('hbs');
var moment = require('moment');

hbs.registerHelper('dateFormat', function(date, format){
    return moment(date).format(format);
});