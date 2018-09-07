weather = function() {
  this.init = function() {
    if(this.settings.api_key == "") {
      alert("You need to specify an API-Key in your settings.json file. You can get it from openweathermap.org");
      return;
    }

    this.updateWeather();

    if(this.settings.refresh.enable) {
      this.startRefreshTask();
    }
  };

  this.updateWeather = function() {
    var settings = this.settings;
    var container = this.container;
    var param = settings.city + "," + settings.countrycode;

    $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=" + param + "&appid=" + settings.api_key, function(reply) {
      container.find(".weather-location").html(reply.name);

      var formattedTemp;
      if(settings.unit.toUpperCase() == "F") {
        formattedTemp = (( reply.main.temp - 273.15) * 9/5) + 32;
      } else {
        formattedTemp = reply.main.temp - 273.15;
      }
      container.find(".weather-value").html(Math.round(formattedTemp) + "°" + settings.unit.toUpperCase());

      var iconId = reply.weather[0]["id"];
      container.find(".owf").addClass("owf-" + iconId);
    });
  };

  this.startRefreshTask = function() {
    var instance = this;
    var settings = instance.settings;
    setInterval(function() {
      instance.updateWeather();
    }, settings.refresh.interval * 60 * 1000);
  };
}
