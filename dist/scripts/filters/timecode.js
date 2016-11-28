(function() {
  function timecode() {
    return function(seconds) {
      var minutes = Math.floor(seconds / 60);
      var remainingSeconds = seconds % 60;

      var output = minutes + ':';
      if (remainingSeconds < 10) {
          output += '0';
      }

      output += remainingSeconds;

      return output;
    };
  }

  angular
    .module('pomodoroApp')
    .filter('timecode', timecode);
})();
