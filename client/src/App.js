import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Carousel from "./Components/Carousel/Carousel";
import Home from './Components/Home'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Carousel />
      <Home />
    </div>
  );
}

export default App;
