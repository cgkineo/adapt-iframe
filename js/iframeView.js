import Adapt from 'core/js/adapt';
import ComponentView from 'core/js/views/componentView';

class iframeView extends ComponentView {

    postRender() {
        let $iframe = this.$('iframe');

        _.bindAll(this, 'onIframeLoaded', 'onMessage', 'onInview');
        $iframe.on('load', this.onIframeLoaded);
        this.listenTo(Adapt, 'device:resize', this.onResize)
        switch (this.model.get('_setCompletionOn')) {
            case 'message':
                window.addEventListener('message', this.onMessage);
                break;
            case 'inview':
            default:
                $iframe.on('inview', this.onInview);
        }
    }

    onIframeLoaded() {
        this.iframeContents = this.$('iframe').contents();

        const delegateSelector = this.model.get('_dimensionDelegateSelector');

        if(delegateSelector) {
            this.$dimensionDelegate = $(this.iframeContents.find(delegateSelector));
            this.model.set({
                '_initialWidth': this.$dimensionDelegate.width(),
                '_initialHeight': this.$dimensionDelegate.height()
            });
        }
        this.onResize();

        this.setReadyStatus();
    }

    aspectRatio() {
        const width = this.model.get('_initialWidth');
        const height = this.model.get('_initialHeight');

        return width && height ? height/width : 0.56;
    }

    width() {
        return this.$('.iframe__container').width();
    }

    height() {
        return this.width() * this.aspectRatio();
    }

    dimensions() {
        return {
            width: this.width(),
            height: this.height()
        };
    }

    onResize() {
        if (!this.iframeContents) return;

        const dimensions = this.dimensions();
        this.$('iframe').css(dimensions);

        if (this.$dimensionDelegate) this.$dimensionDelegate.css(dimensions);
    }

    onMessage(event) {
        if (event.data !== 'complete') return;

        this.setCompletionStatus();
        window.removeEventListener('message', this.onMessage);
    }

    onInview(event, visible, visiblePartX, visiblePartY) {
        if (!visible) return;

        switch (visiblePartY) {
            case 'top':
                this.hasSeenTop = true;
                break;
            case 'bottom':
                this.hasSeenBottom = true;
                break;
            case 'both':
                this.hasSeenTop = true;
                this.hasSeenBottom = true;
        }

        if (!this.hasSeenTop || !this.hasSeenBottom) return;

        this.$('iframe').off('inview', this.onInview);
        this.setCompletionStatus();
    }
}

iframeView.template = 'iframe.jsx';

export default iframeView;
