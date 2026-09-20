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

export function renderRiwayat(riwayat, container) {
  container.innerHTML = "";

  riwayat.forEach((catatan) => {
    const kartu = document.createElement("div");
    kartu.classList.add("riwayat-kartu");

    // Judul: "Round 1"
    const judul = document.createElement("p");
    judul.textContent = `Round ${catatan.ronde}`;
    kartu.appendChild(judul);

    // mini papan 3x3
    const miniPapan = document.createElement("div");
    miniPapan.classList.add("mini-papan");
    catatan.papan.forEach((isi) => {
      const sel = document.createElement("div");
      sel.classList.add("mini-cell");
      sel.textContent = isi;
      miniPapan.appendChild(sel);
    });
    kartu.appendChild(miniPapan);

    // hasil: "X menang", "seri", "Waktu habis"
    const hasil = document.createElement("p");
    if (catatan.alasan === "menang") {
      hasil.textContent = `${catatan.pemenang} menang!`;
    } else if (catatan.alasan === "seri") {
      hasil.textContent = `Seri`;
    } else {
      hasil.textContent = "Waktu habis";
    }

    kartu.appendChild(hasil);

    container.appendChild(kartu);
  });
}
