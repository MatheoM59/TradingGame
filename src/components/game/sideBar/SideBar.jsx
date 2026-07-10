import styles from './sideBar.module.css';
export const SideBar = () => {
  const sections = ['Investing', 'Buisiness', 'Clicker', 'Items'];
  return (
    <div className={styles.container}>
      {sections.map((section, id = index) => (
        <div key={id}>
          <button>{section}</button>
        </div>
      ))}
    </div>
  );
};
