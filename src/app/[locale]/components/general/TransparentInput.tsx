import { InputHTMLAttributes } from 'react';
import style from './TransparentInput.module.css';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  fullWidth?: boolean;
}

function TransparentInput({ fullWidth, ...props }: Props) {
  return (
    <input
      type="text"
      {...props}
      className={`${style.input} ${fullWidth ? style.fullWidth : ''} ${
        props.className
      }`}
    />
  );
}

export default TransparentInput;
