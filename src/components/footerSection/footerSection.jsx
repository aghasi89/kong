import { useEffect, useRef } from "react";
import RunningText from "../runningText/runningText";
import kongHeadImg from "../../assets/images/footerheadtext.svg";
import twitterImg from "../../assets/images/defaulttw.png";
import telegramImg from "../../assets/images/defaulttele.png";
import rocketBanana from "../../assets/videos/Fire rocket-vp9-chrome.webm";
import text from "../../assets/images/footerText.svg";

import style from "./footerSection.module.css";

export default function FooterSection() {
  const contentRef = useRef(null);
  const mediaBlockRef = useRef(null);

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

  return (
    <div>
      <div className={style.running__text__block}>
        <RunningText />
      </div>
      <div className={`${style.footer__section}`}>
        <div className="container">
          <div ref={contentRef} className={`${style.content} ${style.hidden}`}>
            <img src={text} alt="Footer Text" />
          </div>

          <div className={style.footer__video}>
            <video autoPlay loop muted>
              <source src={rocketBanana} type="video/mp4" />
            </video>
          </div>
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
