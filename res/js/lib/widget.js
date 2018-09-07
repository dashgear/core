morningkick.widget = {
  getContainer: function(id) {
    return $("#widget-" + id);
  },

  getSettings: function(widgetConfig) {
    var widgetPath = "widget/" + widgetConfig.package.split(".").join("/") + "/";
    var settings;
    $.getJSON(widgetPath + "settings.json", function(data) {
      settings = data;
      $.extend(settings, widgetConfig.settings);
      console.log(settings);
      return settings;
    });
  },

  test: function() {
    alert("test");
  },
/*
  var settings = {
    $.getJSON("settings.json", function(data) {

    });
  }*/
}
