// Theme Switcher
const createThemeToggle = () => {
  const button = document.createElement("button");
  button.className = "theme-toggle";
  button.setAttribute("aria-label", "Toggle dark mode");
  button.innerHTML = `
        <svg class="moon-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
        <svg class="sun-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
    `;
  document.body.appendChild(button);
  return button;
};

// Theme management
const themeManager = {
  storageKey: "portfolio-theme",

  init() {
    // Get the theme toggle button
    this.button = document.querySelector(".theme-toggle");

    // Add click event listener
    this.button.addEventListener("click", () => this.toggleTheme());

    // Set initial theme
    const savedTheme = localStorage.getItem(this.storageKey);
    if (savedTheme) {
      this.setTheme(savedTheme);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      this.setTheme(prefersDark ? "dark" : "light");
    }

    // Listen for system theme changes
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        if (!localStorage.getItem(this.storageKey)) {
          this.setTheme(e.matches ? "dark" : "light");
        }
      });
  },

  setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(this.storageKey, theme);

    // Update button icons
    const sunIcon = this.button.querySelector(".sun-icon");
    const moonIcon = this.button.querySelector(".moon-icon");

    if (theme === "dark") {
      sunIcon.style.display = "block";
      moonIcon.style.display = "none";
    } else {
      sunIcon.style.display = "none";
      moonIcon.style.display = "block";
    }
  },

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    this.setTheme(newTheme);

    // Animate the icon
    const icon = this.button.querySelector("svg");
    icon.style.transform = "rotate(360deg)";
    setTimeout(() => {
      icon.style.transform = "";
    }, 500);
  },
};

// Initialize theme manager immediately
themeManager.init();

// Mobile Navigation
const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav-links");
const navLinks = document.querySelectorAll(".nav-links li");

burger.addEventListener("click", () => {
  // Toggle Navigation
  nav.classList.toggle("nav-active");

  // Animate Links
  navLinks.forEach((link, index) => {
    if (link.style.animation) {
      link.style.animation = "";
    } else {
      link.style.animation = `fadeInUp 0.5s ease forwards ${index / 7 + 0.3}s`;
    }
  });

  // Burger Animation
  burger.classList.toggle("toggle");
});

// Portfolio Filtering
const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioItems = document.querySelectorAll(".portfolio-item");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    // Add active class to clicked button
    button.classList.add("active");

    const filterValue = button.getAttribute("data-filter");

    portfolioItems.forEach((item) => {
      if (
        filterValue === "all" ||
        item.getAttribute("data-category") === filterValue
      ) {
        item.style.display = "block";
        setTimeout(() => {
          item.style.opacity = "1";
          item.style.transform = "scale(1)";
        }, 100);
      } else {
        item.style.opacity = "0";
        item.style.transform = "scale(0.8)";
        setTimeout(() => {
          item.style.display = "none";
        }, 300);
      }
    });
  });
});

// Custom cursor
const cursor = document.createElement("div");
cursor.classList.add("cursor");
document.body.appendChild(cursor);

// Update cursor position
document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

// Add hover effect to interactive elements
const interactiveElements = document.querySelectorAll("a, button, .work-item");
interactiveElements.forEach((el) => {
  el.addEventListener("mouseenter", () => cursor.classList.add("hover"));
  el.addEventListener("mouseleave", () => cursor.classList.remove("hover"));
});

// Smooth scroll navigation
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Navbar background change on scroll
const navbar = document.querySelector(".navbar");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  if (currentScroll > lastScroll && currentScroll > 500) {
    navbar.style.transform = "translateY(-100%)";
  } else {
    navbar.style.transform = "translateY(0)";
  }

  lastScroll = currentScroll;
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all sections and work items
document.querySelectorAll("section, .work-item").forEach((el) => {
  observer.observe(el);
});

// Parallax effect for diagonal sections
const diagonalSections = document.querySelectorAll(".diagonal-container");

window.addEventListener("scroll", () => {
  diagonalSections.forEach((section) => {
    const speed = 0.15;
    const rect = section.getBoundingClientRect();
    const scrolled = window.pageYOffset;

    if (rect.top <= window.innerHeight && rect.bottom >= 0) {
      const yPos = -(scrolled * speed);
      section.style.transform = `skewY(-5deg) translateY(${yPos}px)`;
    }
  });
});

// Form submission handling with animation
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const button = contactForm.querySelector("button");
    const originalText = button.innerHTML;
    button.innerHTML = "<span>Sending...</span>";

    // Simulate form submission (replace with actual form submission)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    button.innerHTML = "<span>Message Sent!</span>";
    contactForm.reset();

    setTimeout(() => {
      button.innerHTML = originalText;
    }, 2000);
  });
}

// Image loading animation
document.querySelectorAll("img").forEach((img) => {
  img.addEventListener("load", () => {
    img.classList.add("loaded");
  });
});

// Work item hover effect
document.querySelectorAll(".work-item").forEach((item) => {
  item.addEventListener("mousemove", (e) => {
    const rect = item.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPercent = (x / rect.width - 0.5) * 20;
    const yPercent = (y / rect.height - 0.5) * 20;

    item.style.transform = `
            translateY(-10px)
            perspective(1000px)
            rotateX(${-yPercent}deg)
            rotateY(${xPercent}deg)
        `;
  });

  item.addEventListener("mouseleave", () => {
    item.style.transform = "";
  });
});

// Smooth reveal for page load
document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("loaded");
});

// Back to Top Button functionality
const backToTopButton = document.getElementById('back-to-top');

// Show button when scrolling down 200px
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 200) {
    backToTopButton.classList.add('visible');
  } else {
    backToTopButton.classList.remove('visible');
  }
});

// Smooth scroll to top when clicked
backToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
