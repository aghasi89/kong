import {useEffect, useRef, useState} from "react";
import Lottie from "react-lottie";
import style from "./featuresShowcase.module.css";
import firstkongAnimation from "../../assets/animations/1.json";
import secondkongAnimation from "../../assets/animations/2.json";
import thirdkongAnimation from "../../assets/animations/3.json";
import RunningText from "../runningText/runningText";
import dAnimation from "../../assets/images/3d.svg";
import mobileAnimation from "../../assets/images/3mobile.svg";
import style2 from "./Features.module.scss"
import textMobile from "../../assets/png/features/textMobile.png";
import textDesktop from "../../assets/png/features/textDesktop.png";

export default function FeaturesShowcase() {
    const kongDysRef = useRef(null);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const updateWindowWidth = () => {
        setWindowWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener("resize", updateWindowWidth);
        return () => {
            window.removeEventListener("resize", updateWindowWidth);
        };
    }, []);

    const currentAnimation = windowWidth <= 986 ? mobileAnimation : dAnimation;

    useEffect(() => {
        const onScroll = () => {
            if (kongDysRef.current) {
                const rect = kongDysRef.current.getBoundingClientRect();
                const windowHeight = window.innerHeight;

                if (rect.top < windowHeight && rect.bottom > 0) {
                    kongDysRef.current.classList.add(style.visible);
                } else {
                    kongDysRef.current.classList.remove(style.visible);
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
        animationData: firstkongAnimation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    const lottieOptions2 = {
        loop: true,
        autoplay: true,
        animationData: secondkongAnimation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    const lottieOptions3 = {
        loop: true,
        autoplay: true,
        animationData: thirdkongAnimation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    return (
        <div className={style.kong_section}>
            <div className={style.kong_img__blokes}>
                <div
                    className={`${style["kong-section-item"]} ${style["kong-section-left"]}`}
                >
                    <Lottie options={lottieOptions}/>
                </div>
                <div
                    className={`${style["kong-section-item"]} ${style["kong-section-center"]}`}
                >
                    <Lottie options={lottieOptions2}/>
                </div>
                <div
                    className={`${style["kong-section-item"]} ${style["kong-section-right"]}`}
                >
                    <Lottie options={lottieOptions3}/>
                </div>
            </div>

            {/*<div className="container">*/}
            {/*    <div className={style.position__text}>*/}
            {/*        <div className={style.kong_dys} ref={kongDysRef}>*/}
            {/*            <img src={currentAnimation} alt="Kong Banner"/>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}

            <div ref={kongDysRef}
                 className={style2.textWrapper}>
                <img src={textMobile} alt="" className={style2.textMobile}/>
                <img src={textDesktop} alt="" className={style2.textDesktop}/>
            </div>

            <div className={style.running__text}>
                <RunningText/>
            </div>
        </div>
    );
}
