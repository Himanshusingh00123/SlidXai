import { use, useEffect } from "react";

const Dashboard = () => {
  const fetchProfile = async () => {
    const response = await fetch("http://localhost:5000/auth/get-me", {
      mehtod: "GET",
      credentials: "include",
    });

    const data = await response.json();
    console.log(data.user);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="mx-auto max-w-4xl">
        {/* Profile Header */}
        <div className="overflow-hidden rounded-2xl bg-white shadow">
          {/* Cover */}
          <div className="h-40 bg-linear-to-r from-blue-500 to-purple-600"></div>

          {/* Profile Info */}
          <div className="px-6 pb-6">
            <div className="-mt-16 flex flex-col items-center sm:flex-row sm:items-end sm:gap-6">
              <img
                src="/images/profile.jpg"
                alt="Profile"
                className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-md"
              />

              <div className="mt-4 flex-1 text-center sm:text-left">
                <h1 className="text-2xl font-bold text-gray-900">Your Name</h1>

                <p className="text-gray-500">Full Stack Developer</p>

                <p className="mt-1 text-sm text-gray-400">Lucknow, India</p>
              </div>

              <button className="mt-4 rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 sm:mt-0">
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {/* About */}
          <div className="rounded-2xl bg-white p-6 shadow md:col-span-2">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              About Me
            </h2>

            <p className="leading-7 text-gray-600">
              Hi, I'm Your Name. I'm a passionate developer who enjoys building
              modern web applications using React, JavaScript, and other web
              technologies.
            </p>
          </div>

          {/* Stats */}
          <div className="rounded-2xl bg-white p-6 shadow">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">Stats</h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-500">Projects</span>
                <span className="font-semibold">24</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Followers</span>
                <span className="font-semibold">1.2K</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Following</span>
                <span className="font-semibold">320</span>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="rounded-2xl bg-white p-6 shadow md:col-span-3">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">Skills</h2>

            <div className="flex flex-wrap gap-3">
              <span className="rounded-full bg-blue-100 px-4 py-2 text-sm text-blue-700">
                React
              </span>

              <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm text-yellow-700">
                JavaScript
              </span>

              <span className="rounded-full bg-green-100 px-4 py-2 text-sm text-green-700">
                Node.js
              </span>

              <span className="rounded-full bg-purple-100 px-4 py-2 text-sm text-purple-700">
                Tailwind CSS
              </span>

              <span className="rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-700">
                Git
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
