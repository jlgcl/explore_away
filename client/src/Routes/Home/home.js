import Carousel from "../../Components/Carousel/Carousel";
import HomeMain from "./home_main";
import "./home.css";

const Home = () => {
  return (
    <div className="Home">
      <Carousel />
      <HomeMain />
    </div>
  );
};

export default Home;
