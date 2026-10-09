const lightThemes = ['light-sakura', 'light-ocean', 'light-meadow', 'light-sunset'];
const neonThemes = ['neon-cyberpunk', 'neon-electric', 'neon-magenta', 'neon-aurora'];
const themeNames = {
  'light-sakura': 'Sakura',
  'light-ocean': 'Ocean',
  'light-meadow': 'Meadow',
  'light-sunset': 'Sunset',
  'neon-cyberpunk': 'Cyberpunk',
  'neon-electric': 'Electric',
  'neon-magenta': 'Magenta',
  'neon-aurora': 'Aurora'
};

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
    updateThemePalette(lightTheme, true);
  } else {
    html.classList.remove('light-mode', ...neonThemes, ...lightThemes);
    html.classList.add('dark-mode', darkTheme);
    updateThemeIcon(false);
    updateThemePalette(darkTheme, false);
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
    updateThemePalette(theme, false);
  } else {
    const savedLightTheme = localStorage.getItem('lightTheme');
    const theme = savedLightTheme && lightThemes.includes(savedLightTheme) ? savedLightTheme : lightThemes[0];
    html.classList.add('light-mode', theme);
    updateThemePalette(theme, true);
  }

  localStorage.setItem('theme', isLight ? 'dark' : 'light');
  updateThemeIcon(!isLight);
  closeThemePalette();
}

function updateThemeIcon(isLight) {
  document.getElementById('themeToggle').setAttribute('aria-checked', String(isLight));
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
  updateThemePalette(nextTheme, isLight);
}

function updateThemePalette(themeName, isLight) {
  const themes = isLight ? lightThemes : neonThemes;
  const options = document.getElementById('themeOptions');

  options.replaceChildren(...themes.map(theme => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `theme-option theme-option-${theme}`;
    button.setAttribute('aria-pressed', String(theme === themeName));
    const swatch = document.createElement('span');
    swatch.className = 'theme-swatch';
    swatch.setAttribute('aria-hidden', 'true');
    button.append(swatch, document.createTextNode(themeNames[theme]));
    button.addEventListener('click', () => {
      document.documentElement.classList.remove(...themes);
      document.documentElement.classList.add(theme);
      localStorage.setItem(isLight ? 'lightTheme' : 'neonTheme', theme);
      updateThemePalette(theme, isLight);
      closeThemePalette();
      document.getElementById('themeSelector').focus();
    });
    return button;
  }));
}

function closeThemePalette() {
  document.getElementById('themePalette').hidden = true;
  document.getElementById('themeSelector').setAttribute('aria-expanded', 'false');
}

document.getElementById('themeToggle').addEventListener('click', toggleTheme);
document.getElementById('themeSelector').addEventListener('click', () => {
  const palette = document.getElementById('themePalette');
  palette.hidden = !palette.hidden;
  document.getElementById('themeSelector').setAttribute('aria-expanded', String(!palette.hidden));
});
document.addEventListener('click', event => {
  if (!event.target.closest('.theme-controls')) closeThemePalette();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !document.getElementById('themePalette').hidden) {
    closeThemePalette();
    document.getElementById('themeSelector').focus();
  }
});
document.addEventListener('DOMContentLoaded', initTheme);
