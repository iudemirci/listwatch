import { Outlet } from "react-router-dom";
import MainContainer from "../components/mainContainer";
import Header from "../components/Header";
import Content from "../components/Content";
import Footer from "../components/Footer";

function AppLayout() {
  return (
    <div>
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

//
