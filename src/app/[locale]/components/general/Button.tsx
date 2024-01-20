import { SvgIconProps } from '@mui/material/SvgIcon';
import { ButtonHTMLAttributes, FC } from 'react';
import style from './Button.module.css';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  icon?: FC<SvgIconProps>;
  hideBg?: boolean;
}

function Button({ hideBg, label, ...props }: Props) {
  if (label && props.icon) {
    return (
      /* button with label and icon */
      <button
        {...props}
        className={`${style.btn} ${hideBg ? style.hideBg : ''} ${
          props.className
        }`}
      >
        <props.icon className={style.icon} />
        {label}
      </button>
    );
  } else if (label) {
    return (
      /* button with only label */
      <button
        {...props}
        className={`${style.btn} ${hideBg ? style.hideBg : ''} ${
          props.className
        }`}
      >
        {label}
      </button>
    );
  } else if (props.icon) {
    return (
      /* button with only icon */
      <button
        {...props}
        className={`${style.btn} ${hideBg ? style.hideBg : ''} ${style.round}`}
      >
        <props.icon className={style.icon} />
      </button>
    );
  } else {
    return (
      /* invalid button */
      <button
        {...props}
        className={`${style.btn} ${hideBg ? style.hideBg : ''} ${
          props.className
        }`}
      >
        Must have an icon or label
      </button>
    );
  }
}

export default Button;
