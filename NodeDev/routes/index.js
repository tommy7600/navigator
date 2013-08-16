/*
 * Build home page.
 */
exports.index = function (req, res) {
    res.render('homepage');
};

exports.help = function (req, res) {
    res.render('help');
};

exports.driver = function (req, res) {
    res.render('driver');
};

exports.login = function (req, res) {
    res.render('login');
};

exports.around = function (req, res) {
    res.render('around');
};

exports.bus = function (req, res) {
    res.render('bus');
};

exports.register = function (req, res) {
    res.render('register');
};

exports.navigator = function (req, res) {
    res.render('navigator');
};

exports.test = function (req, res) {
    console.log("==========");
    console.log(req.session.username);
    console.log(req.session.pwd);

};
