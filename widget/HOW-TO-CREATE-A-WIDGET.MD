# How to create your own widget?

## Naming convention

The widget name MUST only contain alphanumeric characters and not start with a number.

## Folder structure

Each widget NEEDS to have these files:

- settings.json (default settings if the user does not override those in the root settings.json, needs to contain an empty object if there are no settings to override)

- widget.css (styles for your widget. Add `#!` in front of your styles to target the instanciated widget and not globally, see "weather" widget for reference)

- widget.html (the HTML structure for your widget, if none, leave empty)

- widget.js (must include at least the code below)

## widget.js

This is the minimum code the file needs to contain:

````
spacer = function() {
  this.init = function() {
      // your code here
  };
}
````

Instead of "spacer" you'd put your widget name there.

## Namespacing

If your widget consists of multiple widgets, you may find namespacing suitable.

Example: We want to add foo and bar as part of the "foobar" package.

Create a new folder called "foobar", and in that folder, create a folder for each of your widgets "foo" and "bar".

Your widget.js file needs to be namespaced too. For the "foo" widget you'd have something like this:

````
foobar.foo = function() {
````

Otherwise namespacing does not differ from the default development approach

## Publish

Ready to publish? Send a pull request!