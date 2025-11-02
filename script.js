document.getElementById("formular").addEventListener("submit", function(event) {
    event.preventDefault();

    let velikost = parseFloat(document.getElementById("velikost").value);
    let rychlost = parseFloat(document.getElementById("rychlost").value);

    if (velikost <= 0 || rychlost <= 0 || isNaN(velikost) || isNaN(rychlost)) {
        document.getElementById("vysledek").innerText = "Zadej kladné číslo!";
        return;
    }

    let casSekundy = velikost / rychlost;

    let minuty = Math.floor(casSekundy / 60);
    let sekundy = Math.round(casSekundy % 60);

    document.getElementById("vysledek").innerText =
        "Přenos potrvá přibližně " + minuty + " min " + sekundy + " s.";
});
