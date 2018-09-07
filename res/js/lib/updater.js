morningkick.updater = {
  currentVersion: "",

  init: function() {
    morningkick.updater.updateTask();
  },

  checkForUpdate: function() {
    $.getJSON("version.json", function(response) {
      if (morningkick.updater.currentVersion == "") {
        morningkick.updater.currentVersion = response.version;
      } else {
        if (morningkick.updater.currentVersion != response.version) {
          location.reload(true);
        }
      }
    });
  },

  updateTask: function() {
    setInterval(function() { morningkick.updater.checkForUpdate() }, 1000 * 60 * 5);
  }
};
