import { useState, useEffect } from 'react';
import styles from './clicker.module.css';
export const Clicker = ({
  balance,
  setBalance,
  totalEarnings,
  setTotalEarnings,
  totalExpense,
  setTotalExpense,
}) => {
  const clickValue = 30.02;
  const handleClick = () => {
    setBalance(balance + clickValue);
    setTotalEarnings(totalEarnings + clickValue);
  };
  const handleClick2 = () => {
    setBalance(balance - clickValue);
    setTotalExpense(totalExpense + clickValue);
  };
  return (
    <div className={styles.container}>
      <h1>$ {balance.toFixed(2)} </h1>
      <button onClick={handleClick}>Earn Money !!</button> <hr />
      <button onClick={handleClick2}>Lose Money !!</button>
    </div>
  );
};
