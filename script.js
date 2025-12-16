// بيانات العقارات
const propertiesData = [
    {
        id: 1,
        name: "شقة فاخرة في حي السلام",
        city: "الرياض",
        district: "حي السلام",
        price: "850,000",
        type: "شقة",
        transaction: "بيع",
        area: "150",
        rooms: "3",
        bathrooms: "2",
        description: "شقة فاخرة في موقع مميز، طابق ثالث، مكيفة بالكامل، تشطيب سوبر لوكس.",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        name: "فيلا مستقلة في حي النخيل",
        city: "جدة",
        district: "حي النخيل",
        price: "2,500,000",
        type: "فيلا",
        transaction: "بيع",
        area: "450",
        rooms: "5",
        bathrooms: "4",
        description: "فيلا فاخرة على شارع رئيسي، حديقة خاصة، مسبح، مواقف لسيارتين.",
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        name: "شقة للإيجار في حي العليا",
        city: "الرياض",
        district: "حي العليا",
        price: "45,000",
        type: "شقة",
        transaction: "كراء",
        area: "180",
        rooms: "3",
        bathrooms: "2",
        description: "شقة للإيجار السنوي في حي العليا، طابق عاشر، إطلالة رائعة.",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    }
];

// عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // عرض العقارات
    displayProperties();
    
    // زر البحث
    const searchBtn = document.getElementById('searchBtn');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const city = document.getElementById('citySelect').value;
            if (city) {
                alert(`سيتم البحث في مدينة ${city}`);
            } else {
                alert('الرجاء اختيار مدينة');
            }
        });
    }
    
    // قائمة الجوال
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
});

// عرض العقارات
function displayProperties() {
    const propertiesList = document.getElementById('propertiesList');
    if (!propertiesList) return;
    
    propertiesList.innerHTML = '';
    
    propertiesData.forEach(property => {
        const card = document.createElement('div');
        card.className = 'property-card';
        
        const typeClass = property.transaction === 'كراء' ? 'rent' : 'sale';
        
        card.innerHTML = `
            <div class="property-image">
                <img src="${property.image}" alt="${property.name}">
            </div>
            <div class="property-info">
                <h3>${property.name}</h3>
                <div class="property-location">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${property.district} - ${property.city}</span>
                </div>
                <div class="property-price">${property.price} ${property.transaction === 'كراء' ? 'ريال/سنوياً' : 'ريال'}</div>
                <div class="property-features">
                    <span><i class="fas fa-ruler-combined"></i> ${property.area} م²</span>
                    <span><i class="fas fa-bed"></i> ${property.rooms} غرف</span>
                    <span><i class="fas fa-bath"></i> ${property.bathrooms} حمام</span>
                </div>
                <div class="property-type ${typeClass}">${property.transaction === 'كراء' ? 'للإيجار' : 'للبيع'}</div>
                <button class="details-btn" onclick="showDetails(${property.id})">
                    <i class="fas fa-info-circle"></i> التفاصيل
                </button>
            </div>
        `;
        
        propertiesList.appendChild(card);
    });
}

// عرض التفاصيل
function showDetails(id) {
    const property = propertiesData.find(p => p.id === id);
    if (!property) return;
    
    alert(`تفاصيل العقار:\n${property.name}\n${property.description}\nالسعر: ${property.price} ريال`);
}

// PWA بسيط
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/Darrr/service-worker.js');
    });
}
