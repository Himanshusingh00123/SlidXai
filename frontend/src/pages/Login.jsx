import React from "react";
import logoText from "../assets/logoText.png";
import logo from "../../public/Logo.png";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const googleAuth = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  const githubAuth = () => {
    window.location.href = "http://localhost:5000/auth/github";
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-blue-50 px-4 py-8">
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-xl shadow-gray-200/50 sm:p-8">
            {/* Logo */}
            <div className="mb-10 flex flex-col items-center">
              <div className="mb-5 flex items-center justify-center">
                <img
                  src={logo}
                  alt="Logo"
                  className="h-12 w-12 object-contain sm:h-14 sm:w-14"
                />

                <img
                  src={logoText}
                  alt="Logo"
                  className="-ml-4 w-32 object-contain sm:w-36"
                />
              </div>

              <h1 className="text-center text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Welcome back
              </h1>

              <p className="mt-2 text-center text-sm leading-6 text-gray-500">
                Sign in to your account to continue
              </p>
            </div>

            {/* Social Buttons */}
            <div className="space-y-4">
              {/* Google */}
              <button
                onClick={googleAuth}
                type="button"
                className="flex h-12 w-full cursor-pointer items-center justify-center rounded-xl border border-gray-200 bg-white px-4 text-sm font-semibold text-gray-700 shadow-sm transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-[0.98]"
              >
                <svg
                  viewBox="0 0 24 24"
                  height={22}
                  width={22}
                  xmlns="http://www.w3.org/2000/svg"
                  className="shrink-0"
                >
                  <path
                    d="M12,5c1.6167603,0,3.1012573,0.5535278,4.2863159,1.4740601l3.637146-3.4699707 C17.8087769,1.1399536,15.0406494,0,12,0C7.392395,0,3.3966675,2.5999146,1.3858032,6.4098511l4.0444336,3.1929321 C6.4099731,6.9193726,8.977478,5,12,5z"
                    fill="#F44336"
                  />

                  <path
                    d="M23.8960571,13.5018311C23.9585571,13.0101929,24,12.508667,24,12 c0-0.8578491-0.093689-1.6931763-0.2647705-2.5H12v5h6.4862061c-0.5247192,1.3637695-1.4589844,2.5177612-2.6481934,3.319458 l4.0594482,3.204834C22.0493774,19.135437,23.5219727,16.4903564,23.8960571,13.5018311z"
                    fill="#2196F3"
                  />

                  <path
                    d="M5,12c0-0.8434448,0.1568604-1.6483765,0.4302368-2.3972168L1.3858032,6.4098511 C0.5043335,8.0800171,0,9.9801636,0,12c0,1.9972534,0.4950562,3.8763428,1.3582153,5.532959l4.0495605-3.1970215 C5.1484375,13.6044312,5,12.8204346,5,12z"
                    fill="#FFC107"
                  />

                  <path
                    d="M12,19c-3.0455322,0-5.6295776-1.9484863-6.5922241-4.6640625L1.3582153,17.532959 C3.3592529,21.3734741,7.369812,24,12,24c3.027771,0,5.7887573-1.1248169,7.8974609-2.975708l-4.0594482-3.204834 C14.7412109,18.5588989,13.4284058,19,12,19z"
                    fill="#00B060"
                  />
                </svg>

                <span className="ml-3">Continue with Google</span>
              </button>

              {/* GitHub */}
              <button
                onClick={githubAuth}
                type="button"
                className="flex h-12 w-full cursor-pointer items-center justify-center rounded-xl border border-gray-200 bg-white px-4 text-sm font-semibold text-gray-700 shadow-sm transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-[0.98]"
              >
                <svg
                  viewBox="0 0 24 24"
                  height={22}
                  width={22}
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-gray-900"
                >
                  <path
                    fill="currentColor"
                    d="M12 0C5.373 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.385.6.113.82-.26.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.085 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.604-2.665-.303-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23A11.5 11.5 0 0 1 12 5.803c1.02.005 2.047.138 3.003.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.841 1.233 1.911 1.233 3.221 0 4.61-2.805 5.624-5.475 5.921.43.372.823 1.102.823 2.222v3.293c0 .32.216.694.825.576C20.565 21.796 24 17.299 24 12 24 5.373 18.627 0 12 0z"
                  />
                </svg>

                <span className="ml-3">Continue with GitHub</span>
              </button>
            </div>

            {/* Divider */}
            <div className="my-8 flex items-center">
              <div className="h-px flex-1 bg-gray-200" />

              <span className="px-4 text-xs font-medium uppercase tracking-wider text-gray-400">
                Secure sign in
              </span>

              <div className="h-px flex-1 bg-gray-200" />
            </div>

            {/* Security Message */}

            <div className="flex items-center justify-center gap-2">
              <svg
                className="h-4 w-4 text-green-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 22a10 10 0 100-20 10 10 0 000 20z"
                />
              </svg>

              <span className="text-xs font-medium text-gray-600">
                Your account is securely protected
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
