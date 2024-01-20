import { Dispatch, InputHTMLAttributes, SetStateAction } from 'react';
import style from './TaskInput.module.css';
import TransparentInput from './general/TransparentInput';

export interface TaskInputProps extends InputHTMLAttributes<HTMLInputElement> {
  task: string;
  setTask: Dispatch<SetStateAction<string>>;
  defaultTask: string;
}

function TaskInput({ task, setTask, defaultTask, ...props }: TaskInputProps) {
  return (
    <TransparentInput
      type="text"
      fullWidth
      className={`${style.taskInput} ${props.className}`}
      value={task}
      onBlur={() => {
        if (task == '') setTask(defaultTask);
      }}
      onFocus={() => {
        if (task == defaultTask) setTask('');
      }}
      onChange={(e) => {
        setTask(e.currentTarget.value);
      }}
    />
  );
}

export default TaskInput;
