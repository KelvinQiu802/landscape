import FavoriteIcon from '@mui/icons-material/Favorite';
import GitHubIcon from '@mui/icons-material/GitHub';
import Button from './Button';
import ButtonGroup, { ButtonGroupProps } from './ButtonGroup';

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
