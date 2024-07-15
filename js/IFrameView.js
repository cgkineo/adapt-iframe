import Adapt from 'core/js/adapt';
import ComponentView from 'core/js/views/componentView';

class IFrameView extends ComponentView {

  postRender() {
    _.bindAll(this, 'onIFrameLoaded', 'onMessage', 'onInview');
    this.listenTo(Adapt, 'device:resize', this.onResize);
    this.setUpIFrame();
    this.setUpCompletionOn();
  }

  setUpIFrame() {
    this.$iframe = this.$('iframe');
    this.$iframe.on('load', this.onIFrameLoaded);
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
    this.onResize();
    this.setReadyStatus();
  }

  onResize() {
    if (!this.$IFrameContents) return;
    const initialWidth = this.model.get('_initialWidth');
    const initialHeight = this.model.get('_initialHeight');
    const initialAspectRatio = initialWidth && initialHeight
      ? initialHeight / initialWidth
      : 0.56;
    const currentWidth = this.$('.iframe__container').width();
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
}

IFrameView.template = 'iframe.jsx';

export default IFrameView;
