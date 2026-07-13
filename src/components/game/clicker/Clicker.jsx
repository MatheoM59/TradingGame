import styles from "./clicker.module.css";
export const Clicker = ({ balance, pending, setPending, clickValue }) => {
  const displayedBalance = balance + pending * clickValue;

  const handleClick = () => {
    setPending((p) => p + 1);
  };

  return (
    <div className={styles.container}>
      <h1>$ {displayedBalance.toFixed(2)} </h1>
      <button onClick={handleClick}>Earn Money !!</button>
    </div>
  );
};
