import styles from "./clicker.module.css";
export const Clicker = ({
  balance,
  pending,
  setPending,
  clickValue,
  buyable,
  next,
}) => {
  const displayedBalance = balance + pending * clickValue;
  const handleClick = () => {
    setPending((p) => p + 1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.cardBalance}>
          <p>Balance</p>
          <h1>$ {displayedBalance.toFixed(2)}</h1>
        </div>

        <div className={styles.cardClickerLvl}>
          <div className={styles.text}>
            <div className={styles.clickerPresent}>
              <p>$ {clickValue.toFixed(2)}</p>
              <p>per click</p>
            </div>
            <div className={styles.clickerFuture}>
              {buyable ? (
                <>
                  <p>$ {buyable.click_value}</p>
                  <p>per click</p>
                </>
              ) : (
                <>
                  <p>—</p>
                  <p>no upgrade yet</p>
                </>
              )}
            </div>
          </div>

          <div className={styles.button}>
            <button disabled={!buyable}>
              {buyable ? (
                <>
                  <span className={styles.btnLabel}>
                    Upgrade to level {buyable.level}
                  </span>
                  <span className={styles.btnPrice}>$ {buyable.price}</span>
                </>
              ) : (
                <span className={styles.btnLabel}>Not enough money</span>
              )}
            </button>
          </div>

          <p className={styles.nextHint}>
            {next ? (
              <>
                Next: <strong>$ {next.click_value}</strong> per click for{" "}
                <strong>$ {next.price}</strong>
              </>
            ) : (
              "Max level reached"
            )}
          </p>
        </div>
      </div>

      <div>
        <h1>$ {displayedBalance.toFixed(2)}</h1>
        <button onClick={handleClick}>Earn Money !!</button>
      </div>
    </div>
  );
};
