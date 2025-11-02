
const kalkulacka = {
  historie: [],

  prepocetNaBity: function(velikost, jednotkaVelikost) {
    if (jednotkaVelikost === "GB") {
      return velikost * 1024 * 1024 * 8; 
    }
    return velikost * 1024 * 1024 * 8; 
  },

  prepocetRychlosti: function(rychlost, jednotkaRychlost) {
    if (jednotkaRychlost === "Mbps") return rychlost * 1000000;
    if (jednotkaRychlost === "MBps") return rychlost * 8 * 1000000; 
    return rychlost;
  },

  vypocetCas: function(velikost, jednotkaVelikost, rychlost, jednotkaRychlost) {
    let velikostBit = this.prepocetNaBity(velikost, jednotkaVelikost);
    let rychlostBit = this.prepocetRychlosti(rychlost, jednotkaRychlost);
    let casSekundy = velikostBit / rychlostBit;
    return casSekundy;
  },

  formatCas: function(casSekundy) {
    let h = Math.floor(casSekundy / 3600);
    let m = Math.floor((casSekundy % 3600) / 60);
    let s = Math.floor(casSekundy % 60);
    return `${h} h ${m} min ${s} s`;
  },

  pridejDoHistorie: function(vypocet) {
    this.historie.push(vypocet);
    this.zobrazHistorii();
  },

  zobrazHistorii: function() {
    const list = document.getElementById("historie");
    list.innerHTML = "";
    this.historie.forEach((v, index) => {
      const li = document.createElement("li");
      li.className = "list-group-item";
      li.textContent = `${index + 1}. ${v.velikost} ${v.jednotkaVelikost} → ${v.rychlost} ${v.jednotkaRychlost} = ${v.cas}`;
      list.appendChild(li);
    });
  }
};

document.getElementById("transferForm").addEventListener("submit", function(e) {
  e.preventDefault();

  let velikost = parseFloat(document.getElementById("velikost").value);
  let jednotkaVelikost = document.getElementById("jednotkaVelikost").value;
  let rychlost = parseFloat(document.getElementById("rychlost").value);
  let jednotkaRychlost = document.getElementById("jednotkaRychlost").value;

  if (velikost <= 0 || rychlost <= 0) {
    document.getElementById("vysledek").innerText = "Zadej kladné hodnoty!";
    return;
  }

  let cas = kalkulacka.vypocetCas(velikost, jednotkaVelikost, rychlost, jednotkaRychlost);
  let casFormat = kalkulacka.formatCas(cas);

  document.getElementById("vysledek").innerText = "Přenos bude trvat přibližně " + casFormat + ".";


