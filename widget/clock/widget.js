clock = function() {
  this.init = function() {
    var instance = this;
    setInterval(function() {
      instance.sync();
    }, 1000 * 900);
    instance.sync();
  };

  this.sync = function() {
    var instance = this;
    setTimeout(function() {
      instance.updateClockTask();
    }, Math.floor((Math.random() * 10) + 1) * 1000);
  };

  this.updateClockTask = function() {
    var instance = this;
    $.getJSON("http://api.timezonedb.com/v2/get-time-zone?key=" + instance.settings.api_key + "&format=json&by=zone&zone=" + instance.settings.timezone, function(response) {
        instance.container.find(".location").html(response.countryName);
        var timestamp = (response.dst == 0) ? response.timestamp - 3600 : response.timestamp;
        instance.update(timestamp);
    });
  };

  this.update = function(timestamp) {
    var instance = this;
    setInterval(function() {
      timestamp += 1;

      var date = new Date(timestamp * 1000);
      var ampm = date.getHours() >= 12 ? 'PM' : 'AM';

      instance.container.find(".time").html((date.getHours() % 12 || 12) + ":" + instance.pad(date.getMinutes()) + " " + ampm);
    }, 1000);
  };

  this.pad = function(i) {
    return ("0" + i).slice(-2);
  };
}
