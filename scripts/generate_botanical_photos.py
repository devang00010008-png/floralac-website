import numpy as np
from PIL import Image, ImageFilter, ImageDraw, ImageOps
import math
import os

os.makedirs('public/images/products', exist_ok=True)

# 1. Load source photographic materials
wallet_img = Image.open('public/images/products/floral-wallet.jpg').convert('RGBA')
earrings_img = Image.open('public/images/products/floral-earrings.jpg').convert('RGBA')
pendant_img = Image.open('public/images/products/pressed-flower-pendant.jpg').convert('RGBA')
card_holder_img = Image.open('public/images/products/floral-card-holder.jpg').convert('RGBA')
scalp_mask_img = Image.open('public/images/products/hibiscus-marigold-scalp-mask.jpg').convert('RGBA')

# 2. Extract clean background plates
# From earrings: the linen background in the upper half
earrings_bg = earrings_img.crop((0, 0, 1024, 450)).resize((1024, 1024), Image.Resampling.LANCZOS)
# From card holder: linen background in the upper left/right
card_bg = card_holder_img.crop((0, 0, 500, 500)).resize((1024, 1024), Image.Resampling.LANCZOS)

# 3. Extract core textures
# Leather with dried marigold & rose petals from wallet
leather_patch = wallet_img.crop((280, 240, 780, 740)) # 500x500 high-res leather with petals
# Casein stone with yellow marigolds from earrings
casein_disc = earrings_img.crop((240, 480, 560, 760)) # 320x280 smooth casein disc
# Casein stone with red rose & yellow petals from pendant
casein_stone = pendant_img.crop((340, 480, 640, 780)) # 300x300 textured casein
# Loose marigold petals from scalp mask
loose_petals = scalp_mask_img.crop((40, 600, 400, 840)) # 360x240 golden marigold shreds

print("Source textures loaded successfully.")
