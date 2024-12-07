import "./index.css";
import "./App.css";
import Screens from "./screens/screens";
import { useEffect } from "react";
import Lottie from "react-lottie";
import preloaderAnimation from "./assets/animations/preloader.json";
function App() {
  useEffect(() => {
    document.body.style.overflow = "hidden"
    setTimeout(() => {
      const preloader = document.querySelector(".preloader");
      preloader.style.display = "none";
      document.body.style.overflow = "auto"

    }, 30000);
  }, []);
  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: preloaderAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="App">
      <div className="preloader">
        <div className="preloader__animation">
          <Lottie options={lottieOptions} isClickToPauseDisabled={true}/>
        </div>
      </div>
      <Screens/>
    </div>
  );
}

export default App;
