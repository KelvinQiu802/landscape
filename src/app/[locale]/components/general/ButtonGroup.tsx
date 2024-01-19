import { ReactNode } from 'react';
import style from './ButtonGroup.module.css';
import Window from './Window';

interface Props {
  children: ReactNode;
}

function ButtonGroup({ children }: Props) {
  return <Window className={style.group}>{children}</Window>;
}

export default ButtonGroup;
