import styles from "./clicker.module.css";
export const Clicker = ({ balance, pending, setPending, clickValue }) => {
  const displayedBalance = balance + pending * clickValue;

  const handleClick = () => {
    setPending((p) => p + 1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.cardBalance}>
          <p>Balance:</p>
          <h1>$ {displayedBalance.toFixed(2)} </h1>
        </div>

        <div className={styles.cardClickerLvl}>
          <div className={styles.text}>
            <div className={styles.clickerPresent}>
              <p>$ 0.00</p>
              <p>per click</p>
            </div>
            <div className={styles.clickerFuture}>
              <p>$ 13133.00</p>
              <p>per click</p>
            </div>
          </div>
          <div className={styles.button}>
            <button>Raise the level ($ 100000)</button>
          </div>
        </div>
      </div>
      <div>
        <h1>$ {displayedBalance.toFixed(2)} </h1>
        <button onClick={handleClick}>Earn Money !!</button>
      </div>
    </div>
  );
};
