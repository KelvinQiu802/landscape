import { Checkbox, CheckboxProps } from '@mui/material';
import style from './CheckboxWithLabel.module.css';

export interface CheckboxWithLabel extends CheckboxProps {
  label: string;
}

function CheckboxWithLabel(props: CheckboxWithLabel) {
  return (
    <label className={style.box}>
      <div>
        <Checkbox {...props} />
      </div>
      <div className={style.label}>{props.label}</div>
    </label>
  );
}

export default CheckboxWithLabel;
