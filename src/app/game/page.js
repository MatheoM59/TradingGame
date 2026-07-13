"use client";
import { useEffect } from "react";
import { useState } from "react";
import { SideBar } from "@/components/game/sideBar/SideBar";
import { Clicker } from "@/components/game/clicker/Clicker";
import { Info } from "@/components/game/info/Info";
import styles from "./game.module.css";
import { Investing } from "@/components/game/investing/Investing";
import { Items } from "@/components/game/items/Items";

export default function Game() {
  const [where, setWhere] = useState("Clicker");
  const [userData, setUserData] = useState(null);
  const [username, setUsername] = useState();
  const [balance, setBalance] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/info/", {
          method: "POST",
        });
        const data = await response.json();
        setUserData(data);
        setUsername(data.username);
        setTotalEarnings(Number(data.total_earnings));
        setTotalExpense(Number(data.total_expense));
        setBalance(Number(data.balance));
      } catch (error) {
        console.error("Error" + error);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const saveDataBase = async () => {
      try {
        const response = await fetch("/api/balance", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            balance,
            total_earnings: totalEarnings,
            total_expense: totalExpense,
          }),
        });
        if (response.ok) {
          console.log("Updated");
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    const interval = setInterval(() => {
      saveDataBase();
    }, 5000);
    return () => clearInterval(interval);
  }, [balance, totalEarnings, totalExpense]);

  return (
    <div className={styles.container}>
      <SideBar setWhere={setWhere} />
      {where === "Clicker" && (
        <Clicker
          balance={balance}
          setBalance={setBalance}
          totalEarnings={totalEarnings}
          setTotalEarnings={setTotalEarnings}
          totalExpense={totalExpense}
          setTotalExpense={setTotalExpense}
        />
      )}
      {where === "Investing" && (
        <Investing
          balance={balance}
          setBalance={setBalance}
          totalEarnings={totalEarnings}
          setTotalEarnings={setTotalEarnings}
          totalExpense={totalExpense}
          setTotalExpense={setTotalExpense}
        />
      )}
      {where === "Items" && (
        <div>
          <Items
            balance={balance}
            setBalance={setBalance}
            totalEarnings={totalEarnings}
            totalExpense={totalExpense}
            setTotalExpense={setTotalExpense}
          />
        </div>
      )}
      <Info
        userData={userData}
        username={username}
        balance={balance}
        totalEarnings={totalEarnings}
        totalExpense={totalExpense}
      />
    </div>
  );
}
