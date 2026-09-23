import GameEngine from "./build/GameEngine.js";
import {
  renderPapan,
  renderGiliran,
  renderWaktu,
  renderRiwayat,
} from "./ui/render.js";

const game = new GameEngine();
const riwayatContainer = document.getElementById("history-container");

const papanContainer = document.getElementById("kotak-game");
const giliranPemain = document.getElementById("antrian-pemain");
const waktuHabis = document.getElementById("sisa-waktu");
const opsiWaktu = document.getElementById("opsi-waktu");
const resetArena = document.getElementById("reset-arena");
const resetTotal = document.getElementById("reset-total");
const mulaiButton = document.getElementById("button-mulai");

game.on("papanBerubah", ({ papan }) => renderPapan(papan, papanContainer));
game.on("giliranBerubah", ({ pemain }) => renderGiliran(pemain, giliranPemain));
game.on("waktuBerubah", ({ sisaWaktu }) => renderWaktu(sisaWaktu, waktuHabis));
game.on("statusBerubah", ({ status }) => {
  opsiWaktu.disabled = status === "playing";
});
game.on("gameBerakhir", (data) => {
  setTimeout(() => {
    if (data.alasan === "menang") {
      alert(`Pemain ${data.pemenang} menang`);
    } else if (data.alasan === "seri") {
      alert(`Permainan seri`);
    } else if (data.alasan === "waktu habis") {
      alert("Waktu habis");
    }
  }, 100);
});
game.on("rondeBerubah", ({ ronde }) => {
  const tampilkanRonde = Math.min(ronde, GameEngine.MAKS_RONDE);
  document.getElementById("ronde").textContent =
    `${tampilkanRonde} / ${GameEngine.MAKS_RONDE}`;
});
game.on("batasRonde", () => {
  alert(`Sudah mencapai 3 ronde! Silahkan tekan reset untuk main lagi!`);
});
game.on("riwayatBerubah", ({ riwayat }) =>
  renderRiwayat(riwayat, riwayatContainer),
);

// event delegation di papan -- SATU LISTENER UNTUK 9 KOTAK
papanContainer.addEventListener("click", (e) => {
  console.log("Klik terjadi, target:", e.target.className);
  if (e.target.classList.contains("cell")) {
    console.log("Status game saat ini:", game.status);
    const index = Number(e.target.dataset.index);
    game.klikKotak(index);
  }
});

// tombol reset
resetArena.addEventListener("click", () => {
  game.resetArena();
});
resetTotal.addEventListener("click", () => {
  game.resetTotal();
  opsiWaktu.value = "20";
});

mulaiButton.addEventListener("click", () => {
  const durasi = Number(opsiWaktu.value);
  game.mulai(durasi);
});

// render pertama kali saat halaman terbuka
renderPapan(game.papan, papanContainer);
renderGiliran(game.pemainSaatIni, giliranPemain);
document.getElementById("ronde").textContent =
  `${game.rondeSaatIni} / ${GameEngine.MAKS_RONDE}`;
