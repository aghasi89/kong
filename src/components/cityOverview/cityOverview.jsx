import { useEffect, useRef } from "react";
import kongAnimation from "../../assets/animations/Kong_Central.json"
import style from "./cityOverview.module.css";
import Lottie from "react-lottie";

export default function CityOverview() {
  const contentRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      if (contentRef.current) {
        const rect = contentRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top < windowHeight && rect.bottom > 0) {
          contentRef.current.classList.add(style.visible);
        } else {
          contentRef.current.classList.remove(style.visible);
        }
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: kongAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className={style.heroSection}>
      <div className="container">
        <div className={style.content__center}>

          <div className={style.animated_div}>

             <Lottie options={lottieOptions}
                     isClickToPauseDisabled={true}
             />
          </div>

          <div className={style.content} ref={contentRef}>
          </div>


        </div>
      </div>
    </div>
  );
}
