function handleLogoClick(event) {
    event.preventDefault(); 
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
    if (document.getElementById('mobile-menu').classList.contains('active')) {
        toggleMenu(); 
    }
}

const hamburgerBtn = document.getElementById('hamburger-btn');
const closeBtn = document.getElementById('close-btn');
const mobileMenu = document.getElementById('mobile-menu');
const overlay = document.getElementById('overlay');
const mobileLinks = document.querySelectorAll('.mobile-link:not(.wa-trigger)'); 
const header = document.getElementById('header');

function toggleMenu() {
    mobileMenu.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
}

hamburgerBtn.addEventListener('click', toggleMenu);
closeBtn.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);
mobileLinks.forEach(link => link.addEventListener('click', toggleMenu));

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById('scroll-progress').style.width = scrolled + "%";
});

const revealElements = document.querySelectorAll('.reveal');
const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
};
const revealObserver = new IntersectionObserver(revealCallback, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });
revealElements.forEach(el => revealObserver.observe(el));

function showToast(message) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> <span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
        toast.classList.add('hide');
        toast.addEventListener('animationend', () => toast.remove());
    }, 3000); 
}

const waTriggers = document.querySelectorAll('.wa-trigger');
const waModal = document.getElementById('wa-modal');
const waClose = document.getElementById('wa-close');
const waSubmit = document.getElementById('wa-submit');

waTriggers.forEach(trigger => {
    trigger.addEventListener('click', function(e) {
        e.preventDefault(); 
        waModal.classList.add('show');
        if (mobileMenu.classList.contains('active')) toggleMenu();
    });
});

waClose.addEventListener('click', () => waModal.classList.remove('show'));
waModal.addEventListener('click', (e) => {
    if (e.target === waModal) waModal.classList.remove('show');
});

waSubmit.addEventListener('click', () => {
    const nome = document.getElementById('wa-nome').value.trim();
    const assunto = document.getElementById('wa-assunto').value;
    const mensagem = document.getElementById('wa-mensagem').value.trim();

    if (!nome) {
        showToast('Por favor, informe seu nome para continuarmos.'); 
        document.getElementById('wa-nome').focus();
        return;
    }
    if (!assunto) {
        showToast('Por gentileza, selecione um serviço.'); 
        document.getElementById('wa-assunto').focus();
        return;
    }

    let textoWhats = `Olá Vinceri Contabilidade! Meu nome é *${nome}*.\nTenho interesse no serviço de: *${assunto}*`;
    if (mensagem) textoWhats += `\n\n*Detalhes adicionais:*\n_${mensagem}_`;

    const urlEncoded = encodeURIComponent(textoWhats);
    const numeroWhatsApp = "5592982771117"; 
    const linkFinal = `https://wa.me/${numeroWhatsApp}?text=${urlEncoded}`;
    
    window.open(linkFinal, '_blank');
    
    document.getElementById('wa-nome').value = '';
    document.getElementById('wa-assunto').value = '';
    document.getElementById('wa-mensagem').value = '';
    waModal.classList.remove('show');
});