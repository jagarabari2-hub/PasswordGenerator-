# 🔐 PassGen — Secure Password Generator

A sleek, cyberpunk-themed password generator built with vanilla HTML, CSS, and JavaScript. No frameworks, no dependencies, no data sent anywhere — everything runs locally in the browser.

---

## ✨ Features

- **Instant generation** — passwords are created on load and on every click
- **Scramble animation** — characters animate into place for a satisfying reveal
- **Strength meter** — real-time visual feedback across 4 levels (Weak → Very Strong)
- **Customizable length** — slider from 6 to 64 characters
- **Character set toggles** — mix and match Uppercase, Lowercase, Numbers, and Symbols
- **One-click copy** — copy icon swaps to a checkmark on success with a toast notification
- **Guaranteed diversity** — at least one character from every active group is always included
- **Fully offline** — zero network requests, zero tracking

---

## 🗂️ Project Structure

```
PassGen/
├── password-generator.html   # Main HTML file — open this in a browser
├── style.css                 # All styling, animations, and theming
└── script.js                 # Password logic, UI interactions, animations
```

---

## 🚀 Getting Started

No build step or server required.

1. Clone or download the repository
2. Open `password-generator.html` in any modern browser
3. Done — start generating passwords

```bash
git clone https://github.com/your-username/passgen.git
cd passgen
open password-generator.html
```

---

## 🎨 Design

| Token | Value | Usage |
|---|---|---|
| `--accent` | `#00e5a0` | Primary green — buttons, active states, glow |
| `--accent2` | `#00b8d4` | Cyan — "Strong" strength level |
| `--danger` | `#ff4d6d` | Red — "Weak" strength level |
| `--warn` | `#ffbe0b` | Amber — "Fair" strength level |
| `--bg` | `#080c10` | Page background |
| `--surface` | `#0d1117` | Card background |

Fonts used (via Google Fonts):
- **Share Tech Mono** — monospace font for the password output
- **Rajdhani** — display font for labels and buttons

---

## 🔒 Password Strength Logic

Strength is scored from 1–4 based on:

- Length ≥ 8 characters → +1
- Length ≥ 14 characters → +1
- Contains both uppercase and lowercase → +1
- Contains a digit → +1
- Contains a symbol → +1

| Score | Label | Color |
|---|---|---|
| 1 | Weak | Red |
| 2 | Fair | Amber |
| 3 | Strong | Cyan |
| 4 | Very Strong | Green |

---

## 🛠️ How It Works

**Generation** — picks one character from each active group to guarantee diversity, fills the remaining length from the combined charset, then runs a Fisher-Yates shuffle for uniform randomness.

**Scramble animation** — reveals the final password left-to-right over 14 frames at 40ms intervals, filling unrevealed positions with random noise characters.

**Copy** — uses the `navigator.clipboard` API. The copy icon swaps to a checkmark SVG for 1.8 seconds on success.

---

## 📋 Browser Support

Works in all modern browsers that support:
- `navigator.clipboard` (Chrome 66+, Firefox 63+, Safari 13.1+)
- CSS custom properties
- ES6+ JavaScript

---

## 📄 License

MIT — free to use, modify, and distribute.
