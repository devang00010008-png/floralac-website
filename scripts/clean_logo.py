import numpy as np
from PIL import Image, ImageFilter

def generate_cleaned_logos():
    # Load original logo
    img = Image.open('public/images/floralac-logo-original.png').convert('RGB')
    arr = np.array(img).astype(float)
    hsv = np.array(img.convert('HSV'))
    h, s, v = hsv[:, :, 0], hsv[:, :, 1], hsv[:, :, 2]
    r, g, b = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2]

    h_img, w_img, _ = arr.shape
    cx, cy = 239.0, 149.0
    y_grid, x_grid = np.mgrid[:h_img, :w_img]
    dist = np.sqrt((x_grid - cx)**2 + (y_grid - cy)**2)

    # 1. Circle interior (dist <= 73.0)
    circle_mask = np.clip((74.0 - dist) / 1.5, 0.0, 1.0)

    # 2. Splash droplets (dist between 65 and 84, x in [178, 220], y in [80, 125])
    splash_box = (dist <= 84.0) & (x_grid >= 178) & (x_grid <= 220) & (y_grid >= 80) & (y_grid <= 125)
    droplet_outline = splash_box & (v < 160)
    droplet_interior = splash_box & (v > 225) & (s < 28)
    splash_features = droplet_outline | droplet_interior

    # 3. Top arched text: FLORALAC (dist between 74 and 128, y <= 156, x between 115 and 365)
    top_band = (dist >= 74) & (dist <= 128) & (y_grid <= 156) & (x_grid >= 115) & (x_grid <= 365)
    top_text_score = np.clip((s.astype(float) - 32.0) / 35.0, 0.0, 1.0) * np.clip((225.0 - v.astype(float)) / 30.0, 0.0, 1.0)
    top_text_mask = top_band * top_text_score

    # 4. Bottom arched text: SECOND LIFE MATERIALS (dist between 80 and 118, y >= 160, x between 135 and 345)
    bot_band = (dist >= 80) & (dist <= 118) & (y_grid >= 160) & (x_grid >= 135) & (x_grid <= 345)
    bot_text_score = np.clip((s.astype(float) - 28.0) / 30.0, 0.0, 1.0) * np.clip((225.0 - v.astype(float)) / 30.0, 0.0, 1.0)
    bot_text_mask = bot_band * bot_text_score

    # Combine text and splash features
    feature_mask = np.maximum.reduce([top_text_mask, bot_text_mask, splash_features.astype(float)])

    # Smooth text features slightly to eliminate noise and soften font edges
    feat_img = Image.fromarray((feature_mask * 255).astype(np.uint8), mode='L')
    blurred_feat = feat_img.filter(ImageFilter.GaussianBlur(radius=0.6))
    feat_smooth = np.array(blurred_feat, dtype=float) / 255.0

    # Boost core text opacity while keeping smooth subpixel edge
    feat_alpha = np.clip(feat_smooth * 1.6, 0.0, 1.0)

    # Combine with circular medallion
    total_alpha = np.maximum(circle_mask, feat_alpha)

    # Create 4-channel RGBA
    out_rgba = np.zeros((h_img, w_img, 4), dtype=np.uint8)
    out_rgba[:, :, :3] = arr.astype(np.uint8)
    out_rgba[:, :, 3] = (total_alpha * 255.0).astype(np.uint8)

    # Find tight bounding box of visible artwork
    active_y, active_x = np.where(total_alpha > 0.08)
    min_y, max_y = max(0, active_y.min() - 4), min(h_img, active_y.max() + 5)
    min_x, max_x = max(0, active_x.min() - 5), min(w_img, active_x.max() + 6)

    # Clean transparent logo
    clean_logo = Image.fromarray(out_rgba, mode='RGBA').crop((min_x, min_y, max_x, max_y))
    clean_logo.save('public/images/floralac-logo-clean.png')

    # Navbar background composited logo (#FAF8F5 = rgb(250, 248, 245))
    navbar_bg = Image.new('RGBA', clean_logo.size, (250, 248, 245, 255))
    navbar_comp = Image.alpha_composite(navbar_bg, clean_logo)
    navbar_comp.save('public/images/floralac-logo-navbar.png')

    # Also save as floralac-logo-transparent.png (full frame)
    full_transparent = Image.fromarray(out_rgba, mode='RGBA')
    full_transparent.save('public/images/floralac-logo-transparent.png')

    print(f"Generated clean logo: {clean_logo.size}")

if __name__ == '__main__':
    generate_cleaned_logos()
