
// 1. Change font size
function changeFontSize() {
  const text = document.getElementById("textInput").value;
  const size = document.getElementById("fontSizeInput").value;
  const target = document.getElementById("resizableText");
  target.textContent = text;
  target.style.fontSize = size + "px";
}

// 2. Moving image randomly
setInterval(() => {
  const img = document.getElementById("movingImage");
  img.style.top = Math.random() * (window.innerHeight - 50) + "px";
  img.style.left = Math.random() * (window.innerWidth - 50) + "px";
}, 1000);

// 3. Resize all <p> to 15px
function resizeParagraphs() {
  const paragraphs = document.getElementsByTagName("p");
  for (let p of paragraphs) {
    p.setAttribute("style", "font-size: 15px;");
  }
}

// 4. Clock
setInterval(() => {
  const now = new Date();
  document.getElementById("clock").textContent = now.toLocaleTimeString();
}, 1000);

// 5. Fade out
function fadeOut() {
  const el = document.getElementById("fadeBox");
  let opacity = 1;
  const timer = setInterval(() => {
    if (opacity <= 0.1) {
      clearInterval(timer);
      el.style.display = "none";
    }
    el.style.opacity = opacity;
    opacity -= 0.1;
  }, 200);
}

// 6. Tooltip
const tooltip = document.getElementById("tooltip");
const button = document.getElementById("tooltipButton");

button.addEventListener("click", (e) => {
  const x = e.clientX, y = e.clientY;
  tooltip.style.display = "block";
  tooltip.style.position = "absolute";

  const tooltipRect = tooltip.getBoundingClientRect();
  tooltip.style.left = (x + tooltipRect.width > window.innerWidth ? x - tooltipRect.width : x) + "px";
  tooltip.style.top = (y + tooltipRect.height > window.innerHeight ? y - tooltipRect.height : y) + "px";
});

window.addEventListener("click", (e) => {
  if (e.target !== tooltip && e.target !== button) {
    tooltip.style.display = "none";
  }
});

// 7. Swap columns
function swapColumns() {
  const table = document.getElementById("swapTable");
  for (let row of table.rows) {
    let temp = row.cells[0].innerHTML;
    row.cells[0].innerHTML = row.cells[1].innerHTML;
    row.cells[1].innerHTML = temp;
  }
}

// 8. Change square color
function changeSquareColor() {
  const color = document.getElementById("colorSelector").value;
  document.getElementById("colorSquare").style.backgroundColor = color;
}

// 9. Font size memory
let currentSize = parseInt(localStorage.getItem("fontSize")) || 16;
const textEl = document.getElementById("resizableTextMemory");
textEl.style.fontSize = currentSize + "px";

function adjustFontSize(delta) {
  currentSize += delta;
  textEl.style.fontSize = currentSize + "px";
  localStorage.setItem("fontSize", currentSize);
}

// 10. Hide ad for one day
function hideAd() {
  document.getElementById("adBanner").style.display = "none";
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 1);
  document.cookie = "hideAd=true; expires=" + expiry.toUTCString();
}

(function checkAdCookie() {
  if (document.cookie.includes("hideAd=true")) {
    const ad = document.getElementById("adBanner");
    if (ad) ad.style.display = "none";
  }
})();

// 11. Browser info
window.addEventListener("DOMContentLoaded", () => {
  const ref = document.referrer || "невідомо";
  const ua = navigator.userAgent;
  document.getElementById("browserInfo").textContent = "Звідки ви прийшли: " + ref + ". Браузер: " + ua;
});
document.addEventListener("DOMContentLoaded", () => {
  const tooltip = document.getElementById("tooltip");
  const button = document.getElementById("tooltipButton");

  button.addEventListener("click", (e) => {
    e.stopPropagation();
    tooltip.style.display = "block";

    const tooltipRect = tooltip.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();

    let top = buttonRect.bottom + 10;
    let left = buttonRect.left;

    // If tooltip goes off screen right
    if (left + tooltipRect.width > window.innerWidth) {
      left = window.innerWidth - tooltipRect.width - 10;
    }

    // If tooltip goes off screen bottom
    if (top + tooltipRect.height > window.innerHeight) {
      top = buttonRect.top - tooltipRect.height - 10;
    }

    tooltip.style.top = top + "px";
    tooltip.style.left = left + "px";
  });

  // Hide tooltip on outside click
  document.addEventListener("click", (e) => {
    if (!tooltip.contains(e.target)) {
      tooltip.style.display = "none";
    }
  });
});
