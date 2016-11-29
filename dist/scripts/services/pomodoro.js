(function(){
  function Pomodoro($interval, TIMER_FOR) {
    var Pomodoro = {};

    Pomodoro.currentTime = TIMER_FOR.POMO; // == 25 minutes(1500)
    Pomodoro.timerRunning = false; // the default state of the timer
    Pomodoro.timerText = "Start";
    Pomodoro.button = "default";
    Pomodoro.onBreak = false;

    var interval; // used in timerStart and timerStop
    var pomodorosCompleted = 0; // stores how many pomodoros the user has completed this session
    var dingSound = new buzz.sound( "/assets/sounds/DingLing.mp3", {
      preload: true
    });

    // this function is the subtracts 1 off the currentTime
    var countdown = function() {
      if(Pomodoro.currentTime > 0) {
        Pomodoro.currentTime -= 1;
      } else if (Pomodoro.currentTime <= 0 && Pomodoro.onBreak == false) {
        pomodorosCompleted += 1;
        Pomodoro.onBreak = true;

        // every 4 breaks give the user a 30 minute break
        if (pomodorosCompleted % 4 == 0) {
          Pomodoro.currentTime = TIMER_FOR.LONG_BREAK;
        } else {
          Pomodoro.currentTime = TIMER_FOR.BREAK;
        }

        Pomodoro.timerText = "Start";
        Pomodoro.button = "default";
      } else if (Pomodoro.currentTime <= 0 && Pomodoro.onBreak == true) {
        Pomodoro.onBreak = false;
        Pomodoro.currentTime = TIMER_FOR.POMO;
        Pomodoro.timerRunning = false;
        $interval.cancel(interval);
      }
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
      Pomodoro.currentTime = TIMER_FOR.POMO;
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

    Pomodoro.playDing = function(num) {
      if (num == 0) {
        dingSound.play();
      }
    }

    return Pomodoro;
  };


  angular
    .module('pomodoroApp')
    .factory('Pomodoro', ['$interval', 'TIMER_FOR', Pomodoro])
})();
