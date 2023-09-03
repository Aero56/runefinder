import './styles.scss';

export interface CloseButtonProps {
  onClick: () => void;
}

export const CloseButton = ({ onClick }: CloseButtonProps) => {
  return <button className="close-button" onClick={onClick}></button>;
};

export default CloseButton;
