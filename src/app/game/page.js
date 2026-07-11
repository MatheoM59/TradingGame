'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SideBar } from '@/components/game/sideBar/SideBar';
import { Clicker } from '@/components/game/clicker/Clicker';
import { Info } from '@/components/game/info/Info';
import styles from './game.module.css';
import { Investing } from '@/components/game/investing/Investing';

export default function Game() {
  const router = useRouter();
  const [where, setWhere] = useState('Clicker');
  const [userData, setUserData] = useState(null);
  const [balance, setBalance] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      router.push('/');
    }
  }, [router]);

  useEffect(() => {
    const fetchUserData = async () => {
      const id = localStorage.getItem('userId');
      try {
        const response = await fetch('/api/info/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id }),
        });
        const data = await response.json();
        setUserData(data);
        setTotalEarnings(Number(data.total_earnings));
        setTotalExpense(Number(data.total_expense));
        setBalance(Number(data.balance));
      } catch (error) {
        console.error('Error' + error);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const saveDataBase = async () => {
      const userId = localStorage.getItem('userId');
      try {
        const response = await fetch('/api/balance', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: userId,
            balance,
            total_earnings: totalEarnings,
            total_expense: totalExpense,
          }),
        });
        const data = await response.json();
        if (response.ok) {
          console.log('Updated');
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    const interval = setInterval(() => {
      saveDataBase();
    }, 5000);
    return () => clearInterval(interval);
  }, [balance, totalEarnings, totalExpense]);

  return (
    <div className={styles.container}>
      <SideBar where={where} setWhere={setWhere} />
      {where === 'Clicker' && (
        <Clicker
          balance={balance}
          setBalance={setBalance}
          totalEarnings={totalEarnings}
          setTotalEarnings={setTotalEarnings}
          totalExpense={totalExpense}
          setTotalExpense={setTotalExpense}
        />
      )}
      {where === 'Investing' && (
        <Investing
          balance={balance}
          setBalance={setBalance}
          totalEarnings={totalEarnings}
          setTotalEarnings={setTotalEarnings}
          totalExpense={totalExpense}
          setTotalExpense={setTotalExpense}
        />
      )}
      <Info
        userData={userData}
        balance={balance}
        totalEarnings={totalEarnings}
        totalExpense={totalExpense}
      />
    </div>
  );
}
