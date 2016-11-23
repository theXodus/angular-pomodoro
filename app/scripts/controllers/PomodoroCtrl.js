(function(){
  function PomodoroCtrl(Pomodoro) {
    this.pomodoro = Pomodoro;
  }

  angular
    .module('pomodoroApp')
    .controller('PomodoroCtrl', ['Pomodoro', PomodoroCtrl]);
})();
