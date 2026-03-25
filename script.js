const navLinks = document.getElementById("nav-links");
const hamburger = document.getElementById("hamburger");
const themeToggle = document.getElementById("theme-toggle");

// MOBILE MENU
hamburger.onclick = () => {
    navLinks.classList.toggle("active");
};

// THEME SWITCH
themeToggle.onclick = () => {
    document.body.classList.toggle("light");
    themeToggle.textContent =
        document.body.classList.contains("light") ? "☀️" : "🌙";

    localStorage.setItem(
        "theme",
        document.body.classList.contains("light") ? "light" : "dark"
    );
};

// Persist theme
if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light");
    themeToggle.textContent = "☀️";
}
/* ================= EMAILJS FORM ================= */

// Initialize EmailJS
emailjs.init("pyLEiBlind3E_m4If");

// Select the form
const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const btn = this.querySelector("button[type='submit']");
    btn.disabled = true;

    const name = this.user_name.value;
    const email = this.user_email.value;
    const message = this.message.value;

    // Send email to yourself (owner)
    emailjs.send("service_v6ef3qj", "template_l0ie029", {
        user_name: name,
        user_email: email,
        message: message
    })
        .then(() => {
            // Send confirmation email to the user
            return emailjs.send("service_v6ef3qj", "template_7d7kmqi", {
                user_name: name,
                user_email: email,
                message: message
            });
        })
        .then(() => {
            alert("Message sent successfully!");
            contactForm.reset();
            btn.disabled = false;
        })
        .catch(error => {
            alert("Failed to send message: " + error.text);
            btn.disabled = false;
        });
});
