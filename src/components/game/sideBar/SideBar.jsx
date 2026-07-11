import styles from './sideBar.module.css';
export const SideBar = ({ where, setWhere }) => {
  const sections = ['Investing', 'Buisiness', 'Clicker', 'Items'];
  const handleCLick = (item) => {
    setWhere(item);
  };
  console.log(where);
  return (
    <div className={styles.container}>
      {sections.map((section, id = index) => (
        <div key={id}>
          <button onClick={() => handleCLick(section)}>{section}</button>
        </div>
      ))}
    </div>
  );
};
