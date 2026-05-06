/* 
   DATA.JS - Datenbank (Separation of Concerns)
    */

// --- BENTO BOX DATENBANK (Startseite) ---
//Vorschau-Kacheln auf der Startseite.
window.bentoProjects = [
    {
        tag: "Highlight",
        title: "Die neue Jugend-Lounge",
        description: "Wir haben den alten Raum komplett renoviert. Ein neuer Treffpunkt für alle ab 14 Jahren mit Gaming-Ecke und Workspace.",
        image: "https://picsum.photos/seed/bento1/1200/1200",
        link: "src/pages/projekte.html" // Wohin soll die Kachel führen?
    },
    {
        tag: "Event",
        title: "Politik-Talk 2026",
        description: "Diskutiere mit lokalen Politikern über die Zukunft von Pratteln.",
        image: "https://picsum.photos/seed/bento2/800/800",
        link: "src/pages/events.html"
    },
    {
        tag: "Team",
        title: "Wir suchen dich!",
        description: "Werde Teil des Jugendrats und verändere deine Gemeinde aktiv mit.",
        image: "https://picsum.photos/seed/bento3/800/800",
        link: "src/pages/team.html"
    },
    {
        tag: "Projekt",
        title: "Skatepark Upgrade",
        description: "Neue Rampen und Flutlichter für längere Sessions im Sommer.",
        image: "https://picsum.photos/seed/bento4/800/800",
        link: "src/pages/projekte.html"
    }
];

// --- TEAM DATENBANK ---
// Hier kannst du Mitglieder extrem einfach hinzufügen, ändern oder löschen.
window.teamMembers = [
    {
        name: "Andrin Leo Virisario",
        roleFront: "IT-Leitung",
        roleBack: "IT-Infrastruktur, IT-Support, Social Media",
        age: "20",
        quote: "Wir sind die Zukunft!",
        instagram: "andrinlv",
        image: "/src/frontend/assets/portraits/Andrin.leo-virisario.jpg"
    },
    {
        name: "Plmko Ij",
        roleFront: "Yxcvb Nm",
        roleBack: "Aufgaben: Website, Social Media, IT-Support",
        age: "19",
        quote: "Qwert yuiop asdfg hjkl zxcvb nmqwe rtyui opasd fghjk.",
        instagram: "Plmko_insta",
        image: "/src/frontend/assets/portraits/Anonym.png"
    },
    {
        name: "Rtuz Vb",
        roleFront: "Qwerty Uiop",
        roleBack: "Aufgaben: Website, Social Media, IT-Support",
        age: "16",
        quote: "Vbnm kljhgf dsaqw ertyuio pasdf ghjkl.",
        instagram: "Rtuz_official",
        image: "/src/frontend/assets/portraits/Anonym.png"
    },
    {
        name: "Qwertz Ui",
        roleFront: "Zxcvbn Qwe",
        roleBack: "Aufgaben: Website, Social Media, IT-Support",
        age: "17",
        quote: "Asdfg hjklz xcvbn mqwer tyuio pasdf ghjkl mnbv.",
        instagram: "Vbnm_qwe",
        image: "/src/frontend/assets/portraits/Anonym.png"
    },
    {
        name: "Plmko Ij",
        roleFront: "Yxcvb Nm",
        roleBack: "Aufgaben: Website, Social Media, IT-Support",
        age: "19",
        quote: "Qwert yuiop asdfg hjkl zxcvb nmqwe rtyui opasd fghjk.",
        instagram: "Plmko_insta",
        image: "/src/frontend/assets/portraits/Anonym.png"
    },
    {
        name: "Rtuz Vb",
        roleFront: "Qwerty Uiop",
        roleBack: "IT-Infrastruktur, IT-Support, Social Media",
        age: "16",
        quote: "Vbnm kljhgf dsaqw ertyuio pasdf ghjkl.",
        instagram: "Rtuz_official",
        image: "/src/frontend/assets/portraits/Anonym.png"
    },
    {
        name: "Qwertz Ui",
        roleFront: "Zxcvbn Qwe",
        roleBack: "Aufgaben: Website, Social Media, IT-Support",
        age: "17",
        quote: "Asdfg hjklz xcvbn mqwer tyuio pasdf ghjkl mnbv.",
        instagram: "Vbnm_qwe",
        image: "/src/frontend/assets/portraits/Anonym.png"
    },
    {
        name: "Plmko Ij",
        roleFront: "Yxcvb Nm",
        roleBack: "Aufgaben: Website, Social Media, IT-Support",
        age: "19",
        quote: "Qwert yuiop asdfg hjkl zxcvb nmqwe rtyui opasd fghjk.",
        instagram: "Plmko_insta",
        image: "/src/frontend/assets/portraits/Anonym.png"
    },
    {
        name: "Rtuz Vb",
        roleFront: "Qwerty Uiop",
        roleBack: "Aufgaben: Website, Social Media, IT-Support",
        age: "16",
        quote: "Vbnm kljhgf dsaqw ertyuio pasdf ghjkl.",
        instagram: "Rtuz_official",
        image: "/src/frontend/assets/portraits/Anonym.png"
    }
    // Willst du ein neues Mitglied hinzufügen? Kopiere einfach einen Block von { bis }, füge ihn hier ein und ändere den Text!
];

// --- AKTUELLE PROJEKTE DATENBANK ---
window.activeProjects = [
    {
        title: "Jugend-Lounge",
        description: "Die neuen Räumlichkeiten sind eröffnet",
        images: [
            "https://picsum.photos/seed/projA1/800/500",
            "https://picsum.photos/seed/projA2/800/500",
            "https://picsum.photos/seed/projA3/800/500"
        ]
    },
    {
        title: "Politik für Anfänger",
        description: "Unser neuer Workshop startet bald.",
        images: [
            "https://picsum.photos/seed/projB1/800/500",
            "https://picsum.photos/seed/projB2/800/500"
        ]
    },
    {
        title: "Skate-Contest 2026",
        description: "Anmeldungen sind ab sofort offen!",
        images: [
            "https://picsum.photos/seed/projC1/800/500",
            "https://picsum.photos/seed/projC2/800/500",
            "https://picsum.photos/seed/projC3/800/500"
        ]
    },
    {
        title: "Umwelt-Woche",
        description: "Gemeinsam räumen wir das Zentrum auf.",
        images: [
            "https://picsum.photos/seed/projD1/800/500",
            "https://picsum.photos/seed/projD2/800/500"
        ]
    }
];

// --- ABGESCHLOSSENE PROJEKTE DATENBANK (Film Roll) ---
window.completedProjects = [
    {
        title: "Nachtbus-Linie",
        subtitle: "Umgesetzt im Sommer 2024",
        image: "https://picsum.photos/seed/proj1/800/1000"
    },
    {
        title: "Schulhof-Begrünung",
        subtitle: "Umgesetzt im Frühling 2025",
        image: "https://picsum.photos/seed/proj2/800/1000"
    },
    {
        title: "Bewerbungs-Workshops",
        subtitle: "Über 100 Teilnehmer im Jahr 2025",
        image: "https://picsum.photos/seed/proj3/800/1000"
    },
    {
        title: "Skatepark Erweiterung",
        subtitle: "Eröffnet im Herbst 2023",
        image: "https://picsum.photos/seed/proj4/800/1000"
    },
    {
        title: "Kostenloses WLAN",
        subtitle: "Im gesamten Dorfzentrum (2022)",
        image: "https://picsum.photos/seed/proj5/800/1000"
    }
];

// --- EVENTS DATENBANK ---
// Hier kannst du zukünftige Events einfach hinzufügen oder alte löschen.
window.eventsData = [
    {
        id: "img-event-1",
        date: "12. Okt 2026",
        title: "Event 1",
        description: "Asdfg hjklz xcvbn mqwer tyuio pasdf ghjkl.",
        imageDesktop: "https://picsum.photos/seed/event1/1000/1400",
        imageMobile: "https://picsum.photos/seed/event1/800/600"
    },
    {
        id: "img-event-2",
        date: "28. Nov 2026",
        title: "Event 2",
        description: "Zxcvb nmqwe rtyui opasd fghjk lmnbv cxza.",
        imageDesktop: "https://picsum.photos/seed/event2/1000/1400",
        imageMobile: "https://picsum.photos/seed/event2/800/600"
    },
    {
        id: "img-event-3",
        date: "05. Jan 2027",
        title: "Event 3",
        description: "Qayws xedcr fvtgb yhnuj mikol ppokm ijnuhb.",
        imageDesktop: "https://picsum.photos/seed/event3/1000/1400",
        imageMobile: "https://picsum.photos/seed/event3/800/600"
    },
    {
        id: "img-event-4",
        date: "19. Mär 2027",
        title: "Event 4",
        description: "Mnbvc xzlkj hgfds aqwer tyuio plkjh gfds.",
        imageDesktop: "https://picsum.photos/seed/event4/1000/1400",
        imageMobile: "https://picsum.photos/seed/event4/800/600"
    }
];
