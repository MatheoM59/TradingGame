import styles from "./items.module.css";
import { useEffect, useState } from "react";
import Image from "next/image";

export const Items = ({
  balance,
  setBalance,
  totalExpense,
  setTotalExpense,
}) => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const handleGetItems = async () => {
      try {
        const response = await fetch("/api/items/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();
        setItems(data.data);
        if (response.ok) {
          console.log("Items fetched successfully:", data);
        } else {
          console.error("Error fetching items:", data.message);
        }
      } catch (error) {
        console.error("Network Error while fetching items:", error);
      }
    };
    handleGetItems();
  }, []);
  const handleBuy = (item) => {
    setBalance(balance - item.price);
    setTotalExpense(totalExpense + item.price);
  };
  return (
    <div className={styles.container}>
      <h1>Helllo World !</h1>
      {items.map((item) => (
        <div key={item.id} className={styles.itemCard}>
          <div className={styles.item}>
            <div className={styles.itemInfo}>
              <h1 className={styles.itemsName}>{item.name}</h1>
              <p>{item.description}</p>
              <p>{item.price} $</p>
            </div>
            <div className={styles.itemImage}>
              <Image
                src="/items/the-starry-fortune.png"
                alt="item image"
                fill
                sizes="96px"
              />
            </div>
          </div>
          <div className={styles.itemBuy}>
            <button onClick={() => handleBuy(item)}>Buy</button>
          </div>
        </div>
      ))}
    </div>
  );
};
