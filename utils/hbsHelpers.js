const moment = require('moment')
const handlebars_paginate = require("handlebars-paginate")

const hbsHelpers = (handlebars) => {
    handlebars.registerHelper('formatDate', function (dateString) {
        return new handlebars.SafeString(
            moment().format('MMMM Do YYYY,')
        );
    })

    handlebars.registerHelper('paginate', require('handlebars-paginate'))
}

module.exports = hbsHelpers