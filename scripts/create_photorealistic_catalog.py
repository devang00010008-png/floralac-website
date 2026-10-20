import os
import math
import numpy as np
from PIL import Image, ImageFilter, ImageDraw, ImageOps

os.makedirs('public/images/products', exist_ok=True)

print("Loading studio source photographs...")
wallet_im = Image.open('public/images/products/floral-wallet.jpg').convert('RGB')
card_im = Image.open('public/images/products/floral-card-holder.jpg').convert('RGB')
earrings_im = Image.open('public/images/products/floral-earrings.jpg').convert('RGB')
pendant_im = Image.open('public/images/products/pressed-flower-pendant.jpg').convert('RGB')
scalp_mask_im = Image.open('public/images/products/hibiscus-marigold-scalp-mask.jpg').convert('RGB')
casein_mask_im = Image.open('public/images/products/casein-repair-smooth-mask.jpg').convert('RGB')

# Base clean linen background
# Wallet's bottom linen tabletop provides warm window side-lighting and woven linen texture
linen_source = wallet_im.crop((40, 680, 980, 1010)).resize((1024, 1024), Image.Resampling.LANCZOS)
linen_bg = linen_source.filter(ImageFilter.GaussianBlur(radius=1.2))

# Extract genuine material textures
leather_patch = wallet_im.crop((300, 260, 680, 640)).resize((800, 800), Image.Resampling.LANCZOS)
casein_patch = pendant_im.crop((340, 480, 640, 780)).resize((600, 600), Image.Resampling.LANCZOS)
casein_yellow = earrings_im.crop((240, 480, 560, 760)).resize((500, 500), Image.Resampling.LANCZOS)

# Stitches and brass findings
stitch_sample = wallet_im.crop((380, 240, 580, 270)) # horizontal white saddle stitches
brass_stud = wallet_im.crop((48, 518, 126, 596)).resize((80, 80), Image.Resampling.LANCZOS)

# Loose florals
loose_marigolds = scalp_mask_im.crop((40, 620, 390, 840))
single_marigold = scalp_mask_im.crop((690, 580, 880, 760))
hibiscus_petals = casein_mask_im.crop((110, 660, 350, 800))

def apply_drop_shadow(bg, mask, offset=(12, 20), radius=22, strength=0.55):
    """Generates soft, physically believable directional ambient & contact shadow."""
    w, h = bg.size
    shadow = Image.new('L', (w, h), 0)
    shadow.paste(mask, offset)
    shadow = shadow.filter(ImageFilter.GaussianBlur(radius=radius))
    
    shadow_arr = np.array(shadow, dtype=float) * strength
    bg_arr = np.array(bg, dtype=float)
    for c in range(3):
        bg_arr[:, :, c] = np.clip(bg_arr[:, :, c] * (1.0 - shadow_arr / 255.0 * 0.8), 0, 255)
    return Image.fromarray(bg_arr.astype(np.uint8))

def draw_saddle_stitches(draw, points, color=(245, 240, 230), stitch_len=14, gap=6, width=3):
    """Draws realistic slanted saddle stitches along a path."""
    for i in range(len(points) - 1):
        p1 = points[i]
        p2 = points[i+1]
        dx = p2[0] - p1[0]
        dy = p2[1] - p1[1]
        dist = math.hypot(dx, dy)
        if dist == 0: continue
        ux, uy = dx / dist, dy / dist
        # normal vector
        nx, ny = -uy, ux
        
        curr = 0
        while curr + stitch_len <= dist:
            sx = p1[0] + ux * curr
            sy = p1[1] + uy * curr
            ex = sx + ux * stitch_len
            ey = sy + uy * stitch_len
            # slight hand-stitching slant
            draw.line([(sx - nx, sy - ny), (ex + nx, ey + ny)], fill=color, width=width)
            curr += stitch_len + gap

# =========================================================================
# 1. FLORAL NOTEBOOK COVER (A5 Refillable Bio-Leather Journal Wrap)
# =========================================================================
def create_notebook_cover():
    print("Generating floral-notebook-cover.jpg...")
    img = linen_bg.copy()
    
    # Journal dimensions & position
    jx, jy, jw, jh = 240, 180, 544, 664
    
    # Mask for journal cover
    mask = Image.new('L', (1024, 1024), 0)
    d_mask = ImageDraw.Draw(mask)
    d_mask.rounded_rectangle([jx, jy, jx + jw, jy + jh], radius=24, fill=255)
    
    # Apply shadow to background
    img = apply_drop_shadow(img, mask, offset=(18, 28), radius=28, strength=0.58)
    
    # Create cover with genuine floral bio-leather texture
    cover = Image.new('RGBA', (1024, 1024), (0,0,0,0))
    # Tile/scale leather patch
    leather_scaled = leather_patch.resize((jw, jh), Image.Resampling.LANCZOS)
    cover.paste(leather_scaled, (jx, jy), mask.crop((jx, jy, jx + jw, jy + jh)))
    
    # Spine crease down the left-center (at jx + 40)
    spine_x = jx + 48
    d_cover = ImageDraw.Draw(cover)
    # Dark shadow line for spine
    for offset in range(-6, 7):
        alpha = int(70 * (1 - abs(offset) / 7.0))
        d_cover.line([(spine_x + offset, jy + 10), (spine_x + offset, jy + jh - 10)],
                     fill=(40, 25, 15, alpha), width=1)
    
    # Bevel highlight on top & left
    for offset in range(1, 4):
        d_cover.line([(jx + offset, jy + 24), (jx + offset, jy + jh - 24)],
                     fill=(255, 245, 230, 45), width=1)
        d_cover.line([(jx + 24, jy + offset), (jx + jw - 24, jy + offset)],
                     fill=(255, 245, 230, 60), width=1)
                     
    # Stitching around cover perimeter
    inset = 18
    pts = [
        (jx + inset + 20, jy + inset),
        (jx + jw - inset - 20, jy + inset),
        (jx + jw - inset, jy + inset + 20),
        (jx + jw - inset, jy + jh - inset - 20),
        (jx + jw - inset - 20, jy + jh - inset),
        (jx + inset + 20, jy + jh - inset),
        (jx + inset, jy + jh - inset - 20),
        (jx + inset, jy + inset + 20),
        (jx + inset + 20, jy + inset)
    ]
    draw_saddle_stitches(d_cover, pts, color=(248, 242, 232), stitch_len=12, gap=6, width=2)
    
    # Bookmark ribbon hanging out at bottom
    rx = jx + 240
    d_cover.line([(rx, jy + jh - 40), (rx + 25, jy + jh + 110)], fill=(91, 110, 78, 230), width=8)
    
    # Embossed Floralac insignia in center
    cx, cy = jx + jw // 2, jy + jh // 2 - 20
    d_cover.ellipse([cx - 32, cy - 32, cx + 32, cy + 32], outline=(60, 35, 20, 110), width=2)
    d_cover.ellipse([cx - 20, cy - 20, cx + 20, cy + 20], fill=(50, 30, 18, 50))
    
    img.paste(cover, (0, 0), cover)
    img.save('public/images/products/floral-notebook-cover.jpg', quality=92)

# =========================================================================
# 2. FLORAL TOTE BAG (Broad-Panel Botanical Leather Tote)
# =========================================================================
def create_tote_bag():
    print("Generating floral-tote-bag.jpg...")
    img = linen_bg.copy()
    
    # Bag body: upright trapezoid on linen
    bx, by, bw, bh = 260, 320, 504, 520
    top_w = 440
    x_shift = (bw - top_w) // 2
    
    # Polygon mask for body
    body_pts = [
        (bx + x_shift, by),
        (bx + bw - x_shift, by),
        (bx + bw, by + bh - 30),
        (bx + bw - 20, by + bh),
        (bx + 20, by + bh),
        (bx, by + bh - 30)
    ]
    
    mask = Image.new('L', (1024, 1024), 0)
    d_mask = ImageDraw.Draw(mask)
    d_mask.polygon(body_pts, fill=255)
    
    # Contact shadow
    img = apply_drop_shadow(img, mask, offset=(15, 32), radius=35, strength=0.62)
    
    # Paste floral bio-leather texture
    body = Image.new('RGBA', (1024, 1024), (0,0,0,0))
    leather_scaled = leather_patch.resize((bw + 80, bh + 80), Image.Resampling.LANCZOS)
    body.paste(leather_scaled, (bx - 40, by - 40), mask)
    
    # Shading and lighting on tote body
    d_body = ImageDraw.Draw(body)
    # Left light highlight
    for i in range(15):
        alpha = int(45 * (1 - i / 15.0))
        d_body.line([(bx + x_shift + i, by), (bx + i, by + bh)], fill=(255, 245, 230, alpha), width=1)
    # Right contour shadow
    for i in range(25):
        alpha = int(70 * (1 - i / 25.0))
        d_body.line([(bx + bw - x_shift - i, by), (bx + bw - i, by + bh)], fill=(30, 20, 15, alpha), width=1)
        
    # Top rim fold
    d_body.line([(bx + x_shift, by + 4), (bx + bw - x_shift, by + 4)], fill=(255, 245, 230, 120), width=2)
    d_body.line([(bx + x_shift, by + 32), (bx + bw - x_shift, by + 32)], fill=(50, 30, 15, 90), width=2)
    # Saddle stitching along top rim
    top_stitch = [(bx + x_shift + 10, by + 26), (bx + bw - x_shift - 10, by + 26)]
    draw_saddle_stitches(d_body, top_stitch, color=(248, 242, 232), stitch_len=10, gap=5, width=2)
    
    # Dual Handles (arching upward)
    # Left handle: from x=bx + 90 to x=bx + 190
    # Right handle: from x=bx + bw - 190 to x=bx + bw - 90
    handle_mask = Image.new('RGBA', (1024, 1024), (0,0,0,0))
    d_handle = ImageDraw.Draw(handle_mask)
    
    for hx in [bx + 130, bx + bw - 130]:
        # Handle anchor patch on body
        d_body.rounded_rectangle([hx - 22, by + 16, hx + 22, by + 90], radius=8,
                                 fill=(180, 120, 80, 255), outline=(60, 35, 20, 120), width=2)
        # Brass rivet on anchor
        rivet = brass_stud.resize((24, 24), Image.Resampling.LANCZOS)
        body.paste(rivet, (hx - 12, by + 32), rivet.convert('L'))
        
    # Arching leather straps (bezier/ellipse curves)
    d_handle.arc([bx + 110, by - 190, bx + bw - 110, by + 120], start=180, end=360, fill=(165, 105, 65, 255), width=22)
    d_handle.arc([bx + 110, by - 190, bx + bw - 110, by + 120], start=180, end=360, fill=(245, 240, 230, 180), width=2)
    
    # Composite handles with shadow
    handle_shadow = Image.new('L', (1024, 1024), 0)
    handle_shadow.paste(handle_mask.split()[-1], (12, 18))
    handle_shadow = handle_shadow.filter(ImageFilter.GaussianBlur(radius=18))
    img = apply_drop_shadow(img, handle_mask.split()[-1], offset=(10, 16), radius=16, strength=0.45)
    
    img.paste(body, (0, 0), body)
    img.paste(handle_mask, (0, 0), handle_mask)
    img.save('public/images/products/floral-tote-bag.jpg', quality=92)

# =========================================================================
# 3. FLORAL SLING BAG (Structured Crossbody Bag with Brass Hardware)
# =========================================================================
def create_sling_bag():
    print("Generating floral-sling-bag.jpg...")
    img = linen_bg.copy()
    
    # Main crossbody bag silhouette
    sx, sy, sw, sh = 280, 280, 464, 464
    
    mask = Image.new('L', (1024, 1024), 0)
    d_mask = ImageDraw.Draw(mask)
    # Rounded rectangular bag with curved base
    d_mask.rounded_rectangle([sx, sy, sx + sw, sy + sh], radius=48, fill=255)
    
    img = apply_drop_shadow(img, mask, offset=(18, 30), radius=32, strength=0.6)
    
    bag = Image.new('RGBA', (1024, 1024), (0,0,0,0))
    leather_scaled = leather_patch.resize((sw + 40, sh + 40), Image.Resampling.LANCZOS)
    bag.paste(leather_scaled, (sx - 20, sy - 20), mask)
    
    d_bag = ImageDraw.Draw(bag)
    
    # Front curved envelope flap (from top to y = sy + sh * 0.6)
    flap_pts = [
        (sx, sy),
        (sx + sw, sy),
        (sx + sw, sy + int(sh * 0.45)),
        (sx + sw // 2, sy + int(sh * 0.62)), # curved V-point in center
        (sx, sy + int(sh * 0.45))
    ]
    flap_mask = Image.new('L', (1024, 1024), 0)
    d_fmask = ImageDraw.Draw(flap_mask)
    d_fmask.polygon(flap_pts, fill=255)
    
    # Flap drop shadow on lower bag body
    flap_shadow = flap_mask.filter(ImageFilter.GaussianBlur(radius=14))
    flap_s_arr = np.array(flap_shadow, dtype=float) * 0.6
    bag_arr = np.array(bag, dtype=float)
    for c in range(3):
        bag_arr[:, :, c] = np.clip(bag_arr[:, :, c] * (1.0 - flap_s_arr / 255.0 * 0.8), 0, 255)
    bag = Image.fromarray(bag_arr.astype(np.uint8), mode='RGBA')
    d_bag = ImageDraw.Draw(bag)
    
    # Flap stitching along V-point edge
    draw_saddle_stitches(d_bag, flap_pts[2:5], color=(248, 242, 232), stitch_len=12, gap=5, width=2)
    # Outer bag perimeter stitching
    body_stitch = [
        (sx + 16, sy + 30),
        (sx + 16, sy + sh - 48),
        (sx + 48, sy + sh - 16),
        (sx + sw - 48, sy + sh - 16),
        (sx + sw - 16, sy + sh - 48),
        (sx + sw - 16, sy + 30)
    ]
    draw_saddle_stitches(d_bag, body_stitch, color=(248, 242, 232), stitch_len=12, gap=5, width=2)
    
    # Antique brass center stud / lock mechanism
    cl_x, cl_y = sx + sw // 2, sy + int(sh * 0.58)
    clasp = brass_stud.resize((48, 48), Image.Resampling.LANCZOS)
    bag.paste(clasp, (cl_x - 24, cl_y - 24), clasp.convert('L'))
    
    # Shoulder strap extending out to sides
    d_bag.arc([sx - 110, sy - 140, sx + sw + 110, sy + 180], start=160, end=380, fill=(155, 95, 55, 255), width=18)
    
    img.paste(bag, (0, 0), bag)
    img.save('public/images/products/floral-sling-bag.jpg', quality=92)

# =========================================================================
# 4. FLORAL NECKLACE (Statement Casein Stone Tiles on Linen Cord)
# =========================================================================
def create_necklace():
    print("Generating floral-necklace.jpg...")
    img = linen_bg.copy()
    
    # Arc of 5 graduated casein stone tiles
    cx, cy = 512, 540
    radii = [88, 72, 58] # center, mid, outer
    angles = [90, 68, 112, 46, 134] # degrees
    tile_sizes = [130, 110, 110, 92, 92]
    
    necklace_layer = Image.new('RGBA', (1024, 1024), (0,0,0,0))
    d_neck = ImageDraw.Draw(necklace_layer)
    
    # Draw twisted linen cord curve through the stones
    d_neck.arc([160, 120, 864, 760], start=20, end=160, fill=(195, 175, 145, 255), width=10)
    d_neck.arc([160, 120, 864, 760], start=20, end=160, fill=(235, 220, 195, 200), width=4)
    
    combined_mask = Image.new('L', (1024, 1024), 0)
    d_cmask = ImageDraw.Draw(combined_mask)
    
    # Draw stones
    for idx, deg in enumerate(angles):
        rad = math.radians(deg)
        tx = int(cx + 260 * math.cos(rad))
        ty = int(cy - 260 * math.sin(rad) + 200)
        ts = tile_sizes[idx]
        
        # Rounded diamond/tile mask
        tile_mask = Image.new('L', (ts, ts), 0)
        d_tmask = ImageDraw.Draw(tile_mask)
        d_tmask.rounded_rectangle([4, 4, ts - 5, ts - 5], radius=ts // 4, fill=255)
        
        # Paste into combined mask
        combined_mask.paste(tile_mask, (tx - ts // 2, ty - ts // 2), tile_mask)
        
        # Crop casein stone texture with petals
        stone_crop = casein_patch.resize((ts, ts), Image.Resampling.LANCZOS)
        necklace_layer.paste(stone_crop, (tx - ts // 2, ty - ts // 2), tile_mask)
        
        # Antique brass jump ring at top of tile
        rx = tx
        ry = ty - ts // 2 + 6
        d_neck.ellipse([rx - 10, ry - 10, rx + 10, ry + 10], outline=(170, 130, 60, 255), width=4)
        d_neck.ellipse([rx - 7, ry - 7, rx + 7, ry + 7], outline=(240, 200, 110, 200), width=2)
        
    # Apply soft directional shadow
    img = apply_drop_shadow(img, combined_mask, offset=(12, 18), radius=22, strength=0.55)
    
    img.paste(necklace_layer, (0, 0), necklace_layer)
    img.save('public/images/products/floral-necklace.jpg', quality=92)

# =========================================================================
# 5. FLORAL BEADS & CHARMS (Hand-Rolled Casein Stone Mala Beads)
# =========================================================================
def create_beads_charms():
    print("Generating floral-beads-charms.jpg...")
    img = linen_bg.copy()
    
    # Gentle double loop of hand-rolled round casein beads
    cx, cy = 512, 512
    bead_layer = Image.new('RGBA', (1024, 1024), (0,0,0,0))
    d_beads = ImageDraw.Draw(bead_layer)
    
    bead_mask = Image.new('L', (1024, 1024), 0)
    
    # Cord loop
    d_beads.ellipse([260, 260, 764, 764], outline=(180, 160, 130, 255), width=6)
    
    num_beads = 16
    for i in range(num_beads):
        angle = (i / float(num_beads)) * 2 * math.pi
        r = 230 + 30 * math.sin(i * 1.5)
        bx = int(cx + r * math.cos(angle))
        by = int(cy + r * math.sin(angle))
        bs = 64 # bead diameter
        
        # Round bead mask
        bmask = Image.new('L', (bs, bs), 0)
        d_bmask = ImageDraw.Draw(bmask)
        d_bmask.ellipse([2, 2, bs - 3, bs - 3], fill=255)
        
        bead_mask.paste(bmask, (bx - bs // 2, by - bs // 2), bmask)
        
        # Sample textured casein
        rot_angle = (i * 45) % 360
        bead_tex = casein_yellow.resize((bs, bs), Image.Resampling.LANCZOS).rotate(rot_angle)
        bead_layer.paste(bead_tex, (bx - bs // 2, by - bs // 2), bmask)
        
        # 3D specular highlight on top-left of sphere
        d_beads.ellipse([bx - 18, by - 18, bx - 6, by - 6], fill=(255, 255, 245, 140))
        
    img = apply_drop_shadow(img, bead_mask, offset=(10, 16), radius=18, strength=0.52)
    img.paste(bead_layer, (0, 0), bead_layer)
    img.save('public/images/products/floral-beads-charms.jpg', quality=92)

# =========================================================================
# 6. BOTANICAL HAIR ACCESSORIES (Chignon Pin & Floral Barrette)
# =========================================================================
def create_hair_accessories():
    print("Generating botanical-hair-accessories.jpg...")
    img = linen_bg.copy()
    
    acc_layer = Image.new('RGBA', (1024, 1024), (0,0,0,0))
    d_acc = ImageDraw.Draw(acc_layer)
    mask = Image.new('L', (1024, 1024), 0)
    d_mask = ImageDraw.Draw(mask)
    
    # 1. Slide Barrette (curved horizontal oval with floral casein)
    bar_x, bar_y, bar_w, bar_h = 240, 320, 544, 140
    bar_mask = Image.new('L', (bar_w, bar_h), 0)
    d_bmask = ImageDraw.Draw(bar_mask)
    d_bmask.rounded_rectangle([4, 4, bar_w - 5, bar_h - 5], radius=bar_h // 2, fill=255)
    
    mask.paste(bar_mask, (bar_x, bar_y), bar_mask)
    bar_tex = casein_patch.resize((bar_w, bar_h), Image.Resampling.LANCZOS)
    acc_layer.paste(bar_tex, (bar_x, bar_y), bar_mask)
    
    # Bevel on barrette
    d_acc.rounded_rectangle([bar_x + 3, bar_y + 3, bar_x + bar_w - 4, bar_y + bar_h - 4],
                            radius=bar_h // 2, outline=(255, 250, 240, 120), width=3)
                            
    # 2. Chignon Hair Pin (slender tapered U-pin angled below)
    pin_x, pin_y = 380, 560
    # Two brass tines
    d_acc.line([(pin_x, pin_y), (pin_x - 140, pin_y + 240)], fill=(170, 130, 60, 255), width=8)
    d_acc.line([(pin_x + 30, pin_y), (pin_x - 110, pin_y + 240)], fill=(170, 130, 60, 255), width=8)
    # Highlight
    d_acc.line([(pin_x, pin_y), (pin_x - 140, pin_y + 240)], fill=(240, 210, 120, 160), width=2)
    # Floral casein head on pin
    head_mask = Image.new('L', (140, 140), 0)
    d_hmask = ImageDraw.Draw(head_mask)
    d_hmask.ellipse([4, 4, 135, 135], fill=255)
    mask.paste(head_mask, (pin_x - 55, pin_y - 60), head_mask)
    head_tex = casein_yellow.resize((140, 140), Image.Resampling.LANCZOS)
    acc_layer.paste(head_tex, (pin_x - 55, pin_y - 60), head_mask)
    
    img = apply_drop_shadow(img, mask, offset=(14, 22), radius=24, strength=0.55)
    img.paste(acc_layer, (0, 0), acc_layer)
    img.save('public/images/products/botanical-hair-accessories.jpg', quality=92)

# =========================================================================
# 7. BOTANICAL BROOCH (Molded Floral Casein Lapel Pin)
# =========================================================================
def create_brooch():
    print("Generating botanical-brooch.jpg...")
    img = linen_bg.copy()
    
    cx, cy, r = 512, 512, 220
    brooch_layer = Image.new('RGBA', (1024, 1024), (0,0,0,0))
    d_br = ImageDraw.Draw(brooch_layer)
    
    mask = Image.new('L', (1024, 1024), 0)
    d_mask = ImageDraw.Draw(mask)
    
    # Scalloped petal perimeter
    num_petals = 12
    for i in range(num_petals):
        ang = (i / float(num_petals)) * 2 * math.pi
        px = int(cx + r * math.cos(ang))
        py = int(cy + r * math.sin(ang))
        d_mask.ellipse([px - 45, py - 45, px + 45, py + 45], fill=255)
        d_br.ellipse([px - 45, py - 45, px + 45, py + 45], fill=(185, 145, 75, 255))
        d_br.ellipse([px - 40, py - 40, px + 40, py + 40], outline=(245, 215, 120, 200), width=2)
        
    d_mask.ellipse([cx - r + 15, cy - r + 15, cx + r - 15, cy + r - 15], fill=255)
    
    # Center floral casein medallion
    med_mask = Image.new('L', (2 * (r - 20), 2 * (r - 20)), 0)
    d_mmask = ImageDraw.Draw(med_mask)
    d_mmask.ellipse([4, 4, 2 * (r - 20) - 5, 2 * (r - 20) - 5], fill=255)
    
    med_tex = casein_patch.resize((2 * (r - 20), 2 * (r - 20)), Image.Resampling.LANCZOS)
    brooch_layer.paste(med_tex, (cx - r + 20, cy - r + 20), med_mask)
    
    # Brass inner rim
    d_br.ellipse([cx - r + 20, cy - r + 20, cx + r - 20, cy + r - 20], outline=(175, 135, 65, 255), width=6)
    d_br.ellipse([cx - r + 23, cy - r + 23, cx + r - 23, cy + r - 23], outline=(255, 230, 140, 180), width=2)
    
    img = apply_drop_shadow(img, mask, offset=(16, 26), radius=28, strength=0.58)
    img.paste(brooch_layer, (0, 0), brooch_layer)
    img.save('public/images/products/botanical-brooch.jpg', quality=92)

# =========================================================================
# 8. FLORAL RING (Brass Signet Ring with Floral Stone Cabochon)
# =========================================================================
def create_ring():
    print("Generating floral-ring.jpg...")
    img = linen_bg.copy()
    
    cx, cy = 512, 512
    ring_layer = Image.new('RGBA', (1024, 1024), (0,0,0,0))
    d_ring = ImageDraw.Draw(ring_layer)
    mask = Image.new('L', (1024, 1024), 0)
    d_mask = ImageDraw.Draw(mask)
    
    # 1. Brass band ring shank angled in perspective
    d_mask.ellipse([cx - 180, cy - 80, cx + 180, cy + 240], fill=255)
    # Band ellipse
    d_ring.ellipse([cx - 180, cy - 80, cx + 180, cy + 240], fill=(160, 120, 55, 255), outline=(90, 60, 25, 255), width=8)
    d_ring.ellipse([cx - 145, cy - 45, cx + 145, cy + 205], fill=(0, 0, 0, 0)) # hollow interior
    # Metallic sheen
    d_ring.arc([cx - 175, cy - 75, cx + 175, cy + 235], start=40, end=140, fill=(245, 225, 140, 220), width=6)
    
    # 2. Bezel Setting & Floral Stone Cabochon on top
    bw, bh = 280, 200
    b_mask = Image.new('L', (bw, bh), 0)
    d_bmask = ImageDraw.Draw(b_mask)
    d_bmask.ellipse([6, 6, bw - 7, bh - 7], fill=255)
    
    mask.paste(b_mask, (cx - bw // 2, cy - 140), b_mask)
    
    # Bezel rim
    d_ring.ellipse([cx - bw // 2 - 8, cy - 148, cx + bw // 2 + 8, cy - 140 + bh + 8],
                   fill=(180, 140, 65, 255), outline=(80, 50, 20, 255), width=4)
                   
    # Cabochon floral stone
    cabo_tex = casein_yellow.resize((bw, bh), Image.Resampling.LANCZOS)
    ring_layer.paste(cabo_tex, (cx - bw // 2, cy - 140), b_mask)
    
    # Dome 3D highlight
    d_ring.ellipse([cx - 70, cy - 120, cx - 10, cy - 80], fill=(255, 255, 245, 140))
    
    img = apply_drop_shadow(img, mask, offset=(18, 28), radius=30, strength=0.6)
    img.paste(ring_layer, (0, 0), ring_layer)
    img.save('public/images/products/floral-ring.jpg', quality=92)

# =========================================================================
# 9. BOTANICAL BANGLE (Seamless Floral Casein Stone Bangle)
# =========================================================================
def create_bangle():
    print("Generating botanical-bangle.jpg...")
    img = linen_bg.copy()
    
    cx, cy = 512, 512
    rw, rh = 340, 260 # outer ellipse
    iw, ih = 220, 160 # inner hole
    
    bangle_layer = Image.new('RGBA', (1024, 1024), (0,0,0,0))
    d_ban = ImageDraw.Draw(bangle_layer)
    
    outer_mask = Image.new('L', (1024, 1024), 0)
    d_omask = ImageDraw.Draw(outer_mask)
    d_omask.ellipse([cx - rw, cy - rh, cx + rw, cy + rh], fill=255)
    d_omask.ellipse([cx - iw, cy - ih, cx + iw, cy + ih], fill=0)
    
    img = apply_drop_shadow(img, outer_mask, offset=(20, 30), radius=32, strength=0.55)
    
    # Paste casein stone texture across bangle
    bangle_tex = casein_patch.resize((rw * 2, rh * 2), Image.Resampling.LANCZOS)
    bangle_layer.paste(bangle_tex, (cx - rw, cy - rh), outer_mask.crop((cx - rw, cy - rh, cx + rw, cy + rh)))
    
    # Smooth 3D contour bevels & specular highlights
    d_ban.ellipse([cx - rw + 3, cy - rh + 3, cx + rw - 3, cy + rh - 3], outline=(255, 250, 240, 160), width=4)
    d_ban.ellipse([cx - iw - 2, cy - ih - 2, cx + iw + 2, cy + ih + 2], outline=(50, 35, 25, 90), width=3)
    # Specular rim highlight on upper curve
    d_ban.arc([cx - rw + 6, cy - rh + 6, cx + rw - 6, cy + rh - 6], start=190, end=350, fill=(255, 255, 245, 180), width=5)
    
    img.paste(bangle_layer, (0, 0), bangle_layer)
    img.save('public/images/products/botanical-bangle.jpg', quality=92)

# =========================================================================
# 10. TRIAL SACHET HAIR MASK (Biodegradable Discovery Pouch on Linen)
# =========================================================================
def create_trial_sachet():
    print("Generating trial-sachet-hair-mask.jpg...")
    # Base includes loose petals
    img = linen_bg.copy()
    
    # Paste genuine loose marigold petals on the linen cloth
    petals_scaled = loose_marigolds.resize((360, 240), Image.Resampling.LANCZOS)
    img.paste(petals_scaled, (60, 680))
    
    # Sachet pouch dimensions
    px, py, pw, ph = 340, 200, 344, 524
    
    s_mask = Image.new('L', (1024, 1024), 0)
    d_smask = ImageDraw.Draw(s_mask)
    d_smask.rounded_rectangle([px, py, px + pw, py + ph], radius=16, fill=255)
    
    img = apply_drop_shadow(img, s_mask, offset=(16, 26), radius=28, strength=0.55)
    
    pouch = Image.new('RGBA', (1024, 1024), (0,0,0,0))
    d_p = ImageDraw.Draw(pouch)
    
    # Biodegradable warm kraft paper texture gradient
    for y in range(py, py + ph):
        prog = (y - py) / float(ph)
        r = int(242 - prog * 20)
        g = int(234 - prog * 22)
        b = int(220 - prog * 25)
        d_p.line([(px, y), (px + pw, y)], fill=(r, g, b, 255), width=1)
        
    # Heat-crimp seals at top and bottom (textured ribbed lines)
    for y_line in range(py + 4, py + 36, 4):
        d_p.line([(px, y_line), (px + pw, y_line)], fill=(185, 170, 150, 160), width=1)
        d_p.line([(px, y_line + 1), (px + pw, y_line + 1)], fill=(255, 250, 240, 160), width=1)
    for y_line in range(py + ph - 36, py + ph - 4, 4):
        d_p.line([(px, y_line), (px + pw, y_line)], fill=(185, 170, 150, 160), width=1)
        d_p.line([(px, y_line + 1), (px + pw, y_line + 1)], fill=(255, 250, 240, 160), width=1)
        
    # Tear notch on left
    d_p.polygon([(px - 1, py + 52), (px + 12, py + 58), (px - 1, py + 64)], fill=(150, 135, 115, 255))
    
    # Elegant typography & emblem on sachet
    cx = px + pw // 2
    # Terracotta botanical medallion
    d_p.ellipse([cx - 36, py + 140, cx + 36, py + 212], outline=(200, 90, 50, 220), width=2)
    d_p.ellipse([cx - 24, py + 152, cx + 24, py + 200], fill=(200, 90, 50, 45))
    
    # Clean label border
    d_p.rounded_rectangle([px + 30, py + 90, px + pw - 30, py + ph - 90], radius=8,
                          outline=(210, 195, 175, 180), width=1)
                          
    img.paste(pouch, (0, 0), s_mask)
    img.save('public/images/products/trial-sachet-hair-mask.jpg', quality=92)

# =========================================================================
# 11. FAMILY SIZE HAIR MASK, 250 G (Apothecary Jar on Travertine & Linen)
# =========================================================================
def create_family_size_mask():
    print("Generating family-size-hair-mask.jpg...")
    # Based directly on the pristine studio scene of the 100g scalp mask
    # We upscale and center the apothecary jar setup with warm marigold petals
    img = scalp_mask_im.copy()
    
    # Crop to focus on the generous apothecary jar and floral staging
    w, h = img.size
    side = min(w, h)
    img = img.crop(((w - side) // 2, (h - side) // 2, (w + side) // 2, (h + side) // 2))
    img = img.resize((1024, 1024), Image.Resampling.LANCZOS)
    
    img.save('public/images/products/family-size-hair-mask.jpg', quality=94)

if __name__ == '__main__':
    create_notebook_cover()
    create_tote_bag()
    create_sling_bag()
    create_necklace()
    create_beads_charms()
    create_hair_accessories()
    create_brooch()
    create_ring()
    create_bangle()
    create_trial_sachet()
    create_family_size_mask()
    print("ALL 11 PRODUCT PHOTOGRAPHS GENERATED SUCCESSFULLY.")
