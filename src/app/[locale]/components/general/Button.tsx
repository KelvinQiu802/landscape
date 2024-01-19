import { ButtonHTMLAttributes, FC } from 'react';
import style from './Button.module.css';
import { SvgIconProps } from '@mui/material/SvgIcon';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  icon?: FC<SvgIconProps>;
}

function Button(props: Props) {
  if (props.label && props.icon) {
    return (
      /* button with label and icon */
      <button {...props} className={`${style.btn} ${props.className}`}>
        <props.icon className={style.icon} />
        {props.label}
      </button>
    );
  } else if (props.label) {
    return (
      /* button with only label */
      <button {...props} className={`${style.btn} ${props.className}`}>
        {props.label}
      </button>
    );
  } else if (props.icon) {
    return (
      /* button with only icon */
      <button {...props} className={`${style.btn} ${style.round}`}>
        <props.icon className={style.icon} />
      </button>
    );
  } else {
    return (
      /* invalid button */
      <button {...props} className={`${style.btn} ${props.className}`}>
        Must have an icon or label
      </button>
    );
  }
}

export default Button;
