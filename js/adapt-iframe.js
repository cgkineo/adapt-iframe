import components from 'core/js/components';
import IFrameView from './IFrameView';
import IFrameModel from './IFrameModel';

export default components.register('iframe', {
  model: IFrameModel,
  view: IFrameView
});
