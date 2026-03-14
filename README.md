# ðŸ” PassGen â€” Secure Password Generator

---

## âœ¨ Features

- âš¡ **Instant Password Generation** â€” generates a secure password on load and on every click
- ðŸŽ² **Scramble Animation** â€” cinematic character-reveal animation for each new password
- ðŸ”¢ **Adjustable Length** â€” slider from **6 to 64** characters
- ðŸ”  **Character Set Options** â€” toggle Uppercase, Lowercase, Numbers, and Symbols independently
- ðŸ›¡ï¸ **Strength Meter** â€” real-time visual strength indicator (Weak â†’ Fair â†’ Strong â†’ Very Strong)
- ðŸ“‹ **One-Click Copy** â€” copies to clipboard with an animated confirmation icon and toast notification
- ðŸ”’ **Guaranteed Complexity** â€” always includes at least one character from each selected group (Fisher-Yates shuffled)
- ðŸš« **No Minimum Lock-out** â€” prevents unchecking the last remaining character type
- ðŸ“± **Responsive Design** â€” works beautifully on all screen sizes

---

## ðŸŽ¨ Design System

### Color Palette

| Variable | Hex | Preview | Usage |
|---|---|---|---|
| `--bg` | `#080c10` | ![bg](https://img.shields.io/badge/ã€€ã€€-080c10?style=flat-square) | Page background |
| `--surface` | `#0d1117` | ![surface](https://img.shields.io/badge/ã€€ã€€-0d1117?style=flat-square) | Card / surface background |
| `--border` | `#1a2333` | ![border](https://img.shields.io/badge/ã€€ã€€-1a2333?style=flat-square) | Borders, inactive elements |
| `--accent` | `#00e5a0` | ![accent](https://img.shields.io/badge/ã€€ã€€-00e5a0?style=flat-square) | Primary accent â€” buttons, glow, password text |
| `--accent2` | `#00b8d4` | ![accent2](https://img.shields.io/badge/ã€€ã€€-00b8d4?style=flat-square) | Secondary accent â€” "Strong" strength level |
| `--danger` | `#ff4d6d` | ![danger](https://img.shields.io/badge/ã€€ã€€-ff4d6d?style=flat-square) | Weak password indicator |
| `--warn` | `#ffbe0b` | ![warn](https://img.shields.io/badge/ã€€ã€€-ffbe0b?style=flat-square) | Fair password indicator |
| `--text` | `#c9d1d9` | ![text](https://img.shields.io/badge/ã€€ã€€-c9d1d9?style=flat-square) | Primary body text |
| `--muted` | `#4a5568` | ![muted](https://img.shields.io/badge/ã€€ã€€-4a5568?style=flat-square) | Labels, placeholders, inactive icons |

### Strength Meter Colors

| Level | Color | Hex | Condition |
|---|---|---|---|
| ðŸ”´ Weak | Danger Red | `#ff4d6d` | Score 1 |
| ðŸŸ¡ Fair | Warning Amber | `#ffbe0b` | Score 2 |
| ðŸ”µ Strong | Cyan Accent | `#00b8d4` | Score 3 |
| ðŸŸ¢ Very Strong | Green Accent | `#00e5a0` | Score 4 |

### Typography

| Font | CSS Variable | Usage |
|---|---|---|
| [Share Tech Mono](https://fonts.google.com/specimen/Share+Tech+Mono) | `var(--mono)` | Password output, length display |
| [Rajdhani](https://fonts.google.com/specimen/Rajdhani) | `var(--display)` | UI labels, buttons, headers |

---

## ðŸ“ Project Structure

```
PasswordGenerator/
â”œâ”€â”€ password-generator.html   # Main HTML structure
â”œâ”€â”€ style.css                 # All styles, animations, and CSS variables
â””â”€â”€ script.js                 # Password logic, animations, clipboard API
```

---

## ðŸ”§ How It Works

### Password Generation Algorithm

1. **Collect active character sets** from the selected options (Uppercase / Lowercase / Numbers / Symbols)
2. **Guarantee inclusion** â€” picks at least one character from each active group
3. **Fill remaining length** â€” randomly samples from the combined charset
4. **Fisher-Yates Shuffle** â€” shuffles the entire array to eliminate predictable patterns

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

## ðŸš€ Getting Started

### Option 1: Open Directly

Download and open `password-generator.html` in any modern browser â€” no setup required.

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

## ðŸŽ›ï¸ Usage Guide

| Action | How |
|---|---|
| Generate a password | Click the **Generate** button |
| Change length | Drag the **length slider** (6â€“64 chars) |
| Toggle character types | Click any of the **4 option tiles** |
| Copy password | Click the **copy icon** on the right of the password box |

> **Note:** At least one character type must remain active at all times. The last active option cannot be deselected.

---

## ðŸŒ Browser Support

| Browser | Support |
|---|---|
| Chrome 90+ | âœ… Full |
| Firefox 88+ | âœ… Full |
| Safari 14+ | âœ… Full |
| Edge 90+ | âœ… Full |
| Opera 76+ | âœ… Full |

> Uses `navigator.clipboard.writeText()` â€” requires HTTPS or `localhost` for clipboard access in Chrome.

---

## ðŸ” Security Notes

- âœ… All generation is done **client-side** â€” no passwords are ever sent to a server
- âœ… Uses `Math.random()` for generation â€” suitable for everyday password use
- âš ï¸ For cryptographic-grade generation, consider upgrading to `crypto.getRandomValues()`

### Optional: Upgrade to Crypto API

```js
// Replace Math.random() calls with this for stronger randomness:
const array = new Uint32Array(1);
crypto.getRandomValues(array);
const index = array[0] % charset.length;
```

---

## ðŸŽ¨ Customization

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

## ðŸ¤ Contributing

Contributions are welcome!

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

---

## ðŸ“„ License

Distributed under the MIT License. See `LICENSE` for more information.

---

## ðŸ‘¤ Author

**jagarabari2-hub**

GitHub: [@jagarabari2-hub](https://github.com/jagarabari2-hub)

---

<p align="center">Made with ðŸ’š and vanilla JavaScript</p>
<p align="center">â­ Star this repo if you found it useful!</p>
