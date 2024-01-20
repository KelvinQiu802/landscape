import React from 'react';
import ButtonGroup, { ButtonGroupProps } from './ButtonGroup';
import Button from './Button';
import GitHubIcon from '@mui/icons-material/GitHub';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface MediaButtonProps extends ButtonGroupProps {}

function MediaButtons(props: MediaButtonProps) {
  return (
    <ButtonGroup {...props}>
      <Button icon={GitHubIcon} />
      <Button icon={FavoriteIcon} />
    </ButtonGroup>
  );
}

export default MediaButtons;
