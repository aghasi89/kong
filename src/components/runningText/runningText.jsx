import Marquee from "react-fast-marquee";
import style from "./runningText.module.css";
import { useRef } from "react";

export default function RunningText() {
  const copyableTextRef = useRef(null);

  const handleCopyText = () => {
    if (copyableTextRef.current) {
      const text = "Your text to copy";
      navigator.clipboard.writeText(text).then(() => {
        alert("Text copied to clipboard!");
      });
    }
  };
  return (
    <div className={style.running__text__block}>
      <div className={style.running__text} onClick={handleCopyText}>
        <Marquee speed={50} gradient={false} ref={copyableTextRef}>
          New token (contract) New token (contract) New token (contract) New
          token (contract) New token (contract) New token (contract) New token
          (contract) New token (contract) New token (contract) New token
          (contract) New token (contract) New token (contract) New token
          (contract) New token (contract) New token (contract) New token
          (contract) New token (contract) New token (contract) New token
          (contract) New token (contract) New token (contract) New token
          (contract) New token (contract) New token (contract) New token
          (contract) New token (contract)
        </Marquee>
      </div>
    </div>
  );
}
