#!/usr/bin/env python3
"""
Generate the HBN logo at every size iOS and Android need from a single source.

Run:  python3 scripts/build-logo.py
Reads: template/assets/logo.png  (a 1024×1024 master, optional)
Writes:
  - iOS AppIcon.appiconset/AppIcon-*.png  (every iOS size)
  - iOS SplashImage.imageset/splash-logo.png
  - Android mipmap-*/ic_launcher.png + ic_launcher_round.png (all 5 densities)
  - Android drawable-*/splash_logo.png  (for native splash)

If template/assets/logo.png is missing, this script draws a clean HBN monogram
from scratch (a 1024×1024 master on a light-gray rounded square, with the
"<" and ">" brackets and dots that match the user-supplied design), then
generates all the derived sizes from that.

The user can replace template/assets/logo.png with their own art and re-run
this script to regenerate the whole icon/splash set.
"""
from __future__ import annotations

import os
import sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

# -- design tokens -----------------------------------------------------------
BG = (232, 235, 240, 255)            # light cool gray, rounded square
TEXT = (15, 27, 61, 255)              # dark navy, "HBN"
BRACKET = (30, 58, 138, 255)          # royal blue, "<" and ">"
DOT = (37, 99, 235, 255)              # bright blue, the two dots
RADIUS_RATIO = 0.22                    # rounded-corner radius vs width
INNER_PAD = 0.10                       # padding from edges to art

REPO = Path(__file__).resolve().parent.parent
ASSETS = REPO / "template" / "assets"
MASTER = ASSETS / "logo.png"

# iOS AppIcon sizes (size in points, then @1x/@2x/@3x pixel sizes)
IOS_APPICON = {
    "AppIcon-20.png": 20, "AppIcon-20@2x.png": 40, "AppIcon-20@3x.png": 60,
    "AppIcon-29.png": 29, "AppIcon-29@2x.png": 58, "AppIcon-29@3x.png": 87,
    "AppIcon-40.png": 40, "AppIcon-40@2x.png": 80, "AppIcon-40@3x.png": 120,
    "AppIcon-60@2x.png": 120, "AppIcon-60@3x.png": 180,
    "AppIcon-76.png": 76, "AppIcon-76@2x.png": 152,
    "AppIcon-83.5@2x.png": 167,
    "AppIcon-1024.png": 1024,
}

# Android mipmap densities: base icon size in px
ANDROID_DENSITIES = {
    "mipmap-mdpi": 48,
    "mipmap-hdpi": 72,
    "mipmap-xhdpi": 96,
    "mipmap-xxhdpi": 144,
    "mipmap-xxxhdpi": 192,
}

# ----------------------------------------------------------------------------

def _system_font(size: int, bold: bool = True) -> ImageFont.FreeTypeFont:
    """Pick a bold system font available on macOS / most Linux CI images."""
    candidates = [
        "/System/Library/Fonts/SFNS.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
        "/System/Library/Fonts/Supplemental/Arial Black.ttf",
        "/Library/Fonts/Arial.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    ]
    for path in candidates:
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size=size, index=1 if bold and path.endswith(".ttc") else 0)
            except Exception:
                continue
    return ImageFont.load_default()


def draw_master(size: int = 1024) -> Image.Image:
    """Render the HBN monogram at `size` × `size`."""
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Rounded background
    radius = int(size * RADIUS_RATIO)
    draw.rounded_rectangle(
        [(0, 0), (size - 1, size - 1)],
        radius=radius,
        fill=BG,
    )

    pad = int(size * INNER_PAD)
    art_size = size - 2 * pad

    # Use a font size that keeps "<HBN>" well inside `art_size`.
    # Helvetica's "<HBN>" string at this size will be ~0.55 × point-size wide.
    font_size = int(art_size * 0.42)
    bracket_font = _system_font(font_size)
    hbn_font = _system_font(font_size)

    line = "<HBN>"
    # Measure each glyph individually so we can lay them out by hand.
    glyphs = []
    cursor = 0
    for ch in line:
        bbox = draw.textbbox((0, 0), ch, font=bracket_font)
        w = bbox[2] - bbox[0]
        h = bbox[3] - bbox[1]
        glyphs.append((ch, w, h, bbox))
        cursor += w

    total_w = cursor
    line_height = max(g[2] for g in glyphs)
    start_x = (size - total_w) // 2
    start_y = (size - line_height) // 2 - glyphs[0][3][1]  # account for bbox top

    # Draw each glyph at its own X
    pen = start_x
    char_centers = {}
    for ch, w, h, bbox in glyphs:
        color = BRACKET if ch in ("<", ">") else TEXT
        draw.text((pen, start_y), ch, font=bracket_font, fill=color)
        char_centers[ch] = pen + w // 2
        pen += w

    # Two dots: one above ">", one below "<"
    dot_r = int(font_size * 0.085)
    cy_text = start_y + line_height // 2 + glyphs[0][3][1]  # baseline-ish
    dot_offset = int(font_size * 0.20)
    if "<" in char_centers:
        cx = char_centers["<"]
        draw.ellipse(
            [cx - dot_r, cy_text + dot_offset - dot_r,
             cx + dot_r, cy_text + dot_offset + dot_r],
            fill=DOT,
        )
    if ">" in char_centers:
        cx = char_centers[">"]
        draw.ellipse(
            [cx - dot_r, cy_text - dot_offset - dot_r,
             cx + dot_r, cy_text - dot_offset + dot_r],
            fill=DOT,
        )

    return img


def load_or_make_master() -> Image.Image:
    """If assets/logo.png exists, use it. Otherwise draw one."""
    if MASTER.exists():
        try:
            return Image.open(MASTER).convert("RGBA")
        except Exception as e:
            print(f"! could not open {MASTER}: {e}; regenerating", file=sys.stderr)
    master = draw_master(1024)
    ASSETS.mkdir(parents=True, exist_ok=True)
    master.save(MASTER, "PNG", optimize=True)
    print(f"+ wrote {MASTER.relative_to(REPO)} (1024x1024 master)")
    return master


def write_ios_appicon(master: Image.Image) -> None:
    target = REPO / "template" / "ios" / "HbnRnTemplate" / "Images.xcassets" / "AppIcon.appiconset"
    target.mkdir(parents=True, exist_ok=True)
    for filename, size in IOS_APPICON.items():
        out = target / filename
        if size == 1024:
            resized = master.resize((size, size), Image.LANCZOS)
        else:
            resized = master.resize((size, size), Image.LANCZOS)
        resized.save(out, "PNG", optimize=True)
    print(f"+ iOS AppIcon: {len(IOS_APPICON)} sizes -> {target.relative_to(REPO)}")


def write_ios_splash(master: Image.Image) -> None:
    target = REPO / "template" / "ios" / "HbnRnTemplate" / "Images.xcassets" / "SplashImage.imageset"
    target.mkdir(parents=True, exist_ok=True)
    # Use a 400×400 splash mark, plus @2x/@3x variants
    for filename, size in [
        ("splash-logo.png", 400),
        ("splash-logo@2x.png", 800),
        ("splash-logo@3x.png", 1200),
    ]:
        out = target / filename
        master.resize((size, size), Image.LANCZOS).save(out, "PNG", optimize=True)
    print(f"+ iOS Splash: 3 sizes -> {target.relative_to(REPO)}")


def write_android(master: Image.Image) -> None:
    base = REPO / "template" / "android" / "app" / "src" / "main" / "res"
    for density, size in ANDROID_DENSITIES.items():
        target = base / density
        target.mkdir(parents=True, exist_ok=True)
        master.resize((size, size), Image.LANCZOS).save(target / "ic_launcher.png", "PNG", optimize=True)
        # Round icon: same art, but apply a circular mask
        rounded = Image.new("RGBA", (size, size), (0, 0, 0, 0))
        mask = Image.new("L", (size, size), 0)
        ImageDraw.Draw(mask).ellipse([(0, 0), (size - 1, size - 1)], fill=255)
        rounded.paste(master.resize((size, size), Image.LANCZOS), (0, 0), mask)
        rounded.save(target / "ic_launcher_round.png", "PNG", optimize=True)
    print(f"+ Android: mipmap-*/ic_launcher{{,_round}}.png for {len(ANDROID_DENSITIES)} densities")

    # Android splash drawable (sits behind the launch theme)
    splash_dir = base / "drawable"
    splash_dir.mkdir(parents=True, exist_ok=True)
    master.resize((512, 512), Image.LANCZOS).save(splash_dir / "splash_logo.png", "PNG", optimize=True)
    print(f"+ Android splash drawable: drawable/splash_logo.png")


def main() -> int:
    ASSETS.mkdir(parents=True, exist_ok=True)
    master = load_or_make_master()
    write_ios_appicon(master)
    write_ios_splash(master)
    write_android(master)
    print("✓ logo + icons + splash assets generated")
    return 0


if __name__ == "__main__":
    sys.exit(main())
