import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "@headlessui/react";
import Icon from "@mdi/react";
import { mdiArrowLeft, mdiCheckBold } from "@mdi/js";

import InputField from "../ui/InputField";
import LogoIcon from "../ui/LogoIcon";
import Title from "../ui/Title";
import Button from "../ui/Button";
import MdiIcon from "../ui/MdiIcon";
import Spinner from "../ui/Spinner";

import { useSignup } from "../hooks/auth/useSignup";
import { useLogin } from "../hooks/auth/useLogin";

const inputFields = [
  {
    name: "email",
    label: "E-mail adress",
    type: "email",
    validation: {
      required: "Email is required",
      pattern: { value: /\S+@\S+\.\S+/, message: "Enter a valid email" },
    },
  },
  {
    name: "username",
    label: "Username",
    type: "text",
    validation: {
      required: "Name is required",
      minLength: {
        value: 6,
        message: "Username must be at least 6 characters",
      },
    },
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    validation: {
      required: "Password is required",
      minLength: {
        value: 6,
        message: "Password must be at least 6 characters",
      },
    },
  },
];

function Signup() {
  const { signup, isPending: isSignupPending } = useSignup();
  const { login, isPending: isLoginPending } = useLogin();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      check: false,
    },
  });

  function onSubmit(data) {
    signup(data, {
      onSuccess: () => {
        login(
          { email: data.email, password: data.password },
          {
            onSuccess: () => {
              reset();
            },
          },
        );
      },
    });
  }

  return (
    <div className="fixed inset-0 z-10000 flex items-center justify-center p-2 backdrop-blur-xs">
      <form
        className="bg-grey-tertiary border-grey-secondary grid-rows-[1fr, min-content] relative m-3 grid w-130 gap-6 rounded-lg border-1 pt-14"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-2.5 px-12">
          <span className="absolute top-3 left-3">
            <MdiIcon onClick={() => navigate("/")} path={mdiArrowLeft} />
          </span>

          <Title
            level={1}
            className="text-grey-primary-light flex items-center gap-1.5"
          >
            Join
            <span className="flex items-center">
              <LogoIcon />
              list&watch
            </span>
          </Title>
          {inputFields.map(({ name, label, type, validation }) => (
            <InputField
              key={label}
              type={type}
              label={label}
              {...register(name, validation)}
              error={errors[name] && errors[name]?.message}
              disabled={isSignupPending || isLoginPending}
            />
          ))}

          <Controller
            name="check"
            control={control}
            rules={{ required: "You must accept the terms" }}
            render={({ field: { value, onChange } }) => (
              <div className="mt-1 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    disabled={isSignupPending || isLoginPending}
                    checked={value}
                    onChange={onChange}
                    className="group bg-text-default flex size-5 cursor-pointer items-center justify-center rounded-sm opacity-50 duration-300 data-[checked]:opacity-100"
                  >
                    <span className="opactiy-0">
                      <Icon
                        path={mdiCheckBold}
                        size={0.9}
                        className="text-grey-secondary opacity-0 group-data-[checked]:opacity-100"
                      />
                    </span>
                  </Checkbox>

                  <div className="flex flex-col">
                    <label className="text-grey-primary-light text-xs">
                      I'm at least 16 years old.
                    </label>
                    {errors["check"] && (
                      <span className="text-text-default text-xs">
                        {errors["check"]?.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}
          />
          <div className="flex gap-2">
            <Button className="mt-1 self-start">Sign up</Button>
            {isLoginPending || isSignupPending ? <Spinner /> : null}
          </div>
        </div>
        <div className="border-grey-primary flex gap-1 border-t-1 px-9 py-4">
          <p className="text-grey-primary-light text-sm">
            Already have an account?
          </p>
          <span
            className="text-primary cursor-pointer text-sm duration-300"
            onClick={() => navigate("/login")}
          >
            Log in
          </span>
        </div>
      </form>
    </div>
  );
}

export default Signup;
