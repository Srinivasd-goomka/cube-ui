import { Outlet } from "react-router-dom";
import Footer from "../pages/footer";
import Header from "../pages/header";
import Sidenav from "../components/sidenav/Sidenav";

const RootLayout: React.FC = () => {
  return (
    <div className="cube-container w-full flex flex-col min-h-screen">
      <Header />
      <div className="cube-container__main flex flex-1">
        <div className="cube-container__main-sidebar">
          <Sidenav />
        </div>
        <main className="cube-container__content flex-1 ml-20 mr-3 mt-2">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
