// ملف: script.js
// كود JavaScript الرئيسي للموقع - مع دعم عرض العقارات المحفوظة

document.addEventListener('DOMContentLoaded', function() {
    console.log('موقع DarMarket جاهز للتشغيل');
    
    // ===== 1. تهيئة الموقع =====
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if(menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // إغلاق القائمة عند النقر خارجها
    document.addEventListener('click', function(e) {
        if(menuToggle && navMenu && 
           !menuToggle.contains(e.target) && 
           !navMenu.contains(e.target) && 
           navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    });
    
    // ===== 2. عرض العقارات من localStorage =====
    displayPropertiesFromStorage();
    
    // ===== 3. تفعيل فلاتر العقارات =====
    const filterBtns = document.querySelectorAll('.filter-btn');
    if(filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // إزالة النشاط من جميع الأزرار
                filterBtns.forEach(b => b.classList.remove('active'));
                // إضافة النشاط للزر المضغوط
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                filterProperties(filter);
            });
        });
    }
    
    // ===== 4. زر تحميل المزيد =====
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if(loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            displayPropertiesFromStorage();
            this.innerHTML = '<i class="fas fa-sync-alt"></i> تم التحديث';
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-sync-alt"></i> تحميل المزيد من العقارات';
            }, 2000);
        });
    }
    
    // ===== 5. بحث المدينة =====
    const searchBtn = document.getElementById('searchBtn');
    const citySelect = document.getElementById('citySelect');
    
    if(searchBtn && citySelect) {
        searchBtn.addEventListener('click', function() {
            const selectedCity = citySelect.value;
            if(selectedCity) {
                filterByCity(selectedCity);
            } else {
                alert('الرجاء اختيار مدينة للبحث');
            }
        });
    }
    
    // ===== 6. دالة عرض العقارات من التخزين المحلي =====
    function displayPropertiesFromStorage() {
        const propertiesList = document.getElementById('propertiesList');
        if(!propertiesList) return;
        
        const storedProperties = localStorage.getItem('darmarket_properties');
        let properties = [];
        
        if(storedProperties) {
            properties = JSON.parse(storedProperties);
        }
        
        // إذا لم توجد عقارات
        if(properties.length === 0) {
            propertiesList.innerHTML = `
                <div class="no-properties">
                    <i class="fas fa-home"></i>
                    <h3>لا توجد عقارات مضافة بعد</h3>
                    <p>كن أول من يضيف عقاراً إلى المنصة!</p>
                    <a href="add-property.html" class="submit-btn" style="margin-top: 20px;">
                        <i class="fas fa-plus"></i> أضف عقاراً جديداً
                    </a>
                </div>
            `;
            return;
        }
        
        // عرض العقارات
        let html = '';
        properties.forEach(property => {
            // تحديد أيقونة
            let icon = 'fa-home';
            let typeClass = '';
            
            if(property.type.includes('شقة')) {
                icon = 'fa-building';
                typeClass = 'apartment';
            } else if(property.type.includes('فيلا')) {
                icon = 'fa-home';
                typeClass = 'villa';
            } else if(property.type.includes('رياض')) {
                icon = 'fa-archway';
                typeClass = 'riad';
            } else if(property.type.includes('أرض')) {
                icon = 'fa-mountain';
                typeClass = 'land';
            } else if(property.type.includes('محل')) {
                icon = 'fa-store';
                typeClass = 'commercial';
            }
            
            // تنسيق السعر
            const priceNum = parseInt(property.price) || 0;
            const priceFormatted = priceNum.toLocaleString('ar-MA');
            const priceText = property.transaction === 'كراء' ? 
                `${priceFormatted} درهم/شهرياً` : 
                `${priceFormatted} درهم`;
            
            // الوصف المختصر
            const shortDesc = property.description ? 
                (property.description.length > 100 ? 
                 property.description.substring(0, 100) + '...' : 
                 property.description) : 
                'لا يوجد وصف مفصل';
            
            html += `
                <div class="property-card ${typeClass}" data-type="${typeClass}" data-transaction="${property.transaction}" data-city="${property.city}">
                    <div class="property-image">
                        <img src="${property.image}" alt="${property.name}">
                        <div class="property-tag ${property.transaction === 'بيع' ? 'sale' : 'rent'}">
                            ${property.transaction === 'بيع' ? 'للبيع' : 'للإيجار'}
                        </div>
                    </div>
                    <div class="property-details">
                        <h3 class="property-title">${property.name}</h3>
                        <p class="property-location">
                            <i class="fas fa-map-marker-alt"></i>
                            ${property.district}، ${property.city}
                        </p>
                        <p class="property-description">${shortDesc}</p>
                        <div class="property-features">
                            <span><i class="fas fa-ruler-combined"></i> ${property.area} م²</span>
                            <span><i class="fas fa-bed"></i> ${property.rooms} غرف</span>
                            <span><i class="fas fa-building"></i> ${property.type}</span>
                        </div>
                        <div class="property-footer">
                            <div class="property-price">${priceText}</div>
                            <button class="view-details-btn" onclick="showPropertyDetails(${property.id})">
                                <i class="fas fa-eye"></i> التفاصيل
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });
        
        propertiesList.innerHTML = html;
        console.log('تم عرض', properties.length, 'عقار من التخزين المحلي');
    }
    
    // ===== 7. دالة الفلترة =====
    function filterProperties(filter) {
        const propertyCards = document.querySelectorAll('.property-card');
        
        propertyCards.forEach(card => {
            if(filter === 'all') {
                card.style.display = 'block';
            } else if(filter === 'rent') {
                card.style.display = card.getAttribute('data-transaction') === 'كراء' ? 'block' : 'none';
            } else if(filter === 'sale') {
                card.style.display = card.getAttribute('data-transaction') === 'بيع' ? 'block' : 'none';
            } else {
                card.style.display = card.getAttribute('data-type') === filter ? 'block' : 'none';
            }
        });
    }
    
    // ===== 8. دالة البحث حسب المدينة =====
    function filterByCity(city) {
        const propertyCards = document.querySelectorAll('.property-card');
        let found = false;
        
        propertyCards.forEach(card => {
            if(card.getAttribute('data-city') === city) {
                card.style.display = 'block';
                found = true;
            } else {
                card.style.display = 'none';
            }
        });
        
        if(!found) {
            alert(`لا توجد عقارات في مدينة ${city}`);
            filterProperties('all');
            const allBtn = document.querySelector('.filter-btn[data-filter="all"]');
            if(allBtn) allBtn.click();
        }
    }
});

// دالة عرض تفاصيل العقار (يمكن توسيعها لاحقاً)
function showPropertyDetails(propertyId) {
    const storedProperties = localStorage.getItem('darmarket_properties');
    let properties = [];
    
    if(storedProperties) {
        properties = JSON.parse(storedProperties);
    }
    
    const property = properties.find(p => p.id === propertyId);
    
    if(property) {
        const modal = document.getElementById('propertyModal');
        const modalBody = document.getElementById('modalBody');
        
        if(modal && modalBody) {
            modalBody.innerHTML = `
                <div class="modal-property">
                    <div class="modal-image">
                        <img src="${property.image}" alt="${property.name}">
                    </div>
                    <div class="modal-content">
                        <h2>${property.name}</h2>
                        <p class="modal-location"><i class="fas fa-map-marker-alt"></i> ${property.district}، ${property.city}</p>
                        <div class="modal-tags">
                            <span class="modal-tag ${property.transaction === 'بيع' ? 'sale' : 'rent'}">
                                ${property.transaction === 'بيع' ? 'للبيع' : 'للإيجار'}
                            </span>
                            <span class="modal-tag type">${property.type}</span>
                        </div>
                        <div class="modal-price">السعر: <strong>${parseInt(property.price).toLocaleString('ar-MA')} درهم</strong></div>
                        <div class="modal-details">
                            <h3>تفاصيل العقار</h3>
                            <p>${property.description || 'لا يوجد وصف مفصل'}</p>
                            <div class="modal-features">
                                <div><i class="fas fa-ruler-combined"></i> <span>المساحة: ${property.area} م²</span></div>
                                <div><i class="fas fa-bed"></i> <span>عدد الغرف: ${property.rooms}</span></div>
                                <div><i class="fas fa-calendar"></i> <span>تاريخ الإضافة: ${property.date}</span></div>
                            </div>
                        </div>
                        <div class="modal-contact">
                            <h3>معلومات الاتصال</h3>
                            <p><i class="fas fa-user"></i> ${property.contactName}</p>
                            <p><i class="fas fa-phone"></i> ${property.contactPhone}</p>
                            ${property.contactEmail ? `<p><i class="fas fa-envelope"></i> ${property.contactEmail}</p>` : ''}
                        </div>
                    </div>
                </div>
            `;
            
            modal.style.display = 'flex';
            
            // إغلاق النافذة
            const closeModal = document.getElementById('closeModal');
            if(closeModal) {
                closeModal.addEventListener('click', function() {
                    modal.style.display = 'none';
                });
            }
            
            // إغلاق عند النقر خارج المحتوى
            modal.addEventListener('click', function(e) {
                if(e.target === modal) {
                    modal.style.display = 'none';
                }
            });
        }
    } else {
        alert('العقار غير موجود');
    }
              }
