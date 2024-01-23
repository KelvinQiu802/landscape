import { Input, InputProps } from '@mui/material';
import style from './InputWithLabel.module.css';

export interface InputWithLabelProps extends InputProps {
  label: string;
  width: number;
}

function InputWithLabel(props: InputWithLabelProps) {
  return (
    <div>
      <label>
        <div className={style.label}>{props.label}</div>
        <Input {...props} disableUnderline sx={{ width: props.width }} />
      </label>
    </div>
  );
}

export default InputWithLabel;
