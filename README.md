# adapt-iframe

An Adapt component that loads content into an iframe

## Installation

First, be sure to install the [Adapt Command Line Interface](https://github.com/adaptlearning/adapt-cli), then from the command line run:-

        adapt install adapt-iframe

This component can also be installed by adding the component to the adapt.json file before running `adapt install`:

        "adapt-iframe": "*"

## Settings overview

For example JSON format, see the _[example.json](https://github.com/cgkineo/adapt-iframe/blob/master/example.json)_ file.

### _component

This value must be: `iframe`

### _classes

You can use this setting to add custom classes to your template and LESS file.

### _layout

This defines the position of the component in the block. Values can be `full`, `left` or `right`.

### displayTitle and body

The `displayTitle` and `body` settings can be left blank.

### _setCompletionOn

Set completion based on either having scrolled into view, `"inview"`, or from the embedded content sending a message via the [window.postMessage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage), `"message"`.

The completion code trigger to add to the embedded content is:

        window.parent.postMessage('complete', '*');

### _src

The url of the iframe contents

### _dimensionDelegateSelector

If the dimensions of the iframe should be delegated to a child element of the iframe use this attribute to select which child element this is.

### _initialWidth

Specify the native width of the iframe - this is used (along with height) to make the iframe responsive

### _initialHeight

Specify the native height of the iframe - this is used (along with width) to make the iframe responsive

## Limitations

TBD

---

**Author / maintainer:** CGKineo<br>
**Accessibility support:** TBD<br>
**RTL support:** TBD<br>
**Cross-platform coverage:** Chrome, Chrome for Android, Firefox (ESR + latest version), Edge, Safari for macOS/iOS/iPadOS, Opera<br>
