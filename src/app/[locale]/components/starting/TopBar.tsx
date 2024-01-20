import React from 'react';
import ButtonGroup from '../general/ButtonGroup';
import Button from '../general/Button';
import style from './TopBar.module.css';
import GitHubIcon from '@mui/icons-material/GitHub';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface Props {
  appName: string;
}

function TopBar({ appName }: Props) {
  return (
    <div className={style.topBar}>
      <div className="window-title">{appName}</div>
      <ButtonGroup hideBackground style={{ padding: 0 }}>
        <Button icon={GitHubIcon} />
        <Button icon={FavoriteIcon} />
      </ButtonGroup>
    </div>
  );
}

export default TopBar;
