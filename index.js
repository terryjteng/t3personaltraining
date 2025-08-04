// Dynamic rotation of hero headline and subtext
const headlines = [
  "Elite Personal Training in Los Angeles",
  "Precision Nutrition for Peak Performance",
  "Therapeutic Massage to Accelerate Recovery"
];

const subtexts = [
  "Custom fitness, nutrition, and recovery solutions designed for your lifestyle.",
  "Fuel your progress with expert-backed meal guidance.",
  "Move better. Feel better. Live better."
];

let currentIndex = 0;

function rotateHeroText() {
  const headlineEl = document.getElementById("hero-headline");
  const subtextEl = document.getElementById("hero-subtext");
  currentIndex = (currentIndex + 1) % headlines.length;
  headlineEl.textContent = headlines[currentIndex];
  subtextEl.textContent = subtexts[currentIndex];
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 60,
        behavior: "smooth"
      });
    }
  });
});

window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.padding = "0.75rem 2rem";
  } else {
    navbar.style.padding = "1.5rem 2rem";
  }
});


setInterval(rotateHeroText, 4000);
