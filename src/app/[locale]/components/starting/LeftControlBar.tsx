import React, { Dispatch, SetStateAction } from 'react';
import ButtonGroup from '../general/ButtonGroup';
import Button from '../general/Button';
import ImageIcon from '@mui/icons-material/Image';
import TimerIcon from '@mui/icons-material/Timer';
import SettingsIcon from '@mui/icons-material/Settings';

interface Props {
  selectedTag: number;
  setSelectedTag: Dispatch<SetStateAction<number>>;
}

function LeftControlBar({ selectedTag, setSelectedTag }: Props) {
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
