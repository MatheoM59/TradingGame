import { X } from "lucide-react";
import styles from "./popUp.module.css";

export const PopUp = ({ feedBack, setFeedBack }) => {
  const status = feedBack.ok;
  const message = feedBack.message;
  const handleClose = () => {
    setFeedBack(null);
  };
  console.log(feedBack);
  return (
    <div className={styles.container}>
      {status === true && (
        <div className={`${styles.content} ${styles.success}`}>
          <div className={styles.button}>
            <button onClick={handleClose}>
              <X />
            </button>
          </div>
          <div className={styles.info}>
            <h1>Congratulation !</h1>
            <p>{message}</p>
          </div>
        </div>
      )}
      {status === false && (
        <div className={`${styles.content} ${styles.error}`}>
          <div className={styles.button}>
            <button onClick={handleClose}>
              <X />
            </button>
          </div>
          <div className={styles.info}>
            <h1>Oups !</h1>
            <p>{message}</p>
          </div>
        </div>
      )}
    </div>
  );
};
