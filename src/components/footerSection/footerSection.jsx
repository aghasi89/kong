import { useEffect, useRef, useState } from "react";
import RunningText from "../runningText/runningText";
import kongHeadImg from "../../assets/images/footer_king.png";
import twitterImg from "../../assets/images/defaulttw.png";
import telegramImg from "../../assets/images/defaulttele.png";
import animationData from "../../assets/animations/fire.json";
import rocketBanana from "../../assets/videos/Fire rocket-vp9-chrome.webm";
import text from "../../assets/images/it_is_time.png";
import textDesktop from "../../assets/images/it_is_time_desktop.png";

import style from "./footerSection.module.css";
import Lottie from "react-lottie";

export default function FooterSection() {
  const contentRef = useRef(null);
  const mediaBlockRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const updateAddressBasedOnScreenSize = () => {
    if(window.innerWidth <= 600) {
      setIsMobile(true);
    }
    else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    updateAddressBasedOnScreenSize();
    window.addEventListener("resize", updateAddressBasedOnScreenSize);

    return () => {
      window.removeEventListener("resize", updateAddressBasedOnScreenSize);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          contentRef.current.classList.add(style.visible);
        } else {
          contentRef.current.classList.remove(style.visible);
        }
      },
      { threshold: 0.1 }
    );

    if (contentRef.current) observer.observe(contentRef.current);

    return () => observer.disconnect();
  }, [contentRef, mediaBlockRef]);
  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <div className={style.running__text__block}>
        <RunningText />
      </div>
      <div className={`${style.footer__section}`}>
        <div className="container">
          <div ref={contentRef} className={`${style.content} ${style.hidden}`}>
            <img src={isMobile?text:textDesktop} alt="Footer Text" />
          </div>
          <div className={style.animation_data}>
          <Lottie options={lottieOptions} isClickToPauseDisabled={true} />
          </div>
          {/* <div className={style.footer__video}>
            <video autoPlay loop muted>
              <source src={rocketBanana} type="video/mp4" />
            </video>
          </div> */}
        </div>
      </div>
      <footer>
        <div className="container">
          <div className={style.footer__flex}>
            <div className={style.head__and__text}>
              <img src={kongHeadImg} alt="Kong Head" />
            </div>
            <div className={style.icon}>
              <div className={style.tele__and__tw}>
                <div className={style.tele__blok}>
                  <img src={telegramImg} alt="telegram" />
                </div>
                <div className={style.twitter__blok}>
                  <img src={twitterImg} alt="twitter" />
                </div>
              </div>
            </div>
          </div>
          <div className={style.copyright}>
            <span>© KONG 2024 - All rights reserved</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
