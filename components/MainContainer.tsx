import { Footer } from "./Footer";
import { Header } from "./Header";

export const MainContainer: React.FC = ({ children }) => (
  <div className="container mx-auto max-w-full flex flex-col min-h-screen">
    <title> UW Workflow </title>
    <Header />
    <div className="flex-grow items-center">{children}</div>
    <Footer />
  </div>
);
