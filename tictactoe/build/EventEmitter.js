export default class EventEmitter {
  #listener = {}; // sebagai penyimpan data yang berbentuk object kosong

  // method on ini untuk mendaftarkan sebuah function yang akan
  // dipanggil saat event ini berjalan
  on(namaEvent, callback) {
    if (!this.#listener[namaEvent]) {
      this.#listener[namaEvent] = [];
    }
    this.#listener[namaEvent].push(callback);
  }

  // method ini untuk memberitahu kalau event ini dijalankan
  // sedang terjadi, lalu jalankan semua function yang ada di "namaEvent" ini
  emit(namaEvent, data) {
    if (!this.#listener[namaEvent]) return;
    this.#listener[namaEvent].forEach((callback) => callback(data));
  }
}
