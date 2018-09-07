var version = "0.1";

var imports = [
  "core",
  "widget",
  "updater"
];

var morningkick = {};

function importLib(name) {
  console.debug("[Library Import] Importing " + name + " ...");

  // get some kind of XMLHttpRequest
  var xhrObj = new XMLHttpRequest();
  // open and send a synchronous request
  xhrObj.open('GET', "res/js/lib/" + name + ".js", false);
  xhrObj.send('');

  if (xhrObj.status == 200) {
    console.debug("[Libary Import] Import of " + name + " has been successful.");
  } else {
    console.error("[Library Import] Import of " + name + " has NOT been successful.");
  }
  // add the returned content to a newly created script tag
  var se = document.createElement('script');
  se.type = "text/javascript";
  se.text = xhrObj.responseText;
  document.getElementsByTagName('body')[0].appendChild(se);
}

var queue = imports.map(function(name) {
    importLib(name);
});

$.when.apply($, queue).done(function() {
    console.info("Welcome to MorningKick v" + version + "!");
    morningkick.init();
    morningkick.updater.init();
});
