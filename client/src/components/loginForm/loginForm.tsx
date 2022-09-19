import { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup'
import { useForm, SubmitHandler } from 'react-hook-form';

import { useAppDispatch } from '../../redux/hooks';
import { createUser } from '../../redux/states/user';
import { getUser } from '../../services';

import InputLogin from './ui/inputLogin';
import SubmitBttn from './ui/SubmitBttn';


export interface LoginFormValues {
  email: string
  password: string
}

const validationSchema = Yup.object().shape({
  email: Yup.string().required('Required').email('Invalid email'),
  password: Yup.string().required('Required').min(6, 'Must be at least 6 characters')
})

function LoginForm(): JSX.Element {
  const dispatch = useAppDispatch();

  // react-hook-form
  const { 
    register,
    handleSubmit, 
    reset, 
    formState, 
    formState: {errors, isSubmitSuccessful}
  } = useForm<LoginFormValues>({
    mode: 'onBlur', 
    resolver: yupResolver(validationSchema),
  })

  // Login submit
  const login: SubmitHandler<LoginFormValues> = async (data) => {
    try {
      console.log('loginerror')
      const result = await getUser(data)
      dispatch(createUser(result))
    } catch (error) {
      console.log(error)
    }
  }

  // Reset Form
  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({
        email: '',
        password: '',
      }); 
    };
  }, [formState.isSubmitSuccessful, reset])

  const onSubmit: SubmitHandler<LoginFormValues> = data => console.log(data);

  return (
    <div>
      <form onSubmit={handleSubmit(login)}>
        <InputLogin 
          type='email'
          name='email'
          label='Email'
          placeHolder='juanignaciodelossantos01@gmail.com'
          error={errors?.email && errors.email.message}
          register={register}
        />
        <InputLogin 
          type='password'
          name='password'
          label='Password'
          placeHolder=''
          error={errors?.password && errors.password.message}
          register={register}
        />
        <SubmitBttn type='submit'/>
      </form>
    </div>
  )
}

export default LoginForm;