AOS.init({ duration: 1200, once: true });

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');
hamburger.addEventListener('click', () => menu.classList.toggle('active'));

// Scroll Navbar
window.addEventListener('scroll', () => {
    document.querySelector('.navbar').classList.toggle('scrolled', window.scrollY > 50);
});

// Active nav link
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.menu a');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
        const top = sec.offsetTop - 80;
        if (scrollY >= top) current = sec.id;
    });
    navLinks.forEach(link => link.classList.remove('active'));
    navLinks.forEach(link => {
        if (link.getAttribute('href') === '#' + current) link.classList.add('active');
    });
});

// Skills bar animation on scroll
const bars = document.querySelectorAll('.bar span');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.width = entry.target.style.getPropertyValue('--width');
        }
    });
}, { threshold: 0.5 });
bars.forEach(bar => observer.observe(bar));

// Light/Dark toggle
const toggle = document.getElementById('theme-toggle');
toggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    toggle.textContent = document.body.classList.contains('light-mode') ? '🌙' : '☀️';
    localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
});
if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
    toggle.textContent = '🌙';
}
// Initialize AOS
AOS.init({ duration: 1200, easing: "ease-in-out", once: true });

// EmailJS form
emailjs.init("pyLEiBlind3E_m4If");
document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const btn = this.querySelector("button[type='submit']");
    btn.disabled = true;
    const { user_name: name, user_email: email, message } = this;
    emailjs.send("service_v6ef3qj", "template_l0ie029", { user_name: name.value, user_email: email.value, message: message.value })
        .then(() => {
            emailjs.send("service_v6ef3qj", "template_7d7kmqi", { user_name: name.value, user_email: email.value, message: message.value });
            window.open(`https://wa.me/2348159204641?text=Hello,%20my%20name%20is%20${name.value}%0AEmail:%20${email.value}%0AMessage:%20${message.value}`, "_blank");
            alert("Message sent successfully!");
            this.reset();
            btn.disabled = false;
        })
        .catch(error => { alert("Failed to send message: " + error.text); btn.disabled = false; });
});