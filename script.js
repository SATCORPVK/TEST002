// SATCORP Interface JS
document.addEventListener("DOMContentLoaded", () => {
  const timeEl = document.getElementById("time");
  const modules = document.querySelectorAll(".module");

  // Live Clock
  function updateTime() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2,'0');
    const m = String(now.getMinutes()).padStart(2,'0');
    const s = String(now.getSeconds()).padStart(2,'0');
    timeEl.textContent = `${h}:${m}:${s}`;
  }
  setInterval(updateTime, 1000);
  updateTime();

  // Module Hover Effects
  modules.forEach(mod => {
    mod.addEventListener("mouseenter", () => {
      mod.style.transform = "translateY(-10px) scale(1.05)";
    });
    mod.addEventListener("mouseleave", () => {
      mod.style.transform = "translateY(0) scale(1)";
    });
  });

  // Interactive Background Pulse
  let hue = 180;
  setInterval(() => {
    document.body.style.backgroundColor = `hsl(${hue}, 30%, 5%)`;
    hue = (hue + 0.1) % 360;
  }, 50);
});
