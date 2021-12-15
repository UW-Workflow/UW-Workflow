import { useAuth } from "../utils/AuthUserContext";

export default function Profile() {
  const { authUser, signOut } = useAuth();
  return (
    <div className="flex">
      <div className="self-center bg-gradient-2 filter blur-huge px-20 py-16 mt-5 flex-grow"></div>
      <div className="flex flex-col rounded-lg bg-white mb-5 shadow bg-white">
        <div className="flex flex-grow m-5">
          <div className="rounded-lg shadow flex-grow">
            <div className="flex flex-row">
              <div className="mr-10 ml-3 my-5">
                <img src="default_profile.jpg" />
              </div>
              <div className="flex flex-col my-5 mx-5">
                <p>John Doe</p>
                <p>PNG or JPG no bigger than 1000px wide and tall.</p>
              </div>
              <div className="px-10 bg-light-button-blue flex flex-row rounded-lg ml-auto mr-2 my-5 flex-row">
                <div className="my-auto mr-4">
                  <img src="upload.svg"></img>
                </div>
                <div className="my-auto">
                  <p className="text-blue-text">Upload</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {authUser && (
          <div>
            <div className="flex flex-grow items-center mt-2">
              <p className="mb-4 ml-10 text-base font-bold">
                Account Information
              </p>
            </div>
            {/* <p className="ml-10">First Name</p>
            <input
              type="input"
              placeholder="John"
              className="p-3 rounded-lg drop-shadow-md border-2 mx-10 my-2"
            ></input>
            <p className="ml-10">Last Name</p>
            <input
              type="input"
              placeholder="Doe"
              className="p-3 rounded-lg drop-shadow-md border-2 mx-10 my-2"
            ></input> */}
            <p className="ml-10">Email</p>
            <p className="p-3 rounded-lg drop-shadow-md mx-10 my-2">
              {authUser.email}
            </p>

            {/* <div className="flex flex-row-reverse">
              <div className="bg-button-blue text-white rounded-xl p-3 flex items-center space-x-2 mx-10 my-4">
                <p className="font-bold">Save Changes</p>
              </div>
            </div> */}
          </div>
        )}
      </div>
      <div className="self-center bg-gradient-3 filter blur-huge px-20 py-10 mt-5 flex-grow"></div>
    </div>
  );
}
