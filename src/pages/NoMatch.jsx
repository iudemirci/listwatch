import Content from "../components/Content";
import Footer from "../components/Footer";
import Header from "../components/Header";
import MainContainer from "../components/mainContainer";
import NoMatchContent from "../components/NoMatchContent";

function NoMatch() {
  return (
    <>
      <MainContainer>
        <Header />
        <Content>
          <NoMatchContent />
        </Content>
      </MainContainer>
      <Footer />
    </>
  );
}

export default NoMatch;
