Router.map(function(){
  Router.route('/login', function () {
  this.render('login');
});
Router.route('/', function () {
  this.render('home');
});
Router.route('/register', function () {
  this.render('register');
});
Router.route('/send', function () {
  this.render('send');
});
Router.route('/contacts', function () {
  this.render('contacts');
});

});




 

