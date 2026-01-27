import useLocalStorage from "../hooks/useLocalStorage";

export default function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage("theme", "light");

  const toggle = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <button className="nav-btn" onClick={toggle}>
      {theme === "light" ? "🌞 Light" : "🌙 Dark"}
    </button>
  );
} 
