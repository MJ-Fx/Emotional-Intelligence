// script.js
document.addEventListener('DOMContentLoaded', function() {
    // ===== HAMBURGER MENU =====
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navbar = document.getElementById('mainNav');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
            navMenu.classList.toggle('open');
        });

        // Close menu when clicking a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('open');
                    // Close all dropdowns
                    document.querySelectorAll('.dropdown-content').forEach(dd => {
                        dd.classList.remove('open');
                    });
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 768 && !navbar.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('open');
                document.querySelectorAll('.dropdown-content').forEach(dd => {
                    dd.classList.remove('open');
                });
            }
        });
    }

    // ===== DROPDOWN TOGGLE FOR MOBILE =====
    const dropdownBtns = document.querySelectorAll('.dropdown > .dropbtn');
    dropdownBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                e.stopPropagation();
                const dropdown = this.parentElement;
                const content = dropdown.querySelector('.dropdown-content');
                if (content) {
                    // Close other dropdowns
                    document.querySelectorAll('.dropdown-content').forEach(dd => {
                        if (dd !== content) {
                            dd.classList.remove('open');
                        }
                    });
                    content.classList.toggle('open');
                }
            }
        });
    });

    // ===== SMOOTH SCROLL =====
    const links = document.querySelectorAll('.dropdown-content a');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#') && targetId.length > 1) {
                e.preventDefault();
                const target = document.querySelector(targetId);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // ===== FLOATING OBJECTS MOUSE INTERACTION =====
    const objs = document.querySelectorAll('.obj');
    document.addEventListener('mousemove', function(e) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        objs.forEach((obj, idx) => {
            const speed = 8 + idx * 2;
            const moveX = (x - 0.5) * speed;
            const moveY = (y - 0.5) * speed;
            obj.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${moveX * 0.3}deg)`;
        });
    });

    // ===== SCROLL ANIMATIONS =====
    const sections = document.querySelectorAll('.page-section');
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        sections.forEach((sec) => {
            const offset = sec.offsetTop;
            const winH = window.innerHeight;
            if (scrollY + winH > offset - 50) {
                const progress = Math.min(1, (scrollY + winH - offset) / (winH + 100));
                sec.style.transform = `translateY(${progress * -4}px)`;
                sec.style.opacity = 0.85 + progress * 0.15;
            }
        });
    });

    // ===== HANDLE RESIZE =====
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            // Close mobile menu when resizing to desktop
            if (hamburger) hamburger.classList.remove('active');
            if (navMenu) navMenu.classList.remove('open');
            document.querySelectorAll('.dropdown-content').forEach(dd => {
                dd.classList.remove('open');
            });
        }
    });

    console.log('⚡ Emotional Intelligence · fully responsive');
});