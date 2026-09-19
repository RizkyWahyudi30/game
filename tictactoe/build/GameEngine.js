import EventEmitter from "./EventEmitter.js";

export default class GameEngine extends EventEmitter {
  static MAKS_RONDE = 3; /** statis -- "milik class", bukan setiap instance (di pembahasan Singleton) */

  #papan = Array(9).fill("");
  #pemainSaatIni = "X";
  #status = "idle"; /** status: idle | playing | selesai */
  #sisaWaktu = 0;
  #timerId = null;
  #ronde = 1;

  get papan() {
    return [...this.#papan]; // return copy, bukan reference asli
  }

  get pemainSaatIni() {
    return this.#pemainSaatIni;
  }

  get status() {
    return this.#status;
  }

  get sisaWaktu() {
    return this.#sisaWaktu;
  }

  get rondeSaatIni() {
    return this.#ronde;
  }

  mulai(durasiDetik) {
    clearInterval(this.#timerId); // menghentikan interval lama sebelum buat yang baru

    if (this.#ronde > GameEngine.MAKS_RONDE) {
      this.emit("batasRonde", { ronde: this.#ronde });
      return;
    }

    this.#status = "playing";
    this.#sisaWaktu = durasiDetik;
    /** panggil method emit */
    this.emit("statusBerubah", { status: this.#status });
    this.emit("waktuBerubah", { sisaWaktu: this.#sisaWaktu });

    this.#timerId = setInterval(() => {
      this.#sisaWaktu--;
      this.emit("waktuBerubah", { sisaWaktu: this.#sisaWaktu });

      if (this.#sisaWaktu <= 0) {
        this.#habisWaktu(); // memanggil method private
      }
    }, 1000);
  }

  #habisWaktu() {
    clearInterval(this.#timerId);

    this.#ronde++;
    this.#status = "selesai";
    this.emit("statusBerubah", { status: this.#status });
    this.emit("gameBerakhir", { alasan: "waktu habis" });
    return;
  }

  klikKotak(index) {
    if (this.#status !== "playing") return;
    if (this.#papan[index] !== "") return;

    this.#papan[index] = this.#pemainSaatIni;
    this.emit("papanBerubah", { papan: this.papan });

    const pemenang = this.#cekPemenang();
    if (pemenang) {
      clearInterval(this.#timerId);
      this.#status = "selesai";
      this.emit("statusBerubah", { status: this.#status });
      this.emit("gameBerakhir", { alasan: "menang", pemenang });
      return;
    }

    if (this.#papan.every((cell) => cell !== "")) {
      clearInterval(this.#timerId);
      this.status = "selesai";
      this.emit("statusBerubah", { status: this.#status });
      this.emit("gameBerakhir", { alasan: "seri" });
    }

    this.#pemainSaatIni = this.#pemainSaatIni === "X" ? "O" : "X";
    this.emit("giliranBerubah", { pemain: this.#pemainSaatIni });
  }

  #cekPemenang() {
    const polaKemenangan = [
      [0, 1, 2], // baris
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6], // kolom
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8], // diagonal
      [2, 4, 6],
    ];

    for (const [a, b, c] of polaKemenangan) {
      if (
        this.#papan[a] &&
        this.#papan[a] === this.#papan[b] &&
        this.#papan[a] &&
        this.#papan[a] === this.#papan[c]
      ) {
        return this.#papan[a]; // return "X" atau "O" yang menang
      }
    }

    return null;
  }

  reset() {
    clearInterval(this.#timerId);
    this.#papan = Array(9).fill("");
    this.#pemainSaatIni = "X";
    this.#status = "idle";
    this.#sisaWaktu = 0;
    this.#ronde = 1;

    this.emit("papanBerubah", { papan: this.papan });
    this.emit("giliranBerubah", { pemain: this.#pemainSaatIni });
    this.emit("statusBerubah", { status: this.#status });
    this.emit("waktuBerubah", { sisaWaktu: this.#sisaWaktu });
    this.emit("rondeBerubah", { ronde: this.#ronde });
  }
}
