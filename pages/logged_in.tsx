import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../utils/AuthUserContext";
import { Modal } from "../components/Modal";
import { MainContainer } from "../components/MainContainer";

import { Container, Row, Col, Button } from "reactstrap";

const LoggedIn = () => {
  const { authUser, loading, signOut } = useAuth();
  const router = useRouter();

  // Listen for changes on loading and authUser, redirect if needed
  useEffect(() => {
    if (!loading && !authUser) router.push("/");
  }, [authUser, loading]);

  const onClick = (event) => {
    console.log("Success. The user is created in firebase");
    router.push("/");
    event.preventDefault();
  };

  return (
    //Your logged in page
    <MainContainer>
      <Modal>
        <div className="min-w-400 max-w-400">
          <div className="mt-3 grid grid-cols-1 gap-2 justify-items-center">
            <img src="Vector.svg" className="self-center" />
            <h2 className="text-xl font-bold text-center text-black">
              You are all set!
            </h2>
            <p className="mt-2 text-xs text-gray-600 text-center">
              Thank you for signing up! You can use premium features.
            </p>
            <div className="block ">
              <div className="mt-2 min-w-full">
                <div>
                  <button
                    onClick={onClick}
                    className="min-w-400 text-gray-600 py-2 px-4  pl-10 pr-10 rounded-2xl outline-gray "
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </MainContainer>
  );
};

export default LoggedIn;
