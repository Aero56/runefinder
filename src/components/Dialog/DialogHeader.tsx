interface DialogHeaderProps {
  title: string;
}

const DialogHeader = ({ title }: DialogHeaderProps) => {
  return <h3 className="mb-4 text-xl font-bold">{title}</h3>;
};

export default DialogHeader;
