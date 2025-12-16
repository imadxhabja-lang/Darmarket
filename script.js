// بيانات العقارات المغربية
const propertiesData = [
    {
        id: 1,
        name: "شقة فاخرة في الدار البيضاء",
        city: "الدار البيضاء",
        district: "حي المعاريف",
        price: "850,000",
        type: "شقة",
        transaction: "بيع",
        area: "120",
        rooms: "3",
        bathrooms: "2",
        description: "شقة فاخرة في موقع مميز بقلب الدار البيضاء، تشطيب عالي الجودة، إطلالة رائعة، قريبة من جميع المرافق.",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        name: "فيلا للكراء في مراكش",
        city: "مراكش",
        district: "حي الرياض",
        price: "25,000",
        type: "فيلا",
        transaction: "كراء",
        area: "350",
        rooms: "4",
        bathrooms: "3",
        description: "فيلا فاخرة للكراء الشهري في مراكش، حديقة خاصة، مسبح، قريبة من المطار والمدينة القديمة.",
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        name: "رياض تقليدي في فاس",
        city: "فاس",
        district: "فاس البالي",
        price: "2,500,000",
        type: "رياض",
        transaction: "بيع",
        area: "450",
        rooms: "6",
        bathrooms: "4",
        description: "رياض تقليدي فاسي أصيل، تم ترميمه مؤخراً، فناء داخلي جميل، زليج أصيل، موقع في قلب المدينة العتيقة.",
        image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 4,
        name: "شقة جديدة في الرباط",
        city: "الرباط",
        district: "حي أكدال",
        price: "650,000",
        type: "شقة",
        transaction: "بيع",
        area: "90",
        rooms: "2",
        bathrooms: "1",
        description: "شقة جديدة في مبنى حديث بحي أكدال، طابق ثالث، إطلالة على الشارع، جاهزة للسكن.",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 5,
        name: "محل تجاري في طنجة",
        city: "طنجة",
        district: "وسط المدينة",
        price: "1,200,000",
        type: "محل تجاري",
        transaction: "بيع",
        area: "80",
        rooms: "1",
        bathrooms: "1",
        description: "محل تجاري على شارع رئيسي في طنجة، موقع ممتاز للأعمال التجارية، مدخل مزدوج.",
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 6,
        name: "شاطئ خاص في أكادير",
        city: "أكادير",
        district: "تالبورجت",
        price: "18,000",
        type: "شقة",
        transaction: "كراء",
        area: "110",
        rooms: "3",
        bathrooms: "2",
        description: "شقة للكراء الشهري في أكادير، إطلالة مباشرة على البحر، مجهزة بالكامل، خدمات فندقية.",
        image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    }
];

let displayedProperties = 3;
let currentFilter = 'all';

// تهيئة التطبيق
document.addEventListener('DOMContentLoaded', function() {
    // عرض العقارات
    displayProperties();
    
    // زر البحث
    const searchBtn = document.getElementById('searchBtn');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const city = document.getElementById('citySelect').value;
            if (city) {
                alert(`🔍 سيتم البحث عن عقارات في مدينة: ${city}`);
            } else {
                alert('⚠️ الرجاء اختيار مدينة للبحث');
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
    
    // الفلاتر
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            alert(`✅ تم تطبيق الفلتر: ${this.textContent}`);
        });
    });
    
    // زر تحميل المزيد
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            displayedProperties += 3;
            displayProperties();
            if (displayedProperties >= propertiesData.length) {
                this.style.display = 'none';
            }
        });
    }
    
    // PWA
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/Darmarket/service-worker.js');
    }
    
    console.log('🚀 DarMarket المغربي جاهز للعمل!');
});

// عرض العقارات
function displayProperties() {
    const propertiesList = document.getElementById('propertiesList');
    if (!propertiesList) return;
    
    propertiesList.innerHTML = '';
    
    const propertiesToShow = propertiesData.slice(0, displayedProperties);
    
    propertiesToShow.forEach(property => {
        const card = document.createElement('div');
        card.className = 'property-card';
        
        const typeClass = property.transaction === 'كراء' ? 'rent' : 'sale';
        const priceText = property.transaction === 'كراء' ? 'درهم/شهرياً' : 'درهم';
        
        card.innerHTML = `
            <div class="property-image">
                <img src="${property.image}" alt="${property.name}" loading="lazy">
            </div>
            <div class="property-info">
                <h3>${property.name}</h3>
                <div class="property-location">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${property.district} - ${property.city}</span>
                </div>
                <div class="property-price">${property.price} <span class="price-dh">${priceText}</span></div>
                <div class="property-features">
                    <span><i class="fas fa-ruler-combined"></i> ${property.area} م²</span>
                    <span><i class="fas fa-bed"></i> ${property.rooms} غرف</span>
                    <span><i class="fas fa-bath"></i> ${property.bathrooms} حمام</span>
                </div>
                <div class="property-type ${typeClass}">${property.transaction === 'كراء' ? 'للإيجار' : 'للبيع'}</div>
                <button class="details-btn" onclick="showPropertyDetails(${property.id})">
                    <i class="fas fa-info-circle"></i> التفاصيل
                </button>
            </div>
        `;
        
        propertiesList.appendChild(card);
    });
}

// عرض تفاصيل العقار
function showPropertyDetails(id) {
    const property = propertiesData.find(p => p.id === id);
    if (!property) return;
    
    const priceText = property.transaction === 'كراء' ? 'درهم/شهرياً' : 'درهم';
    
    alert(`🏠 ${property.name}\n\n📍 الموقع: ${property.district} - ${property.city}\n💰 السعر: ${property.price} ${priceText}\n📐 المساحة: ${property.area} م²\n🚪 الغرف: ${property.rooms}\n🛁 الحمامات: ${property.bathrooms}\n\n📝 الوصف:\n${property.description}\n\n📞 للتواصل: +212 600 000 000`);
                }
