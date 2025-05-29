const form = document.getElementById('settingsForm');
const saveStatus = document.getElementById('saveStatus');

// Применение темы
function applyTheme(theme) {
  document.body.classList.toggle('theme-dark', theme === 'dark');
}

// Применение языка
async function applyLanguage(lang) {
  const dict = await fetch(`lang/${lang}.json`).then(r => r.json());
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.textContent = dict[key];
  });
}

// Загрузка сохранённых настроек
window.addEventListener('DOMContentLoaded', () => {
  const settings = JSON.parse(localStorage.getItem('admin-settings')) || {};
  const lang = settings.language || 'uk';
  const theme = settings.theme || 'light';

  applyLanguage(lang);

  if (form) {
    document.getElementById('language').value = lang;
    document.getElementById('theme').value = theme;
    document.getElementById('notifications').checked = settings.notifications ?? true;
  }
});

// Сохранение настроек
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const newSettings = {
      language: form.language.value,
      notifications: form.notifications.checked
    };
    localStorage.setItem('admin-settings', JSON.stringify(newSettings));
    applyLanguage(newSettings.language);
    saveStatus.style.display = 'block';
    setTimeout(() => saveStatus.style.display = 'none', 2000);
  });
}
