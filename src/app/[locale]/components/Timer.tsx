import React from 'react';
import Button from './general/Button';
import Add from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';
import style from './Timer.module.css';

interface Props {
  time: number;
}

function Timer() {
  return (
    <>
      <Button icon={Remove} />
      <h1 className={style.time}>25:00</h1>
      <Button icon={Add} />
    </>
  );
}

export default Timer;
