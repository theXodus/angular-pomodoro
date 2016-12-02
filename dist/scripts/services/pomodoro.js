(function(){
  function Pomodoro($interval, TIMER_FOR) {
    var Pomodoro = {};

    Pomodoro.currentTime = TIMER_FOR.POMO;
    Pomodoro.timerRunning = false; // the default state of the timer
    Pomodoro.onBreak = false;

    var interval; // used in timerStart and timerStop
    var pomodorosCompleted = 0; // stores how many pomodoros the user has completed this session
    var dingSound = new buzz.sound( "/assets/sounds/DingLing.mp3", {
      preload: true
    });

    Pomodoro.timerText;
    Pomodoro.buttonStyle;
    var buttons = {
      running: {
        text: "Reset",
        style: "danger"
      },
      stopped: {
        text: "Start",
        style: "default"
      },
      break: {
        text: "Skip break",
        style: "success"
      }
    };

    function setButton(button) {
      Pomodoro.timerText = button.text;
      Pomodoro.buttonStyle = button.style;
    }

    function setBreak() {
      Pomodoro.onBreak = true;
      // every 4 breaks give the user a 30 minute break
      if (pomodorosCompleted % 4 == 0) {
        Pomodoro.currentTime = TIMER_FOR.LONG_BREAK;
      } else {
        Pomodoro.currentTime = TIMER_FOR.BREAK;
      }
    }

    function setSession() {
      Pomodoro.onBreak = false;
      Pomodoro.currentTime = TIMER_FOR.POMO;
      Pomodoro.timerRunning = false;
      $interval.cancel(interval);
    }

    // this function is the subtracts 1 off the currentTime
    var countdown = function() {
      if(Pomodoro.currentTime > 0) {
        Pomodoro.currentTime--;
      } else if (Pomodoro.currentTime <= 0 && Pomodoro.onBreak == false) {
        pomodorosCompleted++;
        setBreak();
        setButton(buttons.break);
      } else if (Pomodoro.currentTime <= 0 && Pomodoro.onBreak == true) {
        setSession();
        setButton(buttons.stopped);
      }
    }

    // sets timerRunning to true and resets the button
    // stores $interval promise inside interval variable
    var timerStart = function() {
      Pomodoro.timerRunning = true;
      interval = $interval(countdown, 1000);
      setButton(buttons.running);
    }

    // cancels $interval, resets currentTime and changes button
    var timerEnd = function() {
      setSession();
      setButton(buttons.stopped);
    }

    // if timer is running stop and resets
    // if it's not running start the timer
    Pomodoro.toggleTimer = function() {
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

    Pomodoro.init = function() {
      setButton(buttons.stopped);
    }

    return Pomodoro;
  };


  angular
    .module('pomodoroApp')
    .factory('Pomodoro', ['$interval', 'TIMER_FOR', Pomodoro])
})();
