// Main Application JavaScript
class BrainyBuffsApp {
    constructor() {
        this.currentUser = null;
        this.init();
    }

    init() {
        this.loadComponents();
        this.setupEventListeners();
        this.checkAuthStatus();
        this.setupRouting();
    }

    loadComponents() {
        this.loadNavbar();
        this.loadFooter();
    }

    async loadNavbar() {
        const navbar = document.getElementById('navbar');
        if (navbar) {
            navbar.innerHTML = `
                <nav class="navbar">
                    <div class="nav-container">
                        <a href="/" class="logo">
                            <i data-feather="book-open"></i>
                            BrainyBuffs
                        </a>
                        
                        <ul class="nav-links">
                            <li><a href="#home" class="nav-link">Home</a></li>
                            <li><a href="#courses" class="nav-link">Courses</a></li>
                            <li><a href="#instructors" class="nav-link">Instructors</a></li>
                            <li><a href="#about" class="nav-link">About</a></li>
                            <li><a href="#contact" class="nav-link">Contact</a></li>
                        </ul>
                        
                        <div class="auth-buttons" id="auth-buttons">
                            <a href="#login" class="btn btn-outline">Login</a>
                            <a href="#signup" class="btn btn-primary">Sign Up</a>
                        </div>
                        
                        <div class="user-menu hidden" id="user-menu">
                            <div class="user-info">
                                <img id="user-avatar" class="user-avatar" src="" alt="User">
                                <span id="user-name"></span>
                            </div>
                            <button id="logout-btn" class="btn btn-outline">Logout</button>
                        </div>
                        
                        <button class="mobile-menu-btn" id="mobile-menu-btn">
                            <i data-feather="menu"></i>
                        </button>
                    </div>
                </nav>
                
                <div class="mobile-menu" id="mobile-menu">
                    <div class="mobile-menu-header">
                        <a href="/" class="logo">
                            <i data-feather="book-open"></i>
                            BrainyBuffs
                        </a>
                        <button class="mobile-menu-close" id="mobile-menu-close">
                            <i data-feather="x"></i>
                        </button>
                    </div>
                    <ul class="mobile-menu-links">
                        <li><a href="#home">Home</a></li>
                        <li><a href="#courses">Courses</a></li>
                        <li><a href="#instructors">Instructors</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </div>
            `;
            
            feather.replace();
        }
    }

    async loadFooter() {
        const footer = document.getElementById('footer');
        if (footer) {
            footer.innerHTML = `
                <footer class="footer">
                    <div class="container">
                        <div class="footer-grid">
                            <div>
                                <div class="logo">
                                    <i data-feather="book-open"></i>
                                    BrainyBuffs
                                </div>
                                <p class="mt-4">
                                    Empowering learners worldwide with quality education and cutting-edge courses.
                                </p>
                            </div>
                            
                            <div>
                                <h4>Quick Links</h4>
                                <ul class="footer-links">
                                    <li><a href="#home">Home</a></li>
                                    <li><a href="#courses">Courses</a></li>
                                    <li><a href="#about">About Us</a></li>
                                    <li><a href="#contact">Contact</a></li>
                                </ul>
                            </div>
                            
                            <div>
                                <h4>Categories</h4>
                                <ul class="footer-links">
                                    <li><a href="#web-development">Web Development</a></li>
                                    <li><a href="#data-science">Data Science</a></li>
                                    <li><a href="#mobile-development">Mobile Development</a></li>
                                    <li><a href="#ui-ux-design">UI/UX Design</a></li>
                                </ul>
                            </div>
                            
                            <div>
                                <h4>Contact Us</h4>
                                <ul class="footer-links">
                                    <li>
                                        <i data-feather="mail"></i>
                                        hello@brainybuffs.com
                                    </li>
                                    <li>
                                        <i data-feather="phone"></i>
                                        +1 (555) 123-4567
                                    </li>
                                    <li>
                                        <i data-feather="map-pin"></i>
                                        San Francisco, CA
                                    </li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="footer-bottom">
                            <p>&copy; 2023 BrainyBuffs Academy. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            `;
            
            feather.replace();
        }
    }

    setupEventListeners() {
        // Mobile menu
        document.addEventListener('click', (e) => {
            if (e.target.closest('#mobile-menu-btn')) {
                this.toggleMobileMenu();
            }
            if (e.target.closest('#mobile-menu-close') || e.target.closest('.mobile-menu a')) {
                this.closeMobileMenu();
            }
        });

        // Logout
        document.addEventListener('click', (e) => {
            if (e.target.closest('#logout-btn')) {
                this.logout();
            }
        });
    }

    toggleMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        mobileMenu.classList.toggle('active');
    }

    closeMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        mobileMenu.classList.remove('active');
    }

    checkAuthStatus() {
        const userData = localStorage.getItem('brainybuffs_user');
        const authButtons = document.getElementById('auth-buttons');
        const userMenu = document.getElementById('user-menu');
        
        if (userData) {
            const user = JSON.parse(userData);
            if (user.isAuthenticated) {
                this.currentUser = user;
                authButtons.classList.add('hidden');
                userMenu.classList.remove('hidden');
                
                const userName = document.getElementById('user-name');
                const userAvatar = document.getElementById('user-avatar');
                
                userName.textContent = user.name;
                userAvatar.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=4F46E5&color=fff`;
            }
        }
    }

    logout() {
        localStorage.removeItem('brainybuffs_user');
        this.currentUser = null;
        window.location.reload();
    }

    setupRouting() {
        // Simple client-side routing
        window.addEventListener('hashchange', this.handleRouteChange.bind(this));
        this.handleRouteChange();
    }

    handleRouteChange() {
        const hash = window.location.hash.substring(1) || 'home';
        this.loadPage(hash);
    }

    async loadPage(page) {
        const mainContent = document.getElementById('main-content');
        
        try {
            const response = await fetch(`pages/${page}.html`);
            const content = await response.text();
            mainContent.innerHTML = content;
            
            // Initialize page-specific JavaScript
            this.initializePage(page);
            
            feather.replace();
        } catch (error) {
            console.error('Error loading page:', error);
            mainContent.innerHTML = '<p>Page not found</p>';
        }
    }

    initializePage(page) {
        switch (page) {
            case 'home':
                // Initialize homepage functionality
                if (typeof initializeHomepage === 'function') {
                    initializeHomepage();
                }
                break;
            case 'courses':
                // Initialize courses page functionality
                if (typeof initializeCourses === 'function') {
                    initializeCourses();
                }
                break;
            case 'login':
            case 'login-email':
                // Initialize login functionality
                if (typeof initializeAuth === 'function') {
                    initializeAuth();
                }
                break;
            case 'signup':
                // Initialize signup functionality
                if (typeof initializeSignup === 'function') {
                    initializeSignup();
                }
                break;
            case 'contact':
                // Initialize contact functionality
                if (typeof initializeContact === 'function') {
                    initializeContact();
                }
                break;
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BrainyBuffsApp();
});
