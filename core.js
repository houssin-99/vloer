// Constanten
const PRIJS_PER_M2 = 45;
const PRIJS_LIJM_PER_KG = 2.5;
const LIJM_PER_M2 = 3.5;
const TEGELS_PER_DOOS = 10;

const form = document.getElementById("calcForm");
const resultaat = document.getElementById("resultaat");
// Formulier submitten en e.prevent default is we doen de berekening zelf
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const oppervlakte = parseFloat(document.getElementById("oppervlakte").value);
  const tegelgrootte = parseFloat(document.getElementById("tegelgrootte").value);
  const voeg = parseFloat(document.getElementById("voeg").value);

  if (!oppervlakte || !tegelgrootte || !voeg) {
    alert("Gelieve alle velden correct in te vullen.");
    return;
  }

  // Eerst resultaat verbergen tijdens berekening
  resultaat.classList.add("d-none");

  // Berekeningen
  const tegelOppervlakte = ((tegelgrootte + voeg) / 100) ** 2;
  const aantalTegels = Math.ceil(oppervlakte / tegelOppervlakte);
  const aantalDozen = Math.ceil(aantalTegels / TEGELS_PER_DOOS);
  const lijmBenodigd = oppervlakte * LIJM_PER_M2;

  const subtotaal =
    oppervlakte * PRIJS_PER_M2 + lijmBenodigd * PRIJS_LIJM_PER_KG;

  // kortign met ternary operator
  const kortingPerc =
    subtotaal <= 1000 ? 2 : subtotaal <= 5000 ? 5 : 10;

  const korting = (subtotaal * kortingPerc) / 100;
  const totaal = subtotaal - korting;

  // Resultaat tonen na kleine delay (voor effect)
  setTimeout(() => {
    document.getElementById("dozen").innerText = `${aantalDozen} dozen`;
    document.getElementById("lijm").innerText = `${lijmBenodigd.toFixed(1)} kg`;
    document.getElementById("subtotaal").innerText = subtotaal.toFixed(2);
    document.getElementById("korting").innerText = `-€${korting.toFixed(
      2
    )} (${kortingPerc}%)`;
    document.getElementById("totaal").innerText = totaal.toFixed(2);

    // Fade-in zichtbaar maken
    resultaat.classList.remove("d-none");
    resultaat.classList.add("fade-in");

    // Automatisch scrollen
    resultaat.scrollIntoView({ behavior: "smooth" });
  }, 400);
});
