(function(){

  function config() {
    var config = {
      apiKey: "AIzaSyAf489tk8w0FtS2SkToB07T7OUzZzktW-c",
      authDomain: "pomodoro-25eb3.firebaseapp.com",
      databaseURL: "https://pomodoro-25eb3.firebaseio.com",
      storageBucket: "pomodoro-25eb3.appspot.com",
      messagingSenderId: "619553518625"
    };
    firebase.initializeApp(config);
  }

  angular
    .module('pomodoroApp', ['firebase', 'ngMaterial'])
    .config(config)
})();
