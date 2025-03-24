import { Outlet } from "react-router-dom";
import MainContainer from "../ui/MainContainer";
import Header from "../ui/Header";
import Content from "../ui/Content";
import Footer from "../ui/Footer";

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
