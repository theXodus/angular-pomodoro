(function(){
  function Pomodoro($interval) {
    var Pomodoro = {};

    Pomodoro.currentTime = 1500; // == 25 minutes
    Pomodoro.timerRunning = false; // the default state of the timer
    Pomodoro.timerText = "Start";
    Pomodoro.button = "default";
    var interval; // used in timerStart and timerStop


    // this function is the subtracts 1 off the currentTime
    var countdown = function() {
      Pomodoro.currentTime -= 1;
    }

    // sets timerRunning to true and resets the button
    // stores $interval promise inside interval variable
    var timerStart = function() {
      Pomodoro.timerRunning = true;
      interval = $interval(countdown, 1000);
      Pomodoro.timerText = "Reset";
      Pomodoro.button = "danger";
    }

    // cancels $interval, resets currentTime and changes button
    var timerEnd = function() {
      $interval.cancel(interval);
      Pomodoro.timerRunning = false;
      Pomodoro.currentTime = 1500;
      Pomodoro.timerText = "Start";
      Pomodoro.button = "default";
    }

    // if timer is running stop and resets
    // if it's not running start the timer
    Pomodoro.timer = function() {
      if (Pomodoro.timerRunning) {
        timerEnd();
      } else if (!Pomodoro.timerRunning){
        timerStart();
      }
    }


    return Pomodoro;
  };


  angular
    .module('pomodoroApp')
    .factory('Pomodoro', ['$interval', Pomodoro])
})();
