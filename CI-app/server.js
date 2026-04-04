const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>OpenMusicStream</title>
            <style>
                :root {
                    --bg-body: #f4f4f4;
                    --bg-header: #ff5500;
                    --bg-container: white;
                    --text-heading: #333;
                    --text-muted: #777;
                    --bg-footer: #222;
                    --shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                }
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: var(--bg-body);
                    transition: background-color 0.3s ease;
                }
                header {
                    background-color: var(--bg-header);
                    color: white;
                    padding: 20px;
                    text-align: center;
                    position: relative;
                }
                .container {
                    max-width: 900px;
                    margin: 20px auto;
                    background: var(--bg-container);
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: var(--shadow);
                    transition: background-color 0.3s ease;
                }
                .banner {
                    width: 100%;
                    height: 200px;
                    background: url('/banner.jpg') center/cover no-repeat;
                }
                .content {
                    padding: 20px;
                }
                .song {
                    display: flex;
                    align-items: center;
                    margin-bottom: 20px;
                }
                .song img {
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    margin-right: 15px;
                }
                .song-info {
                    flex: 1;
                }
                .song-info h3 {
                    margin: 0 0 5px;
                    color: var(--text-heading);
                }
                .song-info p {
                    margin: 0;
                    color: var(--text-muted);
                }
                footer {
                    position: fixed;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    text-align: center;
                    padding: 6px 12px;
                    background-color: var(--bg-footer);
                    color: white;
                    font-size: 12px;
                    opacity: 0.75;
                }
                audio {
                    width: 100%;
                    margin-top: 10px;
                }
                html.dark {
                    --bg-body: #1a1a1a;
                    --bg-header: #c44a00;
                    --bg-container: #2d2d2d;
                    --text-heading: #e0e0e0;
                    --text-muted: #a0a0a0;
                    --bg-footer: #111;
                    --shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
                }
                .hadith-bar {
                    position: sticky;
                    top: 0;
                    z-index: 100;
                    background: linear-gradient(90deg, #1a5f2a, #0d3d1a);
                    color: #f5f5dc;
                    padding: 10px 14px;
                    text-align: center;
                    font-size: 15px;
                    line-height: 1.55;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
                    direction: rtl;
                    font-family: system-ui, "Segoe UI", Tahoma, Arial, sans-serif;
                }
                .hadith-bar .hadith-label {
                    display: inline-block;
                    margin-left: 8px;
                    font-weight: 700;
                    font-size: 13px;
                    opacity: 0.92;
                    vertical-align: middle;
                }
                .hadith-bar #hadithText {
                    vertical-align: middle;
                }
                .hadith-bar .hadith-meta {
                    font-size: 12px;
                    opacity: 0.88;
                    margin-top: 8px;
                    padding-top: 8px;
                    border-top: 1px solid rgba(255, 255, 255, 0.2);
                    color: rgba(245, 245, 220, 0.95);
                    line-height: 1.45;
                }
                html.dark .hadith-bar .hadith-meta {
                    border-top-color: rgba(255, 255, 255, 0.15);
                }
                html.dark .hadith-bar {
                    background: linear-gradient(90deg, #143d22, #0a2614);
                    color: #e8e8d8;
                }
            </style>
        </head>
        <body>
            <div class="hadith-bar" id="hadithBar" dir="rtl" role="status" aria-live="polite">
                <div>
                    <span class="hadith-label">حديث</span>
                    <span id="hadithText">…</span>
                </div>
                <div class="hadith-meta" id="hadithMeta"></div>
            </div>
            <header>
                <h1>your way to heaven - Manara project </h1>
                <div id="prayerTimer" style="
                    position:absolute;
                    top:15px;
                    left:15px;
                    padding:10px 16px;
                    border-radius:10px;
                    background:rgba(0,0,0,0.55);
                    color:white;
                    text-align:left;
                    min-width:220px;
                    box-shadow:0 4px 12px rgba(0,0,0,0.35);
                    backdrop-filter:blur(6px);
                    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                ">
                    <div style="font-size:14px; opacity:0.9; margin-bottom:4px;">الصلاة القادمة</div>
                    <div style="display:flex; align-items:baseline; justify-content:space-between; gap:10px;">
                        <span id="prayerName" style="font-weight:600; font-size:16px;">Loading...</span>
                        <span id="prayerCountdown" style="font-weight:700; font-size:18px; letter-spacing:1px;">--:--:--</span>
                    </div>
                </div>
                <button id="themeToggle" type="button" aria-label="Toggle dark mode" style="position:absolute; top:20px; right:20px; padding:8px 14px; border:none; border-radius:6px; background:rgba(255,255,255,0.25); color:white; cursor:pointer; font-size:14px;">
                    🌙 Dark
                </button>
            </header>
            <div class="container">
                <div class="banner"></div>
                <div class="content">
                    <div class="song">
                        <img src="/song1.jpg" alt="Song 1">
                        <div class="song-info">
                            <h3>Al-Sharh</h3>
                            <p>Al-Hosary</p>
                            <audio id="audio1" controls>
                                <source src="/music.mp3" type="audio/mpeg">
                                Your browser does not support the audio element.
                            </audio>
                        </div>
                    </div>
                    <div class="song">
                        <img src="/song2.jpg" alt="Song 2">
                        <div class="song-info">
                            <h3>Fatir</h3>
                            <p>Abdul Basit</p>
                            <audio id="audio2" controls>
                                <source src="/music2.mp3" type="audio/mpeg">
                                Your browser does not support the audio element.
                            </audio>
                        </div>
                    </div>
                </div>
            </div>
            <footer>
                <p>&copy; 2025 OpenMusicStream. All rights reserved.</p>
            </footer>
            <!-- Adhan for prayer times -->
            <audio id="adhanAudio" src="/adhan.mp3" preload="auto"></audio>
            <!-- Live Quran Radio (Egypt) -->
            <audio id="quranRadio" src="https://stream.radiojar.com/8s5u5tpdtwzuv" preload="none"></audio>
            <a
                id="radioGardenLink"
                href="https://www.holyquranradio.com/"
                target="_blank"
                rel="noopener noreferrer"
                style="
                    position: fixed;
                    right: 18px;
                    bottom: 128px;
                    padding: 6px 10px;
                    border-radius: 999px;
                    background: rgba(0,0,0,0.65);
                    color: #fff;
                    text-decoration: none;
                    font-size: 12px;
                    z-index: 20;
                "
                title="فتح إذاعة القرآن الكريم (المصدر)"
            >Source</a>
            <button
                id="radioToggle"
                type="button"
                aria-label="Toggle Quran Radio"
                style="
                    position: fixed;
                    right: 18px;
                    bottom: 70px;
                    width: 52px;
                    height: 52px;
                    border-radius: 50%;
                    border: none;
                    background: rgba(0,0,0,0.75);
                    color: #ffd35a;
                    box-shadow: 0 6px 14px rgba(0,0,0,0.45);
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 22px;
                    z-index: 20;
                ">
                📻
            </button>
            <div
                id="radioState"
                style="
                    position: fixed;
                    right: 18px;
                    bottom: 52px;
                    width: 52px;
                    text-align: center;
                    font-size: 11px;
                    color: rgba(255,255,255,0.9);
                    z-index: 20;
                    user-select: none;
                "
            >OFF</div>
            <script>
                // Store reference to the audio elements
                const audio1 = document.getElementById('audio1');
                const audio2 = document.getElementById('audio2');
                const quranRadio = document.getElementById('quranRadio');

                // Function to stop all audios except the currently playing one
                function stopOtherAudios(currentAudio) {
                    const audios = [audio1, audio2, quranRadio]; // Add more if you have more audio elements
                    audios.forEach(audio => {
                        if (audio !== currentAudio) {
                            audio.pause();
                            audio.currentTime = 0; // Reset the audio to the beginning
                        }
                    });
                }

                // Event listeners for when audio plays
                audio1.addEventListener('play', () => stopOtherAudios(audio1));
                audio2.addEventListener('play', () => stopOtherAudios(audio2));

                // Dark mode
                const html = document.documentElement;
                const themeBtn = document.getElementById('themeToggle');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (!localStorage.getItem('theme') && prefersDark) {
                    localStorage.setItem('theme', 'dark');
                }
                const saved = localStorage.getItem('theme');
                if (saved === 'dark') {
                    html.classList.add('dark');
                    themeBtn.textContent = '☀️ Light';
                } else {
                    html.classList.remove('dark');
                    themeBtn.textContent = '🌙 Dark';
                }
                themeBtn.addEventListener('click', () => {
                    html.classList.toggle('dark');
                    const isDark = html.classList.contains('dark');
                    localStorage.setItem('theme', isDark ? 'dark' : 'light');
                    themeBtn.textContent = isDark ? '☀️ Light' : '🌙 Dark';
                });

                // Quran Radio toggle
                const radioToggle = document.getElementById('radioToggle');
                const radioState = document.getElementById('radioState');
                const radioGardenLink = document.getElementById('radioGardenLink');
                let radioPlaying = false;

                function updateRadioButton() {
                    radioToggle.style.background = radioPlaying
                        ? 'rgba(0, 120, 0, 0.85)'
                        : 'rgba(0, 0, 0, 0.75)';
                    radioToggle.style.color = radioPlaying ? '#ffffff' : '#ffd35a';
                    radioToggle.title = radioPlaying ? 'إيقاف إذاعة القرآن الكريم' : 'تشغيل إذاعة القرآن الكريم';
                    if (radioState) {
                        radioState.textContent = radioPlaying ? 'ON' : 'OFF';
                    }
                }

                radioToggle.addEventListener('click', () => {
                    if (!quranRadio) return;
                    if (radioPlaying) {
                        quranRadio.pause();
                        radioPlaying = false;
                    } else {
                        stopOtherAudios(quranRadio);
                        quranRadio.play().then(() => {
                            radioPlaying = true;
                        }).catch(() => {
                            // بعض المتصفحات قد تمنع التشغيل، أو قد يكون الرابط غير مدعوم
                            radioPlaying = false;
                            // كبديل: افتح Radio Garden في تبويب جديد
                            if (radioGardenLink) {
                                window.open(radioGardenLink.href, '_blank', 'noopener,noreferrer');
                            }
                        });
                    }
                    updateRadioButton();
                });

                if (radioToggle) {
                    updateRadioButton();
                }

                // -------- أحاديث قصيرة + الراوي والمصدر: تتبدّل كل ساعة ونصف (90 دقيقة) --------
                const HADITH_INTERVAL_MS = 90 * 60 * 1000;
                const HADITHS = [
                    { text: "إنما الأعمال بالنيات، وإنما لكل امرئ ما نوى.", narrator: "عن عمر بن الخطاب رضي الله عنه", source: "متفق عليه" },
                    { text: "من حسن إسلام المرء تركه ما لا يعنيه.", narrator: "عن أبي هريرة رضي الله عنه", source: "متفق عليه" },
                    { text: "لا يؤمن أحدكم حتى يحب لأخيه ما يحب لنفسه.", narrator: "عن أنس بن مالك رضي الله عنه", source: "متفق عليه" },
                    { text: "من كان يؤمن بالله واليوم الآخر فليقل خيراً أو ليصمت.", narrator: "عن أبي هريرة رضي الله عنه", source: "متفق عليه" },
                    { text: "الطهور شطر الإيمان.", narrator: "عن أبي هريرة رضي الله عنه", source: "متفق عليه" },
                    { text: "لا ضرر ولا ضرار.", narrator: "عن ابن عباس رضي الله عنهما", source: "رواه ابن ماجه" },
                    { text: "المسلم من سلم المسلمون من لسانه ويده.", narrator: "عن أبي موسى الأشعري رضي الله عنه", source: "متفق عليه" },
                    { text: "تبسّمك في وجه أخيك صدقة.", narrator: "عن أبي ذر الغفاري رضي الله عنه", source: "رواه الترمذي وحسّنه" },
                    { text: "إن الله جميل يحب الجمال.", narrator: "عن عبد الله بن مسعود رضي الله عنه", source: "رواه مسلم" },
                    { text: "البر حسن الخلق.", narrator: "عن جابر بن عبد الله رضي الله عنهما", source: "رواه مسلم" },
                    { text: "اتقوا الله حيثما كنتم.", narrator: "عن أبي ذر رضي الله عنه", source: "متفق عليه" },
                    { text: "أحب الناس إلى الله أنفعهم للناس.", narrator: "عن جابر بن عبد الله رضي الله عنهما", source: "رواه الطبراني بإسناد حسن" },
                    { text: "من غشنا فليس منا.", narrator: "عن أبي هريرة رضي الله عنه", source: "متفق عليه" },
                    { text: "يسّروا ولا تعسّروا، وبشّروا ولا تنفّروا.", narrator: "عن معاذ بن جبل رضي الله عنه", source: "رواه مسلم" },
                    { text: "النظافة من الإيمان.", narrator: "عن أبي هريرة رضي الله عنه", source: "رواه مسلم" },
                    { text: "من لا يشكر الناس لا يشكر الله.", narrator: "عن أبي سعيد الخدري رضي الله عنه", source: "رواه الترمذي وصححه" },
                    { text: "خيركم من تعلّم القرآن وعلّمه.", narrator: "عن عثمان بن عفان رضي الله عنه", source: "متفق عليه" },
                    { text: "إنما بعثت لأتمّم مكارم الأخلاق.", narrator: "عن أبي هريرة رضي الله عنه", source: "رواه أحمد وبإسناد صحيح" },
                    { text: "الكلمة الطيبة صدقة.", narrator: "عن أبي هريرة رضي الله عنه", source: "متفق عليه" },
                    { text: "الراحمون يرحمهم الرحمن.", narrator: "عن أبي هريرة رضي الله عنه", source: "متفق عليه" },
                    { text: "اتقوا النار ولو بشق تمرة.", narrator: "عن أبي هريرة رضي الله عنه", source: "متفق عليه" },
                    { text: "احفظ الله يحفظك.", narrator: "عن أبي هريرة رضي الله عنه", source: "رواه الترمذي وحسّنه" },
                    { text: "المؤمن للمؤمن كالبنيان يشدّ بعضه بعضاً.", narrator: "عن أبي موسى وأبي هريرة رضي الله عنهما", source: "متفق عليه" },
                    { text: "تاب الله على من تاب.", narrator: "عن أبي مسعود البدري رضي الله عنه", source: "متفق عليه" },
                    { text: "إن الصدقة لتطفئ عن الصاحب حرّ وجهه يوم القيامة.", narrator: "عن أبي هريرة رضي الله عنه", source: "رواه مسلم" },
                    { text: "من صام رمضان إيماناً واحتساباً غُفر له ما تقدّم من ذنبه.", narrator: "عن أبي هريرة رضي الله عنه", source: "متفق عليه" },
                    { text: "الحجّ المبرور ليس له جزاء إلا الجنة.", narrator: "عن أبي هريرة رضي الله عنه", source: "متفق عليه" },
                    { text: "اتق الله تجده أمامك.", narrator: "عن أبي هريرة رضي الله عنه", source: "رواه الترمذي وحسّنه" },
                    { text: "من يرد الله به خيراً يصبره.", narrator: "عن أنس بن مالك رضي الله عنه", source: "متفق عليه" },
                    { text: "لا تزال طائفة من أمتي ظاهرة على الحق.", narrator: "عن أبي هريرة رضي الله عنه", source: "متفق عليه" },
                    { text: "من سلك طريقاً يلتمس فيه علماً سهّل الله له به طريقاً إلى الجنة.", narrator: "عن أبي هريرة رضي الله عنه", source: "متفق عليه" },
                    { text: "لا تغضب.", narrator: "عن أبي هريرة رضي الله عنه", source: "متفق عليه" },
                    { text: "من صبر ظفر.", narrator: "عن أبي هريرة رضي الله عنه", source: "رواه الطبراني والبيهقي" },
                    { text: "إنك لن تدع شيئاً لله إلا أبدلك الله خيراً منه.", narrator: "عن أبي هريرة رضي الله عنه", source: "متفق عليه" },
                    { text: "البخيل من ذكرني عنده فلم يصلّ علي.", narrator: "عن أبي هريرة رضي الله عنه", source: "متفق عليه" },
                    { text: "رضا الرب في رضا الوالد.", narrator: "عن عبد الله بن عمرو رضي الله عنهما", source: "رواه الترمذي وحسّنه" },
                    { text: "من أحب لقاء الله أحب الله لقاءه.", narrator: "عن أبي هريرة رضي الله عنه", source: "متفق عليه" },
                    { text: "الدعاء هو العبادة.", narrator: "عن أبي هريرة رضي الله عنه", source: "متفق عليه" },
                    { text: "اليد العليا خير من اليد السفلى.", narrator: "عن عبد الله بن عمر رضي الله عنهما", source: "متفق عليه" },
                    { text: "إنما الأعمال بالخواتيم.", narrator: "عن أبي هريرة رضي الله عنه", source: "متفق عليه" },
                    { text: "من قرأ حرفاً من كتاب الله فله به حسنة.", narrator: "عن أبي هريرة رضي الله عنه", source: "متفق عليه" },
                    { text: "إذا مات ابن آدم انقطع عمله إلا من ثلاث.", narrator: "عن أبي هريرة رضي الله عنه", source: "متفق عليه" },
                    { text: "من كظم غيظه وهو قادر على أن ينفّذه ملأ الله قلبه أماناً.", narrator: "عن أبي هريرة رضي الله عنه", source: "رواه مسلم" },
                    { text: "من حمى مسلماً حماه الله يوم القيامة.", narrator: "عن أبي هريرة رضي الله عنه", source: "متفق عليه" },
                    { text: "الحياء من الإيمان.", narrator: "عن أبي هريرة رضي الله عنه", source: "متفق عليه" },
                    { text: "من صلّى عليّ صلاة واحدة صلّى الله عليه عشراً.", narrator: "عن أبي هريرة رضي الله عنه", source: "رواه مسلم" },
                    { text: "الدين النصيحة.", narrator: "عن تميم الداري رضي الله عنه", source: "متفق عليه" },
                    { text: "المؤمن القوي خير وأحب إلى الله من المؤمن الضعيف.", narrator: "عن أبي هريرة رضي الله عنه", source: "متفق عليه" },
                    { text: "من لا يرحم لا يُرحم.", narrator: "عن أبي هريرة رضي الله عنه", source: "متفق عليه" },
                    { text: "أحبّ الأعمال إلى الله أدومها وإن قلّ.", narrator: "عن عائشة رضي الله عنها", source: "متفق عليه" }
                ];
                const hadithTextEl = document.getElementById("hadithText");
                const hadithMetaEl = document.getElementById("hadithMeta");
                let lastHadithSlot = -1;
                function hadithSlotIndex() {
                    return Math.floor(Date.now() / HADITH_INTERVAL_MS) % HADITHS.length;
                }
                function updateHadithIfNeeded() {
                    if (!hadithTextEl) return;
                    const slot = hadithSlotIndex();
                    if (slot !== lastHadithSlot) {
                        lastHadithSlot = slot;
                        const h = HADITHS[slot];
                        hadithTextEl.textContent = h.text;
                        if (hadithMetaEl) {
                            hadithMetaEl.textContent = h.narrator + " — " + h.source;
                        }
                    }
                }
                updateHadithIfNeeded();
                setInterval(updateHadithIfNeeded, 60 * 1000);
                document.addEventListener("visibilitychange", () => {
                    if (document.visibilityState === "visible") updateHadithIfNeeded();
                });

                // -------- Prayer countdown (Cairo) --------
                const prayerNameEl = document.getElementById('prayerName');
                const prayerCountdownEl = document.getElementById('prayerCountdown');
                const adhanAudio = document.getElementById('adhanAudio');

                // Default fallback (لو الـ API فشل)
                const defaultPrayerSchedule = [
                    { key: 'fajr',    name: 'الفجر',  time: '04:00' },
                    { key: 'dhuhr',   name: 'الظهر',  time: '12:00' },
                    { key: 'asr',     name: 'العصر',  time: '15:30' },
                    { key: 'maghrib', name: 'المغرب', time: '18:10' },
                    { key: 'isha',    name: 'العشاء', time: '19:30' }
                ];

                let prayerSchedule = [...defaultPrayerSchedule];
                let lastPlayedKey = null;

                const CAIRO_TZ = 'Africa/Cairo';
                const cairoFormatter = new Intl.DateTimeFormat('en-US', {
                    timeZone: CAIRO_TZ,
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false
                });

                function getCairoParts(date = new Date()) {
                    const parts = cairoFormatter.formatToParts(date);
                    const map = {};
                    for (const p of parts) {
                        if (p.type !== 'literal') map[p.type] = p.value;
                    }
                    return {
                        year: Number(map.year),
                        month: Number(map.month),
                        day: Number(map.day),
                        hour: Number(map.hour),
                        minute: Number(map.minute),
                        second: Number(map.second)
                    };
                }

                // "Wall clock" Cairo time as UTC timestamp (independent from browser TZ)
                function getCairoNowMs() {
                    const p = getCairoParts();
                    return Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second);
                }

                function parseHHMM(timeStr) {
                    const [h, m] = timeStr.split(':').map(Number);
                    return { h, m };
                }

                function getPrayerMsForDay(baseParts, timeStr, dayOffset = 0) {
                    const { h, m } = parseHHMM(timeStr);
                    return Date.UTC(
                        baseParts.year,
                        baseParts.month - 1,
                        baseParts.day + dayOffset,
                        h,
                        m,
                        0
                    );
                }

                function getNextPrayer() {
                    const nowMs = getCairoNowMs();
                    const baseParts = getCairoParts();

                    for (const p of prayerSchedule) {
                        const tMs = getPrayerMsForDay(baseParts, p.time, 0);
                        if (tMs > nowMs) return { ...p, ms: tMs };
                    }
                    // بعد العشاء → أول صلاة بكرة
                    const first = prayerSchedule[0];
                    return { ...first, ms: getPrayerMsForDay(baseParts, first.time, 1) };
                }

                function formatDiff(ms) {
                    if (ms < 0) ms = 0;
                    const totalSec = Math.floor(ms / 1000);
                    const h = String(Math.floor(totalSec / 3600)).padStart(2, '0');
                    const m = String(Math.floor((totalSec % 3600) / 60)).padStart(2, '0');
                    const s = String(totalSec % 60).padStart(2, '0');
                    return h + ':' + m + ':' + s;
                }

                function normalizeApiTime(t) {
                    // API sometimes returns "HH:MM (EET)" or "HH:MM"
                    if (!t) return null;
                    const hhmm = String(t).trim().slice(0, 5);
                    return /^\d{2}:\d{2}$/.test(hhmm) ? hhmm : null;
                }

                async function loadCairoPrayerTimes() {
                    try {
                        const parts = getCairoParts();
                        const y = String(parts.year);
                        const m = String(parts.month).padStart(2, '0');
                        const d = String(parts.day).padStart(2, '0');
                        const cacheKey = 'cairo_prayer_times_' + y + '-' + m + '-' + d;


                        const cached = localStorage.getItem(cacheKey);
                        if (cached) {
                            const parsed = JSON.parse(cached);
                            if (Array.isArray(parsed) && parsed.length >= 5) {
                                prayerSchedule = parsed;
                                return;
                            }
                        }

                        // AlAdhan timingsByCity (Cairo, Egypt)
                        const url = 'https://api.aladhan.com/v1/timingsByCity?city=Cairo&country=Egypt&method=5';
                        const res = await fetch(url, { cache: 'no-store' });
                        if (!res.ok) throw new Error('timings fetch failed: ' + res.status);
                        const json = await res.json();
                        const t = json?.data?.timings;
                        if (!t) throw new Error('timings missing');

                        const fajr = normalizeApiTime(t.Fajr);
                        const dhuhr = normalizeApiTime(t.Dhuhr);
                        const asr = normalizeApiTime(t.Asr);
                        const maghrib = normalizeApiTime(t.Maghrib);
                        const isha = normalizeApiTime(t.Isha);

                        if (!fajr || !dhuhr || !asr || !maghrib || !isha) {
                            throw new Error('invalid timings format');
                        }

                        prayerSchedule = [
                            { key: 'fajr',    name: 'الفجر',  time: fajr },
                            { key: 'dhuhr',   name: 'الظهر',  time: dhuhr },
                            { key: 'asr',     name: 'العصر',  time: asr },
                            { key: 'maghrib', name: 'المغرب', time: maghrib },
                            { key: 'isha',    name: 'العشاء', time: isha }
                        ];

                        localStorage.setItem(cacheKey, JSON.stringify(prayerSchedule));
                    } catch (e) {
                        // fallback to defaultPrayerSchedule
                        console.warn('Using fallback prayer times:', e);
                        prayerSchedule = [...defaultPrayerSchedule];
                    }
                }

                function startPrayerTimer() {
                    const updateTimer = () => {
                        try {
                            const nowMs = getCairoNowMs();
                            const next = getNextPrayer();
                            if (prayerNameEl) prayerNameEl.textContent = next.name;
                            const diff = next.ms - nowMs;
                            if (prayerCountdownEl) prayerCountdownEl.textContent = formatDiff(diff);

                            // شغّل الأذان مرة واحدة عند دخول وقت الصلاة
                            if (diff <= 0 && lastPlayedKey !== next.key) {
                                if (adhanAudio) {
                                    adhanAudio.currentTime = 0;
                                    adhanAudio.play().catch(() => {});
                                }
                                lastPlayedKey = next.key;
                            }
                            // حضّر لصلاة جديدة لما نعدّي الوقت بفرق كبير
                            if (diff > 60 * 1000) {
                                lastPlayedKey = null;
                            }
                        } catch (e) {
                            console.error('Prayer timer error:', e);
                            if (prayerNameEl) prayerNameEl.textContent = 'خطأ';
                            if (prayerCountdownEl) prayerCountdownEl.textContent = '--:--:--';
                        }
                    };

                    updateTimer();
                    setInterval(updateTimer, 1000);
                }

                // Load official Cairo timings then start timer
                loadCairoPrayerTimes().finally(() => {
                    startPrayerTimer();
                });
            </script>
        </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
