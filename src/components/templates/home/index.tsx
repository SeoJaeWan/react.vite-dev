const HomeTemplate = () => {
  return (
    <div>
      <h1>Home</h1>
      <p>{import.meta.env.VITE_CLIENT_ID}</p>
    </div>
  );
};

export default HomeTemplate;
