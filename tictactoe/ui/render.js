export function renderPapan(papan, container) {
  container.innerHTML = "";
  papan.forEach((isi, index) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = index;
    cell.textContent = isi;
    container.appendChild(cell);
  });
}

export function renderGiliran(pemain, element) {
  element.textContent = pemain;
}

export function renderWaktu(sisaWaktu, element) {
  element.textContent = sisaWaktu;
}
