'use client';

import FavoriteIcon from '@mui/icons-material/Favorite';
import GitHubIcon from '@mui/icons-material/GitHub';
import Link from 'next/link';
import Button from './Button';
import ButtonGroup, { ButtonGroupProps } from './ButtonGroup';

interface MediaButtonProps extends ButtonGroupProps {}

function MediaButtons(props: MediaButtonProps) {
  return (
    <ButtonGroup {...props}>
      <Link href="https://github.com/kelvinqiu802/landscape" target="_blank">
        <Button icon={GitHubIcon} />
      </Link>
      <Link href="https://github.com/kelvinqiu802/landscape" target="_blank">
        <Button icon={FavoriteIcon} />
      </Link>
    </ButtonGroup>
  );
}

export default MediaButtons;
