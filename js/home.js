function toggleMoreItems() {
  const moreItems = document.getElementById('moreItems');
  const toggleBtn = document.getElementById('toggleBtn');

  moreItems.classList.toggle('visible');

  if (moreItems.classList.contains('visible')) {
    toggleBtn.innerHTML = '<svg class="icon" aria-hidden="true"><use href="/images/icons.svg#chevron-up"></use></svg> Show less';
  } else {
    toggleBtn.innerHTML = '<svg class="icon" aria-hidden="true"><use href="/images/icons.svg#chevron-down"></use></svg> Show 6 more companies';
  }
}

let avatarClickCount = 0;
let avatarClickTimer;
let pixelArtTimer;

function handleAvatarClick() {
  const avatar = document.getElementById('profileAvatar');
  const status = document.getElementById('avatarStatus');
  const source = avatar.dataset.originalSrc || avatar.src;

  avatarClickCount += 1;
  window.clearTimeout(avatarClickTimer);
  avatarClickTimer = window.setTimeout(() => {
    avatarClickCount = 0;
  }, 2000);

  if (avatarClickCount < 5) return;

  avatarClickCount = 0;
  window.clearTimeout(pixelArtTimer);

  const canvas = document.createElement('canvas');
  canvas.width = 24;
  canvas.height = 24;
  const context = canvas.getContext('2d');

  if (!context) {
    status.textContent = 'Pixel-art mode could not be activated.';
    return;
  }

  avatar.dataset.originalSrc = source;
  context.imageSmoothingEnabled = false;
  context.drawImage(avatar, 0, 0, canvas.width, canvas.height);
  avatar.src = canvas.toDataURL();
  avatar.classList.add('pixelated');
  status.textContent = 'Pixel-art mode activated!';

  pixelArtTimer = window.setTimeout(() => {
    avatar.src = avatar.dataset.originalSrc;
    avatar.classList.remove('pixelated');
    status.textContent = 'Pixel-art mode ended.';
  }, 5000);
}

const starsToggle = document.getElementById('starsToggle');

function syncStarsWithTheme() {
  const html = document.documentElement;
  const isDark = html.classList.contains('dark-mode');

  if (!isDark) html.classList.remove('stars-visible');
  starsToggle.disabled = !isDark;
  starsToggle.title = isDark ? 'Toggle stars' : 'Available in dark mode';
  starsToggle.setAttribute('aria-pressed', String(isDark && html.classList.contains('stars-visible')));
}

starsToggle.addEventListener('click', () => {
  if (!document.documentElement.classList.contains('dark-mode')) return;
  const html = document.documentElement;
  const enabled = html.classList.toggle('stars-visible');

  if (enabled && !document.querySelector('.star-field').childElementCount) {
    const stars = document.createDocumentFragment();
    for (let i = 0; i < 90; i += 1) {
      const star = document.createElement('span');
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.animationDelay = `${Math.random() * -4}s`;
      stars.append(star);
    }
    document.querySelector('.star-field').append(stars);
  }
  syncStarsWithTheme();
});
document.getElementById('themeToggle').addEventListener('click', syncStarsWithTheme);
document.addEventListener('DOMContentLoaded', syncStarsWithTheme);

const angularToggle = document.getElementById('angularToggle');
const angularStatus = document.getElementById('angularStatus');
const skillsStack = angularToggle.closest('.skills-stack');
let angularTimer;

angularToggle.addEventListener('click', () => {
  window.clearTimeout(angularTimer);
  skillsStack.classList.add('angular-corners');
  angularToggle.setAttribute('aria-pressed', 'true');
  angularStatus.textContent = '90° mode: sharp corners!';
  angularTimer = window.setTimeout(() => {
    skillsStack.classList.remove('angular-corners');
    angularToggle.setAttribute('aria-pressed', 'false');
    angularStatus.textContent = '';
  }, 5000);
});

document.getElementById('avatarTrigger').addEventListener('click', handleAvatarClick);
document.getElementById('themeEasterEgg').addEventListener('click', cycleTheme);
document.getElementById('toggleBtn').addEventListener('click', toggleMoreItems);
