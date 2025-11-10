const PRIJS_PER_M2 = 45;
const PRIJS_LIJM_PER_KG = 2.50;
const LIJM_PER_M2 = 3.5;
const TEGELS_PER_DOOS = 10;

document.getElementById("tileForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const area = parseFloat(document.getElementById("area").value);
  const tileSizeInput = document.getElementById("tileSize").value;
  const groutWidth = parseFloat(document.getElementById("groutWidth").value);
  const resultBox = document.getElementById("result");

  if (!area || !tileSizeInput.includes("x") || !groutWidth) {
    resultBox.classList.add("d-none");
    return;
  }

  const [tileWidth, tileHeight] = tileSizeInput.split("x").map(Number);
  const tileWidthM = (tileWidth + groutWidth) / 100;
  const tileHeightM = (tileHeight + groutWidth) / 100;
  const tileArea = tileWidthM * tileHeightM;

  const tilesNeeded = Math.ceil(area / tileArea);
  const boxesNeeded = Math.ceil(tilesNeeded / TEGELS_PER_DOOS);

  const glueNeededKg = Math.ceil(area * LIJM_PER_M2);
  const glueCost = glueNeededKg * PRIJS_LIJM_PER_KG;
  const tileCost = area * PRIJS_PER_M2;
  const subtotal = tileCost + glueCost;

  let discountRate = 0;
  if (subtotal <= 1000) discountRate = 0.02;
  else if (subtotal <= 5000) discountRate = 0.05;
  else discountRate = 0.10;

  const discount = subtotal * discountRate;
  const total = subtotal - discount;

  resultBox.innerHTML = `
    <h4>📊 Berekening</h4>
    <p><strong>Aantal dozen tegels:</strong> ${boxesNeeded} dozen</p>
    <p><strong>Tegellijm benodigd:</strong> ${glueNeededKg} kg</p>
    <p><strong>Subtotaal:</strong> € ${subtotal.toFixed(2)}</p>
    <p><strong>Korting (${discountRate * 100}%):</strong> -€ ${discount.toFixed(2)}</p>
    <p><strong>Totaalprijs:</strong> <span class="text-success fw-bold">€ ${total.toFixed(2)}</span></p>
  `;

  resultBox.classList.remove("d-none");
  resultBox.scrollIntoView({ behavior: "smooth" });
});