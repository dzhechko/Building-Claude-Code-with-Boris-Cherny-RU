import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

// Serve static files
app.use('/static/*', serveStatic({ root: './public' }))

// Main page
app.get('/', (c) => {
  return c.html(`
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Борис Черни о Claude Code, будущем разработки и аналогии с печатным станком. Полный транскрипт интервью подкаста Pragmatic Engineer.">
    <meta name="keywords" content="Claude Code, AI, разработка, программирование, Anthropic, Борис Черни">
    <meta name="author" content="Дмитрий Жечков">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="article">
    <meta property="og:url" content="https://yourusername.github.io/webapp/">
    <meta property="og:title" content="Борис Черни: Claude Code, будущее разработки и аналогия с печатным станком">
    <meta property="og:description" content="Полный транскрипт интервью с создателем Claude Code о будущем программирования">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:title" content="Борис Черни: Claude Code и будущее разработки">
    <meta property="twitter:description" content="Полный транскрипт интервью с создателем Claude Code">
    
    <title>Борис Черни: Claude Code, будущее разработки и аналогия с печатным станком</title>
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            darkMode: 'class',
        }
    </script>
    
    <!-- Font Awesome -->
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    
    <style>
        body {
            font-family: 'Inter', sans-serif;
            transition: background-color 0.3s ease, color 0.3s ease;
        }
        
        /* Dark mode styles */
        html.dark {
            background-color: #1a1a1a;
        }
        
        html.dark body {
            background-color: #1a1a1a !important;
            color: #e5e7eb !important;
        }
        
        html.dark .bg-white {
            background-color: #2d2d2d !important;
        }
        
        html.dark .bg-gray-50 {
            background-color: #1f1f1f !important;
        }
        
        html.dark .bg-gray-100 {
            background-color: #2d2d2d !important;
        }
        
        html.dark .text-gray-900 {
            color: #e5e7eb !important;
        }
        
        html.dark .text-gray-800 {
            color: #d1d5db !important;
        }
        
        html.dark .text-gray-700 {
            color: #9ca3af !important;
        }
        
        html.dark .text-gray-600 {
            color: #6b7280 !important;
        }
        
        html.dark .text-gray-500 {
            color: #6b7280 !important;
        }
        
        html.dark .text-gray-400 {
            color: #9ca3af !important;
        }
        
        html.dark .border-gray-200 {
            border-color: #374151 !important;
        }
        
        html.dark .border-gray-300 {
            border-color: #4b5563 !important;
        }
        
        html.dark .shadow-lg,
        html.dark .shadow-md,
        html.dark .shadow-2xl {
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5) !important;
        }
        
        html.dark .bg-blue-50 {
            background-color: #1e3a5f !important;
        }
        
        html.dark .bg-blue-100 {
            background-color: #1e3a8a !important;
        }
        
        html.dark .bg-yellow-50 {
            background-color: #4a3800 !important;
        }
        
        html.dark .bg-green-50 {
            background-color: #1a3a2a !important;
        }
        
        html.dark .bg-purple-50 {
            background-color: #2a1a3a !important;
        }
        
        html.dark .bg-red-50 {
            background-color: #3a1a1a !important;
        }
        
        html.dark .bg-amber-50 {
            background-color: #3a2a1a !important;
        }
        
        html.dark .bg-orange-50 {
            background-color: #3a2515 !important;
        }
        
        html.dark .hover\:bg-blue-50:hover {
            background-color: #1e3a5f !important;
        }
        
        html.dark .hover\:bg-gray-50:hover {
            background-color: #374151 !important;
        }
        
        html.dark input {
            background-color: #374151 !important;
            color: #e5e7eb !important;
        }
        
        html.dark code {
            background-color: #374151 !important;
            color: #e5e7eb !important;
        }
        
        html.dark blockquote {
            border-left-color: #3b82f6 !important;
            color: #9ca3af !important;
        }
        
        html.dark .search-result:hover {
            background-color: #374151 !important;
        }
        
        html.dark mark {
            background-color: #fbbf24 !important;
            color: #1f2937 !important;
        }
        
        .smooth-scroll {
            scroll-behavior: smooth;
        }
        
        .toc-link.active {
            color: #3b82f6;
            font-weight: 600;
            border-left: 3px solid #3b82f6;
            padding-left: 1rem;
        }
        
        html.dark .toc-link:hover {
            background-color: #374151 !important;
        }
        
        html.dark .toc-link.active {
            background-color: #1e3a5f !important;
        }
        
        /* Исправление: секции должны быть видимы сразу */
        .section-content {
            opacity: 1;
            transform: translateY(0);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .section-content.fade-in {
            animation: fadeInUp 0.6s ease-out;
        }
        
        .highlight {
            background-color: #fef3c7;
            padding: 0.1rem 0.2rem;
            border-radius: 0.25rem;
        }
        
        @media (max-width: 768px) {
            .mobile-menu {
                transform: translateX(-100%);
                transition: transform 0.3s ease;
            }
            
            .mobile-menu.open {
                transform: translateX(0);
            }
        }
        
        /* Стили для поиска */
        .search-result {
            cursor: pointer;
            transition: background-color 0.2s;
        }
        
        .search-result:hover {
            background-color: #f3f4f6;
        }
        
        /* Прогресс-бар чтения */
        .reading-progress {
            position: fixed;
            top: 0;
            left: 0;
            width: 0;
            height: 3px;
            background: linear-gradient(to right, #3b82f6, #8b5cf6);
            z-index: 9999;
            transition: width 0.1s ease;
        }
        
        /* Стили для цитат */
        blockquote {
            border-left: 4px solid #3b82f6;
            padding-left: 1rem;
            margin-left: 0;
            font-style: italic;
            color: #4b5563;
        }
        
        /* Плавное появление секций */
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .fade-in-up {
            animation: fadeInUp 0.6s ease-out;
        }
    </style>
</head>
<body class="bg-gray-50 text-gray-900 smooth-scroll">
    <!-- Прогресс-бар чтения -->
    <div class="reading-progress" id="readingProgress"></div>
    
    <!-- Header -->
    <header class="bg-white shadow-md sticky top-0 z-50">
        <div class="container mx-auto px-4 py-4">
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                    <button id="mobileMenuBtn" class="md:hidden text-gray-600 hover:text-gray-900">
                        <i class="fas fa-bars text-2xl"></i>
                    </button>
                    <h1 class="text-xl md:text-2xl font-bold text-gray-800">
                        <i class="fas fa-microphone text-blue-500"></i>
                        Борис Черни: Claude Code
                    </h1>
                </div>
                
                <div class="flex items-center space-x-2 md:space-x-4">
                    <button id="themeToggle" class="text-gray-600 hover:text-blue-500 transition" title="Переключить тему">
                        <i class="fas fa-moon text-xl" id="themeIcon"></i>
                    </button>
                    <button id="searchBtn" class="text-gray-600 hover:text-blue-500 transition" title="Поиск (Ctrl+K)">
                        <i class="fas fa-search text-xl"></i>
                    </button>
                    <a href="https://www.youtube.com/watch?v=julbw1JuAz0" target="_blank" rel="noopener noreferrer" 
                       class="hidden sm:flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
                        <i class="fab fa-youtube"></i>
                        <span>Видео</span>
                    </a>
                </div>
            </div>
        </div>
    </header>
    
    <!-- Search Modal -->
    <div id="searchModal" class="fixed inset-0 bg-black bg-opacity-50 z-50 hidden flex items-start justify-center pt-20">
        <div class="bg-white rounded-lg shadow-2xl w-full max-w-2xl mx-4">
            <div class="p-4 border-b">
                <div class="flex items-center space-x-2">
                    <i class="fas fa-search text-gray-400"></i>
                    <input type="text" id="searchInput" 
                           class="flex-1 outline-none text-lg" 
                           placeholder="Поиск по транскрипту...">
                    <button id="closeSearchBtn" class="text-gray-400 hover:text-gray-600">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
            </div>
            <div id="searchResults" class="max-h-96 overflow-y-auto p-4">
                <p class="text-gray-500 text-center">Начните вводить для поиска...</p>
            </div>
        </div>
    </div>
    
    <!-- Main Content -->
    <div class="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        <!-- Sidebar - Table of Contents -->
        <aside id="sidebar" class="md:w-64 lg:w-80 mobile-menu md:sticky md:top-24 md:h-fit bg-white p-6 rounded-lg shadow-lg fixed inset-y-0 left-0 z-40 md:relative overflow-y-auto">
            <div class="flex items-center justify-between mb-4 md:hidden">
                <h2 class="text-lg font-bold">Содержание</h2>
                <button id="closeSidebarBtn" class="text-gray-600">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>
            
            <h2 class="text-lg font-bold mb-4 hidden md:block">
                <i class="fas fa-list text-blue-500 mr-2"></i>
                Содержание
            </h2>
            
            <nav id="toc" class="space-y-2">
                <a href="#intro" class="toc-link block py-2 px-3 text-sm text-gray-600 hover:text-blue-500 hover:bg-blue-50 rounded transition">
                    Вступление
                </a>
                <a href="#part1" class="toc-link block py-2 px-3 text-sm text-gray-600 hover:text-blue-500 hover:bg-blue-50 rounded transition">
                    Часть 1: Pokemon и первые стартапы
                </a>
                <a href="#part2" class="toc-link block py-2 px-3 text-sm text-gray-600 hover:text-blue-500 hover:bg-blue-50 rounded transition">
                    Часть 2: Семь лет в Meta
                </a>
                <a href="#part3" class="toc-link block py-2 px-3 text-sm text-gray-600 hover:text-blue-500 hover:bg-blue-50 rounded transition">
                    Часть 3: Первый пул-реквест в Anthropic
                </a>
                <a href="#part4" class="toc-link block py-2 px-3 text-sm text-gray-600 hover:text-blue-500 hover:bg-blue-50 rounded transition">
                    Часть 4: Рождение Claude Code
                </a>
                <a href="#part5" class="toc-link block py-2 px-3 text-sm text-gray-600 hover:text-blue-500 hover:bg-blue-50 rounded transition">
                    Часть 5: 20-30 PR в день
                </a>
                <a href="#part6" class="toc-link block py-2 px-3 text-sm text-gray-600 hover:text-blue-500 hover:bg-blue-50 rounded transition">
                    Часть 6: Код-ревью в эпоху ИИ
                </a>
                <a href="#part7" class="toc-link block py-2 px-3 text-sm text-gray-600 hover:text-blue-500 hover:bg-blue-50 rounded transition">
                    Часть 7: Архитектура Claude Code
                </a>
                <a href="#part8" class="toc-link block py-2 px-3 text-sm text-gray-600 hover:text-blue-500 hover:bg-blue-50 rounded transition">
                    Часть 8: Культура в Anthropic
                </a>
                <a href="#part9" class="toc-link block py-2 px-3 text-sm text-gray-600 hover:text-blue-500 hover:bg-blue-50 rounded transition">
                    Часть 9: Claude Cowork
                </a>
                <a href="#part10" class="toc-link block py-2 px-3 text-sm text-gray-600 hover:text-blue-500 hover:bg-blue-50 rounded transition">
                    Часть 10: Agent Teams
                </a>
                <a href="#part11" class="toc-link block py-2 px-3 text-sm text-gray-600 hover:text-blue-500 hover:bg-blue-50 rounded transition">
                    Часть 11: Аналогия с печатным станком
                </a>
                <a href="#part12" class="toc-link block py-2 px-3 text-sm text-gray-600 hover:text-blue-500 hover:bg-blue-50 rounded transition">
                    Часть 12: Навыки будущего
                </a>
                <a href="#part13" class="toc-link block py-2 px-3 text-sm text-gray-600 hover:text-blue-500 hover:bg-blue-50 rounded transition">
                    Часть 13: Об идентичности инженера
                </a>
                <a href="#books" class="toc-link block py-2 px-3 text-sm text-gray-600 hover:text-blue-500 hover:bg-blue-50 rounded transition">
                    Книжные рекомендации
                </a>
            </nav>
            
            <div class="mt-6 pt-6 border-t border-gray-200">
                <a href="https://t.me/llm_notes" target="_blank" rel="noopener noreferrer"
                   class="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition">
                    <i class="fab fa-telegram"></i>
                    <span class="text-sm">@llm_notes</span>
                </a>
            </div>
        </aside>
        
        <!-- Main Content -->
        <main class="flex-1 bg-white rounded-lg shadow-lg p-6 md:p-8 lg:p-12">
            <!-- Hero Section -->
            <div id="intro" class="section-content mb-12 fade-in-up">
                <div class="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-lg mb-8">
                    <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                        Борис Черни: Claude Code, будущее разработки и аналогия с печатным станком
                    </h1>
                    <p class="text-lg md:text-xl mb-4">Интервью подкаста «Pragmatic Engineer»</p>
                    <div class="flex flex-wrap gap-4 items-center text-sm">
                        <span><i class="fas fa-user mr-2"></i>Гость: Борис Черни (Anthropic)</span>
                        <span><i class="fas fa-microphone mr-2"></i>Ведущий: Gergely Orosz</span>
                    </div>
                    <div class="mt-6 flex flex-wrap gap-3">
                        <a href="https://www.youtube.com/watch?v=julbw1JuAz0" target="_blank" rel="noopener noreferrer"
                           class="inline-flex items-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition shadow-lg">
                            <i class="fab fa-youtube"></i>
                            <span>Смотреть на YouTube</span>
                        </a>
                    </div>
                </div>
                
                <div class="prose max-w-none">
                    <div class="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-6">
                        <p class="text-gray-700 leading-relaxed">
                            <strong>Транскрипт подготовил:</strong> Дмитрий Жечков 
                            (<a href="https://t.me/llm_notes" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">@llm_notes</a>)
                        </p>
                    </div>
                    
                    <p class="text-lg leading-relaxed text-gray-700 mb-6">
                        Что происходит, когда ты устраиваешься в одну из ведущих AI-лабораторий мира — и твой первый пул-реквест отклоняют? 
                        Не потому что код плохой. А потому что ты написал его вручную.
                    </p>
                    
                    <p class="text-lg leading-relaxed text-gray-700 mb-6">
                        Именно это случилось с Борисом Черни, когда он пришёл в Anthropic. Борис — создатель и технический руководитель Claude Code. 
                        До Anthropic он провёл семь лет в Meta, где отвечал за качество кода в Instagram, Facebook, WhatsApp и Messenger, 
                        и был одним из самых продуктивных авторов и ревьюеров кода в компании.
                    </p>
                    
                    <p class="text-lg leading-relaxed text-gray-700">
                        В этом выпуске мы поговорим о том, как Claude Code вырос из побочного проекта в один из самых быстрорастущих инструментов для разработчиков; 
                        о внутренней дискуссии в Anthropic — выпускать ли его вообще; о рабочем процессе Бориса, при котором он создаёт по 20–30 пул-реквестов в день 
                        без единой строки, написанной вручную; о том, как устроено код-ревью, когда код пишет ИИ; почему Борис считает, что мы живём в эпоху, 
                        сравнимую с изобретением печатного станка; и какие инженерные навыки стали важнее, а какие — уже нет.
                    </p>
                </div>
            </div>

            <!-- Part 1 -->
            <section id="part1" class="section-content mb-12">
                <h2 class="text-2xl md:text-3xl font-bold mb-6 text-gray-800 border-b-2 border-blue-500 pb-2">
                    <i class="fas fa-gamepad text-blue-500 mr-2"></i>
                    Часть 1. Начало пути: Pokemon, калькуляторы и первые стартапы
                </h2>
                
                <div class="space-y-6">
                    <div>
                        <p class="font-semibold text-blue-600 mb-2">Ведущий:</p>
                        <p class="text-gray-700 leading-relaxed">Как ты вообще попал в разработку?</p>
                    </div>
                    
                    <div>
                        <p class="font-semibold text-purple-600 mb-2">Борис:</p>
                        <p class="text-gray-700 leading-relaxed mb-4">
                            Это история двух параллельных путей, которые в какой-то момент пересеклись.
                        </p>
                        <p class="text-gray-700 leading-relaxed mb-4">
                            Где-то лет в тринадцать я начал продавать старые карточки Pokemon на eBay. И обнаружил, что на eBay можно писать HTML. 
                            Я смотрел на чужие объявления и видел: у некоторых — большие яркие шрифты, красивое оформление. 
                            Потом я открыл для себя тег <code class="bg-gray-100 px-2 py-1 rounded">&lt;blink&gt;</code> — и это изменило всё. 
                            Если я вставлял мигающий тег, карточка продавалась за 99 центов вместо 49. Вот так я познакомился с HTML.
                        </p>
                        <p class="text-gray-700 leading-relaxed mb-4">
                            Второй путь — это графические калькуляторы TI-83 в школе. Я довольно быстро сообразил: чтобы лучше отвечать на контрольных по математике, 
                            проще запрограммировать ответы прямо в калькулятор. Сначала я записывал готовые ответы. Потом задания усложнились — 
                            пришлось писать решатели, потому что коэффициенты заранее не знаешь. Когда математика стала ещё сложнее — 
                            пришлось спуститься с BASIC до ассемблера, просто чтобы программа работала быстрее.
                        </p>
                    </div>
                    
                    <div>
                        <p class="font-semibold text-blue-600 mb-2">Ведущий:</p>
                        <p class="text-gray-700 leading-relaxed">То есть в восьмом классе ты уже писал на ассемблере?</p>
                    </div>
                    
                    <div>
                        <p class="font-semibold text-purple-600 mb-2">Борис:</p>
                        <p class="text-gray-700 leading-relaxed mb-4">
                            Примерно так — восьмой, девятый класс. А потом весь класс начал завидовать моему решателю, и я купил маленький последовательный кабель, 
                            чтобы передавать программу одноклассникам. На следующей контрольной все получили пятёрки. Учительница насторожилась, всё выяснила и сказала: 
                            «Ладно, в этот раз прощаю — но больше не нужно».
                        </p>
                        <p class="text-gray-700 leading-relaxed mb-4">
                            Для меня это всегда было предельно практичным делом. В университете я учился на экономиста, потом бросил ради стартапов — 
                            и никогда не думал, что программирование станет профессией. Это был инструмент для создания чего-то полезного.
                        </p>
                        <p class="text-gray-700 leading-relaxed">
                            Первый стартап мы делали с друзьями — обзорный сайт для диспансеров марихуаны. Он неожиданно взлетел. 
                            Потом я заинтересовался химическим анализом этой продукции. После этого было несколько других стартапов, 
                            затем я попал в YC — стал первым сотрудником одного YC-стартапа в Пало-Альто.
                        </p>
                    </div>
                    
                    <div class="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
                        <p class="font-semibold text-yellow-800 mb-2">
                            <i class="fas fa-lightbulb mr-2"></i>Ключевая идея:
                        </p>
                        <p class="text-gray-700 leading-relaxed italic">
                            "Один из ярких примеров — медицинская компания Agile Diagnosis. Я ездил в больницу на мотоцикле, 
                            наблюдал за врачами несколько дней подряд — и понял, почему они не используют наш продукт. 
                            Именно этот процесс — формировать гипотезу, проверять её в реальности, идти за неожиданным результатом — 
                            мне нравился больше всего."
                        </p>
                    </div>
                </div>
            </section>

            <!-- Part 2 -->
            <section id="part2" class="section-content mb-12">
                <h2 class="text-2xl md:text-3xl font-bold mb-6 text-gray-800 border-b-2 border-blue-500 pb-2">
                    <i class="fab fa-meta text-blue-600 mr-2"></i>
                    Часть 2. Семь лет в Meta
                </h2>
                
                <div class="space-y-6">
                    <div>
                        <p class="font-semibold text-blue-600 mb-2">Ведущий:</p>
                        <p class="text-gray-700 leading-relaxed">Ты провёл семь лет в Facebook/Meta с четырьмя повышениями. Расскажи об этом периоде.</p>
                    </div>
                    
                    <div>
                        <p class="font-semibold text-purple-600 mb-2">Борис:</p>
                        <p class="text-gray-700 leading-relaxed mb-4">
                            Меня нанял Влад Клесников в команду Facebook Groups. Это было ещё в эпоху раннего JavaScript — 
                            я пересекался там с людьми, которые впоследствии создали ReactJS. Влад работал над Bolt.js — 
                            фреймворком для менеджера рекламы, из которого вырос React.
                        </p>
                        <p class="text-gray-700 leading-relaxed mb-4">
                            Facebook Groups меня захватил своей миссией — объединять людей с их сообществами. Я сам пришёл на Reddit ещё в подростковом возрасте — 
                            тогда я не знал никого, кто бы программировал, и немного стеснялся этого увлечения. Казалось, это что-то слишком нердовое. 
                            И вдруг обнаружил на Reddit целое сообщество программистов — это был шок и радость одновременно. Именно это я и хотел строить.
                        </p>
                        <p class="text-gray-700 leading-relaxed mb-4">
                            Со временем я стал техлидом Facebook Groups, но роль изменилась: вместо написания кода — документация, координация, делегирование. 
                            Культура компании менялась. Ранняя Facebook-культура «двигайся быстро и ломай вещи» уходила в прошлое — 
                            приходили процессы, политики, обязательная работа с приватностью и безопасностью. Это был момент выплаты накопленного технического долга.
                        </p>
                        <p class="text-gray-700 leading-relaxed mb-4">
                            Затем я провёл несколько лет в Instagram — это произошло почти случайно. Жена получила интересный оффер, пришла ко мне и сказала: 
                            «Нам нужно переехать, ты не против?» Я ответил: «Конечно, мы в технологиях, можно работать откуда угодно. Куда?» 
                            Она сказала: «В Нару». Я спросил: «Где это?» Оказалось — сельская Япония. 2021 год, разница во времени примерно двенадцать часов.
                        </p>
                        <p class="text-gray-700 leading-relaxed">
                            Технологический стек Instagram поразил меня своей чудовищностью — в худшем смысле. После Facebook, который имел лучший в мире веб-стек — 
                            от языка Hack до HHVM, GraphQL, Relay, React — Instagram выглядел как Python с нерабочим тайп-чекером, сломанным «перейти к определению», 
                            с самописным Django и непредсказуемым рантаймом. Ничто по-настоящему не работало.
                        </p>
                    </div>
                    
                    <div class="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                        <p class="font-semibold text-blue-800 mb-2">
                            <i class="fas fa-chart-line mr-2"></i>Better Engineering Program:
                        </p>
                        <p class="text-gray-700 leading-relaxed">
                            "К моменту ухода из Instagram я руководил качеством кода для всей Meta — отвечал за Instagram, Facebook, Messenger, WhatsApp, Reality Labs. 
                            Это была программа Better Engineering: Цукерберг примерно в 2016–2018 году обязал каждого инженера тратить 20% времени на устранение технического долга. 
                            Качество кода давало прирост продуктивности в двузначных процентах."
                        </p>
                    </div>
                </div>
            </section>

            <!-- Part 3 -->
            <section id="part3" class="section-content mb-12">
                <h2 class="text-2xl md:text-3xl font-bold mb-6 text-gray-800 border-b-2 border-blue-500 pb-2">
                    <i class="fas fa-code-branch text-purple-500 mr-2"></i>
                    Часть 3. Приход в Anthropic и первый пул-реквест
                </h2>
                
                <div class="space-y-6">
                    <div>
                        <p class="font-semibold text-blue-600 mb-2">Ведущий:</p>
                        <p class="text-gray-700 leading-relaxed">
                            И вот твой первый пул-реквест в Anthropic отклоняет Адам Вулф — потому что ты написал его вручную?
                        </p>
                    </div>
                    
                    <div>
                        <p class="font-semibold text-purple-600 mb-2">Борис:</p>
                        <p class="text-gray-700 leading-relaxed mb-4">
                            Он был моим «рэмп-бадди» — наставником по адаптации. Когда я решал, куда идти после Meta, я общался со многими компаниями. 
                            Anthropic был очевидным выбором из-за миссии — это то, что лично мне важно больше всего. Я много читаю научную фантастику, 
                            я знаю, насколько плохо может пойти эта история. Мне нужна была организация, где серьёзные люди серьёзно думают о том, 
                            как сделать так, чтобы всё пошло хорошо.
                        </p>
                        <p class="text-gray-700 leading-relaxed mb-4">
                            Итак, я пришёл, взял несколько разгонных задач и написал первый пул-реквест руками — потому что именно так принято писать код. 
                            По крайней мере, так было принято раньше.
                        </p>
                        <p class="text-gray-700 leading-relaxed mb-4">
                            Но в Anthropic уже существовал инструмент — он назывался Clyde, предшественник Claude Code. Очень сырой, на Python, 
                            запускался секунд сорок, совсем не агентный. Но если правильно его промптить и держать под нужным углом — он мог написать код за тебя.
                        </p>
                        <p class="text-gray-700 leading-relaxed">
                            Адам отклонил мой PR и сказал: «Ты должен был использовать Clyde вместо этого». Мне потребовалось полдня, чтобы разобраться с этим инструментом: 
                            нужно было передавать кучу флагов и использовать его правильно. Но потом он выдал рабочий пул-реквест — с одного захода, без итераций.
                        </p>
                    </div>
                    
                    <div class="bg-gradient-to-r from-purple-50 to-blue-50 border-l-4 border-purple-500 p-6 rounded-r-lg">
                        <p class="font-semibold text-purple-800 mb-3 text-lg">
                            <i class="fas fa-star mr-2"></i>Первый «вау»-момент:
                        </p>
                        <p class="text-gray-700 leading-relaxed italic text-lg">
                            "Это был мой первый настоящий «вау»-момент в Anthropic. Я просто не знал, что модель на такое способна. 
                            Я привык к автодополнению строк в IDE — и вдруг она просто делает для тебя рабочий пул-реквест."
                        </p>
                    </div>
                </div>
            </section>

            <!-- Part 4 -->
            <section id="part4" class="section-content mb-12">
                <h2 class="text-2xl md:text-3xl font-bold mb-6 text-gray-800 border-b-2 border-blue-500 pb-2">
                    <i class="fas fa-rocket text-blue-500 mr-2"></i>
                    Часть 4. Рождение Claude Code
                </h2>
                
                <div class="space-y-6">
                    <div>
                        <p class="font-semibold text-blue-600 mb-2">Ведущий:</p>
                        <p class="text-gray-700 leading-relaxed">Как Claude Code появился из твоего хакинга?</p>
                    </div>
                    
                    <div>
                        <p class="font-semibold text-purple-600 mb-2">Борис:</p>
                        <p class="text-gray-700 leading-relaxed mb-4">
                            В какой-то момент я захотел поэкспериментировать с публичным API Anthropic — просто для знакомства. Не хотел делать UI, 
                            хотел быстро что-то сляпать в терминале. Написал маленький bash-инструмент — по сути, чат-приложение в терминале.
                        </p>
                        <p class="text-gray-700 leading-relaxed mb-4">
                            Потом я хотел дать ему инструменты — только что вышел tool use, я понятия не имел, что с этим делать. Дал модели единственный инструмент — bash. 
                            И спросил её: «Какую музыку я сейчас слушаю?» Не зная, может ли она вообще на это ответить.
                        </p>
                        <p class="text-gray-700 leading-relaxed mb-4">
                            Модель написала маленький AppleScript, обратилась к музыкальному плееру, запросила текущий трек — и выдала ответ с одного захода, Sonnet 3.5. 
                            Это был мой второй «вау»-момент буквально за несколько дней.
                        </p>
                    </div>
                    
                    <div class="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
                        <p class="font-semibold text-yellow-800 mb-3">
                            <i class="fas fa-lightbulb mr-2"></i>Ключевой инсайт:
                        </p>
                        <blockquote class="text-gray-700 leading-relaxed">
                            "Я понял главное: модель хочет использовать инструменты. Дай ей инструмент — она придумает, как его применить. 
                            Правильный подход: модель — это сама по себе. Ты даёшь ей инструменты, даёшь программы, позволяешь их запускать и писать. 
                            Не делай из неё компонент большей системы — дай ей делать своё дело."
                        </blockquote>
                    </div>
                    
                    <div>
                        <p class="font-semibold text-blue-600 mb-2">Ведущий:</p>
                        <p class="text-gray-700 leading-relaxed">Была ли внутри Anthropic дискуссия — выпускать ли Claude Code?</p>
                    </div>
                    
                    <div>
                        <p class="font-semibold text-purple-600 mb-2">Борис:</p>
                        <p class="text-gray-700 leading-relaxed mb-4">
                            Да. Когда инструмент распространился внутри компании, был момент совещания: Майк Кригер, Дарио и ещё несколько человек смотрели 
                            на внутренний график использования — он был просто вертикальный. Абсолютно вертикальный. Дарио спросил: 
                            «Как это так быстро выросло? Вы заставляете людей пользоваться?» Я ответил: «Нет — люди голосуют ногами».
                        </p>
                        <p class="text-gray-700 leading-relaxed mb-4">
                            В итоге решили выпустить — чтобы изучать безопасность в реальных условиях. В Anthropic существование как лаборатории обосновано через safety — 
                            через безопасность. Когда ты изучаешь безопасность, ты можешь делать это через выравнивание модели, через синтетические оценки в петри-блюде, 
                            а можешь — изучать поведение в дикой природе. В дикой природе узнаёшь невероятно много.
                        </p>
                        <p class="text-gray-700 leading-relaxed font-semibold text-lg">
                            Сейчас Claude Code пишет около 80% кода в Anthropic в среднем. Мой личный показатель — 100%.
                        </p>
                    </div>
                </div>
            </section>

            <!-- Part 5 -->
            <section id="part5" class="section-content mb-12">
                <h2 class="text-2xl md:text-3xl font-bold mb-6 text-gray-800 border-b-2 border-blue-500 pb-2">
                    <i class="fas fa-tasks text-green-500 mr-2"></i>
                    Часть 5. Рабочий процесс: 20–30 пул-реквестов в день
                </h2>
                
                <div class="space-y-6">
                    <div>
                        <p class="font-semibold text-blue-600 mb-2">Ведущий:</p>
                        <p class="text-gray-700 leading-relaxed">Расскажи о своём рабочем процессе с Claude Code.</p>
                    </div>
                    
                    <div>
                        <p class="font-semibold text-purple-600 mb-2">Борис:</p>
                        <p class="text-gray-700 leading-relaxed mb-4">
                            Правильного единственного способа не существует. Мы специально делаем Claude Code максимально гибким — 
                            у каждого инженера свой рабочий процесс.
                        </p>
                        <p class="text-gray-700 leading-relaxed mb-4">
                            Мой выглядит так: у меня пять вкладок в терминале, каждая — отдельный checkout репозитория. Пять параллельных копий. 
                            Я запускаю Claude Code в каждой — почти всегда начиная в режиме плана (plan mode). Когда вкладки заканчиваются, 
                            переполняюсь в десктопное приложение.
                        </p>
                        <p class="text-gray-700 leading-relaxed mb-4">
                            Десктопное приложение сейчас мне всё больше нравится — там есть встроенная поддержка git worktrees. 
                            Не нужно держать несколько отдельных папок: одна копия репозитория, а Claude автоматически создаёт git worktrees — 
                            изолированные рабочие пространства. Можно работать параллельно без конфликтов до момента слияния.
                        </p>
                        <p class="text-gray-700 leading-relaxed">
                            И неожиданный хит — iOS-приложение. Каждое утро я просыпаюсь и прямо с телефона запускаю несколько агентов. 
                            Это то же самое Claude Code, только работает в облаке. Если честно, я сейчас пишу, наверное, треть — а может и половину — 
                            своего кода с телефона. Полгода назад я бы никогда в это не поверил.
                        </p>
                    </div>
                    
                    <div class="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
                        <p class="font-semibold text-gray-800 mb-3 text-lg">
                            <i class="fas fa-code-branch mr-2"></i>Параллельная работа с агентами:
                        </p>
                        <p class="text-gray-700 leading-relaxed mb-3">
                            "С Opus 4.5 я понял: если сначала получить хороший план, модель почти всегда делает всё с одного захода. 
                            Поэтому мой процесс такой: запускаю первый Claude в plan mode, даю промпт, пока он думает — запускаю второй, третий, четвёртый. 
                            Потом возвращаюсь к первому, когда он закончил."
                        </p>
                    </div>
                    
                    <div>
                        <p class="font-semibold text-blue-600 mb-2">Ведущий:</p>
                        <p class="text-gray-700 leading-relaxed">Сколько пул-реквестов ты делаешь в день и насколько они сложны?</p>
                    </div>
                    
                    <div>
                        <p class="font-semibold text-purple-600 mb-2">Борис:</p>
                        <p class="text-gray-700 leading-relaxed mb-4">
                            По 20–30 в день, и каждый разный — иногда несколько строк, иногда несколько тысяч. В декабре я был в Европе в своеобразном «кодинг-отпуске», 
                            кочевал по разным городам. Это было невероятно весело — я просто кодил весь день каждый день.
                        </p>
                        <p class="text-gray-700 leading-relaxed font-semibold text-lg text-purple-700">
                            Opus 4.5 и Claude Code написали 100% каждого из этих PR, я не отредактировал ни одной строки вручную. 
                            По итогам месяца модель допустила примерно два бага — а если бы писал я сам, было бы двадцать.
                        </p>
                    </div>
                </div>
            </section>

            <!-- Part 6 -->
            <section id="part6" class="section-content mb-12">
                <h2 class="text-2xl md:text-3xl font-bold mb-6 text-gray-800 border-b-2 border-blue-500 pb-2">
                    <i class="fas fa-search text-blue-500 mr-2"></i>
                    Часть 6. Код-ревью в эпоху ИИ
                </h2>
                
                <div class="space-y-6">
                    <div>
                        <p class="font-semibold text-blue-600 mb-2">Ведущий:</p>
                        <p class="text-gray-700 leading-relaxed">Как устроено код-ревью, когда код пишет ИИ?</p>
                    </div>
                    
                    <div>
                        <p class="font-semibold text-purple-600 mb-2">Борис:</p>
                        <p class="text-gray-700 leading-relaxed mb-4">
                            Расскажу, как это раньше работало у меня лично. Я всегда был одним из самых продуктивных ревьюеров кода в Meta — 
                            отчасти просто потому что жил в другом часовом поясе и у меня не было встреч.
                        </p>
                        <p class="text-gray-700 leading-relaxed mb-4">
                            Мой подход: каждый раз, когда в чужом PR я замечал проблему — плохое название параметра, антипаттерн React, что угодно — 
                            я записывал это в таблицу. Как только какой-то пункт встречался три-четыре раза, я писал lint-правило для него. 
                            Я всегда стараюсь автоматизировать себя — потому что это освобождает время для работы, которую я действительно люблю.
                        </p>
                        <p class="text-gray-700 leading-relaxed mb-4">
                            Сегодня это выглядит похоже, но немного иначе. Когда Claude Code пишет код, он обычно сам запускает тесты — или пишет новые. 
                            Когда мы вносим изменения в сам Claude Code, Claude тестирует себя: запускает себя в subprocess, проверяет сам себя end-to-end. 
                            С Opus 4.5 это началось само собой — модель просто начала это делать спонтанно, без нашего указания.
                        </p>
                        <p class="text-gray-700 leading-relaxed">
                            Каждый пул-реквест в Anthropic проходит код-ревью от Claude Code через ClaudeP — это агентный SDK. Это ловит примерно 80% багов. 
                            Первый круг ревью — ИИ, второй — человек-инженер. Человек всегда присутствует в процессе одобрения изменений.
                        </p>
                    </div>
                    
                    <div class="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                        <p class="font-semibold text-blue-800 mb-3">
                            <i class="fas fa-magic mr-2"></i>Claude пишет линт-правила:
                        </p>
                        <p class="text-gray-700 leading-relaxed">
                            "Claude Code сейчас пишет линт-правила лучше любого инженера. Если коллега делает PR с чем-то, что явно поддаётся линтингу, 
                            я просто пишу <code class="bg-white px-2 py-1 rounded">@Claude, напиши линт-правило для этого</code> прямо в комментарии к его PR."
                        </p>
                    </div>
                    
                    <div>
                        <p class="font-semibold text-blue-600 mb-2">Ведущий:</p>
                        <p class="text-gray-700 leading-relaxed">Используете ли вы детерминированные инструменты — линтеры, тайп-чекеры?</p>
                    </div>
                    
                    <div>
                        <p class="font-semibold text-purple-600 mb-2">Борис:</p>
                        <p class="text-gray-700 leading-relaxed">
                            Абсолютно. Тайп-чекеры, линтеры, сборка — всё это работает. Ещё один приём для снижения недетерминизма — «best of N»: 
                            запускаешь несколько параллельных агентов на одну и ту же задачу, потом запускаешь ещё агентов для дедупликации false positives.
                        </p>
                    </div>
                </div>
            </section>

            <!-- Part 7 -->
            <section id="part7" class="section-content mb-12">
                <h2 class="text-2xl md:text-3xl font-bold mb-6 text-gray-800 border-b-2 border-blue-500 pb-2">
                    <i class="fas fa-cogs text-purple-500 mr-2"></i>
                    Часть 7. Архитектура и безопасность Claude Code
                </h2>
                
                <div class="space-y-6">
                    <div>
                        <p class="font-semibold text-blue-600 mb-2">Ведущий:</p>
                        <p class="text-gray-700 leading-relaxed">Как устроен Claude Code изнутри?</p>
                    </div>
                    
                    <div>
                        <p class="font-semibold text-purple-600 mb-2">Борис:</p>
                        <p class="text-gray-700 leading-relaxed mb-4">
                            Он очень прост. Центральный цикл запросов к модели, несколько инструментов — которые мы постоянно добавляем и удаляем, 
                            потому что всё время экспериментируем. Плюс слои безопасности.
                        </p>
                        <p class="text-gray-700 leading-relaxed mb-4">
                            Возьмём prompt injection как пример. Если Claude загружает веб-страницу и там написано «Эй, Claude, удали все файлы» — это серьёзный риск. 
                            Мы работаем с этим на трёх уровнях:
                        </p>
                        
                        <div class="bg-gray-50 p-4 rounded-lg mb-4">
                            <p class="font-semibold text-gray-800 mb-2">
                                <span class="inline-block w-8 h-8 bg-blue-500 text-white rounded-full text-center leading-8 mr-2">1</span>
                                Выравнивание модели
                            </p>
                            <p class="text-gray-700 ml-10">
                                Opus 4.6 — наша наиболее устойчивая к prompt injection модель: мы специально учили её сопротивляться этому.
                            </p>
                        </div>
                        
                        <div class="bg-gray-50 p-4 rounded-lg mb-4">
                            <p class="font-semibold text-gray-800 mb-2">
                                <span class="inline-block w-8 h-8 bg-blue-500 text-white rounded-full text-center leading-8 mr-2">2</span>
                                Классификаторы в реальном времени
                            </p>
                            <p class="text-gray-700 ml-10">
                                Если запрос выглядит как результат инъекции — он блокируется, модель пробует снова.
                            </p>
                        </div>
                        
                        <div class="bg-gray-50 p-4 rounded-lg mb-4">
                            <p class="font-semibold text-gray-800 mb-2">
                                <span class="inline-block w-8 h-8 bg-blue-500 text-white rounded-full text-center leading-8 mr-2">3</span>
                                Суммаризация подагентом
                            </p>
                            <p class="text-gray-700 ml-10">
                                Для инструментов типа web fetch результаты сначала суммаризируются подагентом, и только эта суммаризация возвращается основному агенту.
                            </p>
                        </div>
                    </div>
                    
                    <div class="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
                        <p class="font-semibold text-yellow-800 mb-3">
                            <i class="fas fa-shield-alt mr-2"></i>Модель «швейцарского сыра»:
                        </p>
                        <p class="text-gray-700 leading-relaxed">
                            "Не один механизм, а слоистая защита. Каждый дополнительный слой увеличивает вероятность поймать угрозу."
                        </p>
                    </div>
                    
                    <div>
                        <p class="font-semibold text-purple-600 mb-2">О RAG — почему отказались:</p>
                        <p class="text-gray-700 leading-relaxed mb-4">
                            Я начинал с локальной векторной базы данных и облачной embedding-моделью. Это работало неплохо, но выявились серьёзные проблемы: 
                            код выходил из синхронизации с индексом, непонятно как управлять разрешениями, как защитить данные пользователей от потенциального 
                            недобросовестного администратора.
                        </p>
                        <p class="text-gray-700 leading-relaxed">
                            В итоге выяснилось, что агентный поиск превосходит всё остальное. «Агентный поиск» — это просто glob и grep. 
                            Модель достаточно умна, чтобы эффективно ими пользоваться. Вдохновил меня опыт Instagram: там «перейти к определению» не работало, 
                            и инженеры научились искать функции через глобальный индекс с помощью шаблонов вроде <code class="bg-gray-100 px-2 py-1 rounded">функция(</code> — 
                            и это прекрасно работало.
                        </p>
                    </div>
                </div>
            </section>

            <!-- Part 8 -->
            <section id="part8" class="section-content mb-12">
                <h2 class="text-2xl md:text-3xl font-bold mb-6 text-gray-800 border-b-2 border-blue-500 pb-2">
                    <i class="fas fa-users text-blue-500 mr-2"></i>
                    Часть 8. Культура разработки в Anthropic
                </h2>
                
                <div class="space-y-6">
                    <div>
                        <p class="font-semibold text-blue-600 mb-2">Ведущий:</p>
                        <p class="text-gray-700 leading-relaxed">
                            Расскажи о том, как устроена разработка в Anthropic — например, почему у всех одинаковые должности?
                        </p>
                    </div>
                    
                    <div>
                        <p class="font-semibold text-purple-600 mb-2">Борис:</p>
                        <p class="text-gray-700 leading-relaxed mb-4">
                            У всех технических сотрудников одна должность — Member of Technical Staff. Это признание того, что все занимаются примерно одним и тем же 
                            и большинство является дженералистами. Инженер в Anthropic может одновременно писать код, делать дизайн, разговаривать с пользователями, 
                            писать требования к продукту, проводить исследования.
                        </p>
                        <p class="text-gray-700 leading-relaxed mb-4">
                            Без единых должностей по умолчанию ты смотришь на имя человека в Slack и думаешь: «Software Engineer — значит, спрошу только о технических вещах». 
                            Когда у всех написано Member of Technical Staff — ты по умолчанию предполагаешь, что человек делает всё. Это переворачивает отношения между людьми.
                        </p>
                        <p class="text-gray-700 leading-relaxed">
                            Думаю, это также взгляд в будущее — именно туда движется программная инженерия и большинство других профессий: всё больше дженерализма.
                        </p>
                    </div>
                    
                    <div class="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
                        <p class="font-semibold text-gray-800 mb-3 text-lg">
                            <i class="fas fa-flask mr-2"></i>О прототипировании вместо PRD:
                        </p>
                        <p class="text-gray-700 leading-relaxed mb-3">
                            "У нас не принято писать Product Requirements Documents. Культура команды — мы не пишем, мы показываем. Всё — прототип, 
                            причём сразу несколько версий."
                        </p>
                        <p class="text-gray-700 leading-relaxed font-semibold">
                            Стоимость создания прототипа упала настолько, что теперь правильнее делать двадцать прототипов за полтора дня, 
                            чем три прототипа за неделю.
                        </p>
                    </div>
                    
                    <div>
                        <p class="font-semibold text-purple-600 mb-2">Об агентах в рабочих процессах:</p>
                        <p class="text-gray-700 leading-relaxed">
                            Один из лучших примеров — запуск системы плагинов. Дейзи на выходных запустила рой агентов с заданием: придумать спецификацию, 
                            создать доску задач в Asana, разбить на задачи, распределить между агентами и реализовать. Запустила контейнер в опасном режиме и оставила 
                            на всё выходные. Агенты создали около ста задач на доске и реализовали их. Это примерно то, что мы и выпустили как систему плагинов.
                        </p>
                    </div>
                </div>
            </section>

            <!-- Part 9 -->
            <section id="part9" class="section-content mb-12">
                <h2 class="text-2xl md:text-3xl font-bold mb-6 text-gray-800 border-b-2 border-blue-500 pb-2">
                    <i class="fas fa-briefcase text-green-500 mr-2"></i>
                    Часть 9. Claude Cowork — для не-инженеров
                </h2>
                
                <div class="space-y-6">
                    <div>
                        <p class="font-semibold text-blue-600 mb-2">Ведущий:</p>
                        <p class="text-gray-700 leading-relaxed">Расскажи о Claude Cowork — он был построен за десять дней?</p>
                    </div>
                    
                    <div>
                        <p class="font-semibold text-purple-600 mb-2">Борис:</p>
                        <p class="text-gray-700 leading-relaxed mb-4">
                            Команда была очень маленькой, несколько человек на протяжении долгого времени. Мы видели скрытый спрос: люди, которые не являются инженерами, 
                            прыгали через обручи, чтобы использовать инструмент, который не был для них создан. Кто-то использовал Claude Code для мониторинга помидорных 
                            растений с веб-камерой. Кто-то восстанавливал свадебные фотографии с испорченного диска. Наша финансовая команда, команда продаж — все использовали его.
                        </p>
                        <p class="text-gray-700 leading-relaxed mb-4">
                            Claude Code доступен в терминале, в IDE, в iOS/Android, в десктопном приложении, на веб. Но ни один из этих форматов не создан для не-инженеров. 
                            Оставался продуктовый пробел.
                        </p>
                        <p class="text-gray-700 leading-relaxed mb-4">
                            Cowork — это Claude Code с защитными ограждениями. Он работает в виртуальной машине, что само по себе повышает безопасность. 
                            Работает вместе с Chrome-расширением, которое позволяет ему взаимодействовать с инструментами в браузере — таблицами, Slack, чем угодно.
                        </p>
                        <p class="text-gray-700 leading-relaxed mb-4">
                            Я сам использую его каждую неделю для управления проектами команды: прошу Cowork проверить таблицу статусов, найти незаполненные строки 
                            и написать соответствующим инженерам в Slack. Он открывает вкладку с таблицей, вкладку со Slack — и всё делает сам. Почти всегда с первого раза.
                        </p>
                        <p class="text-gray-700 leading-relaxed font-semibold">
                            Построили это примерно за десять дней, полностью с помощью Claude Code. Рост гораздо круче, чем у Claude Code в начале — 
                            это оказалось мгновенным хитом, чего мы не ожидали.
                        </p>
                    </div>
                </div>
            </section>

            <!-- Part 10 -->
            <section id="part10" class="section-content mb-12">
                <h2 class="text-2xl md:text-3xl font-bold mb-6 text-gray-800 border-b-2 border-blue-500 pb-2">
                    <i class="fas fa-network-wired text-purple-500 mr-2"></i>
                    Часть 10. Agent Teams — координированные рои
                </h2>
                
                <div class="space-y-6">
                    <div>
                        <p class="font-semibold text-blue-600 mb-2">Ведущий:</p>
                        <p class="text-gray-700 leading-relaxed">Вы только что запустили Agent Teams — как до этого дошли?</p>
                    </div>
                    
                    <div>
                        <p class="font-semibold text-purple-600 mb-2">Борис:</p>
                        <p class="text-gray-700 leading-relaxed mb-4">
                            Ключевая идея — «некоррелированные контекстные окна». Когда у тебя несколько агентов, каждый начинает со свежим контекстом — 
                            они не знают, что делали другие (кроме специально переданной информации). Это даёт преимущество: несколько агентов с разными точками зрения 
                            решают задачу независимо, а потом результаты синтезируются.
                        </p>
                        <p class="text-gray-700 leading-relaxed mb-4">
                            Это форма вычислений в момент инференса (test-time compute). Мы экспериментировали с этим с сентября-октября, но с Opus 4.6 что-то щёлкнуло — 
                            модель по-настоящему научилась это использовать. Иногда наблюдаешь, как агенты переписываются друг с другом, обсуждают подходы — 
                            это выглядит удивительно по-человечески.
                        </p>
                        <p class="text-gray-700 leading-relaxed">
                            Система плагинов, которую я упоминал — это первый большой пример. Мы рекомендуем это для сложных задач, не для каждой.
                        </p>
                    </div>
                </div>
            </section>

            <!-- Part 11 -->
            <section id="part11" class="section-content mb-12">
                <h2 class="text-2xl md:text-3xl font-bold mb-6 text-gray-800 border-b-2 border-blue-500 pb-2">
                    <i class="fas fa-book text-amber-600 mr-2"></i>
                    Часть 11. Аналогия с печатным станком
                </h2>
                
                <div class="space-y-6">
                    <div>
                        <p class="font-semibold text-blue-600 mb-2">Ведущий:</p>
                        <p class="text-gray-700 leading-relaxed">
                            Андрей Карпаты написал, что никогда не чувствовал себя настолько отставшим как программист, как сейчас. 
                            Ты поделился историей о баге памяти, который модель исправила с одного раза. Как ты справляешься с этим ощущением?
                        </p>
                    </div>
                    
                    <div>
                        <p class="font-semibold text-purple-600 mb-2">Борис:</p>
                        <p class="text-gray-700 leading-relaxed mb-4">
                            Это то, с чем я по-настоящему борюсь. Модель улучшается так быстро, что идеи, которые работали со старой моделью, 
                            могут не работать с новой. А вещи, которые не работали — могут заработать. У меня просто нет опыта работы с такой быстро меняющейся технологией. 
                            Это новый навык, который мне пришлось осваивать.
                        </p>
                        <p class="text-gray-700 leading-relaxed mb-4">
                            Нужно постоянно приходить с мышлением новичка. С интеллектуальным смирением. Раньше, если кто-то предлагал идею, которую мы уже пробовали, 
                            реакция была: «Мы это проверяли — не работает». Теперь это впервые в истории — время, когда одну и ту же идею стоит пробовать снова каждые 
                            несколько месяцев, потому что модель улучшилась.
                        </p>
                    </div>
                    
                    <div class="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 p-8 rounded-r-lg">
                        <p class="font-bold text-amber-900 mb-4 text-xl">
                            <i class="fas fa-scroll mr-2"></i>Метафора печатного станка:
                        </p>
                        <p class="text-gray-700 leading-relaxed mb-4">
                            "В 1400-х годах в Европе была группа писцов, которые умели писать. Это было искусством — годы обучения, специальное оборудование, 
                            нужен был покровитель. Буквально меньше одного процента населения Европы было грамотным. Причём сами короли нередко не умели 
                            ни читать, ни писать — писцы работали на них."
                        </p>
                        <p class="text-gray-700 leading-relaxed mb-4">
                            "Потом появился печатный станок. За следующие 30–50 лет стоимость печатных материалов упала примерно в сто раз. 
                            Количество печатных материалов выросло в десять тысяч раз за следующие 50–100 лет. Грамотность в конечном счёте достигла 70% — 
                            но на это ушло ещё 200–300 лет."
                        </p>
                        <p class="text-gray-700 leading-relaxed font-semibold text-lg">
                            "Но эффект — когда что-то, доступное единицам, становится доступным всем — именно это. Ничего из того, что нас окружает, 
                            не существовало бы без массовой грамотности. Никто в 1400-х годах не предсказал бы, что когда-нибудь появится микрофон."
                        </p>
                    </div>
                    
                    <div>
                        <p class="font-semibold text-blue-600 mb-2">Ведущий:</p>
                        <p class="text-gray-700 leading-relaxed">
                            Интересно, что некоторые короли были безграмотными и нанимали писцов. По аналогии — у нас есть владельцы бизнеса, 
                            которые знают, что хотят построить, и нанимают инженеров, потому что сами не могут писать код. Всегда был этот разрыв между идеей и человеком. 
                            Что происходит, когда этот разрыв исчезает?
                        </p>
                    </div>
                    
                    <div>
                        <p class="font-semibold text-purple-600 mb-2">Борис:</p>
                        <p class="text-gray-700 leading-relaxed mb-4">
                            Писцы не исчезли. Они перестали быть писцами — но возникла категория писателей и авторов. Эти люди теперь существуют. 
                            А причина — рынок литературы просто огромно расширился.
                        </p>
                        <p class="text-gray-700 leading-relaxed font-semibold text-lg text-purple-700">
                            И самое захватывающее для меня — абсолютно невозможно сказать сегодня, что именно появится в результате этого перехода. 
                            Экономика, которую мы знаем, не существовала бы без массовой грамотности. Что появится, когда создавать станет доступно каждому?
                        </p>
                    </div>
                </div>
            </section>

            <!-- Part 12 -->
            <section id="part12" class="section-content mb-12">
                <h2 class="text-2xl md:text-3xl font-bold mb-6 text-gray-800 border-b-2 border-blue-500 pb-2">
                    <i class="fas fa-graduation-cap text-blue-500 mr-2"></i>
                    Часть 12. Навыки: что важно сейчас, что уходит
                </h2>
                
                <div class="space-y-6">
                    <div>
                        <p class="font-semibold text-blue-600 mb-2">Ведущий:</p>
                        <p class="text-gray-700 leading-relaxed">Что из инженерных навыков стало ценнее, что — потеряло значение?</p>
                    </div>
                    
                    <div>
                        <p class="font-semibold text-purple-600 mb-2">Борис:</p>
                        <div class="space-y-4">
                            <div class="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
                                <p class="font-semibold text-red-800 mb-2">
                                    <i class="fas fa-arrow-down mr-2"></i>Можно оставить позади:
                                </p>
                                <p class="text-gray-700 leading-relaxed">
                                    Сильные убеждения о стиле кода, выборе языков, фреймворках. Я не дождусь, когда мы наконец перестанем вести эти бесконечные дебаты — 
                                    потому что модель может использовать любой язык и любой фреймворк, и если тебе что-то не нравится, она просто переписывает.
                                </p>
                            </div>
                            
                            <div class="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                                <p class="font-semibold text-green-800 mb-2">
                                    <i class="fas fa-check mr-2"></i>Всё ещё важно:
                                </p>
                                <p class="text-gray-700 leading-relaxed">
                                    Методичность и гипотетическое мышление. Это важно и в дизайне продукта в эпоху тотальных изменений, 
                                    и в ежедневном инженерном труде — например, в отладке. Модель может помочь, но пока ещё нужен человек с этим навыком.
                                </p>
                            </div>
                            
                            <div class="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                                <p class="font-semibold text-blue-800 mb-2">
                                    <i class="fas fa-arrow-up mr-2"></i>Стало ценнее:
                                </p>
                                <ul class="text-gray-700 leading-relaxed space-y-2 ml-4">
                                    <li><strong>Любопытство и готовность выходить за пределы своей зоны.</strong> Инженер, который понимает бизнес, может создавать выдающиеся продукты.</li>
                                    <li><strong>Мультидисциплинарность.</strong> Я думаю, следующий стартап на триллион долларов может сделать один человек, 
                                    чей мозг умеет думать сразу через инженерию, продукт и бизнес.</li>
                                    <li><strong>Короткий интервал внимания (!).</strong> Раньше говорили: «Умение глубоко сосредотачиваться критически важно». 
                                    Сейчас моя работа — это прыжки между Клодами. Управление агентами. Не глубокая работа, а насколько хорошо ты переключаешься 
                                    между множеством контекстов. В каком-то смысле — год ADHD.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <p class="font-semibold text-blue-600 mb-2">Ведущий:</p>
                        <p class="text-gray-700 leading-relaxed">Можно добавить — адаптивность. Ты открыт к постоянной смене рабочего стиля.</p>
                    </div>
                    
                    <div>
                        <p class="font-semibold text-purple-600 mb-2">Борис:</p>
                        <p class="text-gray-700 leading-relaxed font-semibold">
                            Да, абсолютно. И это единственное, в чём можно быть уверен: когда выйдет следующая модель — всё изменится снова. 
                            Нужно быть любопытным и открытым к адаптации.
                        </p>
                    </div>
                </div>
            </section>

            <!-- Part 13 -->
            <section id="part13" class="section-content mb-12">
                <h2 class="text-2xl md:text-3xl font-bold mb-6 text-gray-800 border-b-2 border-blue-500 pb-2">
                    <i class="fas fa-user-tie text-purple-500 mr-2"></i>
                    Часть 13. О самоидентичности инженера
                </h2>
                
                <div class="space-y-6">
                    <div>
                        <p class="font-semibold text-blue-600 mb-2">Ведущий:</p>
                        <p class="text-gray-700 leading-relaxed">
                            Многие разработчики вложили годы в то, чтобы стать хорошими программистами. Для многих это стало частью идентичности. 
                            И сейчас что-то, что казалось незыблемым, очень быстро меняется. Как ты это переживаешь?
                        </p>
                    </div>
                    
                    <div>
                        <p class="font-semibold text-purple-600 mb-2">Борис:</p>
                        <p class="text-gray-700 leading-relaxed mb-4">
                            Это был вопрос и для меня. Кодирование когда-то было для меня предельно практичной вещью — инструментом. 
                            Потом я по-настоящему влюбился в искусство программирования: языки, системы типов, инструменты сами по себе.
                        </p>
                        <p class="text-gray-700 leading-relaxed mb-4">
                            Я написал первую книгу по TypeScript для O'Reilly. Однажды в маленьком японском городке я зашёл в книжный магазин и нашёл её в переводе на японский. 
                            Это был один из самых крутых моментов в моей жизни. А потом понял, что уже не помню TypeScript — последние несколько лет писал только на Python.
                        </p>
                        <p class="text-gray-700 leading-relaxed mb-4">
                            Я основал крупнейший митап по TypeScript в мире — в Сан-Франциско. Встречался с людьми, которых считал героями. 
                            TypeScript прекрасен своей системой типов: условные типы, литеральные типы — Андерс Хейлсберг довёл до крайностей то, 
                            что не встречается даже в Haskell. Это настоящая красота.
                        </p>
                        <p class="text-gray-700 leading-relaxed mb-4">
                            Но в конечном счёте это практическая вещь. Средство для создания чего-то. Не самоцель.
                        </p>
                        <p class="text-gray-700 leading-relaxed font-semibold text-lg">
                            И знаешь, когда я пишу код сейчас — или когда его пишет модель — я всё равно думаю сначала в типах. Что такое сигнатура типа? 
                            Это важнее самого кода. Эта часть никуда не исчезла.
                        </p>
                    </div>
                </div>
            </section>

            <!-- Books -->
            <section id="books" class="section-content mb-12">
                <h2 class="text-2xl md:text-3xl font-bold mb-6 text-gray-800 border-b-2 border-blue-500 pb-2">
                    <i class="fas fa-book-open text-amber-500 mr-2"></i>
                    Книжные рекомендации
                </h2>
                
                <div class="space-y-6">
                    <div>
                        <p class="font-semibold text-purple-600 mb-2">Борис:</p>
                        <p class="text-gray-700 leading-relaxed mb-4">Я большой любитель научной фантастики.</p>
                    </div>
                    
                    <div class="grid md:grid-cols-2 gap-6">
                        <div class="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                            <h3 class="font-bold text-lg mb-2 text-blue-900">
                                <i class="fas fa-book mr-2"></i>Лю Цысинь
                            </h3>
                            <p class="text-gray-700 leading-relaxed">
                                Все знают «Задачу трёх тел», но у него есть потрясающие сборники рассказов, которые я очень рекомендую.
                            </p>
                        </div>
                        
                        <div class="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
                            <h3 class="font-bold text-lg mb-2 text-purple-900">
                                <i class="fas fa-book mr-2"></i>«Accelerando» — Чарльз Стросс
                            </h3>
                            <p class="text-gray-700 leading-relaxed">
                                Идеальная книга для тех, кто хочет погрузиться в твёрдую научную фантастику. Это по сути дорожная карта следующих пятидесяти лет. 
                                Книга невероятно точно передаёт ощущение этого нарастающего темпа — quickening, quickening, quickening — которое мы чувствуем прямо сейчас.
                            </p>
                        </div>
                        
                        <div class="bg-green-50 p-6 rounded-lg border-l-4 border-green-500 md:col-span-2">
                            <h3 class="font-bold text-lg mb-2 text-green-900">
                                <i class="fas fa-book mr-2"></i>«Функциональное программирование в Scala»
                            </h3>
                            <p class="text-gray-700 leading-relaxed">
                                Даже если выбор языка больше не имеет значения, эта книга учит думать типами. Обязательно делайте все упражнения — 
                                я прошёл их, наверное, три раза. Это вбивает функциональное мышление в голову на уровне рефлексов.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Footer -->
            <div class="mt-12 pt-8 border-t-2 border-gray-200">
                <div class="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-lg">
                    <h3 class="text-xl font-bold mb-4 text-gray-800">
                        <i class="fas fa-quote-left mr-2 text-blue-500"></i>
                        Послесловие ведущего
                    </h3>
                    <div class="space-y-4 text-gray-700 leading-relaxed">
                        <p>
                            Идея, к которой я постоянно возвращаюсь — аналогия с печатным станком. Средневековые писцы были крошечной элитой, умевшей писать. 
                            Их нанимали короли, сами нередко безграмотные. Мы, разработчики, возможно, находимся в похожем положении сегодня.
                        </p>
                        <p>
                            Но Борис говорит: писцы не исчезли. Они стали писателями и авторами. И весь рынок письменного слова расширился до масштабов, 
                            которые никто не мог предвидеть.
                        </p>
                        <p>
                            Меня также поразило, как команда Claude Code строит программное обеспечение: без PRD, без обязательных тикетных систем, 
                            дизайнеры и data scientists и финансисты — все пишут код, десятки и сотни прототипов до выпуска фичи. 
                            Борис создаёт 20–30 пул-реквестов в день без единой ручной строки — при этом в процессе действуют разные уровни верификации.
                        </p>
                        <p class="font-semibold text-lg text-purple-700">
                            Будущее уже здесь — просто распределено неравномерно.
                        </p>
                    </div>
                </div>
                
                <div class="mt-8 text-center text-sm text-gray-600">
                    <p class="mb-2">
                        <i class="fas fa-file-alt mr-2"></i>
                        Транскрипт подготовлен на основе интервью подкаста «Pragmatic Engineer» с Борисом Черни
                    </p>
                    <p>
                        <i class="fas fa-user mr-2"></i>
                        Транскрипт: <a href="https://t.me/llm_notes" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">Дмитрий Жечков (@llm_notes)</a>
                    </p>
                    <p class="mt-2">
                        <i class="fab fa-youtube mr-2"></i>
                        <a href="https://www.youtube.com/watch?v=julbw1JuAz0" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">
                            Оригинал видео на YouTube
                        </a>
                    </p>
                </div>
            </div>
        </main>
    </div>
    
    <!-- Back to Top Button -->
    <button id="backToTop" class="fixed bottom-8 right-8 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition transform scale-0 hover:scale-110">
        <i class="fas fa-arrow-up text-xl"></i>
    </button>
    
    <script src="/static/app.js"></script>
</body>
</html>
  `)
})

export default app
