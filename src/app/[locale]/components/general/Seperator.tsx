import style from './Seperator.module.css';

interface Props {
  width: string;
}

function Seperator({ width }: Props) {
  return <div className={style.seperator} style={{ width: width }}></div>;
}

export default Seperator;
