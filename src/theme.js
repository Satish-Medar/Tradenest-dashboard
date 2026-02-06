const THEME_KEY = "theme";

export const initTheme = () => {
  const stored = localStorage.getItem(THEME_KEY);
  const theme = stored === "dark" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", theme);
  return theme;
};

export const toggleTheme = () => {
  const current = document.documentElement.getAttribute("data-theme") || "light";
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem(THEME_KEY, next);
  return next;
};
