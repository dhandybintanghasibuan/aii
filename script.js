document.addEventListener("DOMContentLoaded", function () {
  // ----- PENGATURAN AWAL -----
  const daftarGambar = [
    "foto2.jpeg",
    "foto3.jpeg",
    "foto4.jpeg",
    "foto5.jpeg",
    "foto6.jpeg",
  ];
  let indeksGambarSekarang = 0;

  // ----- AMBIL ELEMEN DARI HTML -----
  const introScreen = document.getElementById("intro");
  const ucapanScreen = document.getElementById("ucapan");
  const tombolBuka = document.getElementById("bukaUndangan");

  // Elemen Galeri
  const gambarGaleri = document.getElementById("gambarGaleri");
  const tombolSebelumnya = document.getElementById("tombolSebelumnya");
  const tombolBerikutnya = document.getElementById("tombolBerikutnya");

  // Elemen Musik
  const music = document.getElementById("backgroundMusic");
  const playBtn = document.getElementById("playMusicBtn");

  // Elemen untuk animasi scroll
  const sectionsToReveal = document.querySelectorAll(".reveal");

  // ----- FUNGSI UTAMA -----

  // 1. Tombol Buka Undangan di Klik (DI SINI PERUBAHANNYA)
  tombolBuka.addEventListener("click", function () {
    // Tembakkan konfeti!
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 },
    });

    // Sembunyikan intro dan tampilkan konten utama
    introScreen.classList.add("hidden");
    setTimeout(() => {
      ucapanScreen.style.display = "block";
    }, 1000);

    // --- PERUBAHAN DIMULAI DI SINI ---
    // Putar musik secara otomatis
    music.play();
    // Langsung ubah teks tombol menjadi "Pause" karena musik sudah berputar
    playBtn.textContent = "Pause Music ⏸️";
    // --- PERUBAHAN SELESAI ---
  });

  // 2. Logika Pemutar Musik (sekarang berfungsi sebagai tombol Pause/Play)
  playBtn.addEventListener("click", function () {
    if (music.paused) {
      music.play();
      playBtn.textContent = "Pause Music ⏸️";
    } else {
      music.pause();
      playBtn.textContent = "Play Music ▶️";
    }
  });

  // 3. Logika Galeri Foto
  function tampilkanGambar() {
    gambarGaleri.style.opacity = "0";
    setTimeout(() => {
      gambarGaleri.src = "img/" + daftarGambar[indeksGambarSekarang];
      gambarGaleri.style.opacity = "1";
    }, 300);
  }

  tombolBerikutnya.addEventListener("click", function () {
    indeksGambarSekarang = (indeksGambarSekarang + 1) % daftarGambar.length;
    tampilkanGambar();
  });

  tombolSebelumnya.addEventListener("click", function () {
    indeksGambarSekarang =
      (indeksGambarSekarang - 1 + daftarGambar.length) % daftarGambar.length;
    tampilkanGambar();
  });

  // 4. Logika Animasi saat Scroll (Intersection Observer)
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  sectionsToReveal.forEach((section) => {
    observer.observe(section);
  });

  // 5. Logika Animasi Hati
  function createHeart() {
    const heartsContainer = document.querySelector(".hearts-container");
    if (!heartsContainer) return;
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 2 + 8 + "s";
    heartsContainer.appendChild(heart);
    setTimeout(() => {
      heart.remove();
    }, 10000);
  }
  setInterval(createHeart, 500);
});