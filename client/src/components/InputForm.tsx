import { Path, UseFormRegister } from "react-hook-form";
import { LoginFormValues } from "../pages/Login/models";

interface InputFormProps {
  type: string;
  name: Path<LoginFormValues>;
  label: string;
  placeHolder: string;
  error: string | undefined;
  register: UseFormRegister<LoginFormValues>;
}

function InputForm({
  type,
  name,
  label,
  placeHolder,
  error,
  register,
}: InputFormProps) {
  return (
    <div>
      <label>
        {label}
        {error && <span className='text-red-500 ml-0.5'>*</span>}
      </label>
      <input type={type} placeholder={placeHolder} {...register(name)} />
      {error && <p>{error}</p>}
    </div>
  );
}
export default InputForm;
