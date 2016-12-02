(function() {
  function Tasks($firebaseArray) {
    var ref = firebase.database().ref();

    var tasks = $firebaseArray(ref);
    var addTask = function(item) {
      tasks.$add(item);
    }

    return {
      all: tasks,
      addTask: addTask
    }
  }

  angular
    .module('pomodoroApp')
    .factory('Tasks', ['$firebaseArray', Tasks]);
})();
