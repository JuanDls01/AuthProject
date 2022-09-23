interface BttnProps {
  type: string;
  value?: string;
}

const SubmitFormBttn = ({ type, value }: BttnProps) => {
  return <input type={type} value={value} />;
};

export default SubmitFormBttn;
