export const SideBar = () => {
  const sections = ['Investing', 'Buisiness', 'Clicker', 'Items'];
  return (
    <div>
      {sections.map((section, id = index) => (
        <div key={id}>
          <p>{section}</p>
        </div>
      ))}
    </div>
  );
};
