import {useEffect, useRef, useState} from "react";
import RunningText from "../runningText/runningText";
import kongHeadImg from "../../assets/images/kongHead.png";
import kongText from "../../assets/images/headertext1.svg";
import kongText2 from "../../assets/images/headertext2.svg";
import kongTextMobile1 from "../../assets/images/headertextmob1.svg";
import kongTextMobile2 from "../../assets/images/headertextmob2.svg";
import animationKong from "../../assets/videos/Kong_Ring.mp4";
import style from "./heroSection.module.css";
import {Link} from "react-router";
import {svgIcons} from "../../assets/svgIcons";
import style2 from "./HeroSection.module.scss";
import text1Src from "../../assets/png/hero/text1.png";
import text2Src from "../../assets/png/hero/text2.png";

export default function HeroSection() {
    const videoRef = useRef(null);
    const [showKongText, setShowKongText] = useState(true);
    const [showKongText2, setShowKongText2] = useState(false);
    const [showKongTextMobile, setShowKongTextMobile] = useState(true);
    const [showKongText2Mobile, setShowKongText2Mobile] = useState(false);

    const [showText1, setShowText1] = useState(true);
    const [showText2, setShowText2] = useState(false);

    const onPlay = () => setTimeout(() => setShowText1(false), 2500);
    const onEnded = () => setShowText2(true);

    useEffect(() => {
        const videoElement = videoRef.current;

        if (videoElement) {
            videoElement.addEventListener("play", () => {
                setTimeout(() => setShowKongText(false), 2500);
                setTimeout(() => setShowKongTextMobile(false), 2500);
            });

            videoElement.addEventListener("ended", () => {
                setShowKongText2(true);
                setShowKongText2Mobile(true);
            });
        }

        return () => {
            if (videoElement) {
                videoElement.removeEventListener("play", () => {
                });
                videoElement.removeEventListener("ended", () => {
                });
            }
        };
    }, []);

    return (
        <div className={style.heroSection}>

            <div className={style.videoBackground}>
                <video ref={videoRef}
                       autoPlay
                       muted
                       playsInline
                       onPlay={onPlay}
                       onEnded={onEnded}
                >
                    <source src={animationKong}
                            type="video/mp4"
                    />
                </video>
            </div>

            <div className="container">

                <div className={style2.header}>

                    <Link className={style2.logo}
                          to="/"
                    >
                        <img src={kongHeadImg} alt="Kong Head"/>
                    </Link>


                    <div className={style2.text1Wrapper}
                         style={{
                             opacity: showText1 ? 1 : 0
                         }}
                    >
                        <img src={text1Src} alt=""/>
                    </div>

                    <div className={style2.text2Wrapper}
                         style={{
                             opacity: showText2 ? 1 : 0
                         }}
                    >
                        <img src={text2Src} alt=""/>
                    </div>

                    <div className={style2.socialLinks}>
                        {
                            [
                                {
                                    icon: svgIcons.twitter,
                                    href: "#",
                                },
                                {
                                    icon: svgIcons.telegram,
                                    href: "#",
                                },
                            ].map(({icon, href}, key) => (
                                <a key={key}
                                   href={href}
                                   className={style2.socialLink}
                                >
                                    <div className={style2.inner}>
                                        {icon}
                                    </div>
                                </a>
                            ))
                        }
                    </div>

                </div>

                {/*<div className={style.content}>*/}


                {/*    {showKongText && (*/}
                {/*        <div className={style.text__back__img}>*/}
                {/*            <img src={kongText} alt="Kong Initial Text"/>*/}
                {/*        </div>*/}
                {/*    )}*/}

                {/*    {showKongText2 && (*/}
                {/*        <div className={style.text__back__img}>*/}
                {/*            <img src={kongText2} alt="Kong Final Text"/>*/}
                {/*        </div>*/}
                {/*    )}*/}

                {/*    {showKongTextMobile && (*/}
                {/*        <div className={style.text__back__img__mobile}>*/}
                {/*            <img src={kongTextMobile1} alt="Kong Initial Text"/>*/}
                {/*        </div>*/}
                {/*    )}*/}
                {/*    {showKongText2Mobile && (*/}
                {/*        <div className={style.text__back__img__mobile}>*/}
                {/*            <img src={kongTextMobile2} alt="Kong Final Text"/>*/}
                {/*        </div>*/}
                {/*    )}*/}


                {/*</div>*/}

            </div>

            <div className={style.running__text__block}>
                <RunningText/>
            </div>
        </div>
    );
}
