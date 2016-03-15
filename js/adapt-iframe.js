/*
 * adapt-contrib-iframe
 * License - http://github.com/adaptlearning/adapt_framework/blob/master/LICENSE
 */
define(function(require) {

    var ComponentView = require('coreViews/componentView');
    var AdaptView = require('coreViews/adaptView');
    var Adapt = require('coreJS/adapt');

    var iFrameComponent = ComponentView.extend({

        postRender: function() {                                
            this.$('iframe').on('load', _.bind(this.onIframeLoaded, this));
            this.listenTo(Adapt, 'device:resize', _.bind(this.onResize, this));             
        },

        onIframeLoaded : function(){            
            
            this.iframeContents = this.$('iframe').contents();

            var delegateSelector = this.model.get('dimensionDelegateSelector')

            if(delegateSelector){                                
                this.$dimensionDelgate = $(this.iframeContents.find(delegateSelector));
                this.model.set('initialWidth', this.$dimensionDelgate.width());
                this.model.set('initialHeight', this.$dimensionDelgate.height());
            }            
            this.onResize();

            this.setReadyStatus();  
        },

        aspectRatio : function(){
                                    
            var width = this.model.get('initialWidth');
            var height = this.model.get('initialHeight');                                     

            return width && height ? height/width : 0.56;                        
        },


        width : function(){
            return this.$('.iframe-container').width();
        },

        height : function(){
            return this.width() * this.aspectRatio();           
        },

        dimensions : function(){

            return {
                width:this.width(),
                height:this.height()                
            };
        },

        onResize : function(){    

            if(!this.iframeContents) return;

            var dimensions = this.dimensions();     
            this.$('iframe').css(dimensions);
                        
            if(this.$dimensionDelgate) this.$dimensionDelgate.css(dimensions);                                    
        },

        remove : function(){            
            this.$delegateSelector = null;
            AdaptView.prototype.remove.call(this);
        }
    });

    Adapt.register('iframe', iFrameComponent);

    return iFrameComponent;

});
