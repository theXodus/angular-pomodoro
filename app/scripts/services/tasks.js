(function() {
  function Tasks($firebaseArray) {
    var ref = firebase.database().ref();

    var tasks = $firebaseArray(ref);
    var addTask = function(item) {
      tasks.$add({
        text: item.text,
        created_at: new Date().toString()
      });
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
