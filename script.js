// بيانات العقارات
const properties = [
    {
        name: "شقة فاخرة في الرياض",
        price: "850,000 ريال",
        location: "الرياض - حي السلام",
        type: "شقة",
        transaction: "بيع",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&auto=format&fit=crop"
    },
    {
        name: "فيلا للايجار في جدة",
        price: "120,000 ريال/سنوياً",
        location: "جدة - حي النخيل",
        type: "فيلا",
        transaction: "كراء",
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w-400&auto=format&fit=crop"
    },
    {
        name: "أرض سكنية في الدمام",
        price: "450,000 ريال",
        location: "الدمام - حي الخبر",
        type: "أرض",
        transaction: "بيع",
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&auto=format&fit=crop"
    }
];

// عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // عرض العقارات
    displayProperties();
    
    // جعل زر البحث يعمل
    setupSearch();
    
    // جعل القائمة تعمل على الجوال
    setupMobileMenu();
    
    // جعل الفلاتر تعمل
    setupFilters();
});

// دالة لعرض العقارات
function displayProperties() {
    const container = document.getElementById('propertiesList');
    if (!container) return;
    
    container.innerHTML = '';
    
    properties.forEach(property => {
        const card = `
            <div class="property-card">
                <div class="property-image">
                    <img src="${property.image}" alt="${property.name}">
                </div>
                <div class="property-info">
                    <h3>${property.name}</h3>
                    <div class="property-location">📍 ${property.location}</div>
                    <div class="property-price">${property.price}</div>
                    <div class="property-features">
                        <span>${property.type}</span>
                        <span>${property.transaction}</span>
                    </div>
                    <button class="details-btn">عرض التفاصيل</button>
                </div>
            </div>
        `;
        container.innerHTML += card;
    });
}

// دالة لإعداد البحث
function setupSearch() {
    const searchBtn = document.getElementById('searchBtn');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const city = document.getElementById('citySelect').value;
            if (city) {
                alert(`🔍 سيتم البحث عن عقارات في: ${city}`);
            } else {
                alert('⚠️ الرجاء اختيار مدينة للبحث');
            }
        });
    }
}

// دالة للقائمة المتنقلة
function setupMobileMenu() {
    const menuBtn = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
}

// دالة للفلاتر
function setupFilters() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            alert(`✅ تم تطبيق الفلتر: ${this.textContent}`);
        });
    });
}

// رسالة ترحيب
console.log('🚀 DarMarket جاهز للعمل!');
