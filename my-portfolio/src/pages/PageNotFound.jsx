import FrameSection from "../components/FrameSection/FrameSection";
import StatusPage from "../components/StatusPage/StatusPage";

// Rota "*": qualquer caminho não mapeado, renderizado dentro do layout.
const PageNotFound = () => {
  return (
    <FrameSection>
      <StatusPage code="404" />
    </FrameSection>
  );
};

export default PageNotFound;
