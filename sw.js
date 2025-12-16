// بيانات وهمية للعقارات
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
        description: "شقة فاخرة في موقع مميز، طابق ثالث، مكيفة بالكامل، تشطيب سوبر لوكس، دورات مياه إيطالي، مطبخ مجهز بالكامل.",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
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
        description: "فيلا فاخرة على شارع رئيسي، حديقة خاصة، مسبح، غرفة سائق، غرفة خادمة، مواقف لسيارتين.",
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
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
        description: "شقة للإيجار السنوي في حي العليا، طابق عاشر، إطلالة رائعة، تشطيب فاخر، غرفة معيشة واسعة.",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 4,
        name: "محل تجاري في حي الخبر",
        city: "الخبر",
        district: "حي الخبر",
        price: "1,200,000",
        type: "محل تجاري",
        transaction: "بيع",
        area: "120",
        rooms: "1",
        bathrooms: "1",
        description: "محل تجاري على شارع رئيسي، مناسب لمشاريع متنوعة، مدخلين، كهرباء ثلاثية الطور، حمام داخلي.",
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 5,
        name: "شقة دوبلكس في حي الروضة",
        city: "مكة",
        district: "حي الروضة",
        price: "1,500,000",
        type: "شقة",
        transaction: "بيع",
        area: "220",
        rooms: "4",
        bathrooms: "3",
        description: "شقة دوبلكس فاخرة، دورين، صالة واسعة، مطبخ مفتوح، 4 غرف نوم ماستر، مواقف داخلية.",
        image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 6,
        name: "فيلا للكراء في حي الصحافة",
        city: "الرياض",
        district: "حي الصحافة",
        price: "120,000",
        type: "فيلا",
        transaction: "كراء",
        area: "380",
        rooms: "4",
        bathrooms: "3",
        description: "فيلا للكراء السنوي، مدخل خاص، حديقة خلفية، غرفة سائق، غرفة خادمة، نظام أمني متكامل.",
        image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    }
];

// المتغيرات العامة
let displayedProperties = 4;
let currentFilter = 'all';

// تهيئة التطبيق عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // تهيئة القائمة الهامبرغر
    initMobileMenu();
    
    // عرض العقارات
    displayProperties();
    
    // تهيئة الفلاتر
    initFilters();
    
    // تهيئة زر البحث
    initSearch();
    
    // تهيئة زر تحميل المزيد
    initLoadMore();
    
    // تسجيل Service Worker
    registerServiceWorker();
    
    // تهيئة PWA
    initPWA();
    
    // تهيئة النموذج المنبثق
    initModal();
});

// تهيئة القائمة الهامبرغر للجوال
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.innerHTML = navMenu.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : 
                '<i class="fas fa-bars"></i>';
        });
        
        // إغلاق القائمة عند النقر على رابط
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }
}

// عرض العقارات في الصفحة
function displayProperties() {
    const propertiesList = document.getElementById('propertiesList');
    if (!propertiesList) return;
    
    propertiesList.innerHTML = '';
    
    // تصفية العقارات حسب الفلتر الحالي
    let filteredProperties = propertiesData;
    if (currentFilter !== 'all') {
        if (currentFilter === 'rent') {
            filteredProperties = propertiesData.filter(property => property.transaction === 'كراء');
        } else if (currentFilter === 'sale') {
            filteredProperties = propertiesData.filter(property => property.transaction === 'بيع');
        } else if (currentFilter === 'villa') {
            filteredProperties = propertiesData.filter(property => property.type === 'فيلا');
        } else if (currentFilter === 'apartment') {
            filteredProperties = propertiesData.filter(property => property.type === 'شقة');
        }
    }
    
    // عرض العدد المطلوب من العقارات
    const propertiesToShow = filteredProperties.slice(0, displayedProperties);
    
    if (propertiesToShow.length === 0) {
        propertiesList.innerHTML = '<div class="no-properties"><p>لا توجد عقارات متاحة حالياً</p></div>';
        return;
    }
    
    propertiesToShow.forEach(property => {
        const propertyCard = createPropertyCard(property);
        propertiesList.appendChild(propertyCard);
    });
}

// إنشاء بطاقة عقار
function createPropertyCard(property) {
    const card = document.createElement('div');
    card.className = 'property-card';
    card.dataset.id = property.id;
    
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
            <button class="details-btn" data-id="${property.id}">
                <i class="fas fa-info-circle"></i> التفاصيل
            </button>
        </div>
    `;
    
    // إضافة مستمع الحدث لزر التفاصيل
    const detailsBtn = card.querySelector('.details-btn');
    detailsBtn.addEventListener('click', function() {
        showPropertyDetails(property.id);
    });
    
    return card;
}

// تهيئة الفلاتر
function initFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // إزالة النشاط من جميع الأزرار
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // إضافة النشاط للزر المحدد
            this.classList.add('active');
            
            // تحديث الفلتر الحالي
            currentFilter = this.dataset.filter;
            
            // إعادة تعيين عدد العقارات المعروضة
            displayedProperties = 4;
            
            // عرض العقارات المصفاة
            displayProperties();
            
            // تحديث زر تحميل المزيد
            updateLoadMoreButton();
        });
    });
}

// تهيئة البحث
function initSearch() {
    const searchBtn = document.getElementById('searchBtn');
    const citySelect = document.getElementById('citySelect');
    
    if (searchBtn && citySelect) {
        searchBtn.addEventListener('click', function() {
            const selectedCity = citySelect.value;
            
            if (!selectedCity) {
                alert('الرجاء اختيار مدينة للبحث');
                return;
            }
            
            // في تطبيق حقيقي، هنا سيتم إرسال طلب البحث إلى الخادم
            // الآن، سنعرض رسالة بسيطة
            alert(`سيتم البحث عن العقارات في مدينة ${selectedCity}. في التطبيق الكامل، سيتم تحميل النتائج من الخادم.`);
            
            // تحديث الفلتر الحالي لعرض عقارات المدينة المحددة
            // (في هذا الإصدار البسيط، نعرض جميع العقارات)
            currentFilter = 'all';
            document.querySelectorAll('.filter-btn').forEach(btn => {
                if (btn.dataset.filter === 'all') {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
            
            displayedProperties = 4;
            displayProperties();
            updateLoadMoreButton();
        });
    }
}

// تهيئة زر تحميل المزيد
function initLoadMore() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // زيادة عدد العقارات المعروضة
            displayedProperties += 4;
            
            // عرض العقارات الجديدة
            displayProperties();
            
            // تحديث حالة الزر
            updateLoadMoreButton();
        });
    }
}

// تحديث زر تحميل المزيد
function updateLoadMoreButton() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (!loadMoreBtn) return;
    
    // تصفية العقارات حسب الفلتر الحالي
    let filteredProperties = propertiesData;
    if (currentFilter !== 'all') {
        if (currentFilter === 'rent') {
            filteredProperties = propertiesData.filter(property => property.transaction === 'كراء');
        } else if (currentFilter === 'sale') {
            filteredProperties = propertiesData.filter(property => property.transaction === 'بيع');
        } else if (currentFilter === 'villa') {
            filteredProperties = propertiesData.filter(property => property.type === 'فيلا');
        } else if (currentFilter === 'apartment') {
            filteredProperties = propertiesData.filter(property => property.type === 'شقة');
        }
    }
    
    // إخفاء الزر إذا تم عرض جميع العقارات
    if (displayedProperties >= filteredProperties.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'block';
    }
}

// عرض تفاصيل العقار في نافذة منبثقة
function showPropertyDetails(propertyId) {
    const property
