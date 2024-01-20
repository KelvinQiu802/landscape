import ImageIcon from '@mui/icons-material/Image';
import SettingsIcon from '@mui/icons-material/Settings';
import TimerIcon from '@mui/icons-material/Timer';
import { Dispatch, SetStateAction } from 'react';
import Button from '../general/Button';
import ButtonGroup from '../general/ButtonGroup';

export interface LeftControlBarProps {
  selectedTag: number;
  setSelectedTag: Dispatch<SetStateAction<number>>;
}

function LeftControlBar({ selectedTag, setSelectedTag }: LeftControlBarProps) {
  return (
    <ButtonGroup vertical>
      <Button
        icon={TimerIcon}
        hideBg={selectedTag != 0}
        onClick={() => setSelectedTag(0)}
      />
      <Button
        icon={ImageIcon}
        hideBg={selectedTag != 1}
        onClick={() => setSelectedTag(1)}
      />
      <Button
        icon={SettingsIcon}
        hideBg={selectedTag != 2}
        onClick={() => setSelectedTag(2)}
      />
    </ButtonGroup>
  );
}

export default LeftControlBar;
