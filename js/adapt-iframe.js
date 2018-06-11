define([
    'core/js/adapt',
    'core/js/views/componentView'
], function(Adapt, ComponentView) {

    var iFrameComponent = ComponentView.extend({

        postRender: function() {
            this.$('iframe').on('load', this.onIframeLoaded.bind(this));

            this.listenTo(Adapt, 'device:resize', this.onResize);
        },

        onIframeLoaded: function(){
            this.iframeContents = this.$('iframe').contents();

            var delegateSelector = this.model.get('_dimensionDelegateSelector');

            if(delegateSelector){
                this.$dimensionDelegate = $(this.iframeContents.find(delegateSelector));
                this.model.set({
                    '_initialWidth': this.$dimensionDelegate.width(),
                    '_initialHeight': this.$dimensionDelegate.height()
                });
            }
            this.onResize();

            this.setReadyStatus();
        },

        aspectRatio: function(){
            var width = this.model.get('_initialWidth');
            var height = this.model.get('_initialHeight');

            return width && height ? height/width : 0.56;
        },

        width: function(){
            return this.$('.iframe-container').width();
        },

        height: function(){
            return this.width() * this.aspectRatio();
        },

        dimensions: function(){
            return {
                width: this.width(),
                height: this.height()
            };
        },

        onResize: function(){
            if (!this.iframeContents) return;

            var dimensions = this.dimensions();
            this.$('iframe').css(dimensions);

            if (this.$dimensionDelegate) this.$dimensionDelegate.css(dimensions);
        }
    });

    return Adapt.register('iframe', iFrameComponent);
});