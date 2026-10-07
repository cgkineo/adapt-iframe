import Adapt from 'core/js/adapt';
import ComponentView from 'core/js/views/componentView';

class IFrameView extends ComponentView {

  initialize() {
    super.initialize();
    _.bindAll(this, 'onIFrameLoaded', 'onMessage', 'onInview', 'onResize');
    this.listenTo(Adapt, 'device:resize', this.onResize);
  }

  postRender() {
    this.setUpIFrame();
    this.setUpCompletionOn();
  }

  setUpIFrame() {
    this.$iframe = this.$('iframe');
    this.$iframe.on('load', this.onIFrameLoaded);
    // Keep the iframe sized to its container from the outset and on every
    // container resize, independent of the load event. This fires an initial
    // measurement immediately, so the iframe is sized even if the load event
    // is missed (see below).
    this._resizeObserver = new ResizeObserver(this.onResize);
    this._resizeObserver.observe(this.$('.iframe__container')[0]);
    // postRender runs in a deferred task, so for cached, same-origin content
    // the load event can fire before this handler is attached and be missed.
    // If the document is already loaded, run the handler now.
    const iframe = this.$iframe[0];
    if (iframe?.contentDocument?.readyState === 'complete') {
      this.onIFrameLoaded();
    }
  }

  setUpCompletionOn() {
    const setCompletionOn = this.model.get('_setCompletionOn');
    if (setCompletionOn === 'message') {
      window.addEventListener('message', this.onMessage);
      return;
    }
    this.$iframe.on('inview', this.onInview);
  }

  onIFrameLoaded() {
    this.$IFrameContents = this.$iframe.contents();
    const delegateSelector = this.model.get('_dimensionDelegateSelector');
    if (delegateSelector) {
      this.$dimensionDelegate = $(this.$IFrameContents.find(delegateSelector));
      this.model.set({
        _initialWidth: this.$dimensionDelegate.width(),
        _initialHeight: this.$dimensionDelegate.height()
      });
    }
    // Force a re-measure: the aspect ratio and delegate may have just changed
    // even though the container width has not.
    this._lastWidth = null;
    this.onResize();
    this.setReadyStatus();
  }

  onResize() {
    if (!this.$iframe) return;
    const currentWidth = this.$('.iframe__container').width();
    // Skip no-op measurements. This also stops the ResizeObserver from looping
    // on the height changes it triggers, as only width drives the dimensions.
    if (currentWidth === this._lastWidth) return;
    this._lastWidth = currentWidth;
    const initialWidth = this.model.get('_initialWidth');
    const initialHeight = this.model.get('_initialHeight');
    const initialAspectRatio = initialWidth && initialHeight
      ? initialHeight / initialWidth
      : 0.56;
    const dimensions = {
      width: currentWidth,
      height: currentWidth * initialAspectRatio
    };
    if (this.$dimensionDelegate) {
      this.$dimensionDelegate.css(dimensions);
    }
    this.$iframe.css(dimensions);
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
    this.$iframe.off('inview', this.onInview);
    this.setCompletionStatus();
  }

  remove() {
    this._resizeObserver?.disconnect();
    window.removeEventListener('message', this.onMessage);
    super.remove();
  }
}

IFrameView.template = 'iframe.jsx';

export default IFrameView;
