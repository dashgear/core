# DashGear

A dead simple dashboard. Minimal configuration required, works out of the box!

## How does it work?

The only file you'll ever need to customize is "settings.json" in this directory. It's used to configure your dashboard to your needs.

Just throw this code on a webserver, and open "index.html" in your browser. Done.

You can add as many widgets as you like, and what you like. The possibilities are endless!

The available widgets you can use are listed in the "widget" directory. You can add one by editing the settings.json (not the one in the widgets folder!) like this:

````
{
  "version": "1",

  "widgets": [
    {
      "package": "earthporn",
      "enable": true,
      "size": 0,
      "settings": {
        "interval": 5
      }
    },
    {
      "package": "clock",
      "enable": true,
      "size": 6,
      "settings": {
        "api_key": "API_KEY_HERE",
        "timezone": "America/Los_Angeles"
      }
    },
}
````

Here we have added two widgets. The first one will change the background every 5 minutes. A random image from /r/earthporn will be used. Since it's not a "real" widget, we have set the size to 0.

The second widget is a simple clock, which displays the time in Los Angeles. The size is set to 6, taking half the width of your screen.

Available sizes go from 0 to 12. (bootstrap grid syntax)

You may have noticed the settings we can individually set for each widget. You can find the available settings to override in the corresponding widget folder, just look out for the "settings.json".
For the "clock" it looks like this:

````
{
  "api_key": "",
  "timezone": "Zurich/Switzerland"
}
````

Just copy this part into "settings", like shown above.

Re-Ordering widgets? Simple. Just edit settings.json and move the widget up and down. DashGear will load the widgets in the order they're in the settings.json given.