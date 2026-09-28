import type { BlogPost } from "./types";

type Departure = {
  slug: string;
  city: string;
  region: string;
  nearby: string[];
  note: string;
  routes: string[];
};

const departures: Departure[] = [
  { slug: "bucuresti", city: "Bucuresti", region: "Bucuresti si Ilfov", nearby: ["Otopeni", "Voluntari", "Buftea", "Chitila", "Popesti-Leordeni"], note: "Traficul din Capitala face ca ora de preluare sa fie stabilita pe interval, iar pentru cartierele aglomerate se alege un punct usor accesibil pentru vehicul.", routes: ["germania", "italia", "belgia"] },
  { slug: "iasi", city: "Iasi", region: "Moldova", nearby: ["Pascani", "Harlau", "Targu Frumos", "Podu Iloaiei"], note: "Din Moldova drumul spre vest este mai lung, asa ca plecarile se programeaza de obicei devreme, iar primele ore de traseu traverseaza tara spre granita cu Ungaria.", routes: ["germania", "italia", "franta"] },
  { slug: "suceava", city: "Suceava", region: "Bucovina", nearby: ["Radauti", "Falticeni", "Campulung Moldovenesc", "Gura Humorului", "Vatra Dornei"], note: "Bucovina are una dintre cele mai mari comunitati de lucratori in strainatate, iar cererea pentru Germania, Italia si Belgia este constanta tot anul.", routes: ["germania", "italia", "belgia"] },
  { slug: "cluj-napoca", city: "Cluj-Napoca", region: "Transilvania", nearby: ["Turda", "Dej", "Gherla", "Floresti", "Huedin"], note: "Fiind aproape de granita de vest, din Cluj ajungi mai repede in Ungaria si Austria, ceea ce scurteaza vizibil durata totala a cursei.", routes: ["germania", "austria", "olanda"] },
  { slug: "timisoara", city: "Timisoara", region: "Banat", nearby: ["Lugoj", "Arad", "Jimbolia", "Sannicolau Mare", "Buzias"], note: "Timisoara este unul dintre cele mai bune puncte de plecare spre vest: granita este aproape, iar primul oras mare din strainatate se atinge in cateva ore.", routes: ["germania", "austria", "ungaria"] },
  { slug: "brasov", city: "Brasov", region: "Tara Barsei", nearby: ["Sacele", "Codlea", "Rasnov", "Fagaras", "Zarnesti"], note: "Brasovul se afla pe axa centrala a tarii, astfel ca preluarea se integreaza usor in cursele care pleaca din sud-est spre granita de vest.", routes: ["germania", "belgia", "franta"] },
  { slug: "bacau", city: "Bacau", region: "Moldova", nearby: ["Onesti", "Moinesti", "Comanesti", "Buhusi"], note: "Din zona Bacau pleaca multi lucratori sezonieri spre Germania si Italia, iar preluarile din aceeasi zona se pot organiza pe grupuri.", routes: ["germania", "italia", "olanda"] },
  { slug: "craiova", city: "Craiova", region: "Oltenia", nearby: ["Caracal", "Bailesti", "Filiasi", "Calafat", "Drobeta-Turnu Severin"], note: "Din Oltenia traseul urca spre vestul tarii, iar pentru localitatile mai mici se stabileste un punct de preluare pe drumul principal.", routes: ["germania", "italia", "austria"] },
  { slug: "oradea", city: "Oradea", region: "Crisana", nearby: ["Salonta", "Marghita", "Beius", "Alesd"], note: "Oradea este practic la granita cu Ungaria, deci din primele minute ale cursei esti deja pe drumul spre Budapesta si Viena.", routes: ["ungaria", "austria", "germania"] },
  { slug: "constanta", city: "Constanta", region: "Dobrogea", nearby: ["Mangalia", "Navodari", "Medgidia", "Ovidiu", "Eforie"], note: "Constanta este unul dintre cele mai estice puncte de plecare, asa ca plecarea se face devreme, iar traseul traverseaza tara spre granita de vest.", routes: ["germania", "italia", "belgia"] },
];

type Destination = {
  slug: string;
  city: string;
  country: string;
  routeSlug: string;
  areas: string[];
  note: string;
};

const destinations: Destination[] = [
  { slug: "munchen", city: "Munchen", country: "Germania", routeSlug: "germania", areas: ["Augsburg", "Ingolstadt", "Rosenheim", "Freising", "Dachau"], note: "Munchen si Bavaria sunt de obicei prima zona mare din Germania atinsa pe traseu, ceea ce inseamna o cursa mai scurta decat spre nordul tarii." },
  { slug: "stuttgart", city: "Stuttgart", country: "Germania", routeSlug: "germania", areas: ["Esslingen", "Ludwigsburg", "Heilbronn", "Reutlingen", "Ulm"], note: "Zona Stuttgart concentreaza multa industrie auto si constructii, cu o comunitate romaneasca numeroasa in tot Baden-Wurttemberg." },
  { slug: "frankfurt", city: "Frankfurt", country: "Germania", routeSlug: "germania", areas: ["Offenbach", "Wiesbaden", "Mainz", "Darmstadt", "Hanau"], note: "Frankfurt este un nod central al Germaniei, iar din zona Rin-Main se ajunge usor spre adresele din Hessa si Renania-Palatinat." },
  { slug: "koln", city: "Koln", country: "Germania", routeSlug: "germania", areas: ["Bonn", "Dusseldorf", "Leverkusen", "Duisburg", "Essen"], note: "Renania de Nord-Westfalia este cel mai populat land german, cu multe locuri de munca in logistica, industrie si servicii." },
  { slug: "berlin", city: "Berlin", country: "Germania", routeSlug: "germania", areas: ["Potsdam", "Spandau", "Neukolln", "Marzahn", "Oranienburg"], note: "Berlinul este mai la nord decat alte destinatii germane, asa ca durata cursei este ceva mai mare decat spre Bavaria." },
  { slug: "hamburg", city: "Hamburg", country: "Germania", routeSlug: "germania", areas: ["Bremen", "Lubeck", "Kiel", "Luneburg", "Norderstedt"], note: "Hamburg si nordul Germaniei sunt printre cele mai indepartate destinatii germane, cu mult trafic in zona portului." },
  { slug: "viena", city: "Viena", country: "Austria", routeSlug: "austria", areas: ["Schwechat", "Modling", "Baden", "Klosterneuburg", "St. Polten"], note: "Viena este cea mai apropiata capitala vestica, ideala pentru deplasari scurte, tratamente sau munca in constructii si ingrijire." },
  { slug: "milano", city: "Milano", country: "Italia", routeSlug: "italia", areas: ["Monza", "Bergamo", "Brescia", "Como", "Varese"], note: "Lombardia are una dintre cele mai mari comunitati romanesti din Italia, iar Milano este primul mare oras atins pe multe curse." },
  { slug: "roma", city: "Roma", country: "Italia", routeSlug: "italia", areas: ["Fiumicino", "Tivoli", "Guidonia", "Latina", "Civitavecchia"], note: "Roma si Lazio presupun mai multi kilometri decat nordul Italiei, dar gazduiesc una dintre cele mai vechi comunitati romanesti." },
  { slug: "torino", city: "Torino", country: "Italia", routeSlug: "italia", areas: ["Moncalieri", "Collegno", "Rivoli", "Asti", "Alessandria"], note: "Piemontul si Torino au o comunitate romaneasca foarte mare, adesea numita cea mai mare din Italia raportat la populatie." },
  { slug: "bruxelles", city: "Bruxelles", country: "Belgia", routeSlug: "belgia", areas: ["Anderlecht", "Schaerbeek", "Molenbeek", "Leuven", "Mechelen"], note: "Bruxelles are zone cu acces auto restrictionat, asa ca punctul exact de lasare se stabileste cu soferul inainte de sosire." },
  { slug: "amsterdam", city: "Amsterdam", country: "Olanda", routeSlug: "olanda", areas: ["Haarlem", "Zaandam", "Almere", "Amstelveen", "Hoofddorp"], note: "Centrul Amsterdamului este greu accesibil pentru vehicule mari, iar lasarea se face de obicei intr-un punct apropiat, usor de gasit." },
  { slug: "paris", city: "Paris", country: "Franta", routeSlug: "franta", areas: ["Saint-Denis", "Argenteuil", "Creteil", "Versailles", "Montreuil"], note: "Parisul are restrictii de circulatie pentru anumite vehicule, iar suburbiile din Ile-de-France sunt de multe ori mai usor de deservit." },
  { slug: "zurich", city: "Zurich", country: "Elvetia", routeSlug: "elvetia", areas: ["Winterthur", "Baden", "Uster", "Dietikon", "Wallisellen"], note: "Pentru Elvetia, bunurile transportate pot fi verificate vamal, asa ca merita sa ai la indemana bonurile pentru obiectele noi." },
];

type Generic = Omit<BlogPost, "category" | "publishedAt" | "updatedAt"> & {
  category: BlogPost["category"];
};

const generic: Generic[] = [
  {
    slug: "firme-transport-persoane-europa-cum-alegi",
    seoTitle: "Firme transport persoane Europa: cum alegi corect",
    title: "Firme de transport persoane in Europa: cum alegi o firma serioasa",
    description: "Criterii clare pentru a alege o firma de transport persoane Romania - Europa: contact, transparenta tarifului, door-to-door, bagaje si recenzii.",
    excerpt: "Oferta de transport persoane e mare, dar diferentele dintre firme sunt reale. Iata ce verifici inainte sa rezervi.",
    keywords: ["firme transport persoane Europa", "firma transport persoane Germania", "transport persoane serios", "cum aleg transport persoane"],
    readingMinutes: 6,
    relatedRouteSlugs: ["germania", "italia", "belgia"],
    sections: [
      { heading: "Contact direct si raspuns rapid", body: ["O firma serioasa raspunde la telefon si pe WhatsApp si iti da informatii clare despre ruta, data si tarif. Daca primesti raspunsuri vagi sau astepti zile intregi, e un semnal de alarma.", "Verifica si daca ai un numar de dispecerat, nu doar numarul personal al unui sofer. Dispeceratul te poate informa si cand soferul este la volan."] },
      { heading: "Tarif clar, confirmat inainte de plecare", body: ["Pretul trebuie comunicat inainte de cursa, pentru ruta exacta. Evita situatiile in care tariful se stabileste la final sau creste pe drum fara motiv.", "Intreaba explicit ce include tariful: bagajele, preluarea de la adresa, eventualele colete."] },
      { heading: "Ce sa verifici concret", body: ["Cateva intrebari simple separa firmele serioase de cele improvizate."], bullets: ["Preiei de la adresa mea si ma lasi la adresa de destinatie?", "Care este intervalul estimat de sosire?", "Ce se intampla daca intarzie cursa?", "Pot trimite si colete pe aceeasi cursa?", "Cum confirmati rezervarea?"] },
      { heading: "Recenzii si recomandari", body: ["Recomandarile de la prieteni si recenziile de pe Google sunt cele mai sigure surse. Uita-te la recenziile recente si la modul in care firma raspunde la reclamatii."] },
    ],
    faq: [
      { question: "Cum recunosc o firma de transport persoane serioasa?", answer: "Are dispecerat care raspunde rapid, confirma tariful inainte de plecare, ofera preluare de la adresa si are recenzii reale, recente." },
      { question: "E bine sa aleg cea mai ieftina oferta?", answer: "Nu intotdeauna. Compara ce include tariful: door-to-door, bagaje, comunicare si siguranta conteaza mai mult decat cativa euro diferenta." },
    ],
    takeaway: "Alege firma care raspunde rapid, confirma pretul inainte, preia de la adresa si are recenzii reale.",
    category: "rezervari-tarife",
  },
  {
    slug: "transport-persoane-moldova-europa",
    title: "Transport persoane din Moldova spre Europa: ce trebuie sa stii",
    description: "Ghid pentru transportul de persoane din Moldova (Iasi, Suceava, Bacau, Neamt, Vaslui) spre Germania, Italia, Belgia si alte tari europene.",
    excerpt: "Moldova are cei mai multi calatori spre Europa de Vest. Iata cum se organizeaza cursele door-to-door din regiune.",
    keywords: ["transport persoane Moldova Germania", "transport persoane Iasi Europa", "microbuz Suceava Italia", "transport Bacau Germania"],
    readingMinutes: 6,
    relatedRouteSlugs: ["germania", "italia", "belgia"],
    sections: [
      { heading: "De ce din Moldova pleaca cei mai multi calatori", body: ["Judetele din Moldova au cea mai mare pondere de lucratori in strainatate, iar cererea de transport este constanta pe tot anul. Italia, Germania si Belgia sunt destinatiile principale.", "Pentru multi, transportul door-to-door este singura varianta comoda: aeroporturile sunt departe, iar cu bagaje multe trenul nu este o optiune reala."] },
      { heading: "Zone din care se preia frecvent", body: ["Preluarea se face de la adresa, inclusiv din localitati mici, daca sunt pe traseul cursei sau aproape de el."], bullets: ["Iasi, Pascani, Harlau", "Suceava, Radauti, Falticeni", "Bacau, Onesti, Moinesti", "Piatra Neamt, Roman, Targu Neamt", "Vaslui, Barlad, Husi, Botosani"] },
      { heading: "Durata si ora de plecare", body: ["Din Moldova drumul spre vest este cel mai lung din tara, asa ca plecarile se fac devreme. Spre Germania sau Italia, calculeaza in jur de 26-34 de ore, in functie de destinatie.", "Ora exacta de preluare se confirma cu o zi inainte, dupa ce se stabilesc toate adresele de pe cursa."] },
      { heading: "Rezervare pentru grupuri si familii", body: ["Daca plecati mai multi din acelasi sat sau oras, spuneti de la inceput. Preluarea grupata simplifica traseul si este de regula mai avantajoasa."] },
    ],
    faq: [
      { question: "Ma preluati dintr-un sat din Moldova?", answer: "Da, daca localitatea este pe traseu sau aproape de el. Trimite adresa completa la rezervare pentru confirmare." },
      { question: "Cat dureaza drumul din Iasi in Germania?", answer: "Orientativ 26-32 de ore, in functie de destinatia din Germania si de numarul de opriri." },
    ],
    takeaway: "Din Moldova plecarile sunt devreme, preluarea se face de la adresa, iar grupurile din aceeasi zona se organizeaza impreuna.",
    category: "rute",
  },
  {
    slug: "transport-bagaje-mutare-romania-europa",
    title: "Transport bagaje si mutari Romania - Europa: cum le organizezi",
    description: "Cum transporti bagaje multe, cutii si obiecte personale la o mutare intre Romania si Germania, Italia, Belgia sau alte tari europene.",
    excerpt: "O mutare in strainatate inseamna mai mult bagaj decat incape intr-un avion. Iata varianta simpla, door-to-door.",
    keywords: ["transport bagaje Europa", "mutare Romania Germania", "transport cutii Italia", "mutare in strainatate transport"],
    readingMinutes: 5,
    relatedRouteSlugs: ["germania", "italia", "belgia"],
    sections: [
      { heading: "De ce avionul nu e solutia pentru mutari", body: ["La avion, fiecare bagaj suplimentar costa, iar obiectele voluminoase nu sunt acceptate sau devin foarte scumpe. La asta se adauga drumul pana la aeroport si de la aeroport pana la noua locuinta.", "Transportul cu microbuzul preia bagajele de la usa si le lasa direct la noua adresa."] },
      { heading: "Cum pregatesti bagajele", body: ["Foloseste cutii rezistente, eticheteaza fiecare cutie cu numele si telefonul tau si tine documentele importante la tine, nu in bagaje."], bullets: ["Cutii de carton dublu, nu saci", "Obiectele fragile invelite separat", "Lista cu numarul total de cutii", "Actele si medicamentele in bagajul de mana"] },
      { heading: "Anunta volumul din timp", body: ["Spune la rezervare cate cutii si valize ai si ce obiecte mari transporti. Astfel se aloca spatiul necesar si nu ramane nimic in urma."] },
    ],
    faq: [
      { question: "Pot transporta mobila mica sau o bicicleta?", answer: "Depinde de spatiul disponibil pe cursa. Anunta dimensiunile inainte de rezervare pentru confirmare." },
      { question: "Pot calatori impreuna cu bagajele?", answer: "Da, pasagerul si bagajele pot merge pe aceeasi cursa, cu preluare si lasare la adresa." },
    ],
    takeaway: "Pentru mutari, transportul door-to-door cu microbuzul evita costurile de bagaj ale avionului; anunta volumul la rezervare.",
    category: "colete",
  },
  {
    slug: "curse-regulate-romania-germania-program",
    title: "Curse regulate Romania - Germania: cum functioneaza programul",
    description: "Cum functioneaza cursele regulate Romania - Germania: frecventa, zile de plecare, confirmarea orei de preluare si sfaturi pentru a prinde loc.",
    excerpt: "Plecari regulate nu inseamna ora fixa la statie. Iata cum se stabileste programul unei curse door-to-door.",
    keywords: ["curse zilnice Romania Germania", "program microbuz Germania", "plecari Romania Germania", "curse regulate Germania"],
    readingMinutes: 5,
    relatedRouteSlugs: ["germania", "austria", "ungaria"],
    sections: [
      { heading: "Plecari regulate, ora personalizata", body: ["La transportul door-to-door nu exista o statie cu ora fixa. Ziua plecarii se stabileste la rezervare, iar ora de preluare se confirma in functie de toate adresele de pe cursa.", "Asta inseamna ca ora ta de preluare depinde de pozitia ta pe traseu, nu de un orar general."] },
      { heading: "Cum prinzi locul dorit", body: ["Cu cat anunti mai devreme, cu atat e mai usor sa pleci exact in ziua dorita."], bullets: ["Rezerva cu 1-2 saptamani inainte in perioade normale", "Rezerva cu 3-4 saptamani inainte de sarbatori", "Fii flexibil cu o zi, daca se poate", "Confirma adresa completa si telefonul"] },
      { heading: "Ce primesti inainte de plecare", body: ["Cu o zi inainte primesti intervalul de preluare si datele de contact ale soferului. Tine telefonul pornit in ziua cursei."] },
    ],
    faq: [
      { question: "Aveti plecari in fiecare zi spre Germania?", answer: "Germania este ruta cu cele mai dese plecari. Disponibilitatea exacta pentru ziua dorita se confirma la rezervare." },
      { question: "Cand aflu ora exacta de preluare?", answer: "De regula cu o zi inainte, dupa ce se stabilesc toate adresele de pe cursa." },
    ],
    takeaway: "Ziua se stabileste la rezervare, iar ora de preluare se confirma cu o zi inainte, in functie de traseu.",
    category: "rezervari-tarife",
  },
  {
    slug: "transport-persoane-ieftin-europa-sfaturi",
    seoTitle: "Transport persoane ieftin in Europa: cum economisesti",
    title: "Transport persoane ieftin Romania - Europa: cum economisesti fara compromisuri",
    description: "Sfaturi practice pentru un transport de persoane mai ieftin intre Romania si Europa: rezervare din timp, flexibilitate, grupuri si bagaje.",
    excerpt: "Ieftin nu trebuie sa insemne nesigur. Iata cum reduci costul real al calatoriei, pastrand confortul door-to-door.",
    keywords: ["transport persoane ieftin Europa", "transport ieftin Germania", "microbuz ieftin Italia", "pret mic transport persoane"],
    readingMinutes: 5,
    relatedRouteSlugs: ["germania", "italia", "austria"],
    sections: [
      { heading: "Compara costul total, nu doar biletul", body: ["Un bilet aparent ieftin poate deveni scump dupa ce adaugi bagajele, drumul pana la statie sau aeroport si transferul final. Transportul door-to-door include toate aceste etape."] },
      { heading: "Cinci moduri reale de a plati mai putin", body: ["Cateva decizii simple fac diferenta."], bullets: ["Rezerva din timp, mai ales inainte de sarbatori", "Fii flexibil cu o zi sau doua", "Calatoriti in grup, din aceeasi zona", "Evita varfurile din decembrie, ianuarie si august", "Trimite coletele pe aceeasi cursa, nu separat"] },
      { heading: "Unde nu merita sa economisesti", body: ["Siguranta, un sofer odihnit si o firma care raspunde la telefon valoreaza mai mult decat cativa euro. Evita ofertele fara confirmare clara a tarifului."] },
    ],
    faq: [
      { question: "Care este cea mai ieftina perioada pentru calatorie?", answer: "In afara sarbatorilor si a lunii august, cand cererea este mai mica si disponibilitatea mai mare." },
      { question: "Este mai ieftin daca mergem mai multi?", answer: "De regula da, mai ales daca adresele de preluare sunt apropiate." },
    ],
    takeaway: "Rezerva din timp, fii flexibil si calatoriti in grup: asa scade costul fara sa pierzi confortul door-to-door.",
    category: "rezervari-tarife",
  },
  {
    slug: "transport-persoane-de-craciun-si-paste-europa",
    title: "Transport persoane de Craciun si Paste: ghid pentru diaspora",
    description: "Cum iti asiguri locul in transportul de persoane de Craciun si Paste intre Europa si Romania: cand rezervi, ce bagaje iei si cum eviti aglomeratia.",
    excerpt: "Sarbatorile aduc cea mai mare cerere din an. Iata cum ajungi acasa la timp si te intorci fara stres.",
    keywords: ["transport Craciun Germania Romania", "transport Paste Italia Romania", "acasa de sarbatori microbuz", "transport sarbatori diaspora"],
    readingMinutes: 5,
    relatedRouteSlugs: ["germania", "italia", "belgia"],
    sections: [
      { heading: "Rezerva cu 3-4 saptamani inainte", body: ["In saptamanile dinaintea Craciunului si a Pastelui, cererea se dubleaza. Locurile pentru zilele cele mai cautate se ocupa primele."] },
      { heading: "Rezerva si intoarcerea", body: ["Dupa sarbatori, toata lumea revine in aceleasi zile. Rezervarea ambelor sensuri de la inceput te scuteste de cautari in ultima clipa."] },
      { heading: "Bagaje si colete de sarbatori", body: ["Cadourile si produsele traditionale cresc volumul bagajelor. Anunta-l la rezervare si alege doar produse neperisabile."], bullets: ["Cozonac si dulciuri ambalate etans", "Conserve si dulceturi bine inchise", "Cadouri ambalate in cutii rezistente", "Fara carne sau lactate proaspete"] },
    ],
    faq: [
      { question: "Cand trebuie sa rezerv pentru Craciun?", answer: "Ideal cu 3-4 saptamani inainte, atat pentru plecare, cat si pentru intoarcere." },
      { question: "Pot lua bagaje in plus de sarbatori?", answer: "Da, in limita spatiului disponibil, daca anunti volumul la rezervare." },
    ],
    takeaway: "De sarbatori, rezerva ambele sensuri cu 3-4 saptamani inainte si anunta bagajele suplimentare.",
    category: "ghiduri-diaspora",
  },
];

function departurePost(item: Departure, index: number): BlogPost {
  return {
    slug: `transport-persoane-din-${item.slug}-spre-europa`,
    seoTitle: `Transport persoane ${item.city} - Europa, door-to-door`,
    title: `Transport persoane din ${item.city} spre Germania, Italia si Europa`,
    description: `Transport persoane si colete din ${item.city} spre Germania, Italia, Belgia si alte tari europene, cu preluare de la adresa din ${item.region}.`,
    excerpt: `Pleci din ${item.city} sau din imprejurimi? Iata cum functioneaza transportul door-to-door spre Europa, de la preluare pana la destinatie.`,
    category: "rute",
    keywords: [
      `transport persoane ${item.city} Germania`,
      `transport persoane ${item.city} Italia`,
      `microbuz ${item.city} Europa`,
      `transport colete ${item.city}`,
      `transport persoane ${item.region}`,
    ],
    publishedAt: `2025-10-${String(2 + index * 2).padStart(2, "0")}`,
    updatedAt: "2026-09-20",
    readingMinutes: 5,
    relatedRouteSlugs: item.routes,
    sections: [
      {
        heading: `Preluare de la adresa din ${item.city}`,
        body: [
          `Transportul door-to-door inseamna ca vehiculul vine la adresa ta din ${item.city}, fara sa mai cauti o autogara sau un aeroport. Te lasa apoi cat mai aproape de adresa finala din tara de destinatie.`,
          item.note,
        ],
      },
      {
        heading: `Localitati din jurul orasului ${item.city}`,
        body: [`Preluam si din localitatile din ${item.region}, daca se afla pe traseul cursei sau aproape de el.`],
        bullets: [...item.nearby, `si alte localitati din ${item.region}`],
      },
      {
        heading: `Unde poti ajunge din ${item.city}`,
        body: [
          "Cele mai cerute destinatii sunt Germania, Italia si Belgia, dar reteaua acopera 10 tari europene: Germania, Belgia, Franta, Italia, Olanda, Austria, Elvetia, Danemarca, Luxemburg si Ungaria.",
          "Durata depinde de destinatie: Ungaria si Austria se ating in mai putin de o zi, iar Germania, Italia sau Belgia in aproximativ 24-34 de ore.",
        ],
      },
      {
        heading: "Cum rezervi",
        body: [
          `Trimite pe WhatsApp adresa din ${item.city}, adresa de destinatie, data si numarul de persoane. Primesti rapid disponibilitatea si tariful pentru ruta exacta.`,
        ],
      },
    ],
    faq: [
      {
        question: `Ma preluati de acasa din ${item.city}?`,
        answer: `Da, preluarea se face de la adresa din ${item.city} sau din localitatile apropiate aflate pe traseu.`,
      },
      {
        question: `Pot trimite colete din ${item.city} in Europa?`,
        answer: "Da, coletele se preiau de la adresa si se livreaza la destinatar, pe aceleasi curse.",
      },
      {
        question: `Cat dureaza drumul din ${item.city} in Germania?`,
        answer: "Orientativ 24-32 de ore, in functie de destinatia din Germania si de opririle de pe traseu.",
      },
    ],
    takeaway: `Din ${item.city} si ${item.region} pleci direct de acasa spre 10 tari europene, cu rezervare rapida pe WhatsApp.`,
  };
}

function destinationPost(item: Destination, index: number): BlogPost {
  return {
    slug: `transport-persoane-romania-${item.slug}`,
    title: `Transport persoane Romania - ${item.city}: door-to-door, fara transferuri`,
    seoTitle: `Transport persoane Romania - ${item.city} | door-to-door`,
    description: `Transport persoane si colete Romania - ${item.city} (${item.country}) cu preluare de la adresa si lasare la destinatie, inclusiv ${item.areas.slice(0, 3).join(", ")}.`,
    excerpt: `Cauti transport din Romania pana la ${item.city}? Iata cum functioneaza cursa door-to-door si ce zone din jur sunt deservite.`,
    category: "rute",
    keywords: [
      `transport persoane Romania ${item.city}`,
      `microbuz ${item.city} Romania`,
      `transport colete ${item.city}`,
      `curse Romania ${item.city}`,
      `transport ${item.city} ${item.country}`,
    ],
    publishedAt: `2026-0${1 + Math.floor(index / 3)}-${String(5 + (index % 3) * 8).padStart(2, "0")}`,
    updatedAt: "2026-09-20",
    readingMinutes: 5,
    relatedRouteSlugs: [item.routeSlug],
    sections: [
      {
        heading: `Cum ajungi din Romania la ${item.city}`,
        body: [
          `Transportul door-to-door Romania - ${item.city} te preia de la adresa din Romania si te lasa cat mai aproape de adresa ta din ${item.city}. Nu ai nevoie de zboruri, trenuri sau transferuri.`,
          item.note,
        ],
      },
      {
        heading: `Zone deservite in jurul orasului ${item.city}`,
        body: [`Pe langa ${item.city}, cursele pot ajunge si in localitatile din jur, daca sunt pe traseu.`],
        bullets: item.areas,
      },
      {
        heading: "Bagaje si colete",
        body: [
          "Poti lua bagajele uzuale pentru o calatorie lunga, iar pentru mutari sau volume mari anunti din timp. Pe aceeasi cursa se pot trimite si colete catre familie sau prieteni.",
        ],
      },
      {
        heading: "Rezervare rapida",
        body: [
          `Trimite adresa de plecare, adresa din ${item.city}, data si numarul de persoane pe WhatsApp sau suna la dispecerat. Primesti confirmarea si tariful pentru ruta exacta.`,
        ],
      },
    ],
    faq: [
      {
        question: `Ma lasati direct la adresa din ${item.city}?`,
        answer: `Da, lasarea se face cat mai aproape de adresa finala din ${item.city}, in functie de accesul rutier.`,
      },
      {
        question: `Pot trimite un colet in ${item.city}?`,
        answer: `Da, coletele se livreaza la destinatarul din ${item.city} sau din zona, pe cursele regulate spre ${item.country}.`,
      },
    ],
    takeaway: `Romania - ${item.city}: preluare de acasa, lasare la adresa si colete pe aceeasi cursa, cu rezervare rapida.`,
  };
}

export const extraPosts: BlogPost[] = [
  ...departures.map(departurePost),
  ...destinations.map(destinationPost),
  ...generic.map((post, index) => ({
    ...post,
    publishedAt: `2026-0${6 + Math.floor(index / 2)}-${String(4 + (index % 2) * 14).padStart(2, "0")}`,
    updatedAt: "2026-09-20",
  })),
];
