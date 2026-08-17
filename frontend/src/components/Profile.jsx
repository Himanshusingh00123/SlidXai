const Profile = ({ user }) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="product-card w-105 h-8/12 rounded-md shadow-xl overflow-hidden z-100 relative cursor-pointer snap-start shrink-0 py-8 px-6 bg-white flex flex-col items-center justify-center gap-3 transition-all duration-300 group">
        <div className="absolute left-[-40%] top-0 group-hover:rotate-12 transition-all duration-300 group-hover:scale-150">
          <div className="flex gap-1">
            <svg
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth={1}
              fill="none"
              viewBox="0 0 24 24"
              className="fill-gray-300 rotate-24"
              height={200}
              width={200}
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </div>
        </div>
        <div className="absolute rounded-full bg-gray-500 z-20 left-1/2 top-[44%] h-[110%] w-[110%] -translate-x-1/2 group-hover:top-[58%] transition-all duration-300" />
        <div className="para uppercase text-center leading-none z-40">
          <p className="font-bold text-xl tracking-wider text-gray-500">
            Profile
          </p>
        </div>
        <div className="img w-45 rounded-full border-3 border-amber-500 p-1 z-40 ">
          <img
            src={user?.profileImg}
            alt="ProfileImg"
            className="h-full w-full rounded-full"
          />
        </div>
        <div className="btm-_container z-40 flex flex-row justify-between items-end gap-10">
          <div className="flex flex-col items-start gap-1">
            <div className="inline-flex gap-3 items-center justify-center">
              <div className="p-1 bg-white flex items-center justify-center rounded-full">
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 fill-gray-800"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" />
                </svg>
              </div>
              <p className="font-semibold text-xs text-white">{user?.name}</p>
            </div>
            <div className="flex flex-row gap-2">
              <div className="inline-flex gap-3 items-center justify-center">
                <div className="p-1 bg-white flex items-center justify-center rounded-full">
                  <svg
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth={1}
                    fill="none"
                    viewBox="0 0 24 24"
                    className="fill-gray-800 h-3 w-3 stroke-white"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <p className="font-semibold text-xs text-white">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>
          <div className="btn">
            <button className="uppercase font-semibold text-xs px-2 whitespace-nowrap py-1 rounded-full bg-white text-gray-800">
              Create Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
