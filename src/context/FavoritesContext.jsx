import { createContext, useContext, useMemo, useState } from "react";

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]); // מערך של פריטים מועדפים

  // מוסיף מועדף אם לא קיים
  function addFavorite(item) {
    setFavorites((prev) => {
      const exists = prev.some((x) => x.id === item.id);
      if (exists) return prev;
      return [...prev, item];
    });
  } 

  // מסיר מועדף לפי id
  function removeFavorite(id) {
    setFavorites((prev) => prev.filter((x) => x.id !== id));
  }

  // בדיקה אם פריט במועדפים
  function isFavorite(id) {
    return favorites.some((x) => x.id === id);
  }

  // toggle (הוסף/הסר)
  function toggleFavorite(item) {
    setFavorites((prev) => {
      const exists = prev.some((x) => x.id === item.id);
      if (exists) return prev.filter((x) => x.id !== item.id);
      return [...prev, item];
    });
  }

  const value = useMemo(
    () => ({
      favorites,
      addFavorite,
      removeFavorite,
      toggleFavorite,
      isFavorite,
    }),
    [favorites]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used inside FavoritesProvider");
  return ctx;
}
