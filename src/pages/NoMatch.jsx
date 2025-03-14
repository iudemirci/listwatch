import Content from "../ui/Content";
import Footer from "../ui/Footer";
import Header from "../ui/Header";
import MainContainer from "../ui/MainContainer";
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
