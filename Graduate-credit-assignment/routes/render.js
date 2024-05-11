const travelList = require('../models/travelListModel');

exports.homePage = function(req, res, next) {
    travelList.find({}).lean()
    .then((list) => {
        res.render(
            'home',
            {
                layout: 'main',
                list: list,
                title: 'A list of countries I have been to',
                navLinks: {
                    home: 'Home',
                    profile: 'Profile',
                    logout: 'Logout'
                },
                errorMsg: req.query.errorMsg
            }
        )
    })
    .catch((err) => {
        console.error(err);
    })
}

exports.save = function(req, res, next) {
    var formData = {
        country: req.body.country,
        dateVisited: req.body.date,
        favoriteSight: req.body.favoriteSight
    }
    var listEntry = new travelList(formData);
    listEntry.save()
    .then(() => {
        res.redirect('/');
    })
    .catch((err) => {
        req.flash('inputError', 'All fields must be filled out');
        console.error(err);
        res.redirect(`/?errorMsg=${req.flash('inputError')}`);
    })
}