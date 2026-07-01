/**
 * Prelowers - Advanced Instagram Manager
 * Developer: @preacherion
 */

(() => {
    "use strict";

    if (location.hostname !== "www.instagram.com") {
        alert("Lütfen önce https://www.instagram.com adresini açın, ardından bu kodu tekrar yapıştırın.\n\nPlease open https://www.instagram.com first, then paste this script again.");
        return;
    }

    const APP_ID = "ig-adv-app";
    const STYLE_ID = "ig-adv-style";
    const STORAGE_KEY = "prelowers_settings_v1";

    const IG_HEADERS = {
        "x-ig-app-id": "936619743392459",
        "x-requested-with": "XMLHttpRequest"
    };

    const I18N = {
        en: {
            title: "Prelowers",
            subtitle: "Followers & Following Manager",
            devCredits: "Developer: @preacherion",
            readyTitle: "Ready to Scan",
            readyDesc: "We will fetch both your Followers and Following lists to give you full control.",
            startScan: "Start Scan",
            scanningFollowers: "Scanning your followers...",
            scanningFollowing: "Scanning people you follow...",
            found: "Found: ",
            cancel: "Cancel",
            search: "Search users...",
            colAll: "All",
            colUnf: "Unf",
            colRem: "Rem",
            noUsers: "No users found.",
            youFollow: "You Follow",
            notFollowing: "Not Following",
            followsYou: "Follows You",
            notFollower: "Not Follower",
            tasks: "Tasks",
            unfollow: "Unfollow",
            remove: "Remove",
            executeActions: "Execute Actions",
            processing: "Processing actions...",
            waiting: "Waiting to prevent ban...",
            stop: "Stop",
            completed: "Completed",
            successful: "Successful",
            failed: "Failed",
            backToResults: "Back to Results",
            settings: "Settings",
            language: "Language",
            glassBlur: "Glass Blur (px)",
            glassOpacity: "Glass Opacity (%)",
            speed: "Action Speed",
            speedFast: "Fast (High Risk)",
            speedNormal: "Normal (Safe)",
            speedSlow: "Slow (Very Safe)",
            saveSettings: "Save Settings",
            close: "Close",
            apiError: "API changes detected or rate limited. Received: ",
            loginError: "Could not find User ID. Please make sure you are logged in.",
            csrfError: "CSRF Token missing.",
            notifUnfollowed: "✅ Unfollowed",
            notifRemoved: "✅ Removed from followers",
            notifSkipped: "⚠️ Skipped (Verified)",
            downloadReport: "Download Report",
            scanGhosts: "Scanning ghosts...",
            scanPost: "Scanning post",
            scanFailed: "Scan failed",
            colUser: "User",
            tipAll: "Select both actions",
            tipUnf: "Unfollow them",
            tipRem: "Remove from your followers",
            ghost: "Ghost",
            protectVerifiedLabel: "Protect Verified",
            findGhostsLabel: "Find Ghost Followers",
            loadMore: "Load More",
            tabAll: "All",
            tabNonFollowers: "Non-Followers",
            tabGhosts: "Ghosts",
            tabMutual: "Mutual",
            tabFans: "Fans",
            statsScanned: "Scanned",
            eta: "ETA: ",
            secs: "s"
        },
        tr: {
            title: "Prelowers",
            subtitle: "Takipçi & Takip Edilen Yöneticisi",
            devCredits: "Geliştirici: @preacherion",
            readyTitle: "Taramaya Hazır",
            readyDesc: "Tam kontrol sağlamak için hem Takipçi hem de Takip Ettikleriniz listesini çekeceğiz.",
            startScan: "Taramayı Başlat",
            scanningFollowers: "Takipçileriniz taranıyor...",
            scanningFollowing: "Takip ettikleriniz taranıyor...",
            found: "Bulunan: ",
            cancel: "İptal",
            search: "Kullanıcı ara...",
            colAll: "Tümü",
            colUnf: "Çık",
            colRem: "At",
            noUsers: "Kullanıcı bulunamadı.",
            youFollow: "Takip Ediyorsun",
            notFollowing: "Takip Etmiyorsun",
            followsYou: "Seni Takip Ediyor",
            notFollower: "Takipçin Değil",
            tasks: "İşlem",
            unfollow: "Takipten Çık",
            remove: "Takipçiden Çıkar",
            executeActions: "İşlemleri Başlat",
            processing: "İşlemler uygulanıyor...",
            waiting: "Ban riskine karşı bekleniyor...",
            stop: "Durdur",
            completed: "Tamamlandı",
            successful: "Başarılı",
            failed: "Hatalı",
            backToResults: "Sonuçlara Dön",
            settings: "Ayarlar",
            language: "Dil (Language)",
            glassBlur: "Arka Plan Bulanıklığı (px)",
            glassOpacity: "Arka Plan Saydamlığı (%)",
            speed: "İşlem Hızı",
            speedFast: "Hızlı (Yüksek Risk)",
            speedNormal: "Normal (Güvenli)",
            speedSlow: "Yavaş (Çok Güvenli)",
            saveSettings: "Ayarları Kaydet",
            close: "Kapat",
            apiError: "API erişim limiti veya yapı değişikliği. Gelen veri: ",
            loginError: "Kullanıcı ID bulunamadı. Hesabınıza giriş yaptığınızdan emin olun.",
            csrfError: "CSRF Token eksik.",
            notifUnfollowed: "✅ Takipten çıkarıldı",
            notifRemoved: "✅ Takipçilerden atıldı",
            notifSkipped: "⚠️ Atlandı (Mavi Tikli)",
            downloadReport: "Raporu İndir",
            scanGhosts: "Hayalet analizi yapılıyor...",
            scanPost: "Gönderi taranıyor",
            scanFailed: "Tarama başarısız",
            colUser: "Kullanıcı",
            tipAll: "Her iki işlemi seç",
            tipUnf: "Takipten çık",
            tipRem: "Takipçilerden çıkar",
            ghost: "Hayalet",
            protectVerifiedLabel: "Onaylı Hesapları Koru",
            findGhostsLabel: "Hayalet Takipçileri Bul",
            loadMore: "Daha Fazla Yükle",
            tabAll: "Tümü",
            tabNonFollowers: "Takip Etmeyenler",
            tabGhosts: "Hayaletler",
            tabMutual: "Karşılıklı",
            tabFans: "Hayranlar",
            statsScanned: "Taranan",
            eta: "Kalan Süre: ",
            secs: "sn"
        },
        es: {
            title: "Prelowers",
            subtitle: "Gestor de Seguidores y Seguidos",
            devCredits: "Desarrollador: @preacherion",
            readyTitle: "Listo para escanear",
            readyDesc: "Obtendremos tus listas de Seguidores y Seguidos para darte el control total.",
            startScan: "Iniciar Escaneo",
            scanningFollowers: "Escaneando seguidores...",
            scanningFollowing: "Escaneando seguidos...",
            found: "Encontrado: ",
            cancel: "Cancelar",
            search: "Buscar usuarios...",
            colAll: "Todos",
            colUnf: "Dejar",
            colRem: "Quitar",
            noUsers: "No se encontraron usuarios.",
            youFollow: "Sigues",
            notFollowing: "No sigues",
            followsYou: "Te sigue",
            notFollower: "No te sigue",
            tasks: "Tareas",
            unfollow: "Dejar de seguir",
            remove: "Eliminar",
            executeActions: "Ejecutar",
            processing: "Procesando...",
            waiting: "Esperando para prevenir baneo...",
            stop: "Detener",
            completed: "Completado",
            successful: "Exitoso",
            failed: "Fallido",
            backToResults: "Volver",
            settings: "Ajustes",
            language: "Idioma",
            glassBlur: "Desenfoque (px)",
            glassOpacity: "Opacidad (%)",
            speed: "Velocidad",
            speedFast: "Rápido (Riesgo)",
            speedNormal: "Normal (Seguro)",
            speedSlow: "Lento (Muy Seguro)",
            saveSettings: "Guardar",
            close: "Cerrar",
            apiError: "Error de API: ",
            loginError: "Inicia sesión primero.",
            csrfError: "Falta Token CSRF.",
            notifUnfollowed: "✅ Dejado de seguir",
            notifRemoved: "✅ Eliminado",
            notifSkipped: "⚠️ Omitido",
            downloadReport: "Descargar Reporte",
            scanGhosts: "Escaneando fantasmas...",
            scanPost: "Escaneando publicación",
            scanFailed: "Escaneo fallido",
            colUser: "Usuario",
            tipAll: "Seleccionar ambas acciones",
            tipUnf: "Dejar de seguir",
            tipRem: "Eliminar de tus seguidores",
            ghost: "Fantasma",
            protectVerifiedLabel: "Proteger Verificados",
            findGhostsLabel: "Buscar Seguidores Fantasma",
            loadMore: "Cargar Más",
            tabAll: "Todos",
            tabNonFollowers: "No Seguidores",
            tabGhosts: "Fantasmas",
            tabMutual: "Mutuo",
            tabFans: "Fans",
            statsScanned: "Escaneado",
            eta: "Tiempo rest: ",
            secs: "s"
        },
        de: {
            title: "Prelowers",
            subtitle: "Follower Manager",
            devCredits: "Entwickler: @preacherion",
            readyTitle: "Bereit zum Scannen",
            readyDesc: "Wir rufen deine Follower-Listen ab.",
            startScan: "Scan Starten",
            scanningFollowers: "Scanne Follower...",
            scanningFollowing: "Scanne Gefolgte...",
            found: "Gefunden: ",
            cancel: "Abbrechen",
            search: "Suchen...",
            colAll: "Alle",
            colUnf: "Entf",
            colRem: "Entf",
            noUsers: "Keine Benutzer.",
            youFollow: "Du folgst",
            notFollowing: "Folgst nicht",
            followsYou: "Folgt dir",
            notFollower: "Folgt nicht",
            tasks: "Aufgaben",
            unfollow: "Entfolgen",
            remove: "Entfernen",
            executeActions: "Ausführen",
            processing: "Verarbeite...",
            waiting: "Warte (Anti-Ban)...",
            stop: "Stoppen",
            completed: "Abgeschlossen",
            successful: "Erfolgreich",
            failed: "Fehlgeschlagen",
            backToResults: "Zurück",
            settings: "Einstellungen",
            language: "Sprache",
            glassBlur: "Unschärfe (px)",
            glassOpacity: "Deckkraft (%)",
            speed: "Geschwindigkeit",
            speedFast: "Schnell",
            speedNormal: "Normal",
            speedSlow: "Langsam",
            saveSettings: "Speichern",
            close: "Schließen",
            apiError: "API Fehler: ",
            loginError: "Bitte einloggen.",
            csrfError: "CSRF fehlt.",
            notifUnfollowed: "✅ Entfolgt",
            notifRemoved: "✅ Entfernt",
            notifSkipped: "⚠️ Übersprungen",
            downloadReport: "Bericht",
            scanGhosts: "Geister werden gescannt...",
            scanPost: "Beitrag wird gescannt",
            scanFailed: "Scan fehlgeschlagen",
            colUser: "Benutzer",
            tipAll: "Beide Aktionen auswählen",
            tipUnf: "Entfolgen",
            tipRem: "Aus Followern entfernen",
            ghost: "Geist",
            protectVerifiedLabel: "Verifizierte schützen",
            findGhostsLabel: "Geister-Follower finden",
            loadMore: "Mehr laden",
            tabAll: "Alle",
            tabNonFollowers: "Nicht-Follower",
            tabGhosts: "Geister",
            tabMutual: "Gegenseitig",
            tabFans: "Fans",
            statsScanned: "Gescannt",
            eta: "Verbleibend: ",
            secs: "s"
        },
        fr: {
            title: "Prelowers",
            subtitle: "Gestionnaire d'abonnés",
            devCredits: "Développeur: @preacherion",
            readyTitle: "Prêt à scanner",
            readyDesc: "Nous allons récupérer vos listes.",
            startScan: "Démarrer",
            scanningFollowers: "Scan abonnés...",
            scanningFollowing: "Scan abonnements...",
            found: "Trouvé: ",
            cancel: "Annuler",
            search: "Chercher...",
            colAll: "Tous",
            colUnf: "Désab",
            colRem: "Suppr",
            noUsers: "Aucun utilisateur.",
            youFollow: "Abonné",
            notFollowing: "Pas abonné",
            followsYou: "Vous suit",
            notFollower: "Ne suit pas",
            tasks: "Tâches",
            unfollow: "Se désabonner",
            remove: "Supprimer",
            executeActions: "Exécuter",
            processing: "Traitement...",
            waiting: "Attente (Anti-Ban)...",
            stop: "Arrêter",
            completed: "Terminé",
            successful: "Succès",
            failed: "Échec",
            backToResults: "Retour",
            settings: "Paramètres",
            language: "Langue",
            glassBlur: "Flou (px)",
            glassOpacity: "Opacité (%)",
            speed: "Vitesse",
            speedFast: "Rapide",
            speedNormal: "Normal",
            speedSlow: "Lent",
            saveSettings: "Enregistrer",
            close: "Fermer",
            apiError: "Erreur API: ",
            loginError: "Veuillez vous connecter.",
            csrfError: "CSRF manquant.",
            notifUnfollowed: "✅ Désabonné",
            notifRemoved: "✅ Supprimé",
            notifSkipped: "⚠️ Ignoré",
            downloadReport: "Rapport",
            scanGhosts: "Analyse des fantômes...",
            scanPost: "Analyse de la publication",
            scanFailed: "Échec de l'analyse",
            colUser: "Utilisateur",
            tipAll: "Sélectionner les deux actions",
            tipUnf: "Se désabonner",
            tipRem: "Supprimer de vos abonnés",
            ghost: "Fantôme",
            protectVerifiedLabel: "Protéger les vérifiés",
            findGhostsLabel: "Trouver les abonnés fantômes",
            loadMore: "Charger plus",
            tabAll: "Tous",
            tabNonFollowers: "Non-abonnés",
            tabGhosts: "Fantômes",
            tabMutual: "Mutuel",
            tabFans: "Fans",
            statsScanned: "Analysé",
            eta: "Temps rest: ",
            secs: "s"
        }
    };

    function loadSettings() {
        let injected = {};
        if (typeof window.PRELOWERS_INJECTED_SETTINGS !== 'undefined') {
            injected = window.PRELOWERS_INJECTED_SETTINGS;
        }
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                return { ...parsed, ...injected };
            }
        } catch (e) {}
        const defaultLang = navigator.language.startsWith('tr') ? 'tr' : 'en';
        return {
            lang: injected.lang || defaultLang,
            blur: 20,
            opacity: 75,
            speed: injected.speed || 'normal',
            protectVerified: injected.protectVerified !== undefined ? injected.protectVerified : true
        };
    }

    const state = {
        mode: "idle", // idle | scanning | results | executing | done | settings
        usersMap: new Map(), // id -> User Object
        selectedUnfollow: new Set(),
        selectedRemove: new Set(),
        progress: {
            label: "",
            current: 0,
            total: 0,
            eta: 0,
            startTime: null
        },
        logs: [],
        scanCancelled: false,
        execCancelled: false,
        searchQuery: "",
        filterTab: "all",
        displayLimit: 100,
        settings: loadSettings()
    };

    function saveSettings() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.settings));
        applyTheme();
    }

    function t(key) {
        const langDict = I18N[state.settings.lang] || I18N['en'];
        return langDict[key] || key;
    }
    function getCookie(name) {
        const match = document.cookie.match(new RegExp("(^|; )" + name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "=([^;]*)"));
        return match ? decodeURIComponent(match[2]) : null;
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, Math.max(0, ms)));
    }

    function randomBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getDelay() {
        const baseMin = 4000;
        const baseMax = 8000;
        if (state.settings.speed === 'fast') return randomBetween(2000, 4000);
        if (state.settings.speed === 'slow') return randomBetween(8000, 14000);
        return randomBetween(baseMin, baseMax);
    }

    function getOrAddUser(node) {
        const id = String(node.id || node.pk || node.pk_id || "");
        if (!state.usersMap.has(id)) {
            state.usersMap.set(id, {
                id,
                username: String(node.username || ""),
                full_name: String(node.full_name || ""),
                profile_pic_url: String(node.profile_pic_url || node.profile_pic_url_hd || ""),
                is_following_viewer: false,
                is_followed_by_viewer: false,
                is_verified: Boolean(node.is_verified)
            });
        }
        return state.usersMap.get(id);
    }
    async function igFetch(url, init = {}) {
        let attempt = 0;
        while (attempt < 3) {
            let response;
            try {
                response = await fetch(url, {
                    credentials: "include",
                    headers: { ...IG_HEADERS, ...(init.headers || {}) },
                    ...init
                });
            } catch (networkErr) {
                await sleep(5000);
                try {
                    response = await fetch(url, {
                        credentials: "include",
                        headers: { ...IG_HEADERS, ...(init.headers || {}) },
                        ...init
                    });
                } catch (retryErr) {
                    throw new Error("Network error: " + retryErr.message);
                }
            }
            if (response.ok) return response.json();
            if (response.status === 429) {
                await sleep(5000 * Math.pow(2, attempt)); // Backoff
                attempt++;
                continue;
            }
            throw new Error(`Request failed: ${response.status}`);
        }
        throw new Error("Too many requests.");
    }

    async function unfollowUser(id, csrf) {
        const headers = { "content-type": "application/x-www-form-urlencoded", "x-csrftoken": csrf };
        let response = await fetch(`/api/v1/friendships/destroy/${id}/`, {
            method: "POST", credentials: "include", headers: { ...IG_HEADERS, ...headers }
        });
        if (response.ok) return true;
        response = await fetch(`/web/friendships/${id}/unfollow/`, {
            method: "POST", credentials: "include", headers: { ...IG_HEADERS, ...headers }
        });
        return response.ok;
    }

    async function removeFollower(id, csrf) {
        const headers = { "content-type": "application/x-www-form-urlencoded", "x-csrftoken": csrf };
        let response = await fetch(`/api/v1/friendships/remove_follower/${id}/`, {
            method: "POST", credentials: "include", headers: { ...IG_HEADERS, ...headers }
        });
        return response.ok;
    }
    
    async function fetchConnection(viewerId, type) {
        let cursor = "";

        while (true) {
            if (state.scanCancelled) break;

            let url = `/api/v1/friendships/${viewerId}/${type}/?count=20`;
            if (cursor) {
                url += `&max_id=${encodeURIComponent(cursor)}`;
            }

            const json = await igFetch(url);

            if (!json || !json.users) {
                throw new Error(t("apiError") + JSON.stringify(json).substring(0, 200));
            }

            for (const node of json.users) {
                const user = getOrAddUser(node);
                if (type === 'following') {
                    user.is_followed_by_viewer = true;
                } else {
                    user.is_following_viewer = true;
                }
            }

            state.progress.current = state.usersMap.size;
            if (json.users && json.users.length > 0) {
                state.progress.lastUser = json.users[json.users.length - 1].username;
            }
            if (state.progress.total > 0 && state.progress.startTime) {
                const elapsed = (Date.now() - state.progress.startTime) / 1000;
                const rate = state.progress.current / elapsed;
                if (rate > 0) {
                    const remaining = Math.max(0, state.progress.total - state.progress.current);
                    state.progress.eta = Math.round(remaining / rate);
                }
            }
            renderBody(); // Update UI

            cursor = json.next_max_id || "";
            if (!cursor) break;
            await sleep(randomBetween(1000, 2000)); // Anti rate-limit
        }
    }

    async function startScan() {
        state.scanCancelled = false;
        state.usersMap.clear();
        state.selectedUnfollow.clear();
        state.selectedRemove.clear();
        state.searchQuery = '';
        state.progress.lastUser = '';
        state.logs = [];
        state.displayLimit = 100;
        state.mode = "scanning";

        try {
            const viewerId = getCookie("ds_user_id");
            if (!viewerId) throw new Error(t("loginError"));

            state.progress.label = t("scanningFollowing");
            try {
                const userInfo = await igFetch(`/api/v1/users/${viewerId}/info/`);
                if (userInfo && userInfo.user) {
                    state.progress.total = userInfo.user.following_count + userInfo.user.follower_count;
                }
            } catch (e) {
                state.progress.total = 0;
            }
            state.progress.startTime = Date.now();
            renderBody();
            await fetchConnection(viewerId, 'following');

            if (state.scanCancelled) {
                state.mode = "idle";
                renderBody();
                return;
            }

            state.progress.label = t("scanningFollowers");
            renderBody();
            await fetchConnection(viewerId, 'followers');

            if (!state.scanCancelled && state.settings.findGhosts) {
                await scanGhosts(viewerId);
            }

            if (!state.scanCancelled) {
                state.mode = "results";
                renderBody();
            }
        } catch (err) {
            alert(t('scanFailed') + ': ' + err.message);
            state.mode = "idle";
            renderBody();
        }
    }

    async function scanGhosts(viewerId) {
        state.progress.label = t('scanGhosts');
        renderBody();
        try {
            const feedUrl = `/api/v1/feed/user/${viewerId}/?count=3`;
            const feedJson = await igFetch(feedUrl);
            const items = feedJson.items || [];
            const likersSet = new Set();
            
            for (let i = 0; i < Math.min(items.length, 3); i++) {
                if (state.scanCancelled) break;
                const mediaId = items[i].id;
                state.progress.label = t('scanPost') + ' ' + (i + 1) + '...';
                renderBody();
                
                try {
                    const likersJson = await igFetch(`/api/v1/media/${mediaId}/likers/`);
                    const users = likersJson.users || [];
                    users.forEach(u => likersSet.add(String(u.pk || u.pk_id || u.id)));
                } catch(e) {}
                await sleep(randomBetween(1500, 3000));
            }
            
            for (const [id, user] of state.usersMap.entries()) {
                if (user.is_following_viewer && !likersSet.has(id)) {
                    user.is_ghost = true;
                }
            }
        } catch (err) {
            console.log("Ghost scan failed", err);
        }
    }

    async function executeActions() {
        if (state.selectedUnfollow.size === 0 && state.selectedRemove.size === 0) return;

        const csrf = getCookie("csrftoken");
        if (!csrf) {
            alert(t("csrfError"));
            return;
        }

        state.mode = "executing";
        state.execCancelled = false;
        state.logs = [];
        const tasks = [];
        state.selectedUnfollow.forEach(id => tasks.push({ id, type: 'unfollow' }));
        state.selectedRemove.forEach(id => tasks.push({ id, type: 'remove_follower' }));

        state.progress.total = tasks.length;
        state.progress.current = 0;
        renderBody();

        for (const task of tasks) {
            if (state.execCancelled) break;

            const user = state.usersMap.get(task.id);
            if (!user) continue;
            const actionText = task.type === 'unfollow' ? t("unfollow") : t("remove");
            state.progress.label = `Processing @${user.username} (${actionText})...`;
            renderBody();

            let ok = false;
            try {
                if (task.type === 'unfollow') {
                    if (state.settings.protectVerified && user.is_verified) {
                        showNotification(user, t("notifSkipped"), "warning");
                        continue;
                    }
                    ok = await unfollowUser(task.id, csrf);
                    if (ok) {
                        user.is_followed_by_viewer = false;
                        state.selectedUnfollow.delete(task.id);
                        showNotification(user, t("notifUnfollowed"), "success");
                    }
                } else if (task.type === 'remove_follower') {
                    ok = await removeFollower(task.id, csrf);
                    if (ok) {
                        user.is_following_viewer = false;
                        state.selectedRemove.delete(task.id);
                        showNotification(user, t("notifRemoved"), "success");
                    }
                }
            } catch (err) {
                console.error("Action failed:", err);
            }

            state.logs.push({ task, user, ok });
            state.progress.current++;
            renderBody();

            if (state.progress.current < tasks.length && !state.execCancelled) {
                await sleep(getDelay());
            }
        }

        state.mode = "done";
        renderBody();
    }
    function applyTheme() {
        const root = document.getElementById(APP_ID);
        if (!root) return;
        const opacity = state.settings.opacity / 100;
        root.style.setProperty('--bg-panel', `rgba(18, 18, 20, ${opacity})`);
        root.style.setProperty('--glass-blur', `${state.settings.blur}px`);
        const titleEl = root.querySelector('.ig-adv-title strong');
        const devEl = root.querySelector('.ig-adv-title span');
        if (titleEl) titleEl.textContent = t("title");
        if (devEl) {
            devEl.innerHTML = `<a href="/preacherion/" target="_blank" style="color:inherit; text-decoration:none;">${t("devCredits")}</a>`;
        }
    }

    function mount() {
        document.getElementById(APP_ID)?.remove();
        document.getElementById(STYLE_ID)?.remove();

        const style = document.createElement("style");
        style.id = STYLE_ID;
        style.textContent = CSS;
        document.head.appendChild(style);

        const root = document.createElement("div");
        root.id = APP_ID;
        document.body.appendChild(root);
        
        renderShell(root);
        initNotifications();
        applyTheme();
    }

    function renderShell(root) {
        root.innerHTML = `
            <div class="ig-adv-panel" id="ig-adv-panel">
                <div class="ig-adv-header" id="ig-adv-header">
                    <div class="ig-adv-brand">
                        <div class="ig-adv-logo"></div>
                        <div class="ig-adv-title">
                            <strong>${t("title")}</strong>
                            <span><a href="/preacherion/" target="_blank" style="color:inherit; text-decoration:none;">${t("devCredits")}</a></span>
                        </div>
                    </div>
                    <div>
                        <button class="ig-adv-icon-btn" id="ig-adv-settings" title="${t("settings")}">⚙️</button>
                        <button class="ig-adv-icon-btn" id="ig-adv-close" title="${t("close")}">✕</button>
                    </div>
                </div>
                <div class="ig-adv-body" id="ig-adv-body"></div>
            </div>
        `;

        document.getElementById("ig-adv-close").addEventListener("click", () => {
            root.remove();
            document.getElementById(STYLE_ID)?.remove();
        });

        document.getElementById("ig-adv-settings").addEventListener("click", () => {
            if (state.mode !== "settings") {
                state.prevMode = state.mode;
                state.mode = "settings";
                renderBody();
            } else {
                state.mode = state.prevMode || "idle";
                renderBody();
            }
        });

        makeDraggable(document.getElementById("ig-adv-panel"), document.getElementById("ig-adv-header"));
        renderBody();
    }

    function renderBody() {
        const body = document.getElementById("ig-adv-body");
        if (!body) return;

        if (state.mode === "idle") body.innerHTML = viewIdle();
        else if (state.mode === "scanning") body.innerHTML = viewScanning();
        else if (state.mode === "results") body.innerHTML = viewResults();
        else if (state.mode === "executing") body.innerHTML = viewExecuting();
        else if (state.mode === "done") body.innerHTML = viewDone();
        else if (state.mode === "settings") body.innerHTML = viewSettings();

        bindEvents();
    }
    function updateSelectionDOM() {
        const totalUnfollow = state.selectedUnfollow.size;
        const totalRemove = state.selectedRemove.size;

        const taskInfo = document.getElementById("ig-adv-task-info");
        if (taskInfo) {
            taskInfo.innerHTML = `${t("tasks")}: <span style="color: var(--accent);">${totalUnfollow} ${t("unfollow")}</span>, <span style="color: var(--danger);">${totalRemove} ${t("remove")}</span>`;
        }

        const execBtn = document.getElementById("btn-execute");
        if (execBtn) {
            execBtn.disabled = (totalUnfollow === 0 && totalRemove === 0);
        }
    }
    function viewIdle() {
        return `
            <div class="ig-adv-center">
                <div class="ig-adv-icon-large">✨</div>
                <h2 style="margin-bottom: 8px;">${t("readyTitle")}</h2>
                <p style="color: var(--txt-muted); margin-bottom: 24px; text-align: center;">
                    ${t("readyDesc")}
                </p>
                <button class="ig-adv-btn primary large" id="btn-start-scan">${t("startScan")}</button>
            </div>
        `;
    }

    function viewScanning() {
        const percent = state.progress.total ? Math.round((state.progress.current / state.progress.total) * 100) : 0;
        const lastUserHtml = state.progress.lastUser ? `<p style="font-size: 11px; color: var(--accent); margin-top: 8px;">@${state.progress.lastUser}...</p>` : '';
        const etaHtml = state.progress.eta > 0 ? `<span style="margin-left: 10px; color: var(--accent);">${t("eta")}${state.progress.eta}${t("secs")}</span>` : '';
        return `
            <div class="ig-adv-center" style="padding-top: 40px;">
                <h3 style="margin-bottom: 8px; font-size: 14px; text-align: center;">${state.progress.label}</h3>
                <div class="ig-adv-progress-bar">
                    <div class="ig-adv-progress-fill" style="width: ${state.progress.total ? percent : 100}%; ${!state.progress.total ? 'animation: ig-pulse 1.5s infinite;' : ''}"></div>
                </div>
                <p style="color: var(--txt-muted); margin-top: 12px;">${t("found")}${state.progress.current} / ${state.progress.total || '?'} ${etaHtml}</p>
                ${lastUserHtml}
                <button class="ig-adv-btn ghost" id="btn-cancel-scan" style="margin-top: 24px;">${t("cancel")}</button>
            </div>
        `;
    }

    function viewResults() {
        let totalUsers = state.usersMap.size;
        let ghosts = 0;
        let notFollowingBack = 0;
        Array.from(state.usersMap.values()).forEach(u => {
            if(u.is_ghost) ghosts++;
            if(u.is_followed_by_viewer && !u.is_following_viewer) notFollowingBack++;
        });

        const query = state.searchQuery.toLowerCase();
        let displayUsers = Array.from(state.usersMap.values()).filter(u => {
            if (state.filterTab === 'nonfollowers' && !(u.is_followed_by_viewer && !u.is_following_viewer)) return false;
            if (state.filterTab === 'ghosts' && !u.is_ghost) return false;
            if (state.filterTab === 'mutual' && !(u.is_followed_by_viewer && u.is_following_viewer)) return false;
            if (state.filterTab === 'fans' && !(u.is_following_viewer && !u.is_followed_by_viewer)) return false;
            return u.username.toLowerCase().includes(query) || u.full_name.toLowerCase().includes(query);
        });

        displayUsers.sort((a, b) => {
            if (a.is_followed_by_viewer && !a.is_following_viewer && !(b.is_followed_by_viewer && !b.is_following_viewer)) return -1;
            if (!(a.is_followed_by_viewer && !a.is_following_viewer) && b.is_followed_by_viewer && !b.is_following_viewer) return 1;
            return a.username.localeCompare(b.username);
        });

        const totalFiltered = displayUsers.length;
        const limit = state.displayLimit || 100;
        const visibleUsers = displayUsers.slice(0, limit);
        const hasMore = totalFiltered > limit;

        const totalUnfollow = state.selectedUnfollow.size;
        const totalRemove = state.selectedRemove.size;

        return `
            <div class="ig-adv-dashboard" style="display: flex; gap: 8px; padding: 12px 16px; background: rgba(0,0,0,0.15); border-bottom: 1px solid var(--border-color);">
                <div style="flex:1; text-align:center; padding: 8px; background: rgba(255,255,255,0.05); border-radius: 8px;">
                    <div style="font-size: 11px; color: var(--txt-muted);">${t("statsScanned")}</div>
                    <div style="font-size: 16px; font-weight: bold; color: #fff;">${totalUsers}</div>
                </div>
                <div style="flex:1; text-align:center; padding: 8px; background: rgba(239,68,68,0.1); border-radius: 8px;">
                    <div style="font-size: 11px; color: #f87171;">${t("tabGhosts")}</div>
                    <div style="font-size: 16px; font-weight: bold; color: #ef4444;">${ghosts}</div>
                </div>
                <div style="flex:1; text-align:center; padding: 8px; background: rgba(255,255,255,0.05); border-radius: 8px;">
                    <div style="font-size: 11px; color: var(--txt-muted);">${t("tabNonFollowers")}</div>
                    <div style="font-size: 16px; font-weight: bold; color: #fff;">${notFollowingBack}</div>
                </div>
            </div>

            <div class="ig-adv-tabs" style="display: flex; gap: 4px; padding: 8px 16px; border-bottom: 1px solid var(--border-color); overflow-x: auto; scrollbar-width: none;">
                <button class="ig-adv-tab ${state.filterTab === 'all' ? 'active' : ''}" data-tab="all">${t('tabAll')}</button>
                <button class="ig-adv-tab ${state.filterTab === 'nonfollowers' ? 'active' : ''}" data-tab="nonfollowers">${t('tabNonFollowers')}</button>
                <button class="ig-adv-tab ${state.filterTab === 'ghosts' ? 'active' : ''}" data-tab="ghosts">${t('tabGhosts')}</button>
                <button class="ig-adv-tab ${state.filterTab === 'mutual' ? 'active' : ''}" data-tab="mutual">${t('tabMutual')}</button>
                <button class="ig-adv-tab ${state.filterTab === 'fans' ? 'active' : ''}" data-tab="fans">${t('tabFans')}</button>
            </div>

            <div class="ig-adv-results-header">
                <input type="text" class="ig-adv-search" id="ig-adv-search" placeholder="${t("search")}" value="${state.searchQuery}" />
            </div>

            <div class="ig-adv-list-header">
                <div style="flex:1">${t("colUser")}</div>
                <div class="ig-adv-cols">
                    <div class="col-title" title="${t('tipAll')}">
                        <input type="checkbox" id="cb-header-all" style="width: 14px; height: 14px; accent-color: var(--accent);" />
                    </div>
                    <div class="col-title" title="${t('tipUnf')}">
                        <input type="checkbox" id="cb-header-unf" style="width: 14px; height: 14px; accent-color: var(--accent);" />
                    </div>
                    <div class="col-title" title="${t('tipRem')}">
                        <input type="checkbox" id="cb-header-rem" style="width: 14px; height: 14px; accent-color: var(--accent);" />
                    </div>
                </div>
            </div>

            <div class="ig-adv-list">
                ${visibleUsers.length === 0 ? `<div class="ig-adv-center" style="padding: 20px; color: var(--txt-muted);">${t("noUsers")}</div>` : ''}
                ${visibleUsers.map(u => {
                    const canUnfollow = u.is_followed_by_viewer;
                    const canRemove = u.is_following_viewer;

                    const isUnfChecked = state.selectedUnfollow.has(u.id);
                    const isRemChecked = state.selectedRemove.has(u.id);
                    let masterChecked = false;
                    if (canUnfollow && canRemove) masterChecked = isUnfChecked && isRemChecked;
                    else if (canUnfollow) masterChecked = isUnfChecked;
                    else if (canRemove) masterChecked = isRemChecked;

                    return `
                    <div class="ig-adv-row">
                        <img class="ig-adv-avatar" src="${u.profile_pic_url}" loading="lazy" onerror="this.style.visibility='hidden'" />
                        <div class="ig-adv-user-info">
                            <a href="/${u.username}/" target="_blank" class="ig-adv-username">@${u.username}</a>
                            <div class="ig-adv-tags">
                                ${u.is_followed_by_viewer ? `<span class="ig-adv-tag blue">${t("youFollow")}</span>` : `<span class="ig-adv-tag gray">${t("notFollowing")}</span>`}
                                ${u.is_following_viewer ? `<span class="ig-adv-tag green">${t("followsYou")}</span>` : `<span class="ig-adv-tag red">${t("notFollower")}</span>`}
                                ${u.is_ghost ? `<span class="ig-adv-tag danger" style="background: rgba(239,68,68,0.2); color: #ef4444;">${t('ghost')}</span>` : ''}
                            </div>
                        </div>
                        <div class="ig-adv-cols">
                            <input type="checkbox" class="cb-master" data-id="${u.id}" ${masterChecked ? 'checked' : ''} />
                            <input type="checkbox" class="cb-unfollow" data-id="${u.id}" ${!canUnfollow ? 'disabled' : ''} ${isUnfChecked ? 'checked' : ''} />
                            <input type="checkbox" class="cb-remove" data-id="${u.id}" ${!canRemove ? 'disabled' : ''} ${isRemChecked ? 'checked' : ''} />
                        </div>
                    </div>
                    `;
                }).join('')}
                ${hasMore ? `<div style="text-align: center; padding: 12px;"><button class="ig-adv-btn ghost" id="btn-load-more">${t('loadMore')}</button></div>` : ''}
            </div>

            <div class="ig-adv-footer" style="justify-content: space-between; gap: 10px;">
                <div id="ig-adv-task-info" style="font-size: 12px; color: var(--txt-muted);">
                    ${t("tasks")}: <span style="color: var(--accent);">${totalUnfollow} ${t("unfollow")}</span>, <span style="color: var(--danger);">${totalRemove} ${t("remove")}</span>
                </div>
                <div style="display: flex; gap: 10px;">
                    <button class="ig-adv-btn" id="btn-dl-report" style="background:#3b82f6; color:#fff; border:none;">${t("downloadReport")}</button>
                    <button class="ig-adv-btn primary" id="btn-execute" ${(totalUnfollow === 0 && totalRemove === 0) ? 'disabled' : ''}>
                        ${t("executeActions")}
                    </button>
                </div>
            </div>
        `;
    }

    function viewExecuting() {
        const percent = state.progress.total ? Math.round((state.progress.current / state.progress.total) * 100) : 0;
        return `
            <div class="ig-adv-center" style="padding-top: 40px;">
                <h3 style="margin-bottom: 8px;">${t("processing")}</h3>
                <div class="ig-adv-progress-bar">
                    <div class="ig-adv-progress-fill" style="width: ${percent}%"></div>
                </div>
                <p style="color: var(--txt-muted); margin-top: 12px; font-size: 13px;">${state.progress.label}</p>
                <p style="color: var(--txt-muted); margin-top: 4px; font-size: 12px;">${t("waiting")}</p>
                <button class="ig-adv-btn ghost danger" id="btn-cancel-exec" style="margin-top: 24px;">${t("stop")}</button>
            </div>
        `;
    }

    function viewDone() {
        const success = state.logs.filter(l => l.ok).length;
        const fail = state.logs.filter(l => !l.ok).length;
        return `
            <div class="ig-adv-done-header">
                <div class="ig-adv-icon-large" style="background: rgba(34, 197, 94, 0.15); color: #22c55e; width: 48px; height: 48px; font-size: 24px; margin-bottom: 8px;">✔</div>
                <h3 style="margin-bottom: 4px;">${t("completed")}</h3>
                <p style="color: var(--txt-muted); font-size: 13px;">
                    ${t("successful")}: <span style="color: #4ade80;">${success}</span> | ${t("failed")}: <span style="color: #f87171;">${fail}</span>
                </p>
            </div>
            <div class="ig-adv-list" style="border-top: none;">
                ${state.logs.map(log => {
                    return `
                        <div class="ig-adv-row" style="grid-template-columns: 36px 1fr auto;">
                            <img class="ig-adv-avatar" src="${log.user.profile_pic_url}" loading="lazy" onerror="this.style.visibility='hidden'" />
                            <div class="ig-adv-user-info">
                                <a href="/${log.user.username}/" target="_blank" class="ig-adv-username">@${log.user.username}</a>
                                <div style="font-size: 11px; color: var(--txt-muted);">${log.task.type === 'unfollow' ? t("unfollow") : t("remove")}</div>
                            </div>
                            <div>
                                ${log.ok ? '<span style="color: #4ade80;">✔</span>' : '<span style="color: #f87171;">✖</span>'}
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
            <div class="ig-adv-footer" style="justify-content: center; gap: 10px;">
                <button class="ig-adv-btn primary" id="btn-back-results">${t("backToResults")}</button>
                <button class="ig-adv-btn" id="btn-dl-report" style="background:#3b82f6; color:#fff; border:none;">${t("downloadReport")}</button>
            </div>
        `;
    }

    function viewSettings() {
        return `
            <div style="padding: 20px; overflow-y: auto; flex: 1;">
                <h3 style="margin-bottom: 20px;">${t("settings")}</h3>

                <div class="ig-adv-setting-group">
                    <label>${t("language")}</label>
                    <select id="set-lang" class="ig-adv-input">
                        <option value="tr" ${state.settings.lang === 'tr' ? 'selected' : ''}>Türkçe</option>
                        <option value="en" ${state.settings.lang === 'en' ? 'selected' : ''}>English</option>
                        <option value="es" ${state.settings.lang === 'es' ? 'selected' : ''}>Español</option>
                        <option value="de" ${state.settings.lang === 'de' ? 'selected' : ''}>Deutsch</option>
                        <option value="fr" ${state.settings.lang === 'fr' ? 'selected' : ''}>Français</option>
                    </select>
                </div>

                <div class="ig-adv-setting-group">
                    <label>${t("glassBlur")}: <span id="val-blur">${state.settings.blur}</span></label>
                    <input type="range" id="set-blur" min="0" max="40" value="${state.settings.blur}" class="ig-adv-range" />
                </div>

                <div class="ig-adv-setting-group">
                    <label>${t("glassOpacity")}: <span id="val-opacity">${state.settings.opacity}</span></label>
                    <input type="range" id="set-opacity" min="40" max="100" value="${state.settings.opacity}" class="ig-adv-range" />
                </div>

                <div class="ig-adv-setting-group">
                    <label>${t("speed")}</label>
                    <select id="set-speed" class="ig-adv-input">
                        <option value="fast" ${state.settings.speed === 'fast' ? 'selected' : ''}>${t("speedFast")}</option>
                        <option value="normal" ${state.settings.speed === 'normal' ? 'selected' : ''}>${t("speedNormal")}</option>
                        <option value="slow" ${state.settings.speed === 'slow' ? 'selected' : ''}>${t("speedSlow")}</option>
                    </select>
                </div>

                <div class="ig-adv-setting-group">
                    <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                        <input type="checkbox" id="set-ghosts" ${state.settings.findGhosts ? 'checked' : ''} style="width:18px;height:18px;accent-color:var(--accent);" />
                        ${t('findGhostsLabel')}
                    </label>
                </div>

                <div class="ig-adv-setting-group">
                    <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                        <input type="checkbox" id="set-protect" ${state.settings.protectVerified ? 'checked' : ''} style="width:18px;height:18px;accent-color:var(--accent);" />
                        ${t('protectVerifiedLabel')}
                    </label>
                </div>

                <button class="ig-adv-btn primary" id="btn-save-settings" style="width: 100%; margin-top: 20px;">${t("saveSettings")}</button>
            </div>
        `;
    }
    function bindEvents() {
        document.getElementById("btn-start-scan")?.addEventListener("click", startScan);
        document.getElementById("btn-cancel-scan")?.addEventListener("click", () => { state.scanCancelled = true; });
        document.getElementById("btn-cancel-exec")?.addEventListener("click", () => { state.execCancelled = true; });
        document.getElementById("btn-execute")?.addEventListener("click", executeActions);
        document.getElementById("btn-back-results")?.addEventListener("click", () => {
            state.mode = "results";
            renderBody();
        });
        document.getElementById("btn-dl-report")?.addEventListener("click", generateHTMLReport);
        document.getElementById("btn-load-more")?.addEventListener("click", () => {
            state.displayLimit = (state.displayLimit || 100) + 100;
            renderBody();
        });
        const saveBtn = document.getElementById("btn-save-settings");
        if (saveBtn) {
            document.getElementById("set-blur")?.addEventListener("input", (e) => {
                document.getElementById("val-blur").textContent = e.target.value;
                state.settings.blur = parseInt(e.target.value);
                applyTheme();
            });
            document.getElementById("set-opacity")?.addEventListener("input", (e) => {
                document.getElementById("val-opacity").textContent = e.target.value;
                state.settings.opacity = parseInt(e.target.value);
                applyTheme();
            });
            saveBtn.addEventListener("click", () => {
                state.settings.lang = document.getElementById("set-lang").value;
                state.settings.speed = document.getElementById("set-speed").value;
                state.settings.findGhosts = document.getElementById('set-ghosts')?.checked || false;
                state.settings.protectVerified = document.getElementById('set-protect')?.checked || false;
                saveSettings();
                state.mode = state.prevMode || "idle";
                renderBody();
            });
        }

        const searchInput = document.getElementById("ig-adv-search");
        if (searchInput) {
            let searchDebounceTimer = null;
            searchInput.addEventListener("input", (e) => {
                state.searchQuery = e.target.value;
                state.displayLimit = 100;
                if (searchDebounceTimer) clearTimeout(searchDebounceTimer);
                searchDebounceTimer = setTimeout(() => renderBody(), 250);
            });
            searchInput.focus();
            const val = searchInput.value;
            searchInput.value = '';
            searchInput.value = val;
        }

        document.querySelectorAll(".ig-adv-tab").forEach(tab => {
            tab.addEventListener("click", (e) => {
                state.filterTab = e.target.getAttribute("data-tab");
                state.displayLimit = 100;
                renderBody();
            });
        });

        const listHeader = document.querySelector(".ig-adv-list-header");
        if (listHeader) {
            listHeader.addEventListener("change", (e) => {
                const target = e.target;
                if (target.tagName !== "INPUT" || target.type !== "checkbox") return;
                
                const isChecked = target.checked;
                const rows = document.querySelectorAll(".ig-adv-list .ig-adv-row");
                
                rows.forEach(row => {
                    const cbMaster = row.querySelector(".cb-master");
                    const cbUnf = row.querySelector(".cb-unfollow");
                    const cbRem = row.querySelector(".cb-remove");
                    
                    if (target.id === "cb-header-all") {
                        if (cbMaster && !cbMaster.disabled) { cbMaster.checked = isChecked; cbMaster.dispatchEvent(new Event('change', {bubbles:true})); }
                    } else if (target.id === "cb-header-unf") {
                        if (cbUnf && !cbUnf.disabled) { cbUnf.checked = isChecked; cbUnf.dispatchEvent(new Event('change', {bubbles:true})); }
                    } else if (target.id === "cb-header-rem") {
                        if (cbRem && !cbRem.disabled) { cbRem.checked = isChecked; cbRem.dispatchEvent(new Event('change', {bubbles:true})); }
                    }
                });
            });
        }

        const list = document.querySelector(".ig-adv-list");
        if (list) {
            list.addEventListener("change", (e) => {
                const target = e.target;
                if (target.tagName !== "INPUT" || target.type !== "checkbox") return;

                const id = target.getAttribute("data-id");
                const user = state.usersMap.get(id);

                if (target.classList.contains("cb-master")) {
                    const check = target.checked;
                    if (user.is_followed_by_viewer) {
                        if (check) state.selectedUnfollow.add(id); else state.selectedUnfollow.delete(id);
                        const row = target.closest('.ig-adv-row');
                        const cbUnf = row.querySelector('.cb-unfollow');
                        if(cbUnf && !cbUnf.disabled) cbUnf.checked = check;
                    }
                    if (user.is_following_viewer) {
                        if (check) state.selectedRemove.add(id); else state.selectedRemove.delete(id);
                        const row = target.closest('.ig-adv-row');
                        const cbRem = row.querySelector('.cb-remove');
                        if(cbRem && !cbRem.disabled) cbRem.checked = check;
                    }
                } else if (target.classList.contains("cb-unfollow")) {
                    if (target.checked) state.selectedUnfollow.add(id); else state.selectedUnfollow.delete(id);
                    const row = target.closest('.ig-adv-row');
                    const cbMaster = row.querySelector('.cb-master');
                    if(cbMaster) {
                        const canUnf = user.is_followed_by_viewer;
                        const canRem = user.is_following_viewer;
                        const isRemChecked = state.selectedRemove.has(id);
                        if (canUnf && canRem) cbMaster.checked = target.checked && isRemChecked;
                        else cbMaster.checked = target.checked;
                    }
                } else if (target.classList.contains("cb-remove")) {
                    if (target.checked) state.selectedRemove.add(id); else state.selectedRemove.delete(id);
                    const row = target.closest('.ig-adv-row');
                    const cbMaster = row.querySelector('.cb-master');
                    if(cbMaster) {
                        const canUnf = user.is_followed_by_viewer;
                        const canRem = user.is_following_viewer;
                        const isUnfChecked = state.selectedUnfollow.has(id);
                        if (canUnf && canRem) cbMaster.checked = target.checked && isUnfChecked;
                        else cbMaster.checked = target.checked;
                    }
                }
                updateSelectionDOM();
            });
        }
    }

    function makeDraggable(el, handle) {
        let isDragging = false;
        let startX, startY, initialX, initialY;

        handle.addEventListener("mousedown", dragStart);

        function dragStart(e) {
            if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
            initialX = el.offsetLeft;
            initialY = el.offsetTop;
            startX = e.clientX;
            startY = e.clientY;
            isDragging = true;
            document.addEventListener("mousemove", drag);
            document.addEventListener("mouseup", dragEnd);
        }

        function drag(e) {
            if (!isDragging) return;
            e.preventDefault();
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            el.style.left = initialX + dx + "px";
            el.style.top = initialY + dy + "px";
            el.style.right = 'auto';
            el.style.bottom = 'auto';
        }

        function dragEnd() {
            isDragging = false;
            document.removeEventListener("mousemove", drag);
            document.removeEventListener("mouseup", dragEnd);
        }
    }

    function initNotifications() {
        let container = document.getElementById("ig-adv-notif-container");
        if (!container) {
            container = document.createElement("div");
            container.id = "ig-adv-notif-container";
            document.getElementById("ig-adv-panel").appendChild(container);
        }
    }

    function showNotification(user, msg, type) {
        const container = document.getElementById("ig-adv-notif-container");
        if (!container) return;
        const notif = document.createElement("div");
        notif.className = `ig-adv-notif ig-adv-notif-${type}`;
        
        notif.innerHTML = `
            <img class="ig-adv-avatar" src="${user.profile_pic_url}" loading="lazy" onerror="this.style.visibility='hidden'" style="width: 32px; height: 32px; border-radius: 50%;" />
            <div class="ig-adv-user-info" style="display: flex; flex-direction: column; justify-content: center;">
                <span style="font-weight: 600; font-size: 13px; color: var(--txt-main);">@${user.username}</span>
                <span style="font-size: 11px; color: var(--txt-muted); margin-top: 2px;">${msg}</span>
            </div>
        `;

        container.appendChild(notif);
        
        setTimeout(() => notif.classList.add('show'), 10);
        
        setTimeout(() => {
            notif.classList.remove('show');
            setTimeout(() => notif.remove(), 300);
        }, 4000);
    }

    function generateHTMLReport() {
        let isActionReport = state.mode === 'done' && state.logs.length > 0;
        let totalUsers = state.usersMap.size;
        let ghosts = 0;
        let notFollowingBack = 0;
        let notFollower = 0;
        
        Array.from(state.usersMap.values()).forEach(u => {
            if(u.is_ghost) ghosts++;
            if(u.is_followed_by_viewer && !u.is_following_viewer) notFollowingBack++;
            if(u.is_following_viewer && !u.is_followed_by_viewer) notFollower++;
        });

        let html = `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Prelowers Premium Report</title>
    <style>
        body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; background: #0f0f13; color: #f3f4f6; padding: 40px; margin: 0; }
        .container { max-width: 900px; margin: 0 auto; }
        .header { text-align: center; margin-bottom: 40px; }
        .header h1 { background: linear-gradient(135deg, #60a5fa, #a855f7); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin:0 0 10px 0; font-size: 32px; }
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 40px; }
        .stat-card { background: rgba(255,255,255,0.05); padding: 20px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.1); text-align: center; }
        .stat-card h3 { margin: 0 0 10px 0; font-size: 14px; color: #9ca3af; }
        .stat-card .val { font-size: 36px; font-weight: 700; color: #fff; }
        .stat-card.ghost .val { color: #ef4444; }
        table { width: 100%; border-collapse: collapse; background: rgba(255,255,255,0.03); border-radius: 12px; overflow: hidden; }
        th, td { padding: 15px; text-align: left; border-bottom: 1px solid rgba(255,255,255,0.05); }
        th { background: rgba(0,0,0,0.3); color: #9ca3af; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; }
        tr:hover { background: rgba(255,255,255,0.05); }
        a { color: #60a5fa; text-decoration: none; font-weight: 500; }
        a:hover { text-decoration: underline; }
        .tag { font-size: 11px; padding: 4px 8px; border-radius: 6px; font-weight: 600; display: inline-block; margin-right: 4px; }
        .tag.ghost { background: rgba(239, 68, 68, 0.15); color: #ef4444; }
        .tag.success { background: rgba(34, 197, 94, 0.15); color: #4ade80; }
        .tag.fail { background: rgba(239, 68, 68, 0.15); color: #f87171; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Prelowers Report</h1>
            <p style="color: #9ca3af;">Generated on ${new Date().toLocaleString()}</p>
        </div>
        
        <div class="stats-grid">
            <div class="stat-card"><h3>Total Users Scanned</h3><div class="val">${totalUsers}</div></div>
            <div class="stat-card ghost"><h3>Ghost Followers</h3><div class="val">${ghosts}</div></div>
            <div class="stat-card"><h3>Not Following Back</h3><div class="val">${notFollowingBack}</div></div>
        </div>

        <h2 style="font-size: 18px; margin-bottom: 20px;">${isActionReport ? 'Action Logs' : 'Scan Results'}</h2>
        <table>
            <tr><th>User</th>${isActionReport ? '<th>Action</th><th>Status</th>' : '<th>Tags</th>'}</tr>`;

        if (isActionReport) {
            state.logs.forEach(log => {
                const action = log.task.type === 'unfollow' ? 'Unfollow' : 'Remove';
                const statusTag = log.ok ? '<span class="tag success">Success</span>' : '<span class="tag fail">Failed</span>';
                html += `<tr><td><a href="https://instagram.com/${log.user.username}" target="_blank">@${log.user.username}</a></td><td>${action}</td><td>${statusTag}</td></tr>`;
            });
        } else {
            Array.from(state.usersMap.values()).forEach(u => {
                let tags = [];
                if(u.is_ghost) tags.push('<span class="tag ghost">Ghost</span>');
                if(u.is_followed_by_viewer && !u.is_following_viewer) tags.push('<span class="tag" style="background:rgba(156,163,175,0.15); color:#9ca3af;">Not Following Back</span>');
                if(!tags.length) tags.push('<span class="tag" style="background:rgba(255,255,255,0.1); color:#fff;">Mutual / Safe</span>');
                html += `<tr><td><a href="https://instagram.com/${u.username}" target="_blank">@${u.username}</a></td><td>${tags.join(' ')}</td></tr>`;
            });
        }

        html += `
        </table>
    </div>
</body>
</html>`;

        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Prelowers_Report_${new Date().getTime()}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    const CSS = `
        #${APP_ID} {
            --bg-panel: rgba(18, 18, 20, 0.75);
            --bg-card: rgba(30, 30, 34, 0.6);
            --bg-hover: rgba(255, 255, 255, 0.05);
            --border-color: rgba(255, 255, 255, 0.12);
            --accent: #60a5fa;
            --accent-hover: #3b82f6;
            --danger: #ef4444;
            --danger-hover: #dc2626;
            --txt-main: #f3f4f6;
            --txt-muted: #9ca3af;
            --glass-blur: 20px;

            position: fixed;
            z-index: 999999;
            top: 0; left: 0;
            width: 0; height: 0;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            color: var(--txt-main);
            box-sizing: border-box;
        }

        #${APP_ID} * { box-sizing: border-box; }

        .ig-adv-panel {
            position: fixed;
            top: 20px;
            right: 20px;
            width: 420px;
            height: 600px;
            max-height: 90vh;
            display: flex;
            flex-direction: column;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            border-radius: 16px;
            overflow: hidden;
            background: var(--bg-panel);
            backdrop-filter: blur(var(--glass-blur));
            border: 1px solid var(--border-color);
        }

        #ig-adv-notif-container {
            position: absolute;
            bottom: 20px;
            left: 20px;
            right: 20px;
            z-index: 9999999;
            display: flex;
            flex-direction: column;
            gap: 8px;
            pointer-events: none;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }
        .ig-adv-notif {
            display: flex;
            align-items: center;
            gap: 12px;
            background: rgba(30, 30, 34, 0.95);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: #fff;
            padding: 10px 14px;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.5);
            transform: translateY(20px);
            opacity: 0;
            transition: all 0.3s ease;
            max-width: 100%;
        }
        .ig-adv-notif.show {
            transform: translateY(0);
            opacity: 1;
        }
        .ig-adv-notif-success { border-left: 4px solid #22c55e; }
        .ig-adv-notif-error { border-left: 4px solid #ef4444; }
        .ig-adv-notif-warning { border-left: 4px solid #eab308; }



        .ig-adv-header {
            padding: 16px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid var(--border-color);
            background: linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%);
            cursor: grab;
        }

        .ig-adv-header:active { cursor: grabbing; }

        .ig-adv-brand {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .ig-adv-logo {
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--accent), #a855f7);
            box-shadow: 0 0 10px rgba(96, 165, 250, 0.5);
        }

        .ig-adv-title strong { display: block; font-size: 15px; font-weight: 600; letter-spacing: 0.2px; }
        .ig-adv-title span { display: block; font-size: 11px; color: var(--txt-muted); margin-top: 2px; }
        .ig-adv-title span a:hover { color: var(--accent) !important; }

        .ig-adv-icon-btn {
            background: transparent; border: none; color: var(--txt-muted);
            font-size: 16px; cursor: pointer; padding: 4px; border-radius: 4px;
            transition: 0.2s; margin-left: 4px;
        }
        .ig-adv-icon-btn:hover { color: var(--txt-main); background: rgba(255,255,255,0.1); }

        .ig-adv-body {
            flex: 1;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            position: relative;
        }

        .ig-adv-center {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 30px 20px;
            height: 100%;
        }

        .ig-adv-icon-large {
            width: 64px; height: 64px;
            border-radius: 50%;
            background: rgba(96, 165, 250, 0.15);
            color: var(--accent);
            display: flex; align-items: center; justify-content: center;
            font-size: 32px;
            margin-bottom: 16px;
        }

        .ig-adv-btn {
            padding: 8px 16px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            border: none;
            cursor: pointer;
            transition: all 0.2s;
        }

        .ig-adv-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .ig-adv-btn.primary { background: var(--accent); color: #fff; box-shadow: 0 4px 12px rgba(96, 165, 250, 0.3); }
        .ig-adv-btn.primary:hover:not(:disabled) { background: var(--accent-hover); transform: translateY(-1px); }
        .ig-adv-btn.primary:active:not(:disabled) { transform: translateY(1px); }

        .ig-adv-btn.ghost { background: transparent; border: 1px solid var(--border-color); color: var(--txt-main); }
        .ig-adv-btn.ghost:hover { background: rgba(255,255,255,0.05); }
        .ig-adv-btn.ghost.danger:hover { background: rgba(239, 68, 68, 0.1); color: var(--danger); border-color: rgba(239, 68, 68, 0.3); }

        .ig-adv-progress-bar {
            width: 80%; height: 6px; border-radius: 3px;
            background: rgba(255,255,255,0.1); overflow: hidden;
        }
        .ig-adv-progress-fill {
            height: 100%; background: linear-gradient(90deg, var(--accent), #a855f7);
            transition: width 0.3s ease;
        }

        @keyframes ig-pulse {
            0% { opacity: 0.6; }
            50% { opacity: 1; }
            100% { opacity: 0.6; }
        }

        /* Results View */
        .ig-adv-results-header { padding: 12px 16px; border-bottom: 1px solid var(--border-color); }
        .ig-adv-search {
            width: 100%; padding: 10px 14px; border-radius: 8px;
            background: var(--bg-card); border: 1px solid var(--border-color);
            color: var(--txt-main); outline: none; font-size: 14px;
            transition: border-color 0.2s;
        }
        .ig-adv-search:focus { border-color: var(--accent); }

        .ig-adv-tab {
            padding: 6px 12px;
            border-radius: 12px;
            border: 1px solid var(--border-color);
            background: rgba(255,255,255,0.02);
            color: var(--txt-muted);
            font-size: 11px;
            font-weight: 600;
            cursor: pointer;
            white-space: nowrap;
            transition: all 0.2s;
        }
        .ig-adv-tab:hover { background: rgba(255,255,255,0.1); color: var(--txt-main); }
        .ig-adv-tab.active { background: var(--accent); color: #fff; border-color: var(--accent); }

        .ig-adv-list-header {
            display: flex; padding: 8px 16px; font-size: 11px;
            color: var(--txt-muted); text-transform: uppercase; font-weight: 600;
            border-bottom: 1px solid var(--border-color); background: rgba(0,0,0,0.2);
        }

        .ig-adv-cols { display: flex; gap: 12px; width: 120px; justify-content: space-between; align-items: center; }
        .col-title { width: 30px; text-align: center; }

        .ig-adv-list {
            flex: 1; overflow-y: auto; overflow-x: hidden;
            scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.2) transparent;
        }
        .ig-adv-list::-webkit-scrollbar { width: 6px; }
        .ig-adv-list::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 3px; }

        .ig-adv-row {
            display: grid; grid-template-columns: 36px 1fr 120px; align-items: center; gap: 12px;
            padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.04);
            transition: background 0.2s;
        }
        .ig-adv-row:hover { background: var(--bg-hover); }

        .ig-adv-avatar { width: 36px; height: 36px; border-radius: 50%; object-fit: cover; border: 1px solid rgba(255,255,255,0.1); }

        .ig-adv-user-info { min-width: 0; display: flex; flex-direction: column; gap: 4px; }
        .ig-adv-username { font-size: 14px; font-weight: 600; color: var(--txt-main); text-decoration: none; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .ig-adv-username:hover { text-decoration: underline; color: var(--accent); }

        .ig-adv-tags { display: flex; gap: 6px; flex-wrap: wrap; }
        .ig-adv-tag { font-size: 10px; padding: 2px 6px; border-radius: 4px; font-weight: 600; letter-spacing: 0.3px; white-space: nowrap; }
        .ig-adv-tag.green { background: rgba(34, 197, 94, 0.15); color: #4ade80; }
        .ig-adv-tag.red { background: rgba(239, 68, 68, 0.15); color: #f87171; }
        .ig-adv-tag.blue { background: rgba(56, 189, 248, 0.15); color: #38bdf8; }
        .ig-adv-tag.gray { background: rgba(156, 163, 175, 0.15); color: #9ca3af; }

        .ig-adv-row input[type="checkbox"] {
            width: 18px; height: 18px; cursor: pointer; accent-color: var(--accent);
            margin: 0;
        }
        .ig-adv-row input[type="checkbox"]:disabled { opacity: 0.3; cursor: not-allowed; }

        .ig-adv-footer {
            padding: 14px 16px; border-top: 1px solid var(--border-color);
            display: flex; justify-content: space-between; align-items: center;
            background: rgba(0,0,0,0.2);
        }

        .ig-adv-done-header {
            padding: 20px; display: flex; flex-direction: column; align-items: center;
            border-bottom: 1px solid var(--border-color); background: rgba(0,0,0,0.1);
        }

        .ig-adv-setting-group {
            margin-bottom: 16px;
        }
        .ig-adv-setting-group label {
            display: block; margin-bottom: 6px; font-size: 13px; color: var(--txt-muted); font-weight: 600;
        }
        .ig-adv-input {
            width: 100%; padding: 10px; border-radius: 8px; border: 1px solid var(--border-color);
            background: var(--bg-card); color: var(--txt-main); outline: none;
        }
        .ig-adv-range {
            width: 100%; accent-color: var(--accent);
        }
    `;
    mount();

})();
