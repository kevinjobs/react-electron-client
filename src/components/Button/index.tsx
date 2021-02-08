import * as React from 'react';
import classNames from 'classnames';
import { tuple } from '../_utils/type';
import './button.scss';

const ButtonTypes = tuple('default', 'primary', 'success', 'danger');
export type ButtonType = typeof ButtonTypes[number];
const SizeTypes = tuple('default', 'small', 'medium', 'large');
export type SizeType = typeof SizeTypes[number];

type ButtonProps = {
  onClick?(e: React.MouseEvent<HTMLElement>): void,
  type?: ButtonType,
  size?: SizeType,
  children?: React.ReactNode
}

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { onClick } = props;
    if (onClick) {
      (onClick as React.MouseEventHandler<HTMLButtonElement>)(e);
    }
  }

  const { type, size } = props;

  const classnames = classNames(
    'mint-forge',
    {
      [`btn-type-${type}`]: type,
      [`btn-size-${size}`]: size
    }
  )

  return(
    <button onClick={handleClick} className={classnames}>
      {props.children}
    </button>
  )
}

Button.defaultProps = {
  type: 'default',
  size: 'default'
}

export default Button;