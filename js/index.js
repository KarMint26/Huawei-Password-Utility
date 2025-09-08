const myWorker = new Worker("js/worker.js");

function DecryptPasswordOnWorker(password, field) {
  myWorker.postMessage({
    functionCall: DECRYPT_DATA,
    args: {
      password,
      field,
    },
  });
}

function OnCipherInputChange() {
  const CipherInputField = document.getElementById("CipherInputField").value;
  // Langsung panggil fungsi Decrypt karena tidak ada pilihan lain
  DecryptPasswordOnWorker(
    he.decode(CipherInputField.trim()),
    "CipherResultField"
  );
}

myWorker.addEventListener("message", (e) => {
  switch (e.data.functionCall) {
    // Hanya case DECRYPT_DATA yang dibutuhkan sekarang
    case DECRYPT_DATA:
      let field = document.getElementById(e.data.field);
      field.value = e.data.return;
      break;
  }
});

// Hapus referensi 'passgen' dari array pages
const pages = ["home", "cipher"];

function popStateEvent(e) {
  let target = document.location.hash.substr(1);
  if (target == "") target = "home";
  const elem = document.getElementById(target);
  if (elem == null) return;

  pages.forEach((page) => {
    if (page == target) {
      elem.style.display = "block";
      document.getElementById(page + "link").classList.add("active-page");
    } else {
      document.getElementById(page + "link").classList.remove("active-page");
      document.getElementById(page).style.display = "none";
    }
  });
}

// Initial calls
OnCipherInputChange();
window.addEventListener("popstate", popStateEvent);
popStateEvent();
