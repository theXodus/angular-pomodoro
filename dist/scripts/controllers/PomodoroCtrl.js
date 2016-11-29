(function(){
  function PomodoroCtrl(Pomodoro, $scope) {
    this.pomodoro = Pomodoro;
    var pomo = this;
    $scope.$watch('pomo.pomodoro.currentTime', function(newValue, oldValue) {
      pomo.pomodoro.playDing(newValue);
    });
  }

  angular
    .module('pomodoroApp')
    .controller('PomodoroCtrl', ['Pomodoro', '$scope', PomodoroCtrl]);
})();
