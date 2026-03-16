# 🔐 PassGen — Secure Password Generator

---

## ✨ Features

- ⚡ **Instant Password Generation** — generates a secure password on load and on every click
- 🎲 **Scramble Animation** — cinematic character-reveal animation for each new password
- 🔢 **Adjustable Length** — slider from **6 to 64** characters
- 🔠 **Character Set Options** — toggle Uppercase, Lowercase, Numbers, and Symbols independently
- 🛡️ **Strength Meter** — real-time visual strength indicator (Weak → Fair → Strong → Very Strong)
- 📋 **One-Click Copy** — copies to clipboard with an animated confirmation icon and toast notification
- 🔒 **Guaranteed Complexity** — always includes at least one character from each selected group (Fisher-Yates shuffled)
- 🚫 **No Minimum Lock-out** — prevents unchecking the last remaining character type
- 📱 **Responsive Design** — works beautifully on all screen sizes

---

## 🎨 Design System

### Color Palette

| Variable | Hex | Preview | Usage |
|---|---|---|---|
| `--bg` | `#080c10` | ![bg](https://img.shields.io/badge/　　-080c10?style=flat-square) | Page background |
| `--surface` | `#0d1117` | ![surface](https://img.shields.io/badge/　　-0d1117?style=flat-square) | Card / surface background |
| `--border` | `#1a2333` | ![border](https://img.shields.io/badge/　　-1a2333?style=flat-square) | Borders, inactive elements |
| `--accent` | `#00e5a0` | ![accent](https://img.shields.io/badge/　　-00e5a0?style=flat-square) | Primary accent — buttons, glow, password text |
| `--accent2` | `#00b8d4` | ![accent2](https://img.shields.io/badge/　　-00b8d4?style=flat-square) | Secondary accent — "Strong" strength level |
| `--danger` | `#ff4d6d` | ![danger](https://img.shields.io/badge/　　-ff4d6d?style=flat-square) | Weak password indicator |
| `--warn` | `#ffbe0b` | ![warn](https://img.shields.io/badge/　　-ffbe0b?style=flat-square) | Fair password indicator |
| `--text` | `#c9d1d9` | ![text](https://img.shields.io/badge/　　-c9d1d9?style=flat-square) | Primary body text |
| `--muted` | `#4a5568` | ![muted](https://img.shields.io/badge/　　-4a5568?style=flat-square) | Labels, placeholders, inactive icons |

### Strength Meter Colors

| Level | Color | Hex | Condition |
|---|---|---|---|
| 🔴 Weak | Danger Red | `#ff4d6d` | Score 1 |
| 🟡 Fair | Warning Amber | `#ffbe0b` | Score 2 |
| 🔵 Strong | Cyan Accent | `#00b8d4` | Score 3 |
| 🟢 Very Strong | Green Accent | `#00e5a0` | Score 4 |

### Typography

| Font | CSS Variable | Usage |
|---|---|---|
| [Share Tech Mono](https://fonts.google.com/specimen/Share+Tech+Mono) | `var(--mono)` | Password output, length display |
| [Rajdhani](https://fonts.google.com/specimen/Rajdhani) | `var(--display)` | UI labels, buttons, headers |

---

## 📁 Project Structure

```
PasswordGenerator/
├── password-generator.html   # Main HTML structure
├── style.css                 # All styles, animations, and CSS variables
└── script.js                 # Password logic, animations, clipboard API
```

---

## 🔧 How It Works

### Password Generation Algorithm

1. **Collect active character sets** from the selected options (Uppercase / Lowercase / Numbers / Symbols)
2. **Guarantee inclusion** — picks at least one character from each active group
3. **Fill remaining length** — randomly samples from the combined charset
4. **Fisher-Yates Shuffle** — shuffles the entire array to eliminate predictable patterns

```js
// Fisher-Yates shuffle
for (let i = pwd.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [pwd[i], pwd[j]] = [pwd[j], pwd[i]];
}
```

### Strength Score Calculation

The strength is calculated based on 5 criteria, normalized to a 1-4 scale:

| Criterion | Points |
|---|---|
| Length >= 8 | +1 |
| Length >= 14 | +1 |
| Contains both Uppercase and Lowercase | +1 |
| Contains a digit | +1 |
| Contains a special character | +1 |

### Scramble Animation

Each generated password triggers a frame-by-frame reveal:

- **14 frames** at **40ms intervals** (~560ms total)
- Characters are revealed left-to-right
- Unrevealed positions show random noise from the active charset
- Ends with a **flash glow** border effect on the password box

---

## 🚀 Getting Started

### Option 1: Open Directly

Download and open `password-generator.html` in any modern browser — no setup required.

### Option 2: Clone and Run

```bash
git clone https://github.com/jagarabari2-hub/PasswordGenerator-.git
cd PasswordGenerator-
open password-generator.html
```

### Option 3: Live Server (VS Code)

1. Install the **Live Server** extension in VS Code
2. Right-click `password-generator.html`
3. Select **"Open with Live Server"**

---

## 🎛️ Usage Guide

| Action | How |
|---|---|
| Generate a password | Click the **Generate** button |
| Change length | Drag the **length slider** (6–64 chars) |
| Toggle character types | Click any of the **4 option tiles** |
| Copy password | Click the **copy icon** on the right of the password box |

> **Note:** At least one character type must remain active at all times. The last active option cannot be deselected.

---

## 🌐 Browser Support

| Browser | Support |
|---|---|
| Chrome 90+ | ✅ Full |
| Firefox 88+ | ✅ Full |
| Safari 14+ | ✅ Full |
| Edge 90+ | ✅ Full |
| Opera 76+ | ✅ Full |

> Uses `navigator.clipboard.writeText()` — requires HTTPS or `localhost` for clipboard access in Chrome.

---

## 🔐 Security Notes

- ✅ All generation is done **client-side** — no passwords are ever sent to a server
- ✅ Uses `Math.random()` for generation — suitable for everyday password use
- ⚠️ For cryptographic-grade generation, consider upgrading to `crypto.getRandomValues()`

### Optional: Upgrade to Crypto API

```js
// Replace Math.random() calls with this for stronger randomness:
const array = new Uint32Array(1);
crypto.getRandomValues(array);
const index = array[0] % charset.length;
```

---

## 🎨 Customization

### Change the Accent Color

Open `style.css` and update the `--accent` variable:

```css
:root {
  --accent: #00e5a0;  /* Default: Mint Green */
  /* --accent: #7c3aed;  Purple  */
  /* --accent: #f59e0b;  Amber   */
  /* --accent: #ef4444;  Red     */
}
```

### Change the Background Colors

```css
:root {
  --bg: #080c10;      /* Page background */
  --surface: #0d1117; /* Card surface    */
  --border: #1a2333;  /* Border color    */
}
```

### Extend the Symbol Set

In `script.js`, edit the `CHARS.symbols` string:

```js
const CHARS = {
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
  // Add more characters as needed
};
```

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

---

## 📄 License

Distributed under the GPU 3.0 License. See `LICENSE` for more information.

---

## 👤 Author

**jagarabari2-hub**

GitHub: [@jagarabari2-hub](https://github.com/jagarabari2-hub)

---

<p align="center">Made with 💚 and vanilla JavaScript</p>
<p align="center">⭐ Star this repo if you found it useful!</p>
