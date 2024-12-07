import { useState, useEffect, useRef } from "react";
import style from "./statisticsPanel.module.css";
import secondImg from "../../assets/images/second.png";
import firstImg from "../../assets/images/first.png";
import thirdImg from "../../assets/images/three.png";
import fourthImg from "../../assets/images/four.png";
import circle from "../../assets/images/static.png";
import copy from "../../assets/images/kopi.png";
import success from "../../assets/images/copy-success.png";
import kongAnimation from "../../assets/animations/HOW_TO_KONG2.json"
import Lottie from "react-lottie";

export default function StatisticsPanel() {
  const contractAddress = "Cm6acA7PHfktYMBa7DK9vKJb4pzHeSr5gYvz1idMRnaf";

  const [shortenedAddress, setShortenedAddress] = useState(contractAddress);
  const [currentNote, setCurrentNote] = useState(0);
  const [currentImage, setCurrentImage] = useState(copy);

  const headerRef = useRef(null);
  const notesRef = useRef(null);
  const footerRef = useRef(null);

  const [touchStart, setTouchStart] = useState(0); 
  const [touchEnd, setTouchEnd] = useState(0); 
  const [isMobile, setIsMobile] = useState(false);
  const updateAddressBasedOnScreenSize = () => {
    if(window.innerWidth <= 600) {
      setIsMobile(true);
    }
    else {
      setIsMobile(false);
    }
    if (window.innerWidth <= 1024) {
      setShortenedAddress(
        `${contractAddress.slice(0, 6)}...${contractAddress.slice(-3)}`
      );
    } else {
      setShortenedAddress(contractAddress);
    }
  };

  useEffect(() => {
    updateAddressBasedOnScreenSize();
    window.addEventListener("resize", updateAddressBasedOnScreenSize);

    return () => {
      window.removeEventListener("resize", updateAddressBasedOnScreenSize);
    };
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(contractAddress)
      .then(() => {
        setCurrentImage(success);
        setTimeout(() => {
          setCurrentImage(copy);
        }, 3000);
      })
      .catch((err) => {
        console.error("Error", err);
      });
  };

  const handleDotClick = (index) => {
    setCurrentNote(index);
  };

  const handleTouchStart = (e) => {
    const touchStart = e.touches[0].clientX; 
    setTouchStart(touchStart);
  };

  const handleTouchEnd = (e) => {
    const touchEnd = e.changedTouches[0].clientX; 
    setTouchEnd(touchEnd);

    if (touchStart - touchEnd > 50) {
      setCurrentNote((prev) => Math.min(prev + 1, 3)); 
    }

    if (touchEnd - touchStart > 50) {
      setCurrentNote((prev) => Math.max(prev - 1, 0));
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(style.visible);
          } else {
            entry.target.classList.remove(style.visible);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = [headerRef.current, notesRef.current, footerRef.current];
    elements.forEach((el) => el && observer.observe(el));

    if (window.innerWidth > 1024) {
      elements.forEach((el, index) => {
        if (el) {
          setTimeout(() => {
            el.classList.add(style.visible);
          }, index * 300);
        }
      });
    }

    return () => {
      elements.forEach((el) => el && observer.unobserve(el));
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
    <div
      className={style.statisticsSection}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}   
    >
      <div ref={headerRef} className={`${style.header} ${style.hidden}`}>
      </div>
      <div ref={notesRef} className={`${style.notes} ${style.hidden}`}>
          <div className={style.row}>
          {(!isMobile || currentNote===0) && <div className={`${style.img} ${style.img1}`}></div>}
          {(!isMobile || currentNote===1) && <div className={`${style.img} ${style.img2}`}></div>}
          </div>
          <div className={style.row}>
          {(!isMobile || currentNote===2) && <div className={`${style.img} ${style.img3}`}></div>}
          {(!isMobile || currentNote===3) && <div className={`${style.img} ${style.img4}`}></div>}
        </div>
      </div>
      <div className={style.dots}>
        {[firstImg, secondImg, thirdImg, fourthImg].map((_, index) => (
          <div
            key={index}
            className={`${style.dot} ${
              currentNote === index ? style.active : ""
            }`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
     <div className={style.animated_div}>
       <Lottie options={lottieOptions}/>
     </div>
      <div ref={footerRef} className={`${style.footer} ${style.hidden}`}>
        {isMobile && (<span className={style.footer_head}>KONGENOMICS</span>)}
        <div className={style.circle}>
          <img src={circle} />
        </div>
        <div className={style.statics}>
          {!isMobile && <span className={style.footer_head}>KONGENOMICS</span>}
          <div className={style.copy}>
            <div className={style.row}>
              <div className={style.first_row}>
               
              </div>
              <div className={`${style.first_row} ${style.second_row}`}>
               
              </div>
            </div>
            <div className={`${style.row} ${style.sec_row}`}>
              
              <img src={currentImage} alt="Copy" onClick={copyToClipboard} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
