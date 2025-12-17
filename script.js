// Firebase SDKs (مهم: نستخدم CDN وليس import المحلي)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Firebase configuration (منك)
const firebaseConfig = {
  apiKey: "AIzaSyBnXWlls3B--PdyavdyH3VLA98Oigfw4A0",
  authDomain: "studio-2944862311-8f802.firebaseapp.com",
  projectId: "studio-2944862311-8f802",
  storageBucket: "studio-2944862311-8f802.firebasestorage.app",
  messagingSenderId: "439364659908",
  appId: "1:439364659908:web:d16c7cd994ef38022f3791"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* =========================
   إضافة عقار
========================= */
const form = document.getElementById("propertyForm");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const price = document.getElementById("price").value.trim();
    const city = document.getElementById("city").value.trim();
    const image = document.getElementById("image").value.trim();
    const description = document.getElementById("description").value.trim();

    if (!title || !price || !city) {
      alert("المرجو ملء الحقول الأساسية");
      return;
    }

    try {
      await addDoc(collection(db, "properties"), {
        title,
        price,
        city,
        image,
        description,
        createdAt: new Date()
      });

      alert("تم حفظ العقار بنجاح");
      form.reset();
      window.location.href = "index.html";
    } catch (err) {
      console.error(err);
      alert("حدث خطأ أثناء الحفظ");
    }
  });
}

/* =========================
   عرض العقارات
========================= */
const container = document.getElementById("properties");

async function loadProperties() {
  if (!container) return;

  container.innerHTML = "";

  const q = query(
    collection(db, "properties"),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  snapshot.forEach((doc) => {
    const d = doc.data();

    container.innerHTML += `
      <div class="property-card">
        ${d.image ? `<img src="${d.image}" alt="">` : ""}
        <h3>${d.title}</h3>
        <p>${d.city}</p>
        <strong>${d.price} DH</strong>
        <p>${d.description || ""}</p>
      </div>
    `;
  });
}

loadProperties();
