// GET /
function home(req, res) {
  res.render('index');
}

module.exports = {
  home: home,
};
