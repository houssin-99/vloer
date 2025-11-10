document.getElementById("tileForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const area = parseFloat(document.getElementById("area").value);
  const tileSizeInput = document.getElementById("tileSize").value;
  const groutWidth = parseFloat(document.getElementById("groutWidth").value);

  const pricePerM2 = 53.75; // hardcoded prijs
  const gluePerM2 = 3.5; // kg lijm per m²

  // Tegelgrootte verwerken
  const [tileWidth, tileHeight] = tileSizeInput.split("x").map(Number);
  const tileWidthM = (tileWidth + groutWidth) / 100;
  const tileHeightM = (tileHeight + groutWidth) / 100;
  const tileArea = tileWidthM * tileHeightM;

  const tilesNeeded = Math.ceil(area / tileArea);
  const tilesPerBox = 1 / tileArea * 1.2; // 20% marge
  const boxesNeeded = Math.ceil(tilesNeeded / tilesPerBox);

  const glueNeeded = Math.ceil(area * gluePerM2);
  const subtotal = area * pricePerM2;

  let discountRate = 0;
  if (subtotal <= 1000) discountRate = 0.02;
  else if (subtotal <= 5000) discountRate = 0.05;
  else discountRate = 0.10;

  const discount = subtotal * discountRate;
  const total = subtotal - discount;

  document.getElementById("result").classList.remove("d-none");
  document.getElementById("result").innerHTML = `
    <h4 class="mb-3">📊 Berekening</h4>
    <p><strong>Aantal dozen tegels:</strong> ${boxesNeeded} dozen</p>
    <p><strong>Tegellijm benodigd:</strong> ${glueNeeded} kg</p>
    <p><strong>Subtotaal:</strong> € ${subtotal.toFixed(2)}</p>
    <p><strong>Korting (${discountRate * 100}%):</strong> -€ ${discount.toFixed(2)}</p>
    <p><strong>Totaalprijs:</strong> <span class="text-success fw-bold">€ ${total.toFixed(2)}</span></p>
  `;
});