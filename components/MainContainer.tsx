import { Footer } from "./Footer";
import { Header } from "./Header";
import { ROUTES } from "../constants/routes";
import { useAuth } from "../utils/AuthUserContext";
import { useRouter } from "next/router";
import { useEffect } from "react";
const authenticated_routes = [
  ROUTES.PROFILE,
  ROUTES.ADD_REVIEW,
  ROUTES.ADD_COMPANY,
];
export const MainContainer: React.FC = ({ children }) => {
  const { authUser, loading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    const current_path = router.pathname;
    if (
      current_path != ROUTES.LOG_IN &&
      current_path != ROUTES.SIGN_UP &&
      authenticated_routes.includes(current_path) &&
      !authUser
      ) {
        router.push(ROUTES.LOG_IN);
      }
    });
    return (
      <div className="container mx-auto max-w-full flex flex-col min-h-screen">
        <title> UW Workflow </title>
        <Header />
        <div className="flex-grow items-center">{children}</div>
        <Footer />
      </div>
    );
  };
