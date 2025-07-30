const hourHand = document.getElementById("hourHand");
const minuteHand = document.getElementById("minuteHand");
const secondHand = document.getElementById("secondHand");
const numbersContainer = document.querySelector(".numbers");
const ticksContainer = document.querySelector(".ticks");
const digitalTime = document.getElementById("digitalTime");
const currentDate = document.getElementById("currentDate");
const toggleThemeBtn = document.getElementById("toggleTheme");

// Add clock numbers
for (let i = 1; i <= 12; i++) {
  const angle = (i * 30) * Math.PI / 180;
  const x = 50 + 42 * Math.sin(angle);
  const y = 50 - 42 * Math.cos(angle);

  const number = document.createElement("span");
  number.textContent = i;
  number.style.left = `${x}%`;
  number.style.top = `${y}%`;
  numbersContainer.appendChild(number);
}

// Add tick marks
for (let i = 0; i < 60; i++) {
  const tick = document.createElement("div");
  if (i % 5 === 0) tick.classList.add("major");
  tick.style.transform = `rotate(${i * 6}deg) translate(-50%, 0)`;
  ticksContainer.appendChild(tick);
}

// Update time and date
function updateClock() {
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes();
  const s = now.getSeconds();

  const hourDeg = ((h % 12) + m / 60) * 30;
  const minuteDeg = (m + s / 60) * 6;
  const secondDeg = s * 6;

  hourHand.style.transform = `translate(-50%, 0) rotate(${hourDeg}deg)`;
  minuteHand.style.transform = `translate(-50%, 0) rotate(${minuteDeg}deg)`;
  secondHand.style.transform = `translate(-50%, 0) rotate(${secondDeg}deg)`;

  digitalTime.textContent = now.toLocaleTimeString();

  const dateOptions = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
  currentDate.textContent = now.toLocaleDateString(undefined, dateOptions);
}

setInterval(updateClock, 1000);
updateClock();

// Theme switch
toggleThemeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  document.body.classList.toggle("light-theme");

  const isDark = document.body.classList.contains("dark-theme");
  toggleThemeBtn.textContent = isDark ? "Switch to Light Theme" : "Switch to Dark Theme";
});
