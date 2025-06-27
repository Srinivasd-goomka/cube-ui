import { isNotEmpty, useForm } from "@mantine/form";
import { useEffect } from "react";
import cubelogo from "../../../assets/logos/cube-full-logo-large.png";
import { CubeTextInput } from "../../../components/ui/text-input/CubeTextInput";
import { CubePasswordInput } from "../../../components/ui/password-input/CubePasswordInput";
import { Link } from "react-router-dom";
import Footer from "../../footer";
import { useAuthContext } from "../../../hooks/use-authContext";
import { Login } from "../../../types";
import Button from "../../../components/ui/button/Button";

function UserLogin() {
  const { login, isLoading } = useAuthContext();

  const form = useForm<Login>({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => {
        const notEmptyValidation = isNotEmpty("Email is required")(value);
        const emailValidation =
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value)
            ? null
            : "Invalid email address";

        return notEmptyValidation || emailValidation;
      },
      password: (value) => {
        const isNotEmptyValidation = isNotEmpty("Password is required")(value);
        const minLengthValidation =
          value.length >= 6 ? null : "Password must be at least 6 characters";

        return isNotEmptyValidation || minLengthValidation;
      },
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    await login(values);
  };

  useEffect(() => {
    document.title = "Login | Cube";
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F7FA]">
      <div className="flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
          <div className="cube-logo-colors-line rounded-t-md"></div>
          <div className="p-8">
            <div className="w-full flex justify-center">
              <img src={cubelogo} alt="cube" className="mb-6" width={105} />
            </div>

            <h2 className="text-md font-bold text-center mb-6 text-gray-800">
              Welcome Back to Cube!
              <br />
              Please login to your Cube account to continue
            </h2>

            <form onSubmit={form.onSubmit(handleSubmit)} className="space-y-6">
              <div>
                <CubeTextInput
                  label="Email"
                  name="email"
                  form={form}
                  withAsterisk
                />
              </div>

              <div>
                <CubePasswordInput
                  label="Password"
                  name="password"
                  form={form}
                  withAsterisk
                />
              </div>

              <div className="flex items-center justify-end">
                <Link
                  to="/forgot-password"
                  className="text-sm text-blue-500 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              {/* <button
                type="submit"
                disabled={isLoading}
                className={cn(
                  "w-full h-10 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center",
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                )}
              >
                {isLoading ? <ButtonLoader /> : <span>Sign In</span>}
              </button> */}
              <Button
                type="submit"
                variant="primary"
                label="Sign In"
                isLoading={isLoading}
                disabled={isLoading}
                className="w-full h-10"
              />
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default UserLogin;
