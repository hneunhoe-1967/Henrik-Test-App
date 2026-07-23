const DEMO_USERS = {
  "Admin": { password: "Admin01", role: "admin", displayName: "Admin", roleLabel: "Admin" },
  "Spieler A": { password: "Spieler01", role: "teamA", displayName: "Spieler A", roleLabel: "Mannschaft A" }
};

const ROLE_GUEST = { role: "guest", displayName: "Gast", roleLabel: "Gast" };
let currentUser = ROLE_GUEST;

function loadSession() {
  try {
    const savedName = localStorage.getItem("hawksDemoUser");
    currentUser = savedName && DEMO_USERS[savedName]
      ? { ...DEMO_USERS[savedName], username: savedName }
      : ROLE_GUEST;
  } catch (error) {
    currentUser = ROLE_GUEST;
  }
}

function saveSession(username) {
  try {
    if (username) localStorage.setItem("hawksDemoUser", username);
    else localStorage.removeItem("hawksDemoUser");
  } catch (error) {
    // Die Demo funktioniert auch ohne verfügbaren Browser-Speicher.
  }
}

function isAdmin() { return currentUser.role === "admin"; }
function isTeamA() { return currentUser.role === "teamA"; }
function isPlayer() { return isTeamA(); }
function canUseWeekendHallTimes() { return isAdmin() || isPlayer(); }
function canUseChatRooms() { return isAdmin() || isTeamA(); }
function canUseDigitalModule() { return isAdmin(); }

function applyRolePermissions() {
  const chatButton = document.getElementById("chatRoomsButton");
  const digitalCard = document.getElementById("digitalModuleCard");
  const userDisplayName = document.getElementById("userDisplayName");

  if (chatButton) chatButton.hidden = !canUseChatRooms();
  if (digitalCard) digitalCard.hidden = !canUseDigitalModule();
  if (userDisplayName) userDisplayName.textContent = currentUser.displayName;

  document.querySelectorAll("[data-chat-room]").forEach(button => {
    const allowed = isAdmin() || (isTeamA() && button.dataset.chatRoom === "Mannschaft A");
    button.hidden = !allowed;
  });

  const openChat = document.getElementById("chatRoomsModal");
  if (openChat?.classList.contains("open") && !canUseChatRooms()) closeModal(openChat);
  const openModule = document.getElementById("moduleModal");
  if (openModule?.classList.contains("open") && !canUseDigitalModule() && historyStack.some(entry => entry.key === "digital")) {
    closeModal(openModule);
  }
  updateUserModal();
}

function updateUserModal() {
  const loginView = document.getElementById("loginView");
  const accountView = document.getElementById("accountView");
  const accountName = document.getElementById("accountName");
  const accountRole = document.getElementById("accountRole");
  const loggedIn = currentUser.role !== "guest";
  if (loginView) loginView.hidden = loggedIn;
  if (accountView) accountView.hidden = !loggedIn;
  if (accountName) accountName.textContent = currentUser.displayName;
  if (accountRole) accountRole.textContent = `Rolle: ${currentUser.roleLabel}`;
}

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
      ["🕒", "Trainingszeiten"],
      ["🏟️", "Hallenzeiten am WE"],
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
      ["🌟", "Hawks arround the World"],
      ["🏆", "Erfolge / Pokale"]
    ]
  }
};


const externalLinks = {
  website: "https://www.hochheim-hawks.de/index.php?id=7",
  instagram: "https://www.instagram.com/hochheimhawks?igsh=MTY2NjJ2Zmd3aTJuZQ==",
  gameSchedule: "https://www.hbv-basketball.de/spielbetrieb/",
  aboutUs: "https://hochheim-hawks.de/ueber-uns.html",
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
  btn.addEventListener("click", () => {
    if (btn.dataset.modal === "chatRoomsModal" && !canUseChatRooms()) {
      showToast("Dieser Bereich ist für die Rolle Gast nicht verfügbar.");
      return;
    }
    if (btn.dataset.modal === "userModal") updateUserModal();
    openModal(btn.dataset.modal);
  });
});

document.querySelectorAll("[data-chat-room]").forEach(btn => {
  btn.addEventListener("click", () => {
    const allowed = isAdmin() || (isTeamA() && btn.dataset.chatRoom === "Mannschaft A");
    if (!allowed) {
      showToast("Für diesen Chat-Room besitzt deine Rolle keine Berechtigung.");
      return;
    }
    showToast(`Chat-Room ${btn.dataset.chatRoom} ausgewählt. Die Live-Chat-Funktion kann später angebunden werden.`);
  });
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

function renderAbout(push = true) {
  if (push) historyStack.push({ type: "about" });
  const data = moduleData.about;
  moduleContent.innerHTML = `
    <div class="module-header"><span class="eyebrow">${data.icon} Modul</span><h2>${data.title}</h2><p>${data.subtitle}</p></div>
    <div class="subgrid">
      <button class="subcard orange"><span class="subcard-icon">📜</span><strong>Wer sind wir? – Hawks-Historie</strong></button>
      <button class="subcard"><span class="subcard-icon">💡</span><strong>Wofür stehen wir? – Hawks-Idea</strong></button>
      <button class="subcard orange"><span class="subcard-icon">🛠️</span><strong>Was leisten wir? – Hawks-Work</strong></button>
      <button class="subcard"><span class="subcard-icon">🪺</span><strong>Kindeswohl – Hawks-Nest</strong></button>
      <button class="subcard orange" data-about-action="people"><span class="subcard-icon">👥</span><strong>Aufgaben und Personen</strong></button>
    </div>
    <div class="note">Unter „Aufgaben und Personen“ findest du die Organisationsstruktur der Basketballabteilung.</div>`;
  moduleBack.hidden = historyStack.length <= 1;
  const peopleButton = moduleContent.querySelector('[data-about-action="people"]');
  if (peopleButton) peopleButton.addEventListener("click", () => renderAboutPeople());
}

function renderAboutPeople(push = true) {
  if (push) historyStack.push({ type: "aboutPeople" });
  moduleContent.innerHTML = `
    <div class="module-header"><span class="eyebrow">👥 Über uns</span><h2>Aufgaben und Personen</h2><p>So ist die Basketballabteilung der TG Hochheim Hawks organisiert.</p></div>

    <div class="info-box">
      <h3>Wer wir sind</h3>
      <p>Die Basketballabteilung der TG Hochheim wurde am 1. Juni 1982 gegründet. Seit dem Aufstieg der 1. Damen in die Regionalliga im Jahr 2005 trägt die Abteilung den Namenszusatz „Hawks“.</p>
      <p>Die Hawks zählen knapp 400 Mitglieder. In der Saison 2024/25 waren 16 Wettkampfmannschaften von der U10 bis zu den Senioren gemeldet. Hinzu kommen weitere Trainings- und Turniergruppen, darunter Flummis (U6), U8, Hobbydamen und Ü40- bis Ü55-Teams.</p>
    </div>

    <h3>Gewählte Abteilungsleitung</h3>
    <div class="item-list">
      <div class="item-row"><span>1</span><div><strong>Stefan Lehr</strong><div class="muted">Abteilungsleiter</div></div></div>
      <button class="item-row item-row-button" type="button" data-about-person="sebastian-krause"><span>2</span><div><strong>Sebastian Krause</strong><div class="muted">Stellvertretender Abteilungsleiter und sportliche Leitung weiblicher Bereich</div><div class="item-link-hint">Porträt öffnen →</div></div></button>
      <div class="item-row"><span>3</span><div><strong>Benjamin Kammerbauer</strong><div class="muted">Kassenwart und 2. stellvertretende Abteilungsleitung</div></div></div>
      <div class="item-row"><span>4</span><div><strong>Nico Doesseler</strong><div class="muted">Jugendwart</div></div></div>
    </div>

    <h3>Erweiterte Abteilungsleitung</h3>
    <div class="item-list">
      <div class="item-row"><span>🏀</span><div><strong>Georg Mesch</strong><div class="muted">Spielleitung</div></div></div>
      <div class="item-row"><span>🗂️</span><div><strong>Britta Rehders</strong><div class="muted">Sportliche Organisation, Passwesen und Mitgliederbetreuung</div></div></div>
      <div class="item-row"><span>♀️</span><div><strong>Sebastian Krause</strong><div class="muted">Sportliche Leitung weiblicher Bereich</div></div></div>
      <div class="item-row"><span>♂️</span><div><strong>Daniel Kerner & Svea Rehders</strong><div class="muted">Sportliche Leitung männlicher Bereich – Senioren und Jugend</div></div></div>
      <div class="item-row"><span>🪺</span><div><strong>Finja Rehders</strong><div class="muted">Kindeswohl und Vertrauensperson</div></div></div>
      <div class="item-row"><span>👤</span><div><strong>Henrik Neunhoeffer</strong><div class="muted">Beisitzer</div></div></div>
    </div>

    <h3>Weitere wichtige Aufgaben</h3>
    <div class="item-list">
      <div class="item-row"><span>🏫</span><div><strong>Svea Rehders</strong><div class="muted">Leitung der Grundschul-AGs</div></div></div>
      <div class="item-row"><span>📰</span><div><strong>Anne Neunhoeffer, Dagmar Gehlhaar & Georg Mesch</strong><div class="muted">Presseteam</div></div></div>
      <div class="item-row"><span>📱</span><div><strong>Svea Rehders & Nico Doesseler</strong><div class="muted">Social-Media-Team</div></div></div>
      <div class="item-row"><span>🌐</span><div><strong>Dagmar Gehlhaar</strong><div class="muted">Webmaster</div></div></div>
      <div class="item-row"><span>🤝</span><div><strong>Michael Schmitt</strong><div class="muted">Sponsoring</div></div></div>
      <div class="item-row"><span>🔐</span><div><strong>Henrik Neunhoeffer</strong><div class="muted">Datenschutzbeauftragter</div></div></div>
      <div class="item-row"><span>❤️</span><div><strong>Martin Jung</strong><div class="muted">1. Vorsitzender des Fördervereins BBFV</div></div></div>
      <div class="item-row"><span>🦓</span><div><strong>Aktuell vakant</strong><div class="muted">Schiedsrichterwart</div></div></div>
    </div>

    <a class="primary-btn inline-link" href="${externalLinks.aboutUs}" target="_blank" rel="noopener noreferrer">Vollständige Seite der Hawks öffnen ↗</a>
    <div class="note">Die Angaben wurden aus der aktuellen „Über uns“-Seite der Hochheim Hawks übernommen. Dort sind zusätzlich Coaches sowie Schiedsrichterinnen und Schiedsrichter aufgeführt.</div>`;
  moduleBack.hidden = false;
  const sebastianButton = moduleContent.querySelector('[data-about-person="sebastian-krause"]');
  if (sebastianButton) sebastianButton.addEventListener("click", () => renderAboutPerson("sebastian-krause"));
}

function renderAboutPerson(personKey, push = true) {
  if (personKey !== "sebastian-krause") return;
  if (push) historyStack.push({ type: "aboutPerson", personKey });
  moduleContent.innerHTML = `
    <div class="module-header"><span class="eyebrow">👥 Aufgaben und Personen</span><h2>Sebastian „Basti“ Krause</h2><p>Stellvertretender Abteilungsleiter und sportliche Leitung des weiblichen Bereichs.</p></div>
    <section class="trainer-profile" aria-labelledby="about-sebastian-title">
      <div class="trainer-heading-card"><span class="subcard-icon">👤</span><h3 id="about-sebastian-title">Porträt</h3></div>
      <img class="trainer-photo" src="assets/sebastian-krause-person.jpeg" alt="Sebastian Basti Krause mit einem Basketball in der Sporthalle" />
      <div class="trainer-copy">
        <h3>Sebastian „Basti“ Krause</h3>
        <p>Basti Krause ist stellvertretender Abteilungsleiter der Hochheim Hawks und verantwortlich für die sportliche Leitung des weiblichen Bereichs. Basketball begleitet ihn seit seiner Kindheit: Mit sieben Jahren begann er bei seinem Vater Frank und durchlief anschließend die Hochheimer Jugendmannschaften.</p>
        <p>In der Saison 2008/09 spielte er in der U16-Oberliga des BC Wiesbaden und verbrachte danach ein Schuljahr an einer High School in Omaha, Nebraska. Nach seiner Rückkehr spielte er zwei Jahre für die SG Rheinhessen/ASC Mainz in der NBBL. Seit 2012 gehört er als Spieler zum ersten Herrenteam des ASC Theresianum in der Regionalliga.</p>
        <p>Seine Trainerlaufbahn begann 2011 als Co-Trainer der MU10. Später übernahm er die WU16 und führte sie über zwei Oberliga-Spielzeiten in die WU18-Oberliga. Seit 2019 ist er lizenzierter C-Trainer Leistungssport. Im Jahr 2020 übernahm er zusätzlich die sportliche Leitung des weiblichen Bereichs.</p>
        <h4>Was die Hawks an ihm schätzen</h4>
        <blockquote>Sein Training ist abwechslungsreich, individuell und von neuen Ideen geprägt.</blockquote>
        <blockquote>Er nimmt sich Zeit für seine Spielerinnen und Spieler und verbindet unterschiedliche Charaktere zu einem Team.</blockquote>
        <h4>Sein Blick auf die Hawks</h4>
        <p>Als besonders wichtig nennt Basti den Zusammenhalt und die Gemeinschaft im Verein. Zu seinen schönsten Erlebnissen zählt die Entwicklung seiner Teams über viele Oberliga-Jahre.</p>
        <a class="primary-btn inline-link" href="https://hochheim-hawks.de/news-ansicht/die-hawks-stellen-vor-sebastian-basti-krause.html" target="_blank" rel="noopener noreferrer">Vollständiges Porträt auf der Hawks-Webseite öffnen ↗</a>
        <p class="source-note">Quelle: Hochheim Hawks, „Die Hawks stellen vor – Sebastian (Basti) Krause“, 29.06.2021. Foto: privat.</p>
      </div>
    </section>`;
  moduleBack.hidden = false;
}

const TRAINING_STORAGE_KEY = "hawksTrainingTimesV1";
const trainingDays = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag"];
const trainingHalls = ["MTK-Halle", "GH-Halle"];
const trainingTimes = ["8.00–13.59", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"];

function emptyTrainingSchedule() {
  return trainingTimes.map(() => Array(trainingDays.length * trainingHalls.length).fill(""));
}

function loadTrainingSchedule() {
  try {
    const stored = JSON.parse(localStorage.getItem(TRAINING_STORAGE_KEY));
    if (Array.isArray(stored) && stored.length === trainingTimes.length) return stored;
  } catch (error) {
    // Bei ungültigen oder nicht verfügbaren Browserdaten wird die leere Excel-Vorlage genutzt.
  }
  return emptyTrainingSchedule();
}

function saveTrainingSchedule(schedule) {
  try {
    localStorage.setItem(TRAINING_STORAGE_KEY, JSON.stringify(schedule));
    return true;
  } catch (error) {
    return false;
  }
}

const WEEKEND_STORAGE_KEY = "hawksWeekendHallTimesV1";
const WEEKEND_REQUESTS_KEY = "hawksWeekendHallRequestsV1";
const weekendDates = [
  "25.07.2026", "26.07.2026", "01.08.2026", "02.08.2026",
  "08.08.2026", "09.08.2026", "25.08.2026", "16.08.2026",
  "23.08.2026", "23.08.2026", "29.08.2026", "30.08.2026"
];
const weekendTimes = Array.from({ length: 30 }, (_, index) => {
  const totalMinutes = 8 * 60 + index * 30;
  const hours = String(Math.floor(totalMinutes / 60)).padStart(2, "0");
  const minutes = String(totalMinutes % 60).padStart(2, "0");
  return `${hours}:${minutes}`;
});

function emptyWeekendSchedule() {
  return weekendDates.map(() => Array(weekendTimes.length).fill(""));
}

function loadWeekendSchedule() {
  try {
    const stored = JSON.parse(localStorage.getItem(WEEKEND_STORAGE_KEY));
    if (Array.isArray(stored) && stored.length === weekendDates.length) return stored;
  } catch (error) {
    // Ungültige Browserdaten werden ignoriert.
  }
  return emptyWeekendSchedule();
}

function saveWeekendSchedule(schedule) {
  try {
    localStorage.setItem(WEEKEND_STORAGE_KEY, JSON.stringify(schedule));
    return true;
  } catch (error) {
    return false;
  }
}

function loadWeekendRequests() {
  try {
    const stored = JSON.parse(localStorage.getItem(WEEKEND_REQUESTS_KEY));
    return Array.isArray(stored) ? stored : [];
  } catch (error) {
    return [];
  }
}

function saveWeekendRequests(requests) {
  try {
    localStorage.setItem(WEEKEND_REQUESTS_KEY, JSON.stringify(requests));
    return true;
  } catch (error) {
    return false;
  }
}

function escapeHtml(value) {
  return String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function renderService(push = true) {
  if (push) historyStack.push({ type: "service" });
  const data = moduleData.service;
  const weekendCard = canUseWeekendHallTimes()
    ? '<button class="subcard" data-service-action="weekend"><span class="subcard-icon">🏟️</span><strong>Hallenzeiten am WE</strong></button>'
    : '';
  moduleContent.innerHTML = `
    <div class="module-header"><span class="eyebrow">${data.icon} Modul</span><h2>${data.title}</h2><p>${data.subtitle}</p></div>
    <div class="subgrid">
      <button class="subcard orange"><span class="subcard-icon">📍</span><strong>Adressen und Hallen</strong></button>
      <button class="subcard" data-service-action="training"><span class="subcard-icon">🕒</span><strong>Trainingszeiten</strong></button>
      ${weekendCard}
      <button class="subcard orange"><span class="subcard-icon">⬇️</span><strong>Download-Bereich</strong></button>
      <button class="subcard"><span class="subcard-icon">🔐</span><strong>Rechte- und Rollenstruktur</strong></button>
      <button class="subcard orange"><span class="subcard-icon">📝</span><strong>Mitgliedsantrag online</strong></button>
      <button class="subcard"><span class="subcard-icon">🔗</span><strong>Verbindung mit DSS</strong></button>
      <button class="subcard orange"><span class="subcard-icon">💬</span><strong>Feedback</strong></button>
    </div>
    <div class="note">Trainingszeiten sind für alle Rollen sichtbar. Die Wochenend-Hallenzeiten sehen nur Spieler und Admin; bearbeiten darf sie ausschließlich der Admin.</div>`;
  moduleBack.hidden = historyStack.length <= 1;
  moduleContent.querySelector('[data-service-action="training"]')?.addEventListener("click", () => renderTrainingTimes());
  moduleContent.querySelector('[data-service-action="weekend"]')?.addEventListener("click", () => renderWeekendHallTimes());
}

function renderTrainingTimes(push = true) {
  if (push) historyStack.push({ type: "trainingTimes" });
  const schedule = loadTrainingSchedule();
  const editable = isAdmin();
  moduleContent.innerHTML = `
    <div class="module-header"><span class="eyebrow">🕒 Service</span><h2>Trainingszeiten</h2><p>Wochenübersicht nach Halle und Uhrzeit.</p></div>
    <div class="training-toolbar">
      <span class="role-badge ${editable ? "admin" : "readonly"}">${editable ? "Admin: Bearbeitung freigeschaltet" : "Nur-Lese-Ansicht"}</span>
      ${editable ? '<button type="button" class="primary-btn" id="saveTrainingTimes">Änderungen speichern</button>' : ''}
    </div>
    <div class="training-table-wrap">
      <table class="training-table">
        <thead>
          <tr><th rowspan="2" class="time-heading">Uhrzeit</th>${trainingDays.map(day => `<th colspan="2">${day}</th>`).join("")}</tr>
          <tr>${trainingDays.map(() => trainingHalls.map(hall => `<th>${hall}</th>`).join("")).join("")}</tr>
        </thead>
        <tbody>
          ${trainingTimes.map((time, rowIndex) => `<tr>
            <th scope="row">${time}</th>
            ${schedule[rowIndex].map((value, colIndex) => `<td data-row="${rowIndex}" data-col="${colIndex}" ${editable ? 'contenteditable="true" spellcheck="false"' : ''}>${String(value || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</td>`).join("")}
          </tr>`).join("")}
        </tbody>
      </table>
    </div>
    <div class="note">Grundlage ist die bereitgestellte Excel-Vorlage. Im Test-Prototyp werden Admin-Änderungen nur lokal im jeweiligen Browser gespeichert.</div>`;
  moduleBack.hidden = false;

  const saveButton = moduleContent.querySelector("#saveTrainingTimes");
  if (saveButton) saveButton.addEventListener("click", () => {
    const updated = emptyTrainingSchedule();
    moduleContent.querySelectorAll(".training-table td[data-row]").forEach(cell => {
      updated[Number(cell.dataset.row)][Number(cell.dataset.col)] = cell.textContent.trim();
    });
    showToast(saveTrainingSchedule(updated) ? "Trainingszeiten wurden lokal gespeichert." : "Speichern ist in diesem Browser nicht möglich.");
  });
}


function renderWeekendHallTimes(push = true) {
  if (!canUseWeekendHallTimes()) {
    showToast("Die Wochenend-Hallenzeiten sind nur für Spieler und Admin sichtbar.");
    return;
  }
  if (push) historyStack.push({ type: "weekendHallTimes" });
  const schedule = loadWeekendSchedule();
  const editable = isAdmin();
  const requests = loadWeekendRequests();
  moduleContent.innerHTML = `
    <div class="module-header"><span class="eyebrow">🏟️ Service</span><h2>Hallenzeiten am WE</h2><p>Wochenendübersicht von 08:00 bis 22:30 Uhr gemäß der bereitgestellten Excel-Vorlage.</p></div>
    <div class="training-toolbar">
      <span class="role-badge ${editable ? "admin" : "readonly"}">${editable ? "Admin: Bearbeitung freigeschaltet" : "Spieler: Nur-Lese-Ansicht"}</span>
      ${editable ? '<button type="button" class="primary-btn" id="saveWeekendTimes">Änderungen speichern</button>' : ''}
    </div>
    <div class="weekend-table-wrap">
      <table class="weekend-table">
        <thead><tr><th class="weekend-date-heading">Datum</th>${weekendTimes.map(time => `<th>${time}</th>`).join("")}</tr></thead>
        <tbody>${weekendDates.map((date, rowIndex) => `<tr>
          <th scope="row">${date}</th>
          ${schedule[rowIndex].map((value, colIndex) => `<td data-row="${rowIndex}" data-col="${colIndex}" ${editable ? 'contenteditable="true" spellcheck="false"' : ''}>${escapeHtml(value)}</td>`).join("")}
        </tr>`).join("")}</tbody>
      </table>
    </div>
    ${isPlayer() ? `
      <section class="request-panel">
        <h3>Zeitanfrage stellen</h3>
        <p>Wähle Datum und Zeitraum aus. Die Anfrage wird in diesem Test-Prototyp lokal für den Admin gespeichert.</p>
        <form id="weekendRequestForm" class="app-form request-grid">
          <label>Datum<select id="requestDate" required>${weekendDates.map((date, index) => `<option value="${index}">${date}</option>`).join("")}</select></label>
          <label>Von<select id="requestFrom" required>${weekendTimes.map(time => `<option>${time}</option>`).join("")}</select></label>
          <label>Bis<select id="requestTo" required>${weekendTimes.map(time => `<option>${time}</option>`).join("")}</select></label>
          <label class="request-wide">Mannschaft / Zweck<input id="requestPurpose" maxlength="100" required placeholder="z. B. Mannschaft A – Zusatztraining"></label>
          <label class="request-wide">Nachricht<textarea id="requestMessage" rows="3" maxlength="300" placeholder="Optionale Hinweise"></textarea></label>
          <button class="primary-btn request-wide" type="submit">Anfrage absenden</button>
        </form>
      </section>` : ''}
    ${editable ? `
      <section class="request-panel">
        <h3>Offene Zeitanfragen</h3>
        <div class="request-list">${requests.length ? requests.map((request, index) => `
          <article class="request-item">
            <div><strong>${escapeHtml(request.date)} · ${escapeHtml(request.from)}–${escapeHtml(request.to)}</strong><small>${escapeHtml(request.user)} · ${escapeHtml(request.purpose)}</small>${request.message ? `<p>${escapeHtml(request.message)}</p>` : ''}</div>
            <button class="secondary-btn" type="button" data-delete-request="${index}">Erledigt</button>
          </article>`).join("") : '<p class="muted-copy">Derzeit liegen keine Anfragen vor.</p>'}</div>
      </section>` : ''}
    <div class="note">Die Daten und Anfragen werden im Test-Prototyp nur lokal im verwendeten Browser gespeichert. Für eine geräteübergreifende Nutzung ist später ein Backend erforderlich.</div>`;
  moduleBack.hidden = false;

  moduleContent.querySelector("#saveWeekendTimes")?.addEventListener("click", () => {
    const updated = emptyWeekendSchedule();
    moduleContent.querySelectorAll(".weekend-table td[data-row]").forEach(cell => {
      updated[Number(cell.dataset.row)][Number(cell.dataset.col)] = cell.textContent.trim();
    });
    showToast(saveWeekendSchedule(updated) ? "Wochenend-Hallenzeiten wurden lokal gespeichert." : "Speichern ist in diesem Browser nicht möglich.");
  });

  moduleContent.querySelector("#weekendRequestForm")?.addEventListener("submit", event => {
    event.preventDefault();
    const dateIndex = Number(moduleContent.querySelector("#requestDate").value);
    const from = moduleContent.querySelector("#requestFrom").value;
    const to = moduleContent.querySelector("#requestTo").value;
    if (weekendTimes.indexOf(to) <= weekendTimes.indexOf(from)) {
      showToast("Die Endzeit muss nach der Startzeit liegen.");
      return;
    }
    const updatedRequests = loadWeekendRequests();
    updatedRequests.push({
      date: weekendDates[dateIndex], from, to,
      purpose: moduleContent.querySelector("#requestPurpose").value.trim(),
      message: moduleContent.querySelector("#requestMessage").value.trim(),
      user: currentUser.displayName,
      createdAt: new Date().toISOString()
    });
    if (saveWeekendRequests(updatedRequests)) {
      event.target.reset();
      showToast("Die Zeitanfrage wurde an den Admin übermittelt.");
    } else showToast("Die Anfrage konnte in diesem Browser nicht gespeichert werden.");
  });

  moduleContent.querySelectorAll("[data-delete-request]").forEach(button => {
    button.addEventListener("click", () => {
      const updatedRequests = loadWeekendRequests();
      updatedRequests.splice(Number(button.dataset.deleteRequest), 1);
      saveWeekendRequests(updatedRequests);
      renderWeekendHallTimes(false);
      showToast("Die Anfrage wurde als erledigt entfernt.");
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
      <button class="subcard" data-gallery-action="legends"><span class="subcard-icon">🌟</span><strong>Hawks arround the World</strong></button>
      <button class="subcard"><span class="subcard-icon">🏆</span><strong>Erfolge / Pokale</strong></button>
    </div>`;
  moduleBack.hidden = historyStack.length <= 1;
  const legendsButton = moduleContent.querySelector('[data-gallery-action="legends"]');
  if (legendsButton) legendsButton.addEventListener("click", () => renderLegends());
}

function renderLegends(push = true) {
  if (push) historyStack.push({ type: "legends" });
  moduleContent.innerHTML = `
    <div class="module-header"><span class="eyebrow">🌟 Galerie</span><h2>Hawks arround the World</h2><p>Ausgewählte Hawks-Spieler und ihre Profile.</p></div>
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
        ${["U18", "U16", "U14", "U12", "U10"].map((team, index) => `<button class="subcard ${index % 2 === 0 ? "orange" : ""}" ${team === "U16" ? 'data-youth-team="u16"' : ''}><span class="subcard-icon">👥</span><strong>${team}</strong></button>`).join("")}
      </div>
      <div class="note">Die U16 enthält bereits Informationen zum Trainer. Weitere Jugendteams können später ergänzt werden.</div>`;
    moduleBack.hidden = false;
    moduleContent.querySelectorAll("[data-youth-team]").forEach(btn => btn.addEventListener("click", () => renderYouthTeam(btn.dataset.youthTeam)));
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

function renderYouthTeam(teamKey, push = true) {
  if (push) historyStack.push({ type: "youthTeam", teamKey });
  if (teamKey !== "u16") return;
  moduleContent.innerHTML = `
    <div class="module-header"><span class="eyebrow">🏀 Jugend-Mannschaften</span><h2>U16</h2><p>Informationen zur Mannschaft und zum Trainer.</p></div>
    <section class="trainer-profile" aria-labelledby="trainer-title">
      <div class="trainer-heading-card"><span class="subcard-icon">📋</span><h3 id="trainer-title">Trainer</h3></div>
      <img class="trainer-photo" src="assets/sebastian-basti-krause.png" alt="Sebastian Basti Krause mit einem Basketball in der Sporthalle" />
      <div class="trainer-copy">
        <h3>Sebastian „Basti“ Krause</h3>
        <p>Basti Krause ist WU16-Coach, Jugendwart und sportlicher Leiter für den weiblichen Bereich der Hochheim Hawks. Basketball gehört für ihn seit seiner Kindheit zur Familie: Mit sieben Jahren begann er bei seinem Vater Frank und durchlief anschließend die Hochheimer Jugendmannschaften.</p>
        <p>In der Saison 2008/09 spielte er in der U16-Oberliga des BC Wiesbaden und verbrachte danach ein Schuljahr an einer High School in Omaha, Nebraska. Nach seiner Rückkehr spielte er zwei Jahre für die SG Rheinhessen/ASC Mainz in der NBBL. Seit 2012 gehört er als Spieler zum ersten Herrenteam des ASC Theresianum in der Regionalliga.</p>
        <p>Seine Trainerlaufbahn begann 2011 als Co-Trainer der MU10. Er begleitete das Team bis zur MU14-Hessenmeisterschaft und erreichte dort den dritten Platz. Später übernahm er die WU16, führte sie durch zwei Oberliga-Spielzeiten und anschließend in die WU18-Oberliga. Seit 2019 ist er lizenzierter C-Trainer Leistungssport.</p>
        <p>Auch organisatorisch engagiert er sich seit vielen Jahren für die Hawks. 2020 übernahm er die sportliche Leitung des weiblichen Bereichs.</p>
        <h4>Das sagen die Hawks über Basti</h4>
        <blockquote>Sein Training ist nie langweilig – er hat immer neue Ideen.</blockquote>
        <blockquote>Er achtet auf die individuellen Stärken und Schwächen und versucht, aus allen das Beste herauszuholen.</blockquote>
        <blockquote>Er nimmt sich viel Zeit für seine Spielerinnen und Spieler und kann unterschiedliche Charaktere zu einem Team zusammenfügen.</blockquote>
        <blockquote>Motiviert, entspannt und mit viel Spaß bei der Sache.</blockquote>
        <h4>Das sagt Basti über die Hawks</h4>
        <p><strong>Schönstes Erlebnis:</strong> Die Entwicklung seiner Teams über viele Oberliga-Jahre zu sehen.</p>
        <p><strong>Was macht die Hawks besonders?</strong> Der Zusammenhalt und die Gemeinschaft.</p>
        <p class="source-note">Quelle: Hochheim Hawks, „Die Hawks stellen vor – Sebastian (Basti) Krause“, 29.06.2021. Foto: privat.</p>
      </div>
    </section>`;
  moduleBack.hidden = false;
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
    if (key === "digital" && !canUseDigitalModule()) {
      showToast("Die Digitale Abteilung ist nur für die Rolle Admin freigeschaltet.");
      return;
    }
    if (key === "teams") renderTeams();
    else if (key === "news") renderNews();
    else if (key === "games") renderGames();
    else if (key === "partners") renderPartners();
    else if (key === "gallery") renderGallery();
    else if (key === "about") renderAbout();
    else if (key === "service") renderService();
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
  if (previous.type === "about") renderAbout(false);
  if (previous.type === "aboutPeople") renderAboutPeople(false);
  if (previous.type === "aboutPerson") renderAboutPerson(previous.personKey, false);
  if (previous.type === "service") renderService(false);
  if (previous.type === "trainingTimes") renderTrainingTimes(false);
  if (previous.type === "weekendHallTimes") renderWeekendHallTimes(false);
  if (previous.type === "teamCategory") renderTeamCategory(previous.category, false);
  if (previous.type === "teamDetail") renderTeamDetail(previous.teamKey, false);
  if (previous.type === "youthTeam") renderYouthTeam(previous.teamKey, false);
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


const loginForm = document.getElementById("loginForm");
const logoutButton = document.getElementById("logoutButton");

if (loginForm) {
  loginForm.addEventListener("submit", event => {
    event.preventDefault();
    const username = document.getElementById("loginName").value.trim();
    const password = document.getElementById("loginPassword").value;
    const loginError = document.getElementById("loginError");
    const user = DEMO_USERS[username];

    if (!user || user.password !== password) {
      if (loginError) loginError.hidden = false;
      return;
    }

    if (loginError) loginError.hidden = true;
    currentUser = { ...user, username };
    saveSession(username);
    applyRolePermissions();
    loginForm.reset();
    closeModal(document.getElementById("userModal"));
    showToast(`Angemeldet als ${currentUser.displayName} – Rolle ${currentUser.roleLabel}.`);
  });
}

if (logoutButton) {
  logoutButton.addEventListener("click", () => {
    currentUser = ROLE_GUEST;
    saveSession(null);
    applyRolePermissions();
    closeModal(document.getElementById("userModal"));
    showToast("Abgemeldet. Die App wird wieder mit der Rolle Gast verwendet.");
  });
}

loadSession();
applyRolePermissions();

// PWA-Installation: Browser zeigen den Button nur, wenn die App installierbar ist.
let deferredInstallPrompt;
const installButton = document.getElementById("installApp");
window.addEventListener("beforeinstallprompt", event => {
  event.preventDefault();
  deferredInstallPrompt = event;
  if (installButton) installButton.hidden = false;
});
if (installButton) {
  installButton.addEventListener("click", async () => {
    if (!deferredInstallPrompt) {
      showToast("Auf iPhone/iPad: Teilen → Zum Home-Bildschirm.");
      return;
    }
    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    installButton.hidden = true;
  });
}
window.addEventListener("appinstalled", () => showToast("Henrik-Test-Hawks wurde installiert."));
