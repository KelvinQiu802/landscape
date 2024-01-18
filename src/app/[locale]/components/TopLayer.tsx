import style from './TopLayer.module.css';
import Window from './general/Window';

interface Props {
  'window-title': string;
}

async function TopLayer(props: Props) {
  return (
    <div className={style.top}>
      <Window className={style.mainWindow}>
        <div className="window-title">{props['window-title']}</div>
      </Window>
    </div>
  );
}

export default TopLayer;
