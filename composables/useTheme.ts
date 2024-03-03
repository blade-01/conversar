export default () => {
  type Theme = "dark" | "light";
  function setTheme(newTheme: Theme) {
    useColorMode().preference = newTheme;
  }
  return {
    setTheme
  };
};
