import React, { HTMLAttributes, ReactNode } from 'react';
import style from './Window.module.css';

interface Props extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

function Window(props: Props) {
  return (
    <div {...props} className={`${style.window} ${props.className}`}>
      {props.children}
    </div>
  );
}

export default Window;
