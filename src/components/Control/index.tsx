import * as React from 'react';
import './control.scss';

const Control: React.FC = () => {
  return(
    <div className="Control">
      <span className="Control__close Control__button"></span>
      <span className="Control__expand Control__button"></span>
      <span className="Control__minimize Control__button"></span>
    </div>
  )
}

export default Control;