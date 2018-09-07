morningkick = {
  settings: [],
  widgetHistory: [],

  loadWidget: function(id, widgetConfig) {
    if(widgetConfig.enable == false) {
      return;
    }

    var widgetFriendlyName = widgetConfig.package.split(".").join("-")
    var widgetPath = "widget/" + widgetConfig.package.split(".").join("/") + "/";

    var widgetContainer = $('<div class="widget ' + widgetFriendlyName + ' col-md-' + widgetConfig.size + '" id="widget-' + id + '"></div>');

    var cssContainer = $('<style></style>');

    if($.inArray(widgetConfig.package, this.widgetHistory) == -1) {
      this.widgetHistory.push(widgetConfig.package);

      var namespace = "window";
      var namespaceSplitted = widgetConfig.package.split('.');

      for (var i = 0; i < namespaceSplitted.length; i++) {
        var v = namespaceSplitted[i];

        if(namespace == "") {
          namespace += v;
        } else {
          namespace += "." + v;
        }

        try {
          var evalNamespace = eval(namespace);
          if(typeof evalNamespace === 'undefined') {
            throw new Exception;
          }
        } catch (err) {
          if(namespace.indexOf('.') == -1) {
            eval("var " + namespace + " = {};");
          } else {
            eval(namespace + " = {};");
          }
        }
      }

      $.get(widgetPath + "widget.css", function(data) {
        cssContainer.html(data.split("#!").join("." + widgetFriendlyName));
        cssContainer.appendTo('head');
      });
    }

    widgetContainer.load(widgetPath + "widget.html", function() {
      $("#container").append(widgetContainer);
    /*  var ws = $("#container > .widget:not(.col-md-0)");
      var colCount = 0;
      for(var wId = 0; wId < ws.length; wId++) {
        var domWidget = ws[wId];
        var colClass = $(domWidget).attr("class").match(/col-md-\d/)[0];
        colCount += parseInt(colClass.split('col-md-')[1]);
        console.log(colCount);
      }
      if(colCount == 12) {
        ws.wrapAll('<div class="row"></div>');
      }*/
    /*  if(window.morningkick.colCount == 12) {
        $("#container > .widget:not(.col-md-0)").wrapAll('<div class="row"></div>');
        window.morningkick.colCount = 0;
      }*/
      var colCount = 0;
      var $wrapper = $("#container"),
          $items = $wrapper.children('.widget');

          $items.sort( function(a,b) { return parseInt(a.id.split('widget-')[1]) - parseInt(b.id.split('widget-')[1]) } )
          .each(function() {
            $wrapper.append(this);
          });

      $.getScript(widgetPath + "widget.js", function() {
        $.getJSON(widgetPath + "settings.json", function(data) {
          var settings = data;
          $.extend(settings, widgetConfig.settings);

        //  $('#container > .widget').sort( function(a,b) { return parseInt(a.id.split('widget-')[1]) - parseInt(b.id.split('widget-')[1]) } );

          var widget = eval("new " + widgetConfig.package + "();");
          widget.settings = settings;
          widget.container = morningkick.widget.getContainer(id);
          widget.init();
        });
      });
    });
  },

  init: function() {
    $.getJSON("settings.json", function(data) {
      settings = data;

      for(var i = 0; i < settings.widgets.length; i++) {
        var widgetConfig = settings.widgets[i];
        morningkick.loadWidget(i, widgetConfig);
      }
    });
  },
};
