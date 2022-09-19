import { Path, UseFormRegister } from 'react-hook-form';
import { LoginFormValues } from '../LoginForm';

interface InputProps {
    type: string,
    name: Path<LoginFormValues>,
    label: string,
    placeHolder: string,
    error: string | undefined,
    register: UseFormRegister<LoginFormValues>, 
}

function InputLogin({ type, name, label, placeHolder, error, register }: InputProps) {
  return (
    <div>
        <label>{label}{error && <span className="text-red-500 ml-0.5">*</span>}</label>
        <input 
            type={type} 
            placeholder={placeHolder}
            {...register(name)}
        />
        {error && <p>{error}</p>}
    </div>
  )
}
export default InputLogin