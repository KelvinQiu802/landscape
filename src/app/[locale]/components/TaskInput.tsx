import React, { Dispatch, SetStateAction } from 'react';
import TransparentInput from './general/TransparentInput';
import style from './TaskInput.module.css';

interface Props {
  task: string;
  setTask: Dispatch<SetStateAction<string>>;
  defaultTask: string;
}

function TaskInput({ task, setTask, defaultTask }: Props) {
  return (
    <TransparentInput
      type="text"
      fullWidth
      className={style.taskInput}
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
