import { Footer } from "./Footer";
import { Header } from "./Header";

export const MainContainer: React.FC = ({ children }) => (
  <div className="container mx-auto max-w-full flex flex-col min-h-screen">
    <Header/>
      <div className="flex-grow">
        {children}
      </div>
    <Footer/>
  </div>
);
