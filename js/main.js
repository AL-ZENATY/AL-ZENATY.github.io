const root = document.documentElement;
    const menuBtn = document.getElementById("menuBtn");
    const nav = document.getElementById("nav");
    const langButtons = document.querySelectorAll("[data-lang-btn]");

    menuBtn.addEventListener("click", () => {
      nav.classList.toggle("open");
    });

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => nav.classList.remove("open"));
    });

    langButtons.forEach(button => {
      button.addEventListener("click", () => {
        root.dataset.lang = button.dataset.langBtn;
        langButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
      });
    });

    const words = ["JavaScript", "Laravel", "UI/UX", "Frontend", "C#"];
    const typing = document.getElementById("typing");
    const copies = document.querySelectorAll(".typing-copy");

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {
      const word = words[wordIndex];

      if (!deleting) {
        const text = word.slice(0, charIndex + 1);
        typing.textContent = text;
        copies.forEach(copy => copy.textContent = text);
        charIndex++;

        if (charIndex === word.length) {
          deleting = true;
          setTimeout(typeEffect, 950);
          return;
        }
      } else {
        const text = word.slice(0, charIndex - 1);
        typing.textContent = text;
        copies.forEach(copy => copy.textContent = text);
        charIndex--;

        if (charIndex === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
        }
      }

      setTimeout(typeEffect, deleting ? 45 : 85);
    }

    typeEffect();

    const revealItems = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    }, { threshold: 0.12 });

    revealItems.forEach(item => observer.observe(item));

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav a");

    function updateActiveNav() {
      let current = "home";
      const scrollPosition = window.scrollY + window.innerHeight * 0.45;

      sections.forEach(section => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;

        if (scrollPosition >= top && scrollPosition < bottom) {
          current = section.id;
        }
      });

      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 5) {
        current = "contact";
      }

      navLinks.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === "#" + current);
      });
    }

    window.addEventListener("scroll", updateActiveNav);
    window.addEventListener("load", updateActiveNav);