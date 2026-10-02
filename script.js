/* ==========================================================================
   SRI BALAJI E AUTOTECH - INTERACTIVE JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initFilters();
    updateCalculator();
});

// Mobile Drawer Navigation
function toggleMobileMenu() {
    const drawer = document.getElementById('mobileDrawer');
    drawer.classList.toggle('active');
}

// Scooter Models Filtering
function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const scooterCards = document.querySelectorAll('.scooter-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            scooterCards.forEach(card => {
                const cardCategories = card.getAttribute('data-category');
                if (filterValue === 'all' || cardCategories.includes(filterValue)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Dynamic EV Savings Calculator
function updateCalculator() {
    const dailyKmInput = document.getElementById('dailyKm');
    const dailyKmValSpan = document.getElementById('dailyKmVal');
    const petrolPriceInput = document.getElementById('petrolPrice');
    const petrolMileageInput = document.getElementById('petrolMileage');

    const monthlyPetrolSpan = document.getElementById('monthlyPetrol');
    const monthlyEVSpan = document.getElementById('monthlyEV');
    const yearlySavingsH3 = document.getElementById('yearlySavings');

    if (!dailyKmInput || !petrolPriceInput || !petrolMileageInput) return;

    const dailyKm = parseFloat(dailyKmInput.value) || 30;
    const petrolPrice = parseFloat(petrolPriceInput.value) || 96;
    const petrolMileage = parseFloat(petrolMileageInput.value) || 40;

    dailyKmValSpan.textContent = `${dailyKm} Km`;

    // Petrol calculation: (dailyKm / mileage) * price * 30 days
    const dailyPetrolCost = (dailyKm / petrolMileage) * petrolPrice;
    const monthlyPetrolCost = Math.round(dailyPetrolCost * 30);

    // EV calculation: EV costs ~₹0.15 per km
    const evCostPerKm = 0.15;
    const dailyEVCost = dailyKm * evCostPerKm;
    const monthlyEVCost = Math.round(dailyEVCost * 30);

    const netMonthlySavings = monthlyPetrolCost - monthlyEVCost;
    const netYearlySavings = netMonthlySavings * 12;

    monthlyPetrolSpan.textContent = `₹${monthlyPetrolCost.toLocaleString('en-IN')}`;
    monthlyEVSpan.textContent = `₹${monthlyEVCost.toLocaleString('en-IN')}`;
    yearlySavingsH3.textContent = `₹${netYearlySavings.toLocaleString('en-IN')}`;
}

// Modal Popup Handlers
function openTestRideModal(modelName = 'Balaji Electric Scooter') {
    const modal = document.getElementById('inquiryModal');
    const modalModelSpan = document.getElementById('modalModelName');
    modalModelSpan.textContent = modelName;
    modal.classList.add('active');
}

function openInquiryModal(modelName) {
    openTestRideModal(modelName);
}

function closeInquiryModal() {
    const modal = document.getElementById('inquiryModal');
    modal.classList.remove('active');
}

// Close modal if clicked outside
window.addEventListener('click', (e) => {
    const modal = document.getElementById('inquiryModal');
    if (e.target === modal) {
        closeInquiryModal();
    }
});

// Handle Form Submissions & Redirect to WhatsApp
function handleFormSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('userName').value;
    const phone = document.getElementById('userPhone').value;
    const model = document.getElementById('selectedModel').value;
    const date = document.getElementById('preferredDate').value || 'As soon as possible';
    const address = document.getElementById('userAddress').value || 'City';

    const message = `Hello Sri Balaji e Autotech!\n\nI want to book a Test Ride / Inquire about an EV Scooter:\n\n👤 Name: ${name}\n📞 Phone: ${phone}\n🛵 Model: ${model}\n📅 Preferred Date: ${date}\n📍 Location: ${address}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/919876543210?text=${encodedMessage}`;

    alert(`Thank you ${name}! Redirecting your inquiry to Sri Balaji e Autotech on WhatsApp...`);
    window.open(whatsappUrl, '_blank');
}

function handleModalSubmit(event) {
    event.preventDefault();

    const name = document.getElementById('modalName').value;
    const phone = document.getElementById('modalPhone').value;
    const city = document.getElementById('modalCity').value || 'City';
    const model = document.getElementById('modalModelName').textContent;

    const message = `Hello Sri Balaji e Autotech!\n\nI am interested in buying / booking a test ride for ${model}:\n\n👤 Name: ${name}\n📞 Phone: ${phone}\n📍 Locality: ${city}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/919876543210?text=${encodedMessage}`;

    closeInquiryModal();
    window.open(whatsappUrl, '_blank');
}

// Active Nav Link Scroll Highlight
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});
