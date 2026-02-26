let bases = [];
let currentBase = null;
let currentHealth = 0;
let epicUsed = false;

async function loadBases() {
  const res = await fetch("bases.json");
  bases = await res.json();
  renderBaseGrid();
}

function renderBaseGrid() {
  const grid = document.getElementById("base-grid");
  grid.innerHTML = "";

  bases.forEach(base => {
    const card = document.createElement("div");
    card.className = `base-card ${base.faction}`;
    card.innerHTML = `
      <img src="images/${base.image}" alt="${base.name}">
      <p>${base.name}</p>
    `;
    card.onclick = () => selectBase(base);
    grid.appendChild(card);
  });
}

function selectBase(base) {
  currentBase = base;
  currentHealth = base.health;
  epicUsed = false;

  document.getElementById("base-name").textContent = base.name;
  document.getElementById("base-image").src = `images/${base.image}`;
  document.getElementById("health").textContent = currentHealth;

  if (base.epic) {
    document.getElementById("epic-container").classList.remove("hidden");
    document.getElementById("epic-btn").textContent = "Not Used";
    document.getElementById("epic-btn").classList.remove("used");
  } else {
    document.getElementById("epic-container").classList.add("hidden");
  }

  showScreen("tracker");
}

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

document.getElementById("plus").onclick = () => {
  currentHealth++;
  document.getElementById("health").textContent = currentHealth;
};

document.getElementById("minus").onclick = () => {
  currentHealth--;
  document.getElementById("health").textContent = currentHealth;
};

document.getElementById("reset").onclick = () => {
  currentHealth = currentBase.health;
  document.getElementById("health").textContent = currentHealth;
};

document.getElementById("epic-btn").onclick = () => {
  epicUsed = !epicUsed;
  const btn = document.getElementById("epic-btn");

  if (epicUsed) {
    btn.textContent = "Used";
    btn.classList.add("used");
  } else {
    btn.textContent = "Not Used";
    btn.classList.remove("used");
  }
};

document.getElementById("back-btn").onclick = () => showScreen("base-select");

loadBases();
