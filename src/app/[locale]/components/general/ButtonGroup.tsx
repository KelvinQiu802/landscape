import { HTMLAttributes, ReactNode } from 'react';
import style from './ButtonGroup.module.css';
import Window from './Window';

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hideBackground?: boolean;
}

function ButtonGroup({ children, hideBackground, ...props }: Props) {
  return (
    <Window
      {...props}
      className={`${style.group} ${hideBackground ? style.hideBg : ''} ${
        props.className
      }`}
    >
      {children}
    </Window>
  );
}

export default ButtonGroup;
