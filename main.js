/* PRELOWERS CUSTOM LOGIC */
const I18N = {
    en: {
        badge: 'Client-Side & Secure',
        heroTitle: 'Master your<br><span class="text-gradient">Instagram</span> network',
        heroSub: 'Prelowers is the ultimate tool to securely unfollow non-followers and remove ghost followers without sharing your password.',
        copyBtn: 'Copy Script',
        codeReview: 'Code Review — tool.js',
        toast: 'Script copied to clipboard!',
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
        codeReview: 'Kod İnceleme — tool.js',
        toast: 'Kod panoya kopyalandı!',
        ig1Title: '%100 İstemci Tabanlı',
        ig1Sub: 'Şifre paylaşımı yok',
        ig2Title: 'Ban Karşıtı Sistem',
        ig2Sub: 'Dinamik bekleme süreleri',
        ig3Title: 'Sıfır Sunucu Maliyeti',
        ig3Sub: 'Tamamen ücretsiz',
        ig4Title: 'Akıllı Filtreleme',
        ig4Sub: 'Sahte takipçileri bulun'
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const copyBtn = document.getElementById('copyBtn');
    const toast = document.getElementById('toast');
    const codeViewer = document.getElementById('code-viewer');
    const langSwitcher = document.getElementById('lang-switcher');
    let scriptContent = '';

    // Initialize Language
    let currentLang = localStorage.getItem('prelowers-lang') || (navigator.language.startsWith('tr') ? 'tr' : 'en');
    if(langSwitcher) langSwitcher.value = currentLang;
    updateLanguage(currentLang);

    // Fetch the script content
    fetch('./tool.js')
        .then(response => response.text())
        .then(data => {
            scriptContent = data;
            if(codeViewer) {
                codeViewer.textContent = scriptContent;
                if(window.Prism) Prism.highlightElement(codeViewer);
            }
        })
        .catch(err => console.log('Fetch error:', err));

    if(copyBtn) {
        copyBtn.addEventListener('click', async () => {
            if (!scriptContent) return;
            try {
                await navigator.clipboard.writeText(scriptContent);
                if(toast) { 
                    toast.classList.add('show'); 
                    setTimeout(() => toast.classList.remove('show'), 3000); 
                }
            } catch (err) {}
        });
    }

    if(langSwitcher) {
        langSwitcher.addEventListener('change', (e) => {
            currentLang = e.target.value;
            localStorage.setItem('prelowers-lang', currentLang);
            updateLanguage(currentLang);
        });
    }

    function updateLanguage(lang) {
        const dict = I18N[lang];
        if(!dict) return;
        Object.keys(dict).forEach(key => {
            const el = document.getElementById('t-' + key);
            if(el) el.innerHTML = dict[key];
        });
    }
});
