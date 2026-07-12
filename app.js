const moduleData = {
  news: {
    title: "News",
    subtitle: "Alle Neuigkeiten rund um die Hawks.",
    icon: "📰",
    items: [
      ["🗞️", "News-Artikel"],
      ["📱", "Instagram"],
      ["🌐", "Website"]
    ]
  },
  games: {
    title: "Spielbetrieb",
    subtitle: "Spiele, Organisation und sportliche Kennzahlen.",
    icon: "🏆",
    items: [
      ["📅", "Blick auf aktuelle Spiele"],
      ["⏱️", "Terminplaner für das Kampfgericht"],
      ["🔎", "Filterfunktion für einzelne Teams"],
      ["📊", "Statistiken und Tabellen"]
    ]
  },
  about: {
    title: "Über uns",
    subtitle: "Das Selbstverständnis der TG Hochheim Hawks.",
    icon: "🦅",
    items: [
      ["📜", "Wer sind wir? – Hawks-Historie"],
      ["💡", "Wofür stehen wir? – Hawks-Idea"],
      ["🛠️", "Was leisten wir? – Hawks-Work"],
      ["🪺", "Kindeswohl – Hawks-Nest"],
      ["👥", "Aufgaben und Personen"]
    ]
  },
  service: {
    title: "Service",
    subtitle: "Wichtige Informationen, Formulare und Downloads.",
    icon: "🧰",
    items: [
      ["📍", "Adressen und Hallen"],
      ["⬇️", "Download-Bereich"],
      ["🔐", "Rechte- und Rollenstruktur"],
      ["📝", "Mitgliedsantrag online"],
      ["🔗", "Verbindung mit DSS"],
      ["💬", "Feedback"]
    ]
  },
  digital: {
    title: "Digitale Abteilung",
    subtitle: "Interne digitale Abläufe und Verwaltungsfunktionen.",
    icon: "💻",
    items: [
      ["🧾", "Trainer-Abrechnung"],
      ["👔", "Abteilungsleitung"]
    ]
  },
  partners: {
    title: "Partner & Sponsoren",
    subtitle: "Verbände, Förderer und Partner der Hawks.",
    icon: "🤝",
    items: [
      ["🏛️", "Partner: HBV, DBB und weitere Verbände"],
      ["❤️", "Förderverein"],
      ["📝", "Mitgliedsantrag online"],
      ["🏠", "TG Hochheim"],
      ["📲", "Verbindung zur TG-App"],
      ["🌐", "Homepage"],
      ["⭐", "Sponsoren"],
      ["A", "Sponsor A"],
      ["B", "Sponsor B"]
    ]
  },
  gallery: {
    title: "Galerie / Momente",
    subtitle: "Erinnerungen, Erfolge und besondere Hawks-Momente.",
    icon: "📸",
    items: [
      ["🎞️", "Bilder & Videos"],
      ["🌟", "Legends / Wall of Fame"],
      ["🏆", "Erfolge / Pokale"]
    ]
  }
};


const externalLinks = {
  website: "https://www.hochheim-hawks.de/index.php?id=7",
  instagram: "https://www.instagram.com/hochheimhawks?igsh=MTY2NjJ2Zmd3aTJuZQ==",
  gameSchedule: "https://www.hbv-basketball.de/spielbetrieb/",
  supportersClub: "https://www.hochheim-hawks.de/fileadmin/Dokumente/Antraege_Formulare/2015_Mitgliedsantrag_Foerderverein.pdf",
  tgHochheim: "https://www.tghochheim.de/",
  legends: [
    {
      title: "Niklas Krause",
      url: "https://www.2basketballbundesliga.de/teams/kader/spieler/5591/",
      detail: "Spielerprofil bei der 2. Basketball-Bundesliga öffnen"
    },
    {
      title: "Erik Neunhoeffer",
      url: "https://www.2basketballbundesliga.de/teams/kader/spieler/2001852/",
      detail: "Spielerprofil bei der 2. Basketball-Bundesliga öffnen"
    },
    {
      title: "Svea Rehders",
      url: "https://toyota-dbbl.de/spielerin/20758/?season=2025",
      detail: "Spielerinnenprofil bei der Toyota DBBL öffnen"
    },
    {
      title: "Finja Rehders",
      url: "https://www.hochheim-hawks.de/fileadmin/user_upload/Hawks_Steckbrief_Finja_Homepage.pdf",
      detail: "Hawks-Steckbrief als PDF öffnen"
    }
  ],
  newsArticles: [
    {
      title: "Deutsche Ü60-Nationalmannschaft zu Testspiel in Hochheim",
      url: "https://hochheim-hawks.de/news-ansicht/deutsche-basketball-ue-60-auswahl-gastiert-in-hochheim.html"
    },
    {
      title: "Weibliche U18 holt Hessenpokal",
      url: "https://hochheim-hawks.de/news-ansicht/tg-hochheim-hawks-gewinnen-wu18-hessenpokal-2026.html"
    }
  ]
};

const teamDetails = {
  menA: { title: "Männer – Mannschaft A", icon: "⛹️‍♂️" },
  menB: { title: "Männer – Mannschaft B", icon: "🏀" },
  womenA: { title: "Frauen – Mannschaft A", icon: "⛹️‍♀️" },
  womenB: { title: "Frauen – Mannschaft B", icon: "🏀" }
};

const detailItems = [
  ["🕒", "Trainingszeiten"],
  ["👕", "Spielerinnen und Spieler"],
  ["📋", "Trainerteam"],
  ["🗓️", "Team-Planer für Training & Spiele – digitaler Gruppenraum"],
  ["📈", "Ergebnisse und Spielberichte"]
];

const moduleModal = document.getElementById("moduleModal");
const moduleContent = document.getElementById("moduleContent");
const moduleBack = document.getElementById("moduleBack");
let historyStack = [];

function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal(modal) {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  if (modal.id === "moduleModal") historyStack = [];
}

document.querySelectorAll("[data-modal]").forEach(btn => {
  btn.addEventListener("click", () => openModal(btn.dataset.modal));
});

document.querySelectorAll(".close-modal").forEach(btn => {
  btn.addEventListener("click", () => closeModal(btn.closest(".modal")));
});

document.querySelectorAll(".modal").forEach(modal => {
  modal.addEventListener("click", event => {
    if (event.target === modal) closeModal(modal);
  });
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    const open = document.querySelector(".modal.open");
    if (open) closeModal(open);
  }
});

function cardGrid(items, actionPrefix = "") {
  return `<div class="subgrid">${items.map((item, index) => `
    <button class="subcard ${index % 3 === 0 ? "orange" : ""}" ${actionPrefix ? `data-action="${actionPrefix}${index}"` : ""}>
      <span class="subcard-icon">${item[0]}</span>
      <strong>${item[1]}</strong>
    </button>`).join("")}</div>`;
}

function renderNews(push = true) {
  if (push) historyStack.push({ type: "news" });
  moduleContent.innerHTML = `
    <div class="module-header"><span class="eyebrow">📰 Modul</span><h2>News</h2><p>Aktuelles von den TG Hochheim Hawks.</p></div>
    <div class="subgrid">
      <button class="subcard orange" data-news-action="articles"><span class="subcard-icon">🗞️</span><strong>News-Artikel</strong></button>
      <button class="subcard" data-external-url="${externalLinks.instagram}"><span class="subcard-icon">📱</span><strong>Instagram</strong></button>
      <button class="subcard" data-external-url="${externalLinks.website}"><span class="subcard-icon">🌐</span><strong>Webseite</strong></button>
    </div>
    <div class="note">Externe Seiten werden in einem neuen Browser-Tab geöffnet.</div>`;
  moduleBack.hidden = historyStack.length <= 1;
  bindNewsActions();
}

function renderNewsArticles(push = true) {
  if (push) historyStack.push({ type: "newsArticles" });
  moduleContent.innerHTML = `
    <div class="module-header"><span class="eyebrow">🗞️ News</span><h2>News-Artikel</h2><p>Wähle einen Artikel der TG Hochheim Hawks.</p></div>
    <div class="item-list">${externalLinks.newsArticles.map(article => `
      <a class="item-row" href="${article.url}" target="_blank" rel="noopener noreferrer">
        <span>↗️</span><div><strong>${article.title}</strong><div class="muted">Artikel auf hochheim-hawks.de öffnen</div></div>
      </a>`).join("")}</div>`;
  moduleBack.hidden = false;
}

function bindNewsActions() {
  const articleButton = moduleContent.querySelector('[data-news-action="articles"]');
  if (articleButton) articleButton.addEventListener("click", () => renderNewsArticles());

  moduleContent.querySelectorAll("[data-external-url]").forEach(button => {
    button.addEventListener("click", () => {
      window.open(button.dataset.externalUrl, "_blank", "noopener,noreferrer");
    });
  });
}

function renderStandard(key, push = true) {
  const data = moduleData[key];
  if (push) historyStack.push({ type: "standard", key });
  moduleContent.innerHTML = `
    <div class="module-header"><span class="eyebrow">${data.icon} Modul</span><h2>${data.title}</h2><p>${data.subtitle}</p></div>
    ${cardGrid(data.items)}
    <div class="note">Die Inhalte sind als anklickbare Platzhalter angelegt und können später mit echten Seiten, Datenbanken oder externen Links verbunden werden.</div>`;
  moduleBack.hidden = historyStack.length <= 1;
}


function renderGames(push = true) {
  if (push) historyStack.push({ type: "games" });
  moduleContent.innerHTML = `
    <div class="module-header"><span class="eyebrow">🏆 Modul</span><h2>Spielbetrieb</h2><p>Spiele, Organisation und sportliche Kennzahlen.</p></div>
    <div class="subgrid">
      <button class="subcard orange" data-external-url="${externalLinks.gameSchedule}"><span class="subcard-icon">📅</span><strong>Blick auf aktuelle Spiele</strong></button>
      <button class="subcard"><span class="subcard-icon">⏱️</span><strong>Terminplaner für das Kampfgericht</strong></button>
      <button class="subcard"><span class="subcard-icon">🔎</span><strong>Filterfunktion für einzelne Teams</strong></button>
      <button class="subcard orange"><span class="subcard-icon">📊</span><strong>Statistiken und Tabellen</strong></button>
    </div>
    <div class="note">„Blick auf aktuelle Spiele“ öffnet den Spielbetrieb des Hessischen Basketball Verbands in einem neuen Tab.</div>`;
  moduleBack.hidden = historyStack.length <= 1;
  bindExternalLinks();
}

function renderPartners(push = true) {
  if (push) historyStack.push({ type: "partners" });
  moduleContent.innerHTML = `
    <div class="module-header"><span class="eyebrow">🤝 Modul</span><h2>Partner & Sponsoren</h2><p>Verbände, Förderer und Partner der Hawks.</p></div>
    <div class="subgrid">
      <button class="subcard orange"><span class="subcard-icon">🏛️</span><strong>Partner: HBV, DBB und weitere Verbände</strong></button>
      <button class="subcard" data-external-url="${externalLinks.supportersClub}"><span class="subcard-icon">❤️</span><strong>Förderverein</strong></button>
      <button class="subcard"><span class="subcard-icon">📝</span><strong>Mitgliedsantrag online</strong></button>
      <button class="subcard orange" data-external-url="${externalLinks.tgHochheim}"><span class="subcard-icon">🏠</span><strong>TG Hochheim</strong></button>
      <button class="subcard"><span class="subcard-icon">📲</span><strong>Verbindung zur TG-App</strong></button>
      <button class="subcard"><span class="subcard-icon">🌐</span><strong>Homepage</strong></button>
      <button class="subcard orange"><span class="subcard-icon">⭐</span><strong>Sponsoren</strong></button>
      <button class="subcard"><span class="subcard-icon">A</span><strong>Sponsor A</strong></button>
      <button class="subcard"><span class="subcard-icon">B</span><strong>Sponsor B</strong></button>
    </div>
    <div class="note">Förderverein und TG Hochheim öffnen die hinterlegten externen Seiten in einem neuen Tab.</div>`;
  moduleBack.hidden = historyStack.length <= 1;
  bindExternalLinks();
}

function renderGallery(push = true) {
  if (push) historyStack.push({ type: "gallery" });
  moduleContent.innerHTML = `
    <div class="module-header"><span class="eyebrow">📸 Modul</span><h2>Galerie / Momente</h2><p>Erinnerungen, Erfolge und besondere Hawks-Momente.</p></div>
    <div class="subgrid">
      <button class="subcard orange"><span class="subcard-icon">🎞️</span><strong>Bilder & Videos</strong></button>
      <button class="subcard" data-gallery-action="legends"><span class="subcard-icon">🌟</span><strong>Legends / Wall of Fame</strong></button>
      <button class="subcard"><span class="subcard-icon">🏆</span><strong>Erfolge / Pokale</strong></button>
    </div>`;
  moduleBack.hidden = historyStack.length <= 1;
  const legendsButton = moduleContent.querySelector('[data-gallery-action="legends"]');
  if (legendsButton) legendsButton.addEventListener("click", () => renderLegends());
}

function renderLegends(push = true) {
  if (push) historyStack.push({ type: "legends" });
  moduleContent.innerHTML = `
    <div class="module-header"><span class="eyebrow">🌟 Galerie</span><h2>Legends / Wall of Fame</h2><p>Ausgewählte Hawks-Spieler und ihre Profile.</p></div>
    <div class="item-list">${externalLinks.legends.map(legend => `
      <a class="item-row" href="${legend.url}" target="_blank" rel="noopener noreferrer">
        <span>🏀</span><div><strong>${legend.title}</strong><div class="muted">${legend.detail || "Profil öffnen"}</div></div>
      </a>`).join("")}</div>
    <div class="note">Die Profile werden in einem neuen Browser-Tab geöffnet.</div>`;
  moduleBack.hidden = false;
}

function bindExternalLinks() {
  moduleContent.querySelectorAll("[data-external-url]").forEach(button => {
    button.addEventListener("click", () => window.open(button.dataset.externalUrl, "_blank", "noopener,noreferrer"));
  });
}

function renderTeams(push = true) {
  if (push) historyStack.push({ type: "teams" });
  moduleContent.innerHTML = `
    <div class="module-header"><span class="eyebrow">🏀 Modul</span><h2>Teams</h2><p>Wähle Männer, Frauen oder Jugend-Mannschaften.</p></div>
    <div class="subgrid">
      <button class="subcard orange" data-team-category="men"><span class="subcard-icon">⛹️‍♂️</span><strong>Männer</strong></button>
      <button class="subcard" data-team-category="women"><span class="subcard-icon">⛹️‍♀️</span><strong>Frauen</strong></button>
      <button class="subcard orange" data-team-category="youth"><span class="subcard-icon">🏀</span><strong>Jugend-Mannschaften</strong></button>
    </div>`;
  moduleBack.hidden = historyStack.length <= 1;
  bindTeamCategory();
}

function renderTeamCategory(category, push = true) {
  if (push) historyStack.push({ type: "teamCategory", category });
  const isMen = category === "men";
  const isWomen = category === "women";
  if (category === "youth") {
    moduleContent.innerHTML = `
      <div class="module-header"><span class="eyebrow">🏀 Teams</span><h2>Jugend-Mannschaften</h2><p>Die Jugendteams können hier nach Altersklassen ergänzt werden.</p></div>
      <div class="subgrid">
        ${["U18", "U16", "U14", "U12", "U10"].map((team, index) => `<button class="subcard ${index % 2 === 0 ? "orange" : ""}"><span class="subcard-icon">👥</span><strong>${team}</strong></button>`).join("")}
      </div>
      <div class="note">Die Kacheln sind als Platzhalter vorbereitet und können später mit den konkreten Hawks-Jugendmannschaften verknüpft werden.</div>`;
    moduleBack.hidden = false;
    return;
  }
  moduleContent.innerHTML = `
    <div class="module-header"><span class="eyebrow">${isMen ? "⛹️‍♂️" : "⛹️‍♀️"} Teams</span><h2>${isMen ? "Männer" : "Frauen"}</h2><p>Wähle eine Mannschaft.</p></div>
    <div class="subgrid">
      <button class="subcard orange" data-team="${isMen ? "menA" : "womenA"}"><span class="subcard-icon">👥</span><strong>Mannschaft A</strong></button>
      <button class="subcard" data-team="${isMen ? "menB" : "womenB"}"><span class="subcard-icon">👥</span><strong>Mannschaft B</strong></button>
    </div>`;
  moduleBack.hidden = false;
  moduleContent.querySelectorAll("[data-team]").forEach(btn => btn.addEventListener("click", () => renderTeamDetail(btn.dataset.team)));
}

function renderTeamDetail(teamKey, push = true) {
  if (push) historyStack.push({ type: "teamDetail", teamKey });
  const team = teamDetails[teamKey];
  moduleContent.innerHTML = `
    <div class="module-header"><span class="eyebrow">${team.icon} Team</span><h2>${team.title}</h2><p>Alle wichtigen Informationen und Funktionen dieser Mannschaft.</p></div>
    <div class="item-list">${detailItems.map(item => `<div class="item-row"><span>${item[0]}</span><div><strong>${item[1]}</strong><div class="muted">Inhalt kann in GitHub ergänzt und mit echten Daten verbunden werden.</div></div></div>`).join("")}</div>`;
  moduleBack.hidden = false;
}

function bindTeamCategory() {
  moduleContent.querySelectorAll("[data-team-category]").forEach(btn => btn.addEventListener("click", () => renderTeamCategory(btn.dataset.teamCategory)));
}

document.querySelectorAll("[data-module]").forEach(btn => {
  btn.addEventListener("click", () => {
    historyStack = [];
    const key = btn.dataset.module;
    if (key === "teams") renderTeams();
    else if (key === "news") renderNews();
    else if (key === "games") renderGames();
    else if (key === "partners") renderPartners();
    else if (key === "gallery") renderGallery();
    else renderStandard(key);
    openModal("moduleModal");
  });
});

moduleBack.addEventListener("click", () => {
  if (historyStack.length <= 1) return;
  historyStack.pop();
  const previous = historyStack[historyStack.length - 1];
  if (previous.type === "teams") renderTeams(false);
  if (previous.type === "news") renderNews(false);
  if (previous.type === "newsArticles") renderNewsArticles(false);
  if (previous.type === "games") renderGames(false);
  if (previous.type === "partners") renderPartners(false);
  if (previous.type === "gallery") renderGallery(false);
  if (previous.type === "legends") renderLegends(false);
  if (previous.type === "teamCategory") renderTeamCategory(previous.category, false);
  if (previous.type === "teamDetail") renderTeamDetail(previous.teamKey, false);
  if (previous.type === "standard") renderStandard(previous.key, false);
});

document.querySelectorAll("[data-demo-form]").forEach(form => {
  form.addEventListener("submit", event => {
    event.preventDefault();
    showToast("Vielen Dank! Die Eingabe wurde in dieser Demo lokal bestätigt.");
    form.reset();
    setTimeout(() => closeModal(form.closest(".modal")), 500);
  });
});

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}
