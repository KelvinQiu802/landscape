import MediaButtons from '../general/MediaButtons';
import style from './TopBar.module.css';

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
