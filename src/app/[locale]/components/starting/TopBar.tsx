import React from 'react';
import style from './TopBar.module.css';
import MediaButtons from '../general/MediaButtons';

export interface TopBarProps {
  appName: string;
}

function TopBar({ appName }: TopBarProps) {
  return (
    <div className={style.topBar}>
      <div className="window-title">{appName}</div>
      <MediaButtons hideBackground style={{ padding: 0 }} />
    </div>
  );
}

export default TopBar;
