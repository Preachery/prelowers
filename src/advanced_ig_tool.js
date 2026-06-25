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
            csrfError: "CSRF Token missing."
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
            csrfError: "CSRF Token eksik."
        }
    };

    function loadSettings() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) return JSON.parse(stored);
        } catch (e) {}
        return {
            lang: navigator.language.startsWith('tr') ? 'tr' : 'en',
            blur: 20,
            opacity: 75,
            speed: 'normal' // fast, normal, slow
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
            total: 0
        },
        logs: [],
        scanCancelled: false,
        execCancelled: false,
        searchQuery: "",
        panelPos: null,
        settings: loadSettings()
    };

    function saveSettings() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.settings));
        applyTheme();
    }

    function t(key) {
        return I18N[state.settings.lang][key] || key;
    }

    // --- Helpers ---
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
        // speed setting multiplier
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

    // --- API Calls ---
    async function igFetch(url, init = {}) {
        let attempt = 0;
        while (attempt < 3) {
            const response = await fetch(url, {
                credentials: "include",
                headers: { ...IG_HEADERS, ...(init.headers || {}) },
                ...init
            });
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
        // Fallback
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

    // --- Core Logic ---
    async function fetchConnection(viewerId, type) {
        let cursor = "";
        
        while (true) {
            if (state.scanCancelled) break;
            
            let url = `/api/v1/friendships/${viewerId}/${type}/?count=24`;
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
            state.progress.total = 0; // REST API does not provide a total count
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
        state.mode = "scanning";
        
        try {
            const viewerId = getCookie("ds_user_id");
            if (!viewerId) throw new Error(t("loginError"));

            state.progress.label = t("scanningFollowing");
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

            if (!state.scanCancelled) {
                state.mode = "results";
                renderBody();
            }
        } catch (err) {
            alert("Scan failed: " + err.message);
            state.mode = "idle";
            renderBody();
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
        
        // Compile task list
        const tasks = [];
        state.selectedUnfollow.forEach(id => tasks.push({ id, type: 'unfollow' }));
        state.selectedRemove.forEach(id => tasks.push({ id, type: 'remove_follower' }));

        state.progress.total = tasks.length;
        state.progress.current = 0;
        renderBody();

        for (const task of tasks) {
            if (state.execCancelled) break;

            const user = state.usersMap.get(task.id);
            const actionText = task.type === 'unfollow' ? t("unfollow") : t("remove");
            state.progress.label = `Processing @${user.username} (${actionText})...`;
            renderBody();

            let ok = false;
            try {
                if (task.type === 'unfollow') {
                    ok = await unfollowUser(task.id, csrf);
                    if (ok) {
                        user.is_followed_by_viewer = false;
                        state.selectedUnfollow.delete(task.id);
                    }
                } else if (task.type === 'remove_follower') {
                    ok = await removeFollower(task.id, csrf);
                    if (ok) {
                        user.is_following_viewer = false;
                        state.selectedRemove.delete(task.id);
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

    // --- UI Rendering ---
    function applyTheme() {
        const root = document.getElementById(APP_ID);
        if (!root) return;
        const opacity = state.settings.opacity / 100;
        root.style.setProperty('--bg-panel', `rgba(18, 18, 20, ${opacity})`);
        root.style.setProperty('--glass-blur', `${state.settings.blur}px`);
        
        // Update header texts that might have changed language
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

    // --- Dynamic DOM Updates ---
    function updateSelectionDOM() {
        // Instead of re-rendering, just update the footer to prevent scrolling issues
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

    // --- Views ---
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
        return `
            <div class="ig-adv-center" style="padding-top: 40px;">
                <h3 style="margin-bottom: 8px; font-size: 14px; text-align: center;">${state.progress.label}</h3>
                <div class="ig-adv-progress-bar">
                    <div class="ig-adv-progress-fill" style="width: ${state.progress.total ? percent : 100}%; ${!state.progress.total ? 'animation: ig-pulse 1.5s infinite;' : ''}"></div>
                </div>
                <p style="color: var(--txt-muted); margin-top: 12px;">${t("found")}${state.progress.current}</p>
                <button class="ig-adv-btn ghost" id="btn-cancel-scan" style="margin-top: 24px;">${t("cancel")}</button>
            </div>
        `;
    }

    function viewResults() {
        const query = state.searchQuery.toLowerCase();
        let displayUsers = Array.from(state.usersMap.values()).filter(u => {
            return u.username.toLowerCase().includes(query) || u.full_name.toLowerCase().includes(query);
        });

        // Sorting: non-followers first
        displayUsers.sort((a, b) => {
            if (a.is_followed_by_viewer && !a.is_following_viewer && !(b.is_followed_by_viewer && !b.is_following_viewer)) return -1;
            if (!(a.is_followed_by_viewer && !a.is_following_viewer) && b.is_followed_by_viewer && !b.is_following_viewer) return 1;
            return a.username.localeCompare(b.username);
        });

        const totalUnfollow = state.selectedUnfollow.size;
        const totalRemove = state.selectedRemove.size;

        return `
            <div class="ig-adv-results-header">
                <input type="text" class="ig-adv-search" id="ig-adv-search" placeholder="${t("search")}" value="${state.searchQuery}" />
            </div>
            
            <div class="ig-adv-list-header">
                <div style="flex:1">User</div>
                <div class="ig-adv-cols">
                    <div class="col-title" title="Select both actions">${t("colAll")}</div>
                    <div class="col-title" title="Unfollow them">${t("colUnf")}</div>
                    <div class="col-title" title="Remove from your followers">${t("colRem")}</div>
                </div>
            </div>

            <div class="ig-adv-list">
                ${displayUsers.length === 0 ? `<div class="ig-adv-center" style="padding: 20px; color: var(--txt-muted);">${t("noUsers")}</div>` : ''}
                ${displayUsers.map(u => {
                    const canUnfollow = u.is_followed_by_viewer;
                    const canRemove = u.is_following_viewer;
                    
                    const isUnfChecked = state.selectedUnfollow.has(u.id);
                    const isRemChecked = state.selectedRemove.has(u.id);
                    
                    // Master is checked if all POSSIBLE actions are checked
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
            </div>

            <div class="ig-adv-footer">
                <div id="ig-adv-task-info" style="font-size: 12px; color: var(--txt-muted);">
                    ${t("tasks")}: <span style="color: var(--accent);">${totalUnfollow} ${t("unfollow")}</span>, <span style="color: var(--danger);">${totalRemove} ${t("remove")}</span>
                </div>
                <button class="ig-adv-btn primary" id="btn-execute" ${(totalUnfollow === 0 && totalRemove === 0) ? 'disabled' : ''}>
                    ${t("executeActions")}
                </button>
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
            <div class="ig-adv-footer" style="justify-content: center;">
                <button class="ig-adv-btn primary" id="btn-back-results">${t("backToResults")}</button>
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

                <button class="ig-adv-btn primary" id="btn-save-settings" style="width: 100%; margin-top: 20px;">${t("saveSettings")}</button>
            </div>
        `;
    }

    // --- Events ---
    function bindEvents() {
        document.getElementById("btn-start-scan")?.addEventListener("click", startScan);
        document.getElementById("btn-cancel-scan")?.addEventListener("click", () => { state.scanCancelled = true; });
        document.getElementById("btn-cancel-exec")?.addEventListener("click", () => { state.execCancelled = true; });
        document.getElementById("btn-execute")?.addEventListener("click", executeActions);
        document.getElementById("btn-back-results")?.addEventListener("click", () => {
            state.mode = "results";
            renderBody();
        });

        // Settings View Events
        const saveBtn = document.getElementById("btn-save-settings");
        if (saveBtn) {
            document.getElementById("set-blur")?.addEventListener("input", (e) => {
                document.getElementById("val-blur").textContent = e.target.value;
                state.settings.blur = e.target.value;
                applyTheme();
            });
            document.getElementById("set-opacity")?.addEventListener("input", (e) => {
                document.getElementById("val-opacity").textContent = e.target.value;
                state.settings.opacity = e.target.value;
                applyTheme();
            });
            saveBtn.addEventListener("click", () => {
                state.settings.lang = document.getElementById("set-lang").value;
                state.settings.speed = document.getElementById("set-speed").value;
                saveSettings();
                state.mode = state.prevMode || "idle";
                renderBody();
            });
        }

        const searchInput = document.getElementById("ig-adv-search");
        if (searchInput) {
            searchInput.addEventListener("input", (e) => {
                state.searchQuery = e.target.value;
                renderBody();
            });
            // Refocus search if it was focused before re-render
            searchInput.focus();
            const val = searchInput.value;
            searchInput.value = '';
            searchInput.value = val;
        }

        // Checkbox Delegation
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
                    // Update master checkbox visually if needed
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
                    // Update master checkbox visually if needed
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

                // FIX: Update DOM directly instead of full re-render
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

    // --- CSS ---
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
            background: var(--bg-panel);
            backdrop-filter: blur(var(--glass-blur));
            -webkit-backdrop-filter: blur(var(--glass-blur));
            border: 1px solid var(--border-color);
            border-radius: 16px;
            box-shadow: 0 16px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1);
            overflow: hidden;
            animation: ig-slide-in 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            transition: background 0.3s, backdrop-filter 0.3s;
        }

        @keyframes ig-slide-in {
            from { opacity: 0; transform: translateY(20px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }

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

    // Init
    mount();

})();
