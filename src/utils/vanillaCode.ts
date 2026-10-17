/**
 * Pure Vanilla JavaScript & HTML solution for Kodluyoruz Homework submission
 * Prepared with signature: Enes Öztürk
 */

export const VANILLA_JS_CODE = `/**
 * Kodluyoruz - JavaScript To Do List Ödevi
 * Hazırlayan: Enes Öztürk (El Emeği)
 */

// DOM Elementlerini Seçme
const taskInput = document.querySelector("#task");
const listDOM = document.querySelector("#list");
const successToast = document.querySelector("#liveToastSuccess");
const errorToast = document.querySelector("#liveToastError");

// LocalStorage Anahtarı
const STORAGE_KEY = "kodluyoruz_todos";

// Sayfa Yüklendiğinde Görevleri Getir ve Olayları Bağla
document.addEventListener("DOMContentLoaded", () => {
  loadTasks();
  attachExistingListEvents();
});

// 1. Yeni Eleman Ekleme Fonksiyonu
function newElement() {
  const inputValue = taskInput.value.trim();

  // Boşluk kontrolü (boş karakter veya hiçbir şey yazılmadığında)
  if (inputValue === "" || inputValue.length === 0) {
    showToast(errorToast);
    return;
  }

  // Yeni liste elemanı (li) oluşturma
  createListItem(inputValue, false);

  // LocalStorage'a kaydetme
  saveTaskToLocalStorage(inputValue);

  // Başarılı toast bildirimi
  showToast(successToast);

  // Input alanını temizleme ve odaklanma
  taskInput.value = "";
  taskInput.focus();
}

// 2. Liste Elemanı Oluşturma Fonksiyonu
function createListItem(text, isCompleted = false) {
  const li = document.createElement("li");
  li.textContent = text;
  if (isCompleted) {
    li.classList.add("checked");
  }

  // Yapıldı işaretleme tıklama olayı
  li.addEventListener("click", function (e) {
    if (e.target.tagName !== "SPAN") {
      this.classList.toggle("checked");
      updateLocalStorage();
    }
  });

  // Silme butonu (çarpı butonu) oluşturma
  const closeSpan = document.createElement("span");
  closeSpan.textContent = "\\u00D7"; // Çarpı (×) işareti
  closeSpan.className = "close";
  closeSpan.setAttribute("aria-label", "Sil");

  // Silme tıklama olayı
  closeSpan.addEventListener("click", function () {
    const parentLi = this.parentElement;
    parentLi.remove();
    updateLocalStorage();
  });

  li.appendChild(closeSpan);
  listDOM.appendChild(li);
}

// 3. Mevcut HTML'deki li elemanlarına olayları bağlama
function attachExistingListEvents() {
  const listItems = listDOM.querySelectorAll("li");
  listItems.forEach((li) => {
    // Yapıldı olayı
    li.addEventListener("click", function (e) {
      if (e.target.tagName !== "SPAN") {
        this.classList.toggle("checked");
        updateLocalStorage();
      }
    });

    // Varsa silme butonunu dinle, yoksa ekle
    let closeSpan = li.querySelector(".close");
    if (!closeSpan) {
      closeSpan = document.createElement("span");
      closeSpan.textContent = "\\u00D7";
      closeSpan.className = "close";
      li.appendChild(closeSpan);
    }

    closeSpan.addEventListener("click", function () {
      li.remove();
      updateLocalStorage();
    });
  });
}

// 4. Bootstrap Toast Gösterme Fonksiyonu
function showToast(toastElement) {
  if (window.bootstrap && bootstrap.Toast) {
    const toast = new bootstrap.Toast(toastElement);
    toast.show();
  } else if (window.$ && $(toastElement).toast) {
    // jQuery / Bootstrap 4 desteği
    $(toastElement).toast("show");
  } else {
    // Fallback stil tetikleyici
    toastElement.classList.add("show");
    setTimeout(() => {
      toastElement.classList.remove("show");
    }, 3500);
  }
}

// 5. BONUS: LocalStorage Entegrasyonu
function getStoredTasks() {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : null;
}

function saveTaskToLocalStorage(taskText) {
  let tasks = getStoredTasks() || [];
  tasks.push({ text: taskText, completed: false });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function updateLocalStorage() {
  const currentTasks = [];
  const items = listDOM.querySelectorAll("li");
  items.forEach((item) => {
    // Text içeriğinden sondaki '×' butonunu ayıkla
    const text = item.childNodes[0].textContent.trim();
    const isCompleted = item.classList.contains("checked");
    if (text) {
      currentTasks.push({ text: text, completed: isCompleted });
    }
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(currentTasks));
}

function loadTasks() {
  const tasks = getStoredTasks();
  if (tasks && tasks.length > 0) {
    // Mevcut varsayılanları temizle ve localStorage'dakileri bas
    listDOM.innerHTML = "";
    tasks.forEach((t) => createListItem(t.text, t.completed));
  } else {
    // İlk açılışta mevcut li'leri kaydet
    updateLocalStorage();
  }
}

// Enter Tuşuna basıldığında ekleme desteği
taskInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    newElement();
  }
});
`;

export const VANILLA_HTML_CODE = `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>JavaScript To Do List - Enes Öztürk</title>
  <!-- Bootstrap CSS -->
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css"
  />
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <div class="mr-1" style="position: absolute; top: 1rem; right: 1rem; z-index: 9999;">
    <!-- Başarılı Toast Bildirimi -->
    <div
      id="liveToastSuccess"
      class="toast success hide bg-success text-white"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      data-delay="3000"
    >
      <div class="toast-body">
        <strong>Harika!</strong> Listeye eklendi.
      </div>
    </div>

    <!-- Hata Toast Bildirimi -->
    <div
      id="liveToastError"
      class="toast error hide bg-danger text-white mt-2"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      data-delay="3000"
    >
      <div class="toast-body">
        <strong>Hata!</strong> Listeye boş ekleme yapamazsınız!
      </div>
    </div>
  </div>

  <div class="container my-5">
    <div class="header text-center">
      <img
        src="https://cdn.sanity.io/images/9kdepi1d/production/65c832d202a503b15d99e62bc3e027f5ec1231e2-94x94.png"
        class="mb-2"
        alt="Kodluyoruz Logo"
        width="80"
      />
      <h2>Yapılacaklar Listesi</h2>
      <p class="text-muted small">Hazırlayan: <strong>Enes Öztürk</strong> (El Emeği)</p>
      
      <div class="input-group mb-3 mt-4">
        <input
          type="text"
          id="task"
          class="form-control"
          placeholder="Bugün ne yapacaksın?"
          aria-label="Bugün ne yapacaksın?"
        />
        <div class="input-group-append">
          <button onclick="newElement()" id="liveToastBtn" class="button btn btn-primary">
            Ekle
          </button>
        </div>
      </div>
    </div>

    <ul id="list" class="list-unstyled">
      <li>3 Litre Su İç</li>
      <li>Ödevleri Tamamla</li>
      <li>En Az 3 Saat Kodlama Yap</li>
      <li>Yemek Yap</li>
      <li>50 Sayfa Kitap Oku</li>
    </ul>

    <footer class="text-center mt-5 text-muted small">
      <p>© 2026 Kodluyoruz To Do List Ödevi • <strong>Enes Öztürk</strong> İmzasıyla El Emeği</p>
    </footer>
  </div>

  <!-- jQuery ve Bootstrap JS -->
  <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"></script>
  <script src="todolist.js"></script>
</body>
</html>
`;

export const VANILLA_CSS_CODE = `/* Kodluyoruz JavaScript To Do List Stilleri */
body {
  background-color: #f8f9fa;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  margin: 0;
  padding: 0;
}

.container {
  max-width: 600px;
  background: #ffffff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
}

.header h2 {
  font-weight: 700;
  color: #2b2d42;
}

.button {
  background-color: #007bff;
  border: none;
  font-weight: 600;
  padding: 10px 24px;
  cursor: pointer;
}

.button:hover {
  background-color: #0056b3;
}

ul {
  margin: 0;
  padding: 0;
}

ul li {
  cursor: pointer;
  position: relative;
  padding: 14px 45px 14px 40px;
  background: #fdfdfd;
  font-size: 16px;
  transition: 0.2s;
  border-bottom: 1px solid #edf2f7;
  user-select: none;
}

ul li:nth-child(odd) {
  background: #fbfbfb;
}

ul li:hover {
  background: #f1f5f9;
}

/* Yapıldı (Checked) Durumu */
ul li.checked {
  background: #e9ecef;
  color: #6c757d;
  text-decoration: line-through;
}

ul li.checked::before {
  content: '';
  position: absolute;
  border-color: #28a745;
  border-style: solid;
  border-width: 0 2px 2px 0;
  top: 18px;
  left: 18px;
  transform: rotate(45deg);
  height: 14px;
  width: 7px;
}

/* Silme (Close) Butonu */
.close {
  position: absolute;
  right: 0;
  top: 0;
  padding: 12px 18px;
  font-size: 20px;
  font-weight: 700;
  color: #adb5bd;
  transition: all 0.2s ease;
}

.close:hover {
  background-color: #dc3545;
  color: white;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}
`;
