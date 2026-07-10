import styles from './info.module.css';
export const Info = ({ balance, totalEarnings, totalExpense }) => {
  return (
    <div className={styles.container}>
      <div>
        <h2>Your Infos</h2>
        <h3>Earnings : $ {totalEarnings.toFixed(2)}</h3>
        <h3>Expenses : $ {totalExpense.toFixed(2)}</h3>
      </div>
      <div>
        <p>Balance : $ {balance.toFixed(2)}</p>
      </div>
    </div>
  );
};
