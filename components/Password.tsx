export default function Password() {
  return (
    <div className="flex">
      <div className="self-center bg-gradient-2 filter blur-huge px-20 py-16 mt-5 flex-grow"></div>
      <div className="flex flex-col flex-grow rounded-lg bg-white my-5 shadow bg-white">
        <div className="flex flex-col flex-grow rounded-lg bg-light-grey m-5">
          <div className="flex flex-col flex-grow m-5">
            <div className="flex flex-grow items-center">
              <p className="my-4 mx-auto text-base font-bold">
                Change Password
              </p>
            </div>
            <p className="my-2 text-gray-700">Current Password</p>
            <input
              type="password"
              className="p-2 rounded-lg drop-shadow-md border-2"
            ></input>
            <p className="my-2 text-gray-700">New Password</p>
            <input
              type="password"
              className="p-2 rounded-lg drop-shadow-md border-2"
            ></input>
            <p className="my-2 text-gray-700">Confirm New Password</p>
            <input
              type="password"
              className="p-2 rounded-lg drop-shadow-md border-2"
            ></input>
            <div className="flex">
              <div className="bg-button-blue text-white rounded-xl p-3 flex items-center space-x-2 mx-auto my-4">
                <p className="font-bold">Save Password</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="self-center bg-gradient-3 filter blur-huge px-20 py-10 mt-5 flex-grow"></div>
    </div>
  );
}
