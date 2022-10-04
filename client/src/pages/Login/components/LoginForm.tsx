import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { useAppDispatch } from "../../../redux/hooks";
import { createUser } from "../../../redux/states/user";
import { getUserInfoWithJWT, loginUser } from "../../../services";

import { InputForm, SubmitFormBttn } from "../../../components";

import { LocalStorageKey, PrivateRoutes, Tokens } from "../../../models";
import { LoginFormValues } from "../models";
import { clearLocalStorage, persistLocalStorage } from "../../../utilities";
import { useAuthContext } from "../../../context/AuthProvider.context";
import { useDispatch } from "react-redux";

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Required").email("Invalid email"),
  password: Yup.string()
    .required("Required")
    .min(6, "Must be at least 6 characters"),
});

function LoginForm(): JSX.Element {
  const { setAccess } = useAuthContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { errors, isSubmitSuccessful },
  } = useForm<LoginFormValues>({
    mode: "onBlur",
    resolver: yupResolver(validationSchema),
  });

  // Login submit
  const login: SubmitHandler<LoginFormValues> = async (data) => {
    try {
      const result: Tokens = await loginUser(data);
      console.log("Me trajo los tokens", result);
      // Guardo el access token en context:
      result.access && setAccess(result.access);

      // Guardo el refresh token en localStorage:
      console.log(result.refresh);
      result.refresh &&
        persistLocalStorage(LocalStorageKey.REFRESH_TOKEN, result.refresh);

      console.log("guarde los tokens");
      getUserInfoWithJWT(result.access).then((user) => {
        dispatch(createUser(user));
        navigate(`/`, { replace: true });
      });
    } catch (error) {
      console.log(error);
    }
  };

  // clear localStorage
  useEffect(() => {
    clearLocalStorage(LocalStorageKey.REFRESH_TOKEN);
  }, []);

  // Reset Form
  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({
        email: "",
        password: "",
      });
    }
  }, [formState.isSubmitSuccessful, reset]);

  return (
    <div>
      <form onSubmit={handleSubmit(login)}>
        <InputForm
          type='email'
          name='email'
          label='Email'
          placeHolder='juanignaciodelossantos01@gmail.com'
          error={errors?.email && errors.email.message}
          register={register}
        />
        <InputForm
          type='password'
          name='password'
          label='Password'
          placeHolder=''
          error={errors?.password && errors.password.message}
          register={register}
        />
        <SubmitFormBttn type='submit' />
      </form>
    </div>
  );
}

export default LoginForm;
