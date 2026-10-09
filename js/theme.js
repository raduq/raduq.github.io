const lightThemes = ['light-sakura', 'light-ocean', 'light-meadow', 'light-sunset'];
const neonThemes = ['neon-cyberpunk', 'neon-electric', 'neon-magenta', 'neon-aurora'];
const lightThemeIcons = ['fa-spa', 'fa-water', 'fa-leaf', 'fa-cloud-sun'];
const neonIcons = ['fa-bolt', 'fa-broadcast-tower', 'fa-star', 'fa-wave-square'];

function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  const savedNeonTheme = localStorage.getItem('neonTheme');
  const savedLightTheme = localStorage.getItem('lightTheme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const html = document.documentElement;
  const darkTheme = savedNeonTheme && neonThemes.includes(savedNeonTheme) ? savedNeonTheme : neonThemes[0];
  const lightTheme = savedLightTheme && lightThemes.includes(savedLightTheme) ? savedLightTheme : lightThemes[0];

  if (savedTheme === 'light' || (savedTheme === null && !prefersDark)) {
    html.classList.remove('dark-mode', ...neonThemes, ...lightThemes);
    html.classList.add('light-mode', lightTheme);
    updateThemeIcon(true);
    updateThemeSelectorIcon(lightTheme, true);
  } else {
    html.classList.remove('light-mode', ...neonThemes, ...lightThemes);
    html.classList.add('dark-mode', darkTheme);
    updateThemeIcon(false);
    updateThemeSelectorIcon(darkTheme, false);
  }
}

function toggleTheme() {
  const html = document.documentElement;
  const isLight = html.classList.contains('light-mode');

  html.classList.remove('light-mode', 'dark-mode', ...neonThemes, ...lightThemes);

  if (isLight) {
    const savedNeonTheme = localStorage.getItem('neonTheme');
    const theme = savedNeonTheme && neonThemes.includes(savedNeonTheme) ? savedNeonTheme : neonThemes[0];
    html.classList.add('dark-mode', theme);
    updateThemeSelectorIcon(theme, false);
  } else {
    const savedLightTheme = localStorage.getItem('lightTheme');
    const theme = savedLightTheme && lightThemes.includes(savedLightTheme) ? savedLightTheme : lightThemes[0];
    html.classList.add('light-mode', theme);
    updateThemeSelectorIcon(theme, true);
  }

  localStorage.setItem('theme', isLight ? 'dark' : 'light');
  updateThemeIcon(!isLight);
}

function updateThemeIcon(isLight) {
  const icon = document.getElementById('themeToggle').querySelector('i');
  if (isLight) {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  }
}

function cycleTheme() {
  const html = document.documentElement;
  const isLight = html.classList.contains('light-mode');
  const themes = isLight ? lightThemes : neonThemes;
  const storageKey = isLight ? 'lightTheme' : 'neonTheme';

  let current = themes.findIndex(theme => html.classList.contains(theme));
  if (current === -1) current = 0;

  html.classList.remove(...themes);
  const nextIndex = (current + 1) % themes.length;
  const nextTheme = themes[nextIndex];
  html.classList.add(nextTheme);
  localStorage.setItem(storageKey, nextTheme);
  updateThemeSelectorIcon(nextTheme, isLight);
}

function updateThemeSelectorIcon(themeName, isLight) {
  const icon = document.getElementById('themeSelector').querySelector('i');
  const themes = isLight ? lightThemes : neonThemes;
  const icons = isLight ? lightThemeIcons : neonIcons;
  const themeIndex = themes.indexOf(themeName);

  [...lightThemeIcons, ...neonIcons].forEach(cls => icon.classList.remove(cls));
  icon.classList.add(icons[themeIndex]);
}

document.getElementById('themeToggle').addEventListener('click', toggleTheme);
document.getElementById('themeSelector').addEventListener('click', cycleTheme);
document.addEventListener('DOMContentLoaded', initTheme);
