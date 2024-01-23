import { Switch, SwitchProps } from '@mui/material';
import { forwardRef } from 'react';
import style from './SwithWithLabel.module.css';

export interface SwitchWithLabelProps extends SwitchProps {
  label: string;
}

const SwitchWithLabel = forwardRef(function SwitchWithLabel(
  props: SwitchWithLabelProps,
  ref
) {
  return (
    <div>
      <label className={style.box}>
        <Switch {...props} ref={ref as any} />
        <div className={style.label}>{props.label}</div>
      </label>
    </div>
  );
});

export default SwitchWithLabel;
