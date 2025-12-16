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
        name: "شقة بحرية في أكادير",
        city: "أكادير",
        district: "تالبورجت",
        price: "18,000",
        type: "شقة",
        transaction: "كراء",
        area: "110",
        rooms: "3",
        bathrooms: "2",
        description: "شقة للكراء الشهري في أكادير، إطلالة مباشرة على البحر، مجهزة بالكامل، خدمات فندقية.",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 7,
        name: "أرض سكنية في بني ملال",
        city: "بني ملال",
        district: "وسط المدينة",
        price: "450,000",
        type: "أرض",
        transaction: "بيع",
        area: "300",
        rooms: "-",
        bathrooms: "-",
        description: "أرض سكنية في موقع استراتيجي ببني ملال، صالحة للبناء الفوري، جميع الخدمات متوفرة.",
        image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 8,
        name: "فيلا حديثة في تطوان",
        city: "تطوان",
        district: "حي الرماني",
        price: "1,800,000",
        type: "فيلا",
        transaction: "بيع",
        area: "280",
        rooms: "5",
        bathrooms: "3",
        description: "فيلا حديثة في تطوان، تصميم عصري، حديقة خاصة، مواقف داخلية، قريبة من المرافق.",
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    }
];

// متغيرات عامة
let displayedProperties = 6;
let currentFilter = 'all';

// تهيئة التطبيق عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 DarMarket المغربي جاهز للعمل!');
    
    // عرض العقارات
    displayProperties();
    
    // إعداد البحث
    setupSearch();
    
    // إعداد القائمة المتنقلة
    setupMobileMenu();
    
    // إعداد الفلاتر
    setupFilters();
    
    // إعداد زر تحميل المزيد
    setupLoadMore();
    
    // إعداد PWA
    setupPWA();
});

// دالة لعرض العقارات
function displayProperties() {
    const propertiesList = document.getElementById('propertiesList');
    if (!propertiesList) {
        console.error('❌ عنصر propertiesList غير موجود في الصفحة');
        return;
    }
    
    // تفريغ القائمة أولاً
    propertiesList.innerHTML = '';
    
    // تحديد العقارات التي يجب عرضها
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
        } else if (currentFilter === 'riad') {
            filteredProperties = propertiesData.filter(property => property.type === 'رياض');
        }
    }
    
    // عرض العدد المطلوب من العقارات
    const propertiesToShow = filteredProperties.slice(0, displayedProperties);
    
    if (propertiesToShow.length === 0) {
        propertiesList.innerHTML = '<div class="no-properties"><p>لا توجد عقارات متاحة حالياً</p></div>';
        return;
    }
    
    // إنشاء بطاقات العقارات
    propertiesToShow.forEach(property => {
        const propertyCard = createPropertyCard(property);
        propertiesList.appendChild(propertyCard);
    });
    
    console.log(`✅ تم عرض ${propertiesToShow.length} عقار`);
    
    // تحديث زر تحميل المزيد
    updateLoadMoreButton();
}

// دالة لإنشاء بطاقة عقار
function createPropertyCard(property) {
    const card = document.createElement('div');
    card.className = 'property-card';
    card.dataset.id = property.id;
    
    const typeClass = property.transaction === 'كراء' ? 'rent' : 'sale';
    const priceText = property.transaction === 'كراء' ? 'درهم/شهرياً' : 'درهم';
    
    card.innerHTML = `
        <div class="property-image">
            <img src="${property.image}" alt="${property.name}" loading="lazy">
            <div class="property-badge ${typeClass}">
                <i class="fas ${property.transaction === 'كراء' ? 'fa-handshake' : 'fa-tag'}"></i>
                ${property.transaction === 'كراء' ? 'للإيجار' : 'للبيع'}
            </div>
        </div>
        <div class="property-content">
            <h3>${property.name}</h3>
            <div class="property-location">
                <i class="fas fa-map-marker-alt location-icon"></i>
                <span>${property.district} - ${property.city}</span>
            </div>
            <div class="property-price">
                <i class="fas fa-money-bill-wave price-icon"></i>
                ${property.price} <span class="price-dh">${priceText}</span>
            </div>
            <div class="property-features">
                <div class="feature-item">
                    <div class="feature-icon">
                        <i class="fas fa-ruler-combined"></i>
                    </div>
                    <span class="feature-value">${property.area}</span>
                    <span class="feature-label">م²</span>
                </div>
                <div class="feature-item">
                    <div class="feature-icon">
                        <i class="fas fa-bed"></i>
                    </div>
                    <span class="feature-value">${property.rooms}</span>
                    <span class="feature-label">غرف</span>
                </div>
                <div class="feature-item">
                    <div class="feature-icon">
                        <i class="fas fa-bath"></i>
                    </div>
                    <span class="feature-value">${property.bathrooms}</span>
                    <span class="feature-label">حمام</span>
                </div>
            </div>
            <div class="property-actions">
                <button class="details-btn" data-id="${property.id}">
                    <i class="fas fa-info-circle"></i> التفاصيل
                </button>
            </div>
        </div>
    `;
    
    // إضافة حدث النقر لزر التفاصيل
    const detailsBtn = card.querySelector('.details-btn');
    detailsBtn.addEventListener('click', function() {
        showPropertyDetails(property.id);
    });
    
    return card;
}

// دالة لعرض تفاصيل العقار
function showPropertyDetails(propertyId) {
    const property = propertiesData.find(p => p.id === propertyId);
    if (!property) return;
    
    const priceText = property.transaction === 'كراء' ? 'درهم/شهرياً' : 'درهم';
    
    alert(`🏠 **${property.name}**\n\n📍 **الموقع:** ${property.district} - ${property.city}\n💰 **السعر:** ${property.price} ${priceText}\n📐 **المساحة:** ${property.area} م²\n🚪 **الغرف:** ${property.rooms}\n🛁 **الحمامات:** ${property.bathrooms}\n\n📝 **الوصف:**\n${property.description}\n\n📞 **للتواصل:** +212 600 000 000`);
}

// دالة لإعداد البحث
function setupSearch() {
    const searchBtn = document.getElementById('searchBtn');
    if (!searchBtn) {
        console.error('❌ زر البحث غير موجود');
        return;
    }
    
    searchBtn.addEventListener('click', function() {
        const citySelect = document.getElementById('citySelect');
        if (!citySelect) {
            console.error('❌ قائمة المدن غير موجودة');
            return;
        }
        
        const selectedCity = citySelect.value;
        
        if (!selectedCity) {
            alert('⚠️ الرجاء اختيار مدينة للبحث');
            return;
        }
        
        // في تطبيق حقيقي، هنا نرسل طلب بحث للخادم
        // لكن الآن نعرض رسالة تأكيد
        alert(`🔍 سيتم البحث عن عقارات في مدينة: ${selectedCity}\n\n(في التطبيق الكامل، ستظهر نتائج البحث هنا)`);
        
        // حفظ آخر بحث في التخزين المحلي
        try {
            localStorage.setItem('lastSearchCity', selectedCity);
        } catch (e) {
            console.log('لا يمكن حفظ البحث في التخزين المحلي');
        }
    });
}

// دالة لإعداد القائمة المتنقلة
function setupMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (!menuToggle || !navMenu) {
        console.error('❌ عناصر القائمة المتنقلة غير موجودة');
        return;
    }
    
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

// دالة لإعداد الفلاتر
function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    if (filterButtons.length === 0) {
        console.error('❌ أزرار الفلاتر غير موجودة');
        return;
    }
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // إزالة النشاط من جميع الأزرار
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // إضافة النشاط للزر المحدد
            this.classList.add('active');
            
            // تحديث الفلتر الحالي
            currentFilter = this.dataset.filter;
            
            // إعادة تعيين عدد العقارات المعروضة
            displayedProperties = 6;
            
            // عرض العقارات المصفاة
            displayProperties();
            
            console.log(`✅ تم تطبيق الفلتر: ${this.textContent.trim()}`);
        });
    });
}

// دالة لإعداد زر تحميل المزيد
function setupLoadMore() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    
    if (!loadMoreBtn) {
        console.error('❌ زر تحميل المزيد غير موجود');
        return;
    }
    
    loadMoreBtn.addEventListener('click', function() {
        // زيادة عدد العقارات المعروضة
        displayedProperties += 3;
        
        // عرض العقارات الجديدة
        displayProperties();
        
        console.log(`✅ تم تحميل المزيد، الآن يتم عرض ${displayedProperties} عقار`);
    });
}

// دالة لتحديث زر تحميل المزيد
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
        } else if (currentFilter === 'riad') {
            filteredProperties = propertiesData.filter(property => property.type === 'رياض');
        }
    }
    
    // إخفاء الزر إذا تم عرض جميع العقارات
    if (displayedProperties >= filteredProperties.length) {
        loadMoreBtn.style.display = 'none';
        loadMoreBtn.textContent = 'تم عرض جميع العقارات';
    } else {
        loadMoreBtn.style.display = 'block';
        loadMoreBtn.textContent = 'تحميل المزيد من العقارات';
        loadMoreBtn.innerHTML = '<i class="fas fa-sync-alt"></i> تحميل المزيد من العقارات';
    }
}

// دالة لإعداد PWA
function setupPWA() {
    const installBtn = document.getElementById('installBtn');
    const installLink = document.getElementById('installLink');
    const pwaStatus = document.getElementById('pwaStatus');
    
    // كشف إذا كان التطبيق مثبتاً كـ PWA
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
        if (pwaStatus) {
            pwaStatus.innerHTML = '✅ التطبيق مثبت كـ PWA';
        }
        if (installBtn) {
            installBtn.style.display = 'none';
        }
        return;
    }
    
    // كشف حدث beforeinstallprompt
    let deferredPrompt;
    
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        
        if (installBtn) {
            installBtn.style.display = 'flex';
        }
        
        if (pwaStatus) {
            pwaStatus.innerHTML = '📱 جاهز للتثبيت - <a href="#" id="installLinkText">تثبيت التطبيق</a>';
            
            const installLinkText = document.getElementById('installLinkText');
            if (installLinkText) {
                installLinkText.addEventListener('click', (e) => {
                    e.preventDefault();
                    showInstallPrompt();
                });
            }
        }
    });
    
    // دالة لعرض رسالة التثبيت
    function showInstallPrompt() {
        if (!deferredPrompt) return;
        
        deferredPrompt.prompt();
        
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('✅ وافق المستخدم على تثبيت التطبيق');
                if (installBtn) installBtn.style.display = 'none';
                if (pwaStatus) pwaStatus.innerHTML = '✅ تم تثبيت التطبيق بنجاح';
            } else {
                console.log('❌ رفض المستخدم تثبيت التطبيق');
            }
            deferredPrompt = null;
        });
    }
    
    // إضافة مستمع الأحداث لزر التثبيت
    if (installBtn) {
        installBtn.addEventListener('click', showInstallPrompt);
    }
    
    if (installLink) {
        installLink.addEventListener('click', (e) => {
            e.preventDefault();
            showInstallPrompt();
        });
    }
    
    // تسجيل Service Worker
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/Darmarket/service-worker.js')
                .then(registration => {
                    console.log('✅ Service Worker مسجل بنجاح:', registration.scope);
                })
                .catch(error => {
                    console.log('❌ فشل تسجيل Service Worker:', error);
                });
        });
    }
}

// تحميل العقارات عند التمرير لأسفل
window.addEventListener('scroll', function() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn && loadMoreBtn.style.display !== 'none') {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500) {
            loadMoreBtn.click();
        }
    }
});

// تحميل آخر بحث من التخزين المحلي
window.addEventListener('load', function() {
    try {
        const lastSearchCity = localStorage.getItem('lastSearchCity');
        if (lastSearchCity) {
            const citySelect = document.getElementById('citySelect');
            if (citySelect) {
                citySelect.value = lastSearchCity;
            }
        }
    } catch (e) {
        // تجاهل الخطأ
    }
});
