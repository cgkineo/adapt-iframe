# adapt-iframe

An adapt component that loads content into an iframe


## Installation

First, be sure to install the [Adapt Command Line Interface](https://github.com/adaptlearning/adapt-cli), then from the command line run:-

        adapt install adapt-iframe

This component can also be installed by adding the component to the adapt.json file before running `adapt install`:

        "adapt-iframe": "*"

## Usage

See settings

## Settings overview

For example JSON format, see the example.json file


#### _component

This value must be: `iframe`

#### _classes

You can use this setting to add custom classes to your template and LESS file.

#### _layout

This defines the position of the component in the block. Values can be `full`, `left` or `right`. 

#### displayTitle and body

The `displayTitle` and `body` settings can be left blank.

#### _src
The url of the iframe contents

#### _dimensionDelegateSelector

If the dimensions of the iframe should be delegated to a child element of the iframe use this attribute to select which child element this is.

#### _initialWidth

Specify the native width of the iframe - this is used (along with height) to make the iframe responsive

#### _initialHeight

Specify the native height of the iframe - this is used (along with width) to make the iframe responsive

## Limitations

To be completed.

## Browser spec

This component has been tested to the standard Adapt browser specification.

=======
