const I18N = {
    en: {
        title: 'Master Your <span class="text-gradient">Instagram</span> Network',
        subtitle: 'The ultimate, client-side manager to securely unfollow non-followers and remove ghost followers without sharing your password.',
        howItWorks: 'How it works',
        step1: 'Copy the script using the button below.',
        step2: 'Open Instagram in your browser and login.',
        step3: 'Press F12, open the Console tab, paste the code and press Enter.',
        copyBtn: 'Copy Script',
        codeTitle: 'Code Review (tool.js)',
        copied: 'Script copied to clipboard!'
    },
    tr: {
        title: 'Instagram Ağınıza <span class="text-gradient">Hükmedin</span>',
        subtitle: 'Şifrenizi paylaşmadan takip etmeyenleri bulup çıkabileceğiniz en gelişmiş, güvenli tarayıcı aracı.',
        howItWorks: 'Nasıl Kullanılır?',
        step1: 'Aşağıdaki butona tıklayarak kodu kopyalayın.',
        step2: 'Tarayıcınızdan Instagram\'ı açın ve giriş yapın.',
        step3: 'F12 tuşuna basın, Console (Konsol) sekmesini açın, kodu yapıştırın ve Enter\'a basın.',
        copyBtn: 'Kodu Kopyala',
        codeTitle: 'Kod İnceleme (tool.js)',
        copied: 'Kod panoya kopyalandı!'
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
    langSwitcher.value = currentLang;
    updateLanguage(currentLang);

    // Fetch the script content
    fetch('./tool.js')
        .then(response => response.text())
        .then(data => {
            scriptContent = data;
            // Render the code for review
            codeViewer.textContent = scriptContent;
            // Tell Prism to highlight the newly added code
            if(window.Prism) Prism.highlightElement(codeViewer);
        })
        .catch(err => {
            console.error('Failed to load script content', err);
            codeViewer.textContent = '// Error loading tool.js file. Please make sure it exists in the directory.';
            copyBtn.disabled = true;
        });

    copyBtn.addEventListener('click', async () => {
        if (!scriptContent) return;
        try {
            await navigator.clipboard.writeText(scriptContent);
            showToast();
        } catch (err) {
            console.error('Failed to copy text: ', err);
            alert('Failed to copy. Please try again.');
        }
    });

    langSwitcher.addEventListener('change', (e) => {
        currentLang = e.target.value;
        localStorage.setItem('prelowers-lang', currentLang);
        updateLanguage(currentLang);
    });

    function updateLanguage(lang) {
        const dict = I18N[lang];
        document.getElementById('t-title').innerHTML = dict.title;
        document.getElementById('t-subtitle').innerText = dict.subtitle;
        document.getElementById('t-howItWorks').innerText = dict.howItWorks;
        document.getElementById('t-step1').innerText = dict.step1;
        document.getElementById('t-step2').innerText = dict.step2;
        document.getElementById('t-step3').innerText = dict.step3;
        document.getElementById('t-copyBtn').innerText = dict.copyBtn;
        document.getElementById('t-codeTitle').innerText = dict.codeTitle;
        document.getElementById('t-copied').innerText = dict.copied;
    }

    function showToast() {
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
});
