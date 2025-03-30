import { Outlet } from "react-router-dom";

import MainContainer from "./MainContainer";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";

function AppLayout() {
  return (
    <div className="flex h-screen flex-col justify-between">
      <MainContainer>
        <Header />
        <Content>
          <Outlet />
        </Content>
      </MainContainer>
      <Footer />
    </div>
  );
}

export default AppLayout;
