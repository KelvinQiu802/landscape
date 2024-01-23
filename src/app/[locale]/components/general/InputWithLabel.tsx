import { Input, InputProps } from '@mui/material';
import { forwardRef } from 'react';
import style from './InputWithLabel.module.css';

export interface InputWithLabelProps extends InputProps {
  label: string;
  width: number;
}

const InputWithLabel = forwardRef(function InputWithLabel(
  props: InputWithLabelProps,
  ref
) {
  return (
    <div>
      <label>
        <div className={style.label}>{props.label}</div>
        <Input
          {...props}
          disableUnderline
          sx={{ width: props.width }}
          ref={ref}
        />
      </label>
    </div>
  );
});

export default InputWithLabel;
