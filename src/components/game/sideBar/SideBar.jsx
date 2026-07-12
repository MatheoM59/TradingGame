import styles from "./sideBar.module.css";

export const SideBar = ({ setWhere }) => {
  const sections = ["Investing", "Buisiness", "Clicker", "Items"];
  const handleCLick = (item) => {
    setWhere(item);
  };
  return (
    <div className={styles.container}>
      {sections.map((section, index) => (
        <div key={index}>
          <button onClick={() => handleCLick(section)}>{section}</button>
        </div>
      ))}
    </div>
  );
};
