/*
 * adapt-contrib-iframe
 * License - http://github.com/adaptlearning/adapt_framework/blob/master/LICENSE
 */
define(function(require) {

    var ComponentView = require('coreViews/componentView');
    var Adapt = require('coreJS/adapt');

    var IFrameComponent = ComponentView.extend({

        preRender: function() {

            this.model.set('_isVisible', false);
            this.listenTo(Adapt, 'device:resize', _.bind(this.onResize, this));                         
        },

        postRender: function() {                                
            this.$('iframe').on('load', _.bind(this.onIframeLoaded, this));            
        },

        onIframeLoaded : function(){            
            
            this.iframeContents = this.$('iframe').contents();

            if(this.model.get('selector')){                
                var targets = this.iframeContents.find(this.model.get('selector'));
                this.dimensionTarget = $(targets[0]);
            }            
            this.onResize();

            
            this.model.set('_isVisible', true);
            this.setReadyStatus();  
        },

        aspectRatio : function(){
            
            var width, height = 0;            

            if(this.dimensionTarget){

                width = this.dimensionTarget.width();
                height = this.dimensionTarget.height();
            }
            if(width === 0 && height === 0){
                width = this.model.get('width');
                height = this.model.get('height');                
            }            

            return  width && height ? height/width : 0.56;                        
        },


        width : function(){
            return this.$el.width();
        },

        height : function(){
            return this.$el.width() * this.aspectRatio();           
        },

        onResize : function(){    

            if(!this.iframeContents) return;
      
            this.$('.iframe-container').height(this.height());

            if(this.dimensionTarget){                
                this.dimensionTarget.css({
                    width:this.width(),
                    height:this.height(),
                });
            }
        }
    });

    Adapt.register('iframe', IFrameComponent);

    return IFrameComponent;

});
