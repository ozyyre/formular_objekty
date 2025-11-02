const kalkulacka = {
    historie: [],

    vypocet: function(velikost, jednotkaVelikost, rychlost, jednotkaRychlost) {
        let velikostBit;
        if (jednotkaVelikost === "MB") {
            velikostBit = velikost * 1024 * 1024 * 8;
        } else if (jednotkaVelikost === "GB") {
            velikostBit = velikost * 1024 * 1024 * 1024 * 8;
        }

        let rychlostBit;
        if (jednotkaRychlost === "Mbps") {
            rychlostBit = rychlost * 1000000;
        } else if (jednotkaRychlost === "MBps") {
            rychlostBit = rychlost * 8 * 1024 * 1024;
        }

        const casSekundy = velikostBit / rychlostBit;

        const hodiny = Math.floor(casSekundy / 3600);
        const minuty = Math.floor((casSekundy % 3600) / 60);
        const sekundy = Math.floor(casSekundy % 60);

        const vysledekText = `${hodiny}h ${minuty}m ${sekundy}s`;

        this.historie.push({
            velikost: velikost + " " + jednotkaVelikost,
            rychlost: rychlost + " " + jednotkaRychlost,
            cas: vysledekText
        });

        return vysledekText;
    }
};

document.getElementById("transferForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const velikost = parseFloat(document.getElementById("velikost").value);
    const jednotkaVelikost = document.getElementById("jednotkaVelikost").value;
    const rychlost = parseFloat(document.getElementById("rychlost").value);
    const jednotkaRychlost = document.getElementById("jednotkaRychlost").value;

    if (velikost <= 0 || rychlost <= 0) {
        alert("Zadej kladné hodnoty pro velikost a rychlost!");
        return;
    }

    const vysledek = kalkulacka.vypocet(velikost, jednotkaVelikost, rychlost, jednotkaRychlost);

    document.getElementById("vysledek").textContent = "Čas přenosu: " + vysledek;

   
    const historieUL = document.getElementById("historie");
    historieUL.innerHTML = "";
    kalkulacka.historie.forEach((item, index) => {
        const li = document.createElement("li");
        li.className = "list-group-item";
        li.textContent = `${index + 1}. Soubor: ${item.velikost}, Rychlost: ${item.velikost}, Čas: ${item.cas}`;
        historieUL.appendChild(li);
    });
});

