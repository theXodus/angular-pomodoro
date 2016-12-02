(function(){
  function PomodoroCtrl(Pomodoro, $scope, Tasks) {
    this.pomodoro = Pomodoro;
    this.pomodoro.init();
    this.newTask = "";

    this.tasks = Tasks.all;

    this.addTask = function() {
      Tasks.addTask(angular.copy(this.newTask));
      this.newTask = "";
    }

    var pomo = this;
    $scope.$watch('pomo.pomodoro.currentTime', function(newValue, oldValue) {
      pomo.pomodoro.playDing(newValue);
    });
  }

  angular
    .module('pomodoroApp')
    .controller('PomodoroCtrl', ['Pomodoro', '$scope', 'Tasks', PomodoroCtrl]);
})();
