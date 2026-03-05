# Борис Черни: Claude Code, будущее разработки и аналогия с печатным станком

Современный интерактивный веб-сайт с полным транскриптом интервью Бориса Черни, создателя и технического руководителя Claude Code в Anthropic.

## 🎯 О проекте

Это интерактивный транскрипт интервью подкаста «Pragmatic Engineer» с Борисом Черни. Сайт предлагает удобную навигацию, поиск по тексту и адаптивный дизайн для комфортного чтения на любых устройствах.

## ✨ Функции

- **📱 Адаптивный дизайн** - Отлично работает на мобильных, планшетах и десктопах
- **🔍 Поиск по тексту** - Быстрый поиск по всему транскрипту (Ctrl/Cmd + K)
- **📑 Интерактивное оглавление** - Удобная навигация по разделам
- **📊 Прогресс-бар чтения** - Визуальная индикация прогресса прочтения
- **✨ Плавная анимация** - Приятные переходы и эффекты
- **🎨 Современный UI** - Чистый дизайн с Tailwind CSS
- **⚡ Быстрая загрузка** - Оптимизирован для производительности
- **🔗 SEO-оптимизация** - Open Graph и Twitter Cards для соцсетей

## 🚀 Технологии

- **[Hono](https://hono.dev/)** - Легковесный веб-фреймворк
- **[Vite](https://vitejs.dev/)** - Современный сборщик
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS фреймворк
- **[Font Awesome](https://fontawesome.com/)** - Иконки
- **[Wrangler](https://developers.cloudflare.com/workers/wrangler/)** - Cloudflare Workers CLI

## 📦 Установка и запуск

### Локальная разработка

\`\`\`bash
# Клонирование репозитория
git clone https://github.com/yourusername/webapp.git
cd webapp

# Установка зависимостей
npm install

# Запуск dev сервера
npm run dev

# Или запуск через wrangler (для тестирования production build)
npm run build
npm run dev:sandbox
\`\`\`

Сайт будет доступен по адресу: `http://localhost:5173` (dev) или `http://localhost:3000` (wrangler)

### Production сборка

\`\`\`bash
# Сборка для production
npm run build

# Результат будет в папке dist/
\`\`\`

## 🌐 Деплой

### GitHub Pages (автоматический)

При push в ветку `main` автоматически запускается GitHub Actions workflow, который собирает и публикует сайт на GitHub Pages.

**Настройка:**

1. Зайдите в Settings → Pages
2. Выберите Source: "GitHub Actions"
3. Сделайте push в main ветку

Сайт будет доступен по адресу: `https://yourusername.github.io/webapp/`

### Cloudflare Pages

\`\`\`bash
# Деплой на Cloudflare Pages
npm run deploy
\`\`\`

## 📁 Структура проекта

\`\`\`
webapp/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── public/
│   └── static/
│       └── app.js              # JavaScript для интерактивности
├── src/
│   └── index.tsx               # Основной файл Hono приложения
├── dist/                       # Production build (генерируется)
├── ecosystem.config.cjs        # PM2 конфигурация
├── package.json
├── tsconfig.json
├── vite.config.ts
└── wrangler.jsonc
\`\`\`

## 🎨 Возможности интерактивности

### Навигация
- Фиксированное оглавление с автоматической подсветкой текущего раздела
- Плавная прокрутка к разделам
- Мобильное меню с анимацией

### Поиск
- Полнотекстовый поиск по транскрипту
- Подсветка результатов
- Быстрый переход к найденным фрагментам
- Горячая клавиша: `Ctrl/Cmd + K`

### UX улучшения
- Прогресс-бар чтения вверху страницы
- Кнопка "Наверх" при прокрутке вниз
- Анимация появления секций при прокрутке
- Responsive дизайн для всех размеров экранов

## 📝 Контент

Транскрипт подготовлен Дмитрием Жечковым ([@llm_notes](https://t.me/llm_notes))

**Оригинал видео:** [YouTube](https://www.youtube.com/watch?v=julbw1JuAz0)

**Темы интервью:**
- История создания Claude Code
- Рабочий процесс с AI-агентами
- Культура разработки в Anthropic
- Будущее программирования
- Аналогия с печатным станком
- Навыки инженера будущего

## 🔧 Разработка

### Команды

\`\`\`bash
npm run dev           # Запуск dev сервера (Vite)
npm run dev:sandbox   # Запуск через wrangler
npm run build         # Сборка production
npm run preview       # Предпросмотр production build
npm run deploy        # Деплой на Cloudflare Pages
\`\`\`

### PM2 (для sandbox окружения)

\`\`\`bash
pm2 start ecosystem.config.cjs    # Запуск
pm2 logs transcript-webapp        # Просмотр логов
pm2 restart transcript-webapp     # Перезапуск
pm2 stop transcript-webapp        # Остановка
pm2 delete transcript-webapp      # Удаление
\`\`\`

## 🤝 Вклад

Если вы нашли ошибку в транскрипте или хотите улучшить сайт:

1. Fork репозитория
2. Создайте feature branch (`git checkout -b feature/amazing-feature`)
3. Commit изменений (`git commit -m 'Add amazing feature'`)
4. Push в branch (`git push origin feature/amazing-feature`)
5. Откройте Pull Request

## 📄 Лицензия

Этот проект создан в образовательных целях. Контент транскрипта принадлежит авторам оригинального интервью.

## 🙏 Благодарности

- **Борис Черни** - за интервью и создание Claude Code
- **Gergely Orosz** - за подкаст Pragmatic Engineer
- **Дмитрий Жечков** - за подготовку транскрипта
- **Anthropic** - за Claude и Claude Code

## 📞 Контакты

- Telegram: [@llm_notes](https://t.me/llm_notes)
- GitHub Issues: для вопросов и предложений

---

**Made with ❤️ using Claude Code, Hono, and modern web technologies**
