// Interactive Transcript Application
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const sidebar = document.getElementById('sidebar');
    const closeSidebarBtn = document.getElementById('closeSidebarBtn');
    const searchBtn = document.getElementById('searchBtn');
    const searchModal = document.getElementById('searchModal');
    const closeSearchBtn = document.getElementById('closeSearchBtn');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const backToTop = document.getElementById('backToTop');
    const tocLinks = document.querySelectorAll('.toc-link');
    const sections = document.querySelectorAll('.section-content');
    const readingProgress = document.getElementById('readingProgress');
    
    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            sidebar.classList.add('open');
        });
    }
    
    if (closeSidebarBtn) {
        closeSidebarBtn.addEventListener('click', function() {
            sidebar.classList.remove('open');
        });
    }
    
    // Close sidebar when clicking on a link (mobile)
    tocLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 768) {
                sidebar.classList.remove('open');
            }
        });
    });
    
    // Search functionality
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            searchModal.classList.remove('hidden');
            searchModal.classList.add('flex');
            setTimeout(() => searchInput.focus(), 100);
        });
    }
    
    if (closeSearchBtn) {
        closeSearchBtn.addEventListener('click', function() {
            searchModal.classList.add('hidden');
            searchModal.classList.remove('flex');
            searchInput.value = '';
            searchResults.innerHTML = '<p class="text-gray-500 text-center">Начните вводить для поиска...</p>';
        });
    }
    
    // Close search on Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && searchModal.classList.contains('flex')) {
            closeSearchBtn.click();
        }
    });
    
    // Close search when clicking outside
    searchModal.addEventListener('click', function(e) {
        if (e.target === searchModal) {
            closeSearchBtn.click();
        }
    });
    
    // Search implementation
    let searchTimeout;
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            const query = this.value.trim().toLowerCase();
            
            if (query.length < 2) {
                searchResults.innerHTML = '<p class="text-gray-500 text-center">Начните вводить для поиска...</p>';
                return;
            }
            
            searchTimeout = setTimeout(() => {
                performSearch(query);
            }, 300);
        });
    }
    
    function performSearch(query) {
        const results = [];
        
        sections.forEach(section => {
            const sectionId = section.id;
            const sectionTitle = section.querySelector('h2')?.textContent || '';
            const textContent = section.textContent.toLowerCase();
            
            if (textContent.includes(query)) {
                // Find context around the match
                const index = textContent.indexOf(query);
                const start = Math.max(0, index - 100);
                const end = Math.min(textContent.length, index + query.length + 100);
                let context = textContent.substring(start, end);
                
                // Trim to complete words
                context = context.replace(/^\S+\s/, '').replace(/\s\S+$/, '');
                
                // Highlight the match
                const highlightedContext = highlightMatch(context, query);
                
                results.push({
                    id: sectionId,
                    title: sectionTitle,
                    context: highlightedContext
                });
            }
        });
        
        displaySearchResults(results, query);
    }
    
    function highlightMatch(text, query) {
        const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
        return text.replace(regex, '<mark class="bg-yellow-300 font-semibold">$1</mark>');
    }
    
    function escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    
    function displaySearchResults(results, query) {
        if (results.length === 0) {
            searchResults.innerHTML = `
                <div class="text-center py-8">
                    <i class="fas fa-search text-gray-300 text-4xl mb-3"></i>
                    <p class="text-gray-500">Ничего не найдено по запросу "<strong>${escapeHtml(query)}</strong>"</p>
                </div>
            `;
            return;
        }
        
        const html = `
            <div class="space-y-3">
                <p class="text-sm text-gray-600 mb-4">Найдено результатов: <strong>${results.length}</strong></p>
                ${results.map(result => `
                    <div class="search-result p-4 border border-gray-200 rounded-lg hover:shadow-md transition" 
                         data-section-id="${result.id}">
                        <h3 class="font-semibold text-blue-600 mb-2">
                            <i class="fas fa-link text-sm mr-2"></i>${result.title}
                        </h3>
                        <p class="text-sm text-gray-700 leading-relaxed">
                            ...${result.context}...
                        </p>
                    </div>
                `).join('')}
            </div>
        `;
        
        searchResults.innerHTML = html;
        
        // Add click handlers to results
        document.querySelectorAll('.search-result').forEach(resultEl => {
            resultEl.addEventListener('click', function() {
                const sectionId = this.getAttribute('data-section-id');
                const section = document.getElementById(sectionId);
                
                if (section) {
                    closeSearchBtn.click();
                    setTimeout(() => {
                        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        // Flash highlight
                        section.style.backgroundColor = '#fef3c7';
                        setTimeout(() => {
                            section.style.transition = 'background-color 1s';
                            section.style.backgroundColor = '';
                        }, 500);
                    }, 100);
                }
            });
        });
    }
    
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    // Active section highlighting in TOC
    function updateActiveTocLink() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            if (window.pageYOffset >= sectionTop) {
                currentSection = section.id;
            }
        });
        
        tocLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Intersection Observer for section animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Back to top button
    function updateBackToTopButton() {
        if (window.pageYOffset > 500) {
            backToTop.style.transform = 'scale(1)';
        } else {
            backToTop.style.transform = 'scale(0)';
        }
    }
    
    if (backToTop) {
        backToTop.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // Reading progress bar
    function updateReadingProgress() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.pageYOffset;
        const progress = (scrolled / documentHeight) * 100;
        
        if (readingProgress) {
            readingProgress.style.width = `${Math.min(progress, 100)}%`;
        }
    }
    
    // Scroll event handler
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateActiveTocLink();
                updateBackToTopButton();
                updateReadingProgress();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Initialize
    updateActiveTocLink();
    updateBackToTopButton();
    updateReadingProgress();
    
    // Add visible class to first section immediately
    if (sections.length > 0) {
        sections[0].classList.add('visible');
    }
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K for search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            searchBtn.click();
        }
        
        // Ctrl/Cmd + Home for back to top
        if ((e.ctrlKey || e.metaKey) && e.key === 'Home') {
            e.preventDefault();
            backToTop.click();
        }
    });
    
    // Print friendly
    window.addEventListener('beforeprint', function() {
        sections.forEach(section => section.classList.add('visible'));
    });
    
    console.log('🚀 Interactive transcript loaded successfully!');
    console.log('💡 Tip: Press Ctrl/Cmd + K to search');
});
