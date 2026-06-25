const I18N = {
    en: {
        badge: 'Client-Side & Secure',
        heroTitle: 'Master your<br><span class="text-gradient">Instagram</span> network',
        heroSub: 'Prelowers is the ultimate tool to securely unfollow non-followers and remove ghost followers without sharing your password.',
        copyBtn: 'Copy Script',
        copyBtnSuccess: 'Copied! ✔️',
        codeReview: 'Code Review — tool.js',
        ig1Title: '100% Client-Side',
        ig1Sub: 'No password sharing',
        ig2Title: 'Anti-Ban Tech',
        ig2Sub: 'Dynamic delay limits',
        ig3Title: 'Zero API Cost',
        ig3Sub: 'Free forever to use',
        ig4Title: 'Smart Filter',
        ig4Sub: 'Find ghost followers'
    },
    tr: {
        badge: 'Tamamen Tarayıcıda',
        heroTitle: '<span class="text-gradient">Instagram</span> Ağınıza<br>Hükmedin',
        heroSub: 'Prelowers, şifrenizi paylaşmadan sizi takip etmeyenleri bulup takipten çıkabileceğiniz en güvenilir araçtır.',
        copyBtn: 'Kodu Kopyala',
        copyBtnSuccess: 'Kopyalandı! ✔️',
        codeReview: 'Kod İnceleme — tool.js',
        ig1Title: '%100 İstemci Tabanlı',
        ig1Sub: 'Şifre paylaşımı yok',
        ig2Title: 'Ban Karşıtı Sistem',
        ig2Sub: 'Dinamik bekleme süreleri',
        ig3Title: 'Sıfır Maliyet',
        ig3Sub: 'Tamamen ücretsiz',
        ig4Title: 'Akıllı Filtreleme',
        ig4Sub: 'Sahte takipçileri bulun'
    },
    es: {
        badge: 'En el cliente y Seguro',
        heroTitle: 'Domina tu red de<br><span class="text-gradient">Instagram</span>',
        heroSub: 'Prelowers es la herramienta definitiva para dejar de seguir a quienes no te siguen sin compartir tu contraseña.',
        copyBtn: 'Copiar Script',
        copyBtnSuccess: '¡Copiado! ✔️',
        codeReview: 'Revisión de Código — tool.js',
        ig1Title: '100% Client-Side',
        ig1Sub: 'Sin compartir contraseñas',
        ig2Title: 'Tecnología Anti-Ban',
        ig2Sub: 'Retrasos dinámicos',
        ig3Title: 'Cero Costo de API',
        ig3Sub: 'Uso gratuito',
        ig4Title: 'Filtro Inteligente',
        ig4Sub: 'Encuentra seguidores fantasma'
    },
    de: {
        badge: 'Client-Side & Sicher',
        heroTitle: 'Beherrsche dein<br><span class="text-gradient">Instagram</span> Netzwerk',
        heroSub: 'Prelowers ist das ultimative Tool, um Nicht-Followern sicher zu entfolgen, ohne dein Passwort zu teilen.',
        copyBtn: 'Skript kopieren',
        copyBtnSuccess: 'Kopiert! ✔️',
        codeReview: 'Code-Überprüfung — tool.js',
        ig1Title: '100% Client-Side',
        ig1Sub: 'Keine Passwortfreigabe',
        ig2Title: 'Anti-Ban Tech',
        ig2Sub: 'Dynamische Verzögerungen',
        ig3Title: 'Null API-Kosten',
        ig3Sub: 'Für immer kostenlos',
        ig4Title: 'Smart Filter',
        ig4Sub: 'Finde Geister-Follower'
    },
    fr: {
        badge: 'Côté client & Sécurisé',
        heroTitle: 'Maîtrisez votre réseau<br><span class="text-gradient">Instagram</span>',
        heroSub: 'Prelowers est l\'outil ultime pour vous désabonner en toute sécurité sans partager votre mot de passe.',
        copyBtn: 'Copier le script',
        copyBtnSuccess: 'Copié! ✔️',
        codeReview: 'Revue de code — tool.js',
        ig1Title: '100% Côté client',
        ig1Sub: 'Aucun partage de mot de passe',
        ig2Title: 'Technologie Anti-Ban',
        ig2Sub: 'Délais dynamiques',
        ig3Title: 'Zéro coût d\'API',
        ig3Sub: 'Utilisation gratuite',
        ig4Title: 'Filtre intelligent',
        ig4Sub: 'Trouvez les abonnés fantômes'
    }
};

const FLAGS = {
    en: '🇬🇧',
    tr: '🇹🇷',
    es: '🇪🇸',
    de: '🇩🇪',
    fr: '🇫🇷'
};

document.addEventListener('DOMContentLoaded', () => {
    const copyBtn = document.getElementById('copyBtn');
    const codeViewer = document.getElementById('code-viewer');

    const dropBtn = document.getElementById('langDropBtn');
    const dropMenu = document.getElementById('langDropMenu');
    const dropItems = document.querySelectorAll('.lang-drop-item');

    let scriptContent = '';

    let currentLang = localStorage.getItem('prelowers-lang') || (navigator.language.startsWith('tr') ? 'tr' : 'en');
    updateLanguage(currentLang);

    fetch('./tool.js')
        .then(response => response.text())
        .then(data => {
            scriptContent = data;
            if(codeViewer) {
                codeViewer.textContent = scriptContent;
                if(window.Prism) Prism.highlightElement(codeViewer);
            }
        })
        .catch(err => console.error('Initialization failed.'));

    if(copyBtn) {
        copyBtn.addEventListener('click', async () => {
            if (!scriptContent || copyBtn.classList.contains('copied')) return;
            try {
                await navigator.clipboard.writeText(scriptContent);
                copyBtn.classList.add('copied');
                const span = copyBtn.querySelector('span');
                const originalText = span.innerText;
                span.innerText = I18N[currentLang].copyBtnSuccess;

                setTimeout(() => {
                    copyBtn.classList.remove('copied');
                    span.innerText = I18N[currentLang].copyBtn;
                }, 2000);
            } catch (err) {}
        });
    }

    if(dropBtn) {
        dropBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropMenu.classList.toggle('show');
        });
    }

    document.addEventListener('click', (e) => {
        if(dropMenu && dropMenu.classList.contains('show') && !e.target.closest('.lang-dropdown')) {
            dropMenu.classList.remove('show');
        }
    });

    if(dropItems) {
        dropItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const lang = e.currentTarget.getAttribute('data-lang');
                localStorage.setItem('prelowers-lang', lang);
                updateLanguage(lang);
                if(dropMenu) dropMenu.classList.remove('show');
            });
        });
    }

    function updateLanguage(lang) {
        const dict = I18N[lang] || I18N['en'];

        if (dropBtn) {
            dropBtn.innerHTML = `${FLAGS[lang]} ${lang.toUpperCase()} <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>`;
        }

        Object.keys(dict).forEach(key => {
            const el = document.getElementById('t-' + key);
            if(el) el.innerHTML = dict[key];
        });

        if(copyBtn && !copyBtn.classList.contains('copied')) {
            const span = copyBtn.querySelector('span');
            if(span) span.innerText = dict.copyBtn;
        }
    }
});
