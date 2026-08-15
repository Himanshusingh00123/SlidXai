import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const googleAuth = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  const githubAuth = () => {
    window.location.href = "http://localhost:5000/auth/github";
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-white font-sans text-neutral-950 antialiased lg:flex-row">
      {/* LEFT SIDE */}
      <div className="relative flex min-h-105 w-full flex-col justify-between overflow-hidden p-6 sm:p-8 md:p-12 lg:min-h-screen lg:w-1/2">
        {/* Background */}
        <img
          src="https://assets.watermelon.sh/auth-9.avif"
          alt="Abstract blue background"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/10" />

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between">
          <span className="text-lg font-semibold tracking-tight text-white md:text-xl">
            SlidXai
          </span>

          <Link
            to="/"
            className="flex items-center gap-2 text-xs font-medium text-white/90 transition hover:text-white sm:text-sm md:text-base"
          >
            <span className="text-xl">←</span>
            Back to Website
          </Link>
        </div>

        {/* Content */}
        <div className="relative z-10 mt-16 animate-[fadeUp_.6s_ease-out_both] lg:mt-0">
          <h1 className="mb-4 max-w-xl text-4xl font-medium leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Turn Your Ideas Into
            <br />
            Stunning Slides.
          </h1>

          <p className="max-w-md text-base leading-relaxed text-white/90 sm:text-lg">
            SlidXai uses AI to help you create, refine, and present beautiful
            presentations in less time.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}

      <div className="flex w-full items-center justify-center bg-linear-to-br from-slate-50 via-white to-blue-50 px-4 py-8 sm:px-6 sm:py-10 md:px-10 lg:min-h-screen lg:w-1/2 lg:px-12 lg:py-12">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="relative overflow-hidden rounded-3xl border border-gray-200/80 bg-white p-6 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.15)] sm:p-8">
            {/* Top decorative gradient */}

            {/* Header */}
            <div className="mb-8 flex flex-col items-center">
              {/* Logo */}

              <h1 className="text-center text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Welcome back
              </h1>

              <p className="mt-2 max-w-xs text-center text-sm leading-6 text-gray-500">
                Sign in to your account to continue
              </p>
            </div>

            {/* Social Buttons */}
            <div className="space-y-3">
              {/* Google */}
              <button
                onClick={googleAuth}
                type="button"
                className="group flex h-12 w-full cursor-pointer items-center justify-center rounded-xl border border-gray-200 bg-white px-4 text-sm font-semibold text-gray-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-300 hover:bg-gray-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:translate-y-0 active:scale-[0.98]"
              >
                <svg
                  viewBox="0 0 24 24"
                  height="21"
                  width="21"
                  xmlns="http://www.w3.org/2000/svg"
                  className="shrink-0"
                >
                  <path
                    d="M12,5c1.6167603,0,3.1012573,0.5535278,4.2863159,1.4740601l3.637146-3.4699707C17.8087769,1.1399536,15.0406494,0,12,0C7.392395,0,3.3966675,2.5999146,1.3858032,6.4098511l4.0444336,3.1929321C6.4099731,6.9193726,8.977478,5,12,5z"
                    fill="#F44336"
                  />

                  <path
                    d="M23.8960571,13.5018311C23.9585571,13.0101929,24,12.508667,24,12c0-.8578491-.093689-1.6931763-.2647705-2.5H12v5h6.4862061c-.5247192,1.3637695-1.4589844,2.5177612-2.6481934,3.319458l4.0594482,3.204834C22.0493774,19.135437,23.5219727,16.4903564,23.8960571,13.5018311z"
                    fill="#2196F3"
                  />

                  <path
                    d="M5,12c0-.8434448.1568604-1.6483765.4302368-2.3972168L1.3858032,6.4098511C.5043335,8.0800171,0,9.9801636,0,12c0,1.9972534.4950562,3.8763428,1.3582153,5.532959l4.0495605-3.1970215C5.1484375,13.6044312,5,12.8204346,5,12z"
                    fill="#FFC107"
                  />

                  <path
                    d="M12,19c-3.0455322,0-5.6295776-1.9484863-6.5922241-4.6640625L1.3582153,17.532959C3.3592529,21.3734741,7.369812,24,12,24c3.027771,0,5.7887573-1.1248169,7.8974609-2.975708l-4.0594482-3.204834C14.7412109,18.5588989,13.4284058,19,12,19z"
                    fill="#00B060"
                  />
                </svg>

                <span className="ml-3">Continue with Google</span>
              </button>

              {/* GitHub */}
              <button
                onClick={githubAuth}
                type="button"
                className="group flex h-12 w-full cursor-pointer items-center justify-center rounded-xl border border-gray-200 bg-white px-4 text-sm font-semibold text-gray-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-300 hover:bg-gray-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:translate-y-0 active:scale-[0.98]"
              >
                <svg
                  viewBox="0 0 24 24"
                  height="21"
                  width="21"
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
            <div className="my-7 flex items-center">
              <div className="h-px flex-1 bg-gray-200" />

              <span className="px-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-400">
                Secure sign in
              </span>

              <div className="h-px flex-1 bg-gray-200" />
            </div>

            {/* Security Message */}
            <div className="rounded-xl border border-green-100 bg-green-50/70 px-4 py-3">
              <div className="flex items-center justify-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                  <svg
                    className="h-3.5 w-3.5 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
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
                </div>

                <span className="text-xs font-medium text-green-700">
                  Your account is securely protected
                </span>
              </div>
            </div>

            {/* Footer */}
            <p className="mt-6 text-center text-xs leading-5 text-gray-400">
              By continuing, you agree to our{" "}
              <a
                href="#"
                className="font-medium text-gray-600 hover:text-gray-900 hover:underline"
              >
                Terms
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="font-medium text-gray-600 hover:text-gray-900 hover:underline"
              >
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

/* Google Icon */
function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="19" height="19" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />

      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.16v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />

      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.16C1.43 8.55 1 10.22 1 12s.43 3.45 1.16 4.93l3.68-2.84z"
        fill="#FBBC05"
      />

      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.16 7.07l3.68 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

export default Login;
