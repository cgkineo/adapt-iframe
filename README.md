#adapt-contrib-iframe

An adapt component that loads content into an iframe


##Installation

First, be sure to install the [Adapt Command Line Interface](https://github.com/adaptlearning/adapt-cli), then from the command line run:-

        adapt install adapt-contrib-iframe

This component can also be installed by adding the component to the adapt.json file before running `adapt install`:

        "adapt-contrib-iframe": "*"

##Usage

This is a very simple component with just title and body text elements.

##Settings overview

For example JSON format, see the example.json file


####_component

This value must be: `iframe`

####_classes

You can use this setting to add custom classes to your template and LESS file.

####_layout

This defines the position of the component in the block. Values can be `full`, `left` or `right`. 

####displayTitle and body

The `displayTitle` and `body` settings can be left blank. Although the blank component could be used instead: [adapt-contrib-blank](https://github.com/adaptlearning/adapt-contrib-blank)


####src
The url of the iframe contents

####selector

####width

####height

##Limitations

To be completed.

##Browser spec

This component has been tested to the standard Adapt browser specification.

=======
