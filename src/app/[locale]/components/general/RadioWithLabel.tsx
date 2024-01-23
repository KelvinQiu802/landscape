import { CheckboxProps, Radio } from '@mui/material';
import { forwardRef } from 'react';
import style from './RadioWithLabel.module.css';

export interface RadioWithLabelProps extends CheckboxProps {
  label: string;
}

const RadioWithLabel = forwardRef(function RadioWithLabel(
  props: RadioWithLabelProps,
  ref
) {
  return (
    <label className={style.box}>
      <div>
        <Radio ref={ref as any} {...props} />
      </div>
      <div className={style.label}>{props.label}</div>
    </label>
  );
});

export default RadioWithLabel;
