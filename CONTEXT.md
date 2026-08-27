# Portfolio Site

The personal portfolio of Tan Ze Yan — a single-page Next.js app presenting a hero with an animated terminal, selected projects, an experience timeline, and a contact section.

## Language

**Nordic–Catppuccin hybrid**:
The site's design theme: Nord Polar Night backgrounds and Snow Storm text combined with Catppuccin pastel accents. Used as the single dark theme.
_Avoid_: dark mode, nordic theme

**Polar Night**:
Nord's dark background ramp (`#2E3440`, `#3B4252`, `#434C5E`, `#4C566A`). Source of the `--bg`/`--surface` token family in the dark theme.

**Snow Storm**:
Nord's light text ramp (`#D8DEE9`, `#ECEFF4`). Source of the `--fg`/`--fg-bright` tokens in the dark theme.

**Frost**:
Nord's cyan accent (`#88C0D0`). Used as a shared "bridge" color in both themes.

**Mocha**:
Catppuccin's dark accent palette (Rosewater `#F2CDCD`, Lavender `#B4BEFE`, etc.). Supplies the accent tokens in the dark theme.

**Latte**:
Catppuccin's light palette — the light-mode counterpart to Mocha. Supplies all tokens when the `.light` class is active, since Nord has no light variant.
_Avoid_: nord light, snow storm light

**Selected work**:
The Projects section heading. Used to frame the portfolio's project cards.
_Avoid_: projects heading

**Terminal**:
The hero's animated terminal component that types an introduction (identity, role, skills, availability) with a blinking cursor.
_Avoid_: console, terminal window

**fact**:
The small mono-spaced pills in the hero that surface quick facts (years of experience, location, availability).