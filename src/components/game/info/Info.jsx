import styles from "./info.module.css";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export const Info = ({ username, balance, totalEarnings, totalExpense }) => {
  const router = useRouter();

  const handleLogOut = async () => {
    try {
      const response = await fetch("api/logOut", {
        method: "POST",
      });
      const data = await response.json();
      console.log(data);
      router.push("/game");
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className={styles.container}>
      <div>
        <div className={styles.namelogout}>
          <h2>{username}</h2>
          <button onClick={handleLogOut}>
            <LogOut />
          </button>
        </div>
        <h3>Earnings : $ {totalEarnings.toFixed(2)}</h3>
        <h3>Expenses : $ {totalExpense.toFixed(2)}</h3>
      </div>
      <div>
        <p>Balance : $ {balance.toFixed(2)}</p>
      </div>
      <div className={styles.production}>
        <h1>ALREADY IN DEVELOPMENT</h1>
      </div>
    </div>
  );
};
