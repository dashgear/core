earthporn = function() {
  this.init = function() {
    this.updateBackground();
    this.startBackgroundChangeTask();
  };

  this.updateBackground = function() {
    var settings = this.settings;

    $.getJSON(settings.json_url, function(reply) {
      var img_url = reply.data.children[0].data.preview.images[0].source.url;
      $("#container-bg").css("background-image", "url(" + img_url + ")");
    });
  };

  this.startBackgroundChangeTask = function() {
    var instance = this;
    var settings = instance.settings;
    setInterval(function() {
      instance.updateBackground();
    }, settings.interval * 60 * 1000);
  };
};
