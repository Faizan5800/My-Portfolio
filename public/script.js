// 1. Initialize Lucide Icons
lucide.createIcons();

// 2. Loading Screen Logic
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        const content = document.getElementById('content');
        
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
        content.classList.add('visible');
    }, 1500);
});

// 3. Custom Cursor Logic
const cursorOuter = document.getElementById('cursor-outer');
const cursorInner = document.getElementById('cursor-inner');

window.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    
    // Outer cursor (delayed)
    cursorOuter.animate({
        left: `${clientX}px`,
        top: `${clientY}px`
    }, { duration: 500, fill: "forwards", easing: "cubic-bezier(0.16, 1, 0.3, 1)" });

    // Inner cursor (instant)
    cursorInner.style.left = `${clientX}px`;
    cursorInner.style.top = `${clientY}px`;
});

// 4. Typing Effect
const roles = ["Full-Stack Developer", "Python Expert", "React Specialist", "Backend Architect"];
let roleIndex = 0;
const typingText = document.getElementById('typing-text');

setInterval(() => {
    roleIndex = (roleIndex + 1) % roles.length;
    // Simple text swap to match React version behavior
    typingText.textContent = roles[roleIndex];
}, 3000);

// 5. Scroll Reveal Animation (Re-triggerable)
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        } else {
            entry.target.classList.remove('active'); // Remove class to re-trigger
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// 6. Skill Tabs Logic
const tabs = document.querySelectorAll('.skill-tab');
const skillCards = document.querySelectorAll('.skill-card');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Active State
        tabs.forEach(t => {
            t.classList.remove('bg-white', 'text-black', 'border-white', 'shadow-[0_0_20px_rgba(255,255,255,0.2)]');
            t.classList.add('bg-transparent', 'text-neutral-500', 'border-neutral-800');
        });
        tab.classList.remove('bg-transparent', 'text-neutral-500', 'border-neutral-800');
        tab.classList.add('bg-white', 'text-black', 'border-white', 'shadow-[0_0_20px_rgba(255,255,255,0.2)]');

        const filter = tab.getAttribute('data-filter');

        skillCards.forEach(card => {
            if (filter === 'All' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                // Small animation on show
                card.animate([
                    { transform: 'scale(0.9)', opacity: 0 },
                    { transform: 'scale(1)', opacity: 1 }
                ], { duration: 300, easing: 'ease-out' });
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// 7. Mobile Menu Logic
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        window.scrollTo({
            top: element.offsetTop - 80,
            behavior: 'smooth'
        });
        mobileMenu.classList.add('hidden'); // Close menu on click
    }
}

// 8. 3D Tilt Effect (Simple JS Implementation for Cards)
const tiltCards = document.querySelectorAll('.tilt-card');

tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
});

// 9. Back to Top Button
document.getElementById('back-to-top-btn').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// 10. Contact Form Prevention
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
});s