import axios from "axios";

export function validateEmail(email: string) {
  const regex = new RegExp("^[A-Za-z0-9._%+-]+@uwaterloo.ca$");
  return regex.test(email);
}

export async function updateDBIsVerified(authUser) {
  try {
    const userResponse = await axios.get("/api/user/getUser", {
      params: {
        email: authUser.email,
      },
    });
    if (userResponse.data.users) {
      if (userResponse.data.users[0].is_verified != authUser.emailVerified) {
        try {
          const response = await axios.post(`/api/user/updateUserVerified`, {
            email: userResponse.data.users[0].email,
            is_verified: authUser.emailVerified,
          });
          console.log("Updtaed user verified: ", response);
        } catch (error) {
          console.error(error);
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
}
