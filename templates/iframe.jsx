import React from 'react';
import { templates } from 'core/js/reactHelpers';

export default function iframe(props) {
  const {
    _src
  } = props;

  return (
    <div className="component__inner iframe__inner">
      <templates.header {...props} />
      <div className="iframe__container">
        <iframe src={_src} allowFullScreen webkitallowfullscreen="true" mozallowfullscreen="true"></iframe>
      </div>
    </div>
  );
}
