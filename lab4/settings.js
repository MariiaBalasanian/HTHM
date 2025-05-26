const settingsForm = document.getElementById('settingsForm');
const settingsSaveStatus = document.getElementById('saveStatus');
const languageSelect = document.getElementById('language');
const themeSelect = document.getElementById('theme');
const notificationsCheckbox = document.getElementById('notifications');
const instantBox = document.getElementById('instantFeedback');

const langCache = {};

function updateTexts(dict) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.textContent = dict[key];
  });
}

async function applyLanguage(lang) {
  if (!langCache[lang]) {
    try {
      const dict = await fetch(`lang/${lang}.json`).then(res => res.json());
      langCache[lang] = dict;
    } catch (e) {
      console.warn("Помилка завантаження мови:", lang, e);
      return;
    }
  }
  updateTexts(langCache[lang]);
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-bs-theme', theme);
}

function showInstantFeedback() {
  if (instantBox) {
    instantBox.classList.remove('d-none');
    setTimeout(() => instantBox.classList.add('d-none'), 1500);
  }
}

// Запуск, только если форма настроек на странице
if (settingsForm) {
  window.addEventListener('DOMContentLoaded', async () => {
    const settings = JSON.parse(localStorage.getItem('admin-settings')) || {};
    const { language = 'uk', theme = 'light', notifications = true } = settings;

    languageSelect.value = language;
    themeSelect.value = theme;
    notificationsCheckbox.checked = notifications;

    applyTheme(theme);
    await applyLanguage(language);
  });

  settingsForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const settings = {
      language: languageSelect.value,
      theme: themeSelect.value,
      notifications: notificationsCheckbox.checked
    };

    localStorage.setItem('admin-settings', JSON.stringify(settings));

    if (settingsSaveStatus) {
      settingsSaveStatus.classList.remove('d-none');
      setTimeout(() => settingsSaveStatus.classList.add('d-none'), 2000);
    }
  });

  languageSelect.addEventListener('change', () => {
    applyLanguage(languageSelect.value);
    const settings = JSON.parse(localStorage.getItem('admin-settings')) || {};
    settings.language = languageSelect.value;
    localStorage.setItem('admin-settings', JSON.stringify(settings));
    showInstantFeedback();
  });

  themeSelect.addEventListener('change', () => {
    applyTheme(themeSelect.value);
    const settings = JSON.parse(localStorage.getItem('admin-settings')) || {};
    settings.theme = themeSelect.value;
    localStorage.setItem('admin-settings', JSON.stringify(settings));
    showInstantFeedback();
  });
}
