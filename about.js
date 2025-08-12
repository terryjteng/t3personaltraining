document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".bio p");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => {
    el.classList.add("fade-start");
    observer.observe(el);
  });
});

const highlightKeywords = ["fitness", "nutrition", "research", "Muay Thai", "9-to-5"];
const paragraphs = document.querySelectorAll(".bio p");

paragraphs.forEach(p => {
  highlightKeywords.forEach(word => {
    const regex = new RegExp(`\\b(${word})\\b`, "gi");
    p.innerHTML = p.innerHTML.replace(regex, `<span class="highlight">$1</span>`);
  });
});
