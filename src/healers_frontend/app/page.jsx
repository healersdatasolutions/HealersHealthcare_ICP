import KnowMore from "../components/KnowMore";
import Overview from "../components/Overview";
import Panels from "../components/Panels";
import Services from "../components/Services";
import Video from "../components/Video";

export default function Home(params) {
  return (
    <>
      <Overview />
      <Panels />
      <Video /> 
      <Services />
      <KnowMore />
    </>
  );
}
