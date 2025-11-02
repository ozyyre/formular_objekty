// Objekt pro kalkulačku
const kalkulacka = {
  // Převody jednotek
  jednotky: {
    velikost: { MB: 1, GB: 1024 },
    rychlost: { MBps: 1, Mbps: 1 / 8 } // 1 megabit = 1/8 megabajtu
  },

  // Vlastnost pro historii
  historie: [],

  // Metoda pro výpočet času přenosu
  vypocitejCas: function(velikost, jednVel, rychlost, jednRych) {
    const velikostMB = velikost * this.jednotky.velikost[jednVel];
    const rychlostMBps = rychlost * this.jednotky.rychlost[jednRych];

    const casSekundy = velikostMB / rychlostMBps;
    this.historie.push({ velikost, jednVel, rychlost, jednRych, casSekundy });

    return casSekundy;
  }
};

// Pomocná funkce na formátování času
function formatCas(sekundy) {
  const hodiny = Math.floor(sekundy / 3600);
  const minuty = Math.floor((sekundy % 3600) / 60);
  const sekundyZbyv = Math.round(sekundy % 60);
  return `${hodiny} h ${minuty} min ${sekundyZbyv} s`;
}

// Po odeslání formuláře
document.getElementById("formular").addEventListener("submit", function(event) {
  event.preventDefault();

  const velikost = parseFloat(document.getElementById("velikost").value);
  const jednVel = document.getElementById("jednotkaVelikost").value;
  const rychlost = parseFloat(document.getElementById("rychlost").value);
  const jednRych = document.getElementById("jednotkaRychlost").value;

  if (velikost <= 0 || rychlost <= 0 || isNaN(velikost) || isNaN(rychlost)) {
    document.getElementById("vysledek").innerText = "Zadej kladné hodnoty!";
    return;
  }

  const cas = kalkulacka.vypocitejCas(velikost, jednVel, rychlost, jednRych);
  document.getElementById("vysledek").innerText = "Přenos bude trvat přibližně " + formatCas(cas) + ".";
});
