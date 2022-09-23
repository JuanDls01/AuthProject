interface Props {
  children: React.ReactNode;
}

const Title = ({ children }: Props) => {
  return <h1 className="font-['Poppins'] text-blue-400">{children}</h1>;
};
export default Title;
