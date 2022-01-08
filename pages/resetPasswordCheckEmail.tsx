import { useRouter } from "next/router";
import { Modal } from "../components/Modal";
import { MainContainer } from "../components/MainContainer";

const ResetPasswordCheckEmail = () => {
  const router = useRouter();

  const onClose = (event) => {
    router.push("/");
    event.preventDefault();
  };

  return (
    //Your logged in page
    <MainContainer>
      <Modal>
        <div>
          <div className="mt-3 grid grid-cols-1 gap-2 justify-items-center">
            <img src="Vector.svg" className="self-center" />
            <h2 className="text-xl font-bold text-center text-black">
              Check your mail!
            </h2>
            <p className="mt-2 text-xs text-gray-600 text-center">
              Email with instructions to reset your password sent successfully.
              Please check your spam account in case you don’t see the account
              recovery email.
            </p>
            <div className="block ">
              <div className="mt-2 min-w-full">
                <div>
                  <button
                    onClick={onClose}
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

export default ResetPasswordCheckEmail;
