/* ============================================
   LAZISMU LENGKONG - Main JavaScript
   Developed by Aegner & Revan
   
   Features:
   - Zakat Calculator (ScoreApp Concept)
   - Smooth Scrolling
   - Navbar Effects
   - Animation Triggers
   - Form Handling
   ============================================ */

// ============================================
// Initialize AOS (Animate On Scroll)
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50
    });
    
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initCalculator();
    initDonationForm();
    initCountUp();
    initBackToTop();
    initPaymentMethods();
});

// ============================================
// Navbar Effects
// ============================================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    
    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on load
    
    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ============================================
// Mobile Menu
// ============================================
function initMobileMenu() {
    const toggle = document.getElementById('navbarToggle');
    const menu = document.getElementById('navbarMenu');
    
    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            menu.classList.toggle('active');
            toggle.classList.toggle('active');
        });
        
        // Close menu on link click
        menu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                toggle.classList.remove('active');
            });
        });
        
        // Close menu on outside click
        document.addEventListener('click', (e) => {
            if (!menu.contains(e.target) && !toggle.contains(e.target)) {
                menu.classList.remove('active');
                toggle.classList.remove('active');
            }
        });
    }
}

// ============================================
// Smooth Scrolling
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// Zakat Calculator (ScoreApp Concept)
// ============================================
let currentStep = 1;
const totalSteps = 4;

function initCalculator() {
    const form = document.getElementById('zakatCalculator');
    
    if (form) {
        form.addEventListener('submit', handleCalculatorSubmit);
    }
}

function nextStep(step) {
    const currentStepEl = document.querySelector(`.calc-step[data-step="${step}"]`);
    const nextStepEl = document.querySelector(`.calc-step[data-step="${step + 1}"]`);
    
    // Validation
    if (!validateStep(step)) {
        return;
    }
    
    // Hide current, show next
    currentStepEl.classList.remove('active');
    nextStepEl.classList.add('active');
    
    // Update progress
    currentStep = step + 1;
    updateProgress();
}

function prevStep(step) {
    const currentStepEl = document.querySelector(`.calc-step[data-step="${step}"]`);
    const prevStepEl = document.querySelector(`.calc-step[data-step="${step - 1}"]`);
    
    currentStepEl.classList.remove('active');
    prevStepEl.classList.add('active');
    
    currentStep = step - 1;
    updateProgress();
}

function updateProgress() {
    const progressFill = document.getElementById('progressFill');
    const progressSteps = document.querySelectorAll('.progress-steps .step');
    
    // Update progress bar
    const percentage = (currentStep / totalSteps) * 100;
    progressFill.style.width = `${percentage}%`;
    
    // Update step indicators
    progressSteps.forEach((step, index) => {
        step.classList.remove('active', 'completed');
        
        if (index + 1 < currentStep) {
            step.classList.add('completed');
        } else if (index + 1 === currentStep) {
            step.classList.add('active');
        }
    });
}

function validateStep(step) {
    switch(step) {
        case 1:
            const focus = document.querySelector('input[name="focus"]:checked');
            if (!focus) {
                alert('Silakan pilih fokus kebaikan Anda');
                return false;
            }
            return true;
            
        case 2:
            const asset = document.getElementById('assetAmount').value;
            if (!asset || parseFloat(asset.replace(/\D/g, '')) === 0) {
                alert('Silakan masukkan estimasi nilai aset Anda');
                return false;
            }
            return true;
            
        case 3:
            const style = document.querySelector('input[name="style"]:checked');
            if (!style) {
                alert('Silakan pilih gaya berbagi Anda');
                return false;
            }
            return true;
            
        case 4:
            const name = document.getElementById('donorName').value;
            const wa = document.getElementById('donorWhatsapp').value;
            if (!name || !wa) {
                alert('Silakan lengkapi nama dan nomor WhatsApp Anda');
                return false;
            }
            return true;
            
        default:
            return true;
    }
}

function handleCalculatorSubmit(e) {
    e.preventDefault();
    
    if (!validateStep(4)) {
        return;
    }
    
    // Get form data
    const formData = {
        focus: document.querySelector('input[name="focus"]:checked').value,
        asset: document.getElementById('assetAmount').value.replace(/\D/g, ''),
        style: document.querySelector('input[name="style"]:checked').value,
        name: document.getElementById('donorName').value,
        whatsapp: document.getElementById('donorWhatsapp').value,
        email: document.getElementById('donorEmail').value
    };
    
    // Calculate results
    calculateResults(formData);
}

function calculateResults(data) {
    const asset = parseFloat(data.asset);
    const nisab = 85000000; // Nisab ~ 85 juta
    
    let zakatAmount = 0;
    let category = '';
    
    if (data.style === 'zakat') {
        zakatAmount = asset * 0.025; // 2.5% for zakat
    } else {
        zakatAmount = asset * 0.01; // Example for infaq
    }
    
    // Determine category based on amount
    if (zakatAmount >= 50000000) {
        category = 'Sultan of Generosity';
    } else if (zakatAmount >= 10000000) {
        category = 'Champion of Lengkong';
    } else if (zakatAmount >= 5000000) {
        category = 'Hero of Taman Harapan';
    } else if (zakatAmount >= 1000000) {
        category = 'Guardian of Education';
    } else {
        category = 'Friend of the Needy';
    }
    
    // Calculate impact
    const sembakoPrice = 250000; // Price per sembako package
    const orphanCare = 500000; // Monthly care per orphan
    const scholarship = 350000; // Monthly scholarship
    
    const meals = Math.floor(zakatAmount / sembakoPrice);
    const orphans = Math.floor(zakatAmount / orphanCare);
    const students = Math.floor(zakatAmount / scholarship);
    
    // Display results
    showResults({
        name: data.name,
        category: category,
        zakat: zakatAmount,
        meals: meals,
        orphans: orphans,
        students: students,
        focus: data.focus
    });
}

function showResults(results) {
    const form = document.getElementById('zakatCalculator');
    const resultSection = document.getElementById('calcResult');
    const progressSection = document.querySelector('.calc-progress');
    
    // Hide form, show results
    form.style.display = 'none';
    progressSection.style.display = 'none';
    resultSection.style.display = 'block';
    
    // Populate results
    document.getElementById('resultName').textContent = results.name;
    document.getElementById('resultCategory').textContent = results.category;
    document.getElementById('resultZakat').textContent = formatRupiah(results.zakat);
    document.getElementById('resultMeals').textContent = results.meals;
    document.getElementById('resultOrphans').textContent = results.orphans || 1;
    document.getElementById('resultStudents').textContent = results.students || 1;
    
    // Custom message based on focus
    let message = '';
    switch(results.focus) {
        case 'panti':
            message = `Dana Anda akan diprioritaskan untuk adik-adik di LKSA Taman Harapan—panti asuhan Muhammadiyah tertua di Jawa Barat. Setiap rupiah yang Anda berikan adalah investasi untuk masa depan mereka.`;
            break;
        case 'pendidikan':
            message = `Dana Anda akan disalurkan untuk beasiswa siswa SD/SMP/SMA Muhammadiyah Lengkong yang kurang mampu. Anda membantu mencetak generasi penerus bangsa dari jantung Kota Bandung.`;
            break;
        case 'dhuafa':
            message = `Dana Anda akan langsung disalurkan kepada warga dhuafa di sekitar Malabar, Burangrang, dan Turangga—tetangga terdekat kita yang membutuhkan. Tidak ada jarak antara kebaikan dan yang membutuhkan.`;
            break;
        default:
            message = `Dana Anda akan kami distribusikan secara merata ke semua program Lazismu Lengkong: Panti Taman Harapan, Beasiswa Pendidikan, dan Bantuan Warga Dhuafa. Amanah Anda, tanggung jawab kami.`;
    }
    
    document.getElementById('resultMessage').textContent = message;
    
    // Scroll to results
    resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    // Animate numbers
    animateNumbers();
}

function resetCalculator() {
    const form = document.getElementById('zakatCalculator');
    const resultSection = document.getElementById('calcResult');
    const progressSection = document.querySelector('.calc-progress');
    
    // Reset form
    form.reset();
    
    // Show form, hide results
    form.style.display = 'block';
    progressSection.style.display = 'block';
    resultSection.style.display = 'none';
    
    // Reset to step 1
    currentStep = 1;
    document.querySelectorAll('.calc-step').forEach((step, index) => {
        step.classList.remove('active');
        if (index === 0) step.classList.add('active');
    });
    updateProgress();
    
    // Scroll to calculator
    document.getElementById('kalkulator').scrollIntoView({ behavior: 'smooth' });
}

function scrollToDonation() {
    document.getElementById('donasi').scrollIntoView({ behavior: 'smooth' });
}

// ============================================
// Donation Form
// ============================================
function initDonationForm() {
    // Tab switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
    
    // Preset amounts
    const presetBtns = document.querySelectorAll('.preset-btn');
    const donationInput = document.getElementById('donationAmount');
    
    presetBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            presetBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const amount = btn.dataset.amount;
            if (amount !== 'custom') {
                donationInput.value = formatNumber(amount);
                updateImpactPreview(amount);
            } else {
                donationInput.value = '';
                donationInput.focus();
            }
        });
    });
    
    // Impact preview on input change
    if (donationInput) {
        donationInput.addEventListener('input', function() {
            const amount = this.value.replace(/\D/g, '');
            updateImpactPreview(amount);
        });
    }
    
    // Donate button
    const btnDonate = document.getElementById('btnDonate');
    if (btnDonate) {
        btnDonate.addEventListener('click', handleDonation);
    }
}

function updateImpactPreview(amount) {
    const preview = document.getElementById('impactPreview');
    if (!preview) return;
    
    const numAmount = parseInt(amount) || 0;
    
    let impact = '';
    if (numAmount >= 10000000) {
        const students = Math.floor(numAmount / 350000);
        impact = `${students} siswa mendapat beasiswa selama 1 bulan`;
    } else if (numAmount >= 1000000) {
        const packages = Math.floor(numAmount / 250000);
        impact = `${packages} paket sembako untuk keluarga dhuafa`;
    } else if (numAmount >= 250000) {
        impact = `1 paket sembako lengkap untuk 1 keluarga`;
    } else if (numAmount >= 100000) {
        impact = `paket buka puasa untuk 4 orang`;
    } else if (numAmount >= 50000) {
        impact = `paket buka puasa untuk 2 orang`;
    } else if (numAmount >= 25000) {
        impact = `1 paket buka puasa untuk 1 orang`;
    } else {
        impact = `kebaikan untuk warga dhuafa Lengkong`;
    }
    
    preview.textContent = impact;
}

function handleDonation() {
    const amount = document.getElementById('donationAmount').value;
    const name = document.getElementById('donaturName').value || 'Hamba Allah';
    const phone = document.getElementById('donaturPhone').value;
    const message = document.getElementById('donaturMessage').value;
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    
    if (!amount) {
        alert('Silakan masukkan nominal donasi');
        return;
    }
    
    // Get active donation type
    const activeTab = document.querySelector('.tab-btn.active');
    const donationType = activeTab ? activeTab.dataset.tab : 'zakat';
    
    // Format WhatsApp message
    const waNumber = '6281234567890'; // Replace with actual number
    const waMessage = encodeURIComponent(
        `Assalamualaikum, saya ingin menunaikan ${donationType}.\n\n` +
        `Nama: ${name}\n` +
        `Nominal: Rp ${amount}\n` +
        `Metode: ${paymentMethod}\n` +
        `${message ? `Pesan: ${message}\n` : ''}\n` +
        `Mohon konfirmasi dan panduan pembayaran. Jazakallahu khairan.`
    );
    
    if (paymentMethod === 'whatsapp' || paymentMethod === 'jemput') {
        window.open(`https://wa.me/${waNumber}?text=${waMessage}`, '_blank');
    } else {
        // Show payment details
        alert(`Silakan transfer ke rekening yang tertera.\n\nSetelah transfer, konfirmasi via WhatsApp untuk mendapatkan bukti penyaluran.`);
        window.open(`https://wa.me/${waNumber}?text=${waMessage}`, '_blank');
    }
}

// ============================================
// Payment Methods
// ============================================
function initPaymentMethods() {
    const paymentOptions = document.querySelectorAll('input[name="payment"]');
    const paymentDetail = document.getElementById('paymentDetail');
    
    if (!paymentDetail) return;
    
    function showPaymentMethod(method) {
        // Hide all
        paymentDetail.querySelectorAll('> div').forEach(div => {
            div.classList.remove('active');
        });
        
        // Show selected
        const targetDiv = paymentDetail.querySelector(`[data-method="${method}"]`);
        if (targetDiv) {
            targetDiv.classList.add('active');
        }
    }
    
    paymentOptions.forEach(option => {
        option.addEventListener('change', function() {
            showPaymentMethod(this.value);
        });
    });
    
    // Show default
    showPaymentMethod('qris');
}

function copyAccount(accountNumber) {
    navigator.clipboard.writeText(accountNumber).then(() => {
        alert('Nomor rekening berhasil disalin!');
    }).catch(() => {
        // Fallback
        const textArea = document.createElement('textarea');
        textArea.value = accountNumber;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('Nomor rekening berhasil disalin!');
    });
}

// ============================================
// Count Up Animation
// ============================================
function initCountUp() {
    const counters = document.querySelectorAll('[data-count]');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.count);
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element, target) {
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString('id-ID');
    }, 16);
}

function animateNumbers() {
    const elements = document.querySelectorAll('.impact-value');
    elements.forEach(el => {
        const text = el.textContent;
        const number = parseInt(text.replace(/\D/g, ''));
        if (number && number > 0) {
            animateCounter(el, number);
        }
    });
}

// ============================================
// Back to Top Button
// ============================================
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    if (!backToTop) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// Utility Functions
// ============================================
function formatCurrency(input) {
    let value = input.value.replace(/\D/g, '');
    value = formatNumber(value);
    input.value = value;
}

function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function formatRupiah(amount) {
    return 'Rp ' + amount.toLocaleString('id-ID');
}

// ============================================
// Live Counter Simulation (Demo Purpose)
// ============================================
function simulateLiveCounter() {
    const liveAmount = document.getElementById('liveAmount');
    const liveDonors = document.getElementById('liveDonors');
    const liveTarget = document.getElementById('liveTarget');
    
    if (!liveAmount) return;
    
    // Simulate random updates
    setInterval(() => {
        const currentAmount = parseInt(liveAmount.textContent.replace(/\D/g, ''));
        const newAmount = currentAmount + Math.floor(Math.random() * 500000);
        liveAmount.textContent = 'Rp ' + newAmount.toLocaleString('id-ID');
        
        const currentDonors = parseInt(liveDonors.textContent.replace(/\D/g, ''));
        liveDonors.textContent = (currentDonors + 1).toLocaleString('id-ID');
        
        const target = 2000000000; // 2 billion target
        const percentage = Math.min(100, Math.floor((newAmount / target) * 100));
        liveTarget.textContent = percentage + '%';
    }, 30000); // Update every 30 seconds
}

// Initialize live counter simulation
setTimeout(simulateLiveCounter, 3000);

// ============================================
// Console Welcome Message
// ============================================
console.log(`
%c ██╗      █████╗ ███████╗██╗███████╗███╗   ███╗██╗   ██╗
%c ██║     ██╔══██╗╚══███╔╝██║██╔════╝████╗ ████║██║   ██║
%c ██║     ███████║  ███╔╝ ██║███████╗██╔████╔██║██║   ██║
%c ██║     ██╔══██║ ███╔╝  ██║╚════██║██║╚██╔╝██║██║   ██║
%c ███████╗██║  ██║███████╗██║███████║██║ ╚═╝ ██║╚██████╔╝
%c ╚══════╝╚═╝  ╚═╝╚══════╝╚═╝╚══════╝╚═╝     ╚═╝ ╚═════╝ 
%c                    LENGKONG
%c ─────────────────────────────────────────────────────
%c Developed with ❤️ by Aegner & Revan
%c Memberi untuk Negeri, Berbagi dari Lengkong
`,
'color: #F7941D; font-weight: bold;',
'color: #F7941D; font-weight: bold;',
'color: #F7941D; font-weight: bold;',
'color: #F7941D; font-weight: bold;',
'color: #F7941D; font-weight: bold;',
'color: #F7941D; font-weight: bold;',
'color: #00A651; font-weight: bold;',
'color: #6C757D;',
'color: #F15A24;',
'color: #6C757D; font-style: italic;'
);
