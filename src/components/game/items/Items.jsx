import styles from "./items.module.css";
import { useEffect, useState } from "react";
import Image from "next/image";
import { PopUp } from "./popUp/Popup";

export const Items = ({ setBalance, setTotalExpense }) => {
  const [items, setItems] = useState([]);
  const [feedBack, setFeedBack] = useState(null);

  useEffect(() => {
    const handleGetItems = async () => {
      try {
        const response = await fetch("/api/items/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();
        if (response.ok) {
          setItems(data.data);
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
  const handleBuy = async (item) => {
    const itemId = item.id;
    const userId = localStorage.getItem("userId");

    try {
      const response = await fetch("/api/items/buy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId, userId }),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setBalance(Number(data.balance));
        setTotalExpense(Number(data.total_expense));
        setFeedBack({ message: data.message, ok: response.ok });
      } else {
        setFeedBack({ message: data.message, ok: response.ok });
      }
    } catch (error) {
      setFeedBack({ message: "Server Error !", ok: false });
      console.error(error);
    }
  };
  return (
    <div className={styles.container}>
      <h1>Items</h1>
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
      {feedBack && <PopUp feedBack={feedBack} setFeedBack={setFeedBack} />}
    </div>
  );
};
