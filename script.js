const CHARS = {
    upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lower: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
};

const slider = document.getElementById('length-slider');
const display = document.getElementById('length-display');
const output = document.getElementById('password-output');
const genBtn = document.getElementById('generate-btn');
const copyIcon = document.getElementById('copy-icon-btn');
const copySvg = document.getElementById('copy-svg');
const toast = document.getElementById('toast');

const COPY_SVG = `<rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />`;
const CHECK_SVG = `<polyline points="20 6 9 17 4 12" />`;
const segs = [1, 2, 3, 4].map(i => document.getElementById('seg'+i));
const strengthLabel = document.getElementById('strength-label');

const checks = {
    upper: document.getElementById('chk-upper'),
    lower: document.getElementById('chk-lower'),
    numbers: document.getElementById('chk-numbers'),
    symbols: document.getElementById('chk-symbols')
};
const opts = {
    upper: document.getElementById('opt-upper'),
    lower: document.getElementById('opt-lower'),
    numbers: document.getElementById('opt-numbers'),
    symbols: document.getElementById('opt-symbols')
};

let currentPassword = '';
let scrambleInterval = null;

// Length slider
slider.addEventListener('input', () => {
    display.textContent = slider.value;
    updateSliderFill();
});

function updateSliderFill() {
    const pct = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
    slider.style.background = `linear-gradient(to right, var(--accent) ${pct}%, var(--border) ${pct}%)`;
}
updateSliderFill();

// Option toggles
Object.keys(checks).forEach(key => {
    const lbl = opts[key];
    lbl.addEventListener('click', () => {
        // prevent at least one option
        const active = Object.values(checks).filter(c => c.checked);
        if (checks[key].checked && active.length === 1) return;
        checks[key].checked = !checks[key].checked;
        lbl.classList.toggle('active', checks[key].checked);
    });
});

function buildCharset() {
    let charset = '';
    Object.keys(checks).forEach(k => {
        if (checks[k].checked) charset += CHARS[k];
    });
    return charset;
}

function generatePassword() {
    const len = parseInt(slider.value);
    const charset = buildCharset();
    if (!charset) return '';

    // Guarantee at least one from each active group
    let pwd = [];
    Object.keys(checks).forEach(k => {
        if (checks[k].checked) pwd.push(CHARS[k][Math.floor(Math.random() * CHARS[k].length)]);
    });
    while (pwd.length < len) {
        pwd.push(charset[Math.floor(Math.random() * charset.length)]);
    }
    // Fisher-Yates shuffle
    for (let i = pwd.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pwd[i],
            pwd[j]] = [pwd[j],
            pwd[i]];
    }
    return pwd.join('');
}

function calcStrength(pwd) {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (pwd.length >= 14) score++;
    if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score++;
    if (/\d/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    // Normalize to 1-4
    if (score <= 1) return 1;
    if (score === 2) return 2;
    if (score <= 3) return 3;
    return 4;
}

const strengthNames = {
    1: 'Weak',
    2: 'Fair',
    3: 'Strong',
    4: 'Very Strong'
};

function updateStrength(pwd) {
    if (!pwd || pwd === 'Click generate to create a password') {
        segs.forEach(s => {
            s.className = 'bar-seg';
        });
        strengthLabel.textContent = '—';
        return;
    }
    const s = calcStrength(pwd);
    segs.forEach((seg, i) => {
        seg.className = 'bar-seg' + (i < s ? ` active-${s}`: '');
    });
    strengthLabel.textContent = strengthNames[s];
    strengthLabel.style.color = ['',
        'var(--danger)',
        'var(--warn)',
        'var(--accent2)',
        'var(--accent)'][s];
}

function scrambleAnimation(finalPwd) {
    const charset = buildCharset() || CHARS.lower + CHARS.upper + CHARS.numbers;
    let frame = 0;
    const total = 14;
    clearInterval(scrambleInterval);
    output.classList.add('scrambling');

    scrambleInterval = setInterval(() => {
        const revealed = Math.floor((frame / total) * finalPwd.length);
        const visible = finalPwd.slice(0, revealed);
        const noise = Array.from({
            length: finalPwd.length - revealed
        }, () =>
            charset[Math.floor(Math.random() * charset.length)]
        ).join('');
        output.textContent = visible + noise;
        frame++;
        if (frame > total) {
            clearInterval(scrambleInterval);
            output.classList.remove('scrambling');
            output.textContent = finalPwd;
            output.classList.add('flash');
            setTimeout(() => output.classList.remove('flash'), 500);
            updateStrength(finalPwd);
        }
    },
        40);
}

function generate() {
    const pwd = generatePassword();
    currentPassword = pwd;
    scrambleAnimation(pwd);
}

function showToast(msg = 'Copied!') {
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'),
        1800);
}

function copyPassword() {
    if (!currentPassword) return;
    navigator.clipboard.writeText(currentPassword).then(() => {
        showToast('✓ Copied to Clipboard');
        copyIcon.classList.add('copied');
        copySvg.innerHTML = CHECK_SVG;
        setTimeout(() => {
            copyIcon.classList.remove('copied');
            copySvg.innerHTML = COPY_SVG;
        }, 1800);
    });
}

genBtn.addEventListener('click', generate);
copyIcon.addEventListener('click', copyPassword);

// Generate on load
window.addEventListener('load', () => setTimeout(generate, 300));