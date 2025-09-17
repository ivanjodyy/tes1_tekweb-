$(function () {
  // ====== Data Harga & Label ======
  const PRICES = {
    destinasi: { bromo: 750000, ijen: 950000 },
    akomodasi: { homestay: 0, villa: 400000, hotel4: 800000 },
    tambahan: { jeep: 600000, dokumentasi: 900000, dinner: 350000 },
  };

  const LABELS = {
    destinasi: { bromo: "Trip ke Gunung Bromo", ijen: "Trip ke Kawah Ijen" },
    akomodasi: {
      homestay: "Menginap di Homestay",
      villa: "Menginap di Villa",
      hotel4: "Menginap di Hotel Bintang 4",
    },
    tambahan: {
      jeep: "Sewa Jeep Pribadi",
      dokumentasi: "Dokumentasi (Drone & Fotografer)",
      dinner: "Makan Malam Spesial di Ketinggian",
    },
  };

  // ====== Gambar lokal ======
  const IMG = {
    default: "assets/default.jpeg",
    bromo: "assets/bromo.jpeg",
    ijen: "assets/ijen.jpeg",
  };

  // ====== Helper ======
  const rupiah = (n) =>
    "Rp " + (n || 0).toLocaleString("id-ID", { maximumFractionDigits: 0 });

  const getSelections = () => {
    const dest = $('input[name="destinasi"]:checked').val() || null;
    const ako = $('input[name="akomodasi"]:checked').val() || null;
    const add = [];
    $("#add-jeep:checked").length && add.push("jeep");
    $("#add-doc:checked").length && add.push("dokumentasi");
    $("#add-dinner:checked").length && add.push("dinner");
    return { dest, ako, add };
  };

  const updateImage = (dest) => {
    const src =
      dest === "bromo" ? IMG.bromo : dest === "ijen" ? IMG.ijen : IMG.default;
    const $img = $("#preview-image");
    if ($img.attr("src") === src) return; // tidak perlu ganti jika sama
    $img.addClass("fading");
    setTimeout(() => {
      $img.attr("src", src).removeClass("fading");
    }, 150);
  };

  const updateFeatures = ({ dest, ako, add }) => {
    const $ul = $("#daftar-fitur");
    $ul.empty();
    if (dest) $ul.append(`<li>${LABELS.destinasi[dest]}</li>`);
    if (ako) $ul.append(`<li>${LABELS.akomodasi[ako]}</li>`);
    add.forEach((k) => $ul.append(`<li>${LABELS.tambahan[k]}</li>`));
  };

  const updateTotal = ({ dest, ako, add }) => {
    let total = 0;
    if (dest) total += PRICES.destinasi[dest];
    if (ako) total += PRICES.akomodasi[ako];
    add.forEach((k) => (total += PRICES.tambahan[k]));
    $("#total-biaya").text(rupiah(total));
  };

  const refreshUI = () => {
    const sel = getSelections();
    updateImage(sel.dest);
    updateFeatures(sel);
    updateTotal(sel);
  };

  const resetAll = () => {
    $('input[name="destinasi"]').prop("checked", false);
    $('input[name="akomodasi"]').prop("checked", false);
    $("#add-jeep, #add-doc, #add-dinner").prop("checked", false);
    $("#preview-image").attr("src", IMG.default);
    $("#daftar-fitur").empty();
    $("#total-biaya").text("Rp 0");
  };

  // ====== Events ======
  $('input[name="destinasi"], input[name="akomodasi"]').on("change", refreshUI);
  $("#add-jeep, #add-doc, #add-dinner").on("change", refreshUI);

  $("#btn-reset").on("click", (e) => {
    e.preventDefault();
    resetAll();
  });

  $("#btn-bayar").on("click", (e) => {
    e.preventDefault();
    alert("Terima kasih sudah memesan paket liburan bersama NusaTour!");
    resetAll();
  });

  // ====== Init ======
  resetAll();
});
