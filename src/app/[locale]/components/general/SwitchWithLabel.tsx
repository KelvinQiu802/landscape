import { Switch, SwitchProps } from '@mui/material';
import style from './SwithWithLabel.module.css';

export interface SwitchWithLabelProps extends SwitchProps {
  label: string;
}

function SwitchWithLabel(props: SwitchWithLabelProps) {
  return (
    <div>
      <label className={style.box}>
        <Switch {...props} />
        <div className={style.label}>{props.label}</div>
      </label>
    </div>
  );
}

export default SwitchWithLabel;
