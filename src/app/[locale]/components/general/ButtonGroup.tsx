import { HTMLAttributes } from 'react';
import style from './ButtonGroup.module.css';
import Window from './Window';

export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  hideBackground?: boolean;
  vertical?: boolean;
}

function ButtonGroup({
  children,
  hideBackground,
  vertical,
  ...props
}: ButtonGroupProps) {
  return (
    <Window
      {...props}
      className={`${style.group} ${vertical ? style.vertical : ''} ${
        hideBackground ? style.hideBg : ''
      } ${props.className}`}
    >
      {children}
    </Window>
  );
}

export default ButtonGroup;
