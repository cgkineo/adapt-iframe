import components from 'core/js/components';
import iframeView from './iframeView';
import iframeModel from './iframeModel';

export default components.register('iframe', {
  model: iframeModel,
  view: iframeView
});
