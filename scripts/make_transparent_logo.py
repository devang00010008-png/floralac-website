import numpy as np
from PIL import Image

# Open the original logo
img = Image.open('public/images/floralac-logo.png').convert('RGB')
arr = np.array(img, dtype=float)

# Let's inspect the linen background color profile
# The background is on the left, right, top corners and bottom corners.
# Let's estimate the background across the image.
# We can sample the background from the left 0..80 and right 400..481
left_bg = arr[:, :80]
right_bg = arr[:, 400:]
top_bg = arr[:25, :]
bot_bg = arr[245:, :]

print(f"Image size: {img.size}")

# Let's find the center of the logo
# The circular emblem is roughly centered at (240, 133)
# Let's measure color distance from the local linen texture
# In the outer area, the texture has high frequency linen weave.
# The logo has:
# 1. Terracotta text 'FLORALAC' at top
# 2. Darker terracotta text 'SECOND LIFE MATERIALS' at bottom
# 3. Outer circular ring or outline? Let's check!
# 4. In the center, cream background with flowers and milk curl.

# Let's check where the text pixels are
# Terracotta text color: High R, medium G, low B (R - B > 40, R > 120)
# Green leaves: G > R, G > B or high G
# Yellow marigold: High R & G, low B (R > 180, G > 140, B < 80)
# Cream milk wave: Very bright (R > 230, G > 220, B > 200) with dark outline
# Outline: Dark brown/charcoal (R < 100, G < 100, B < 100)
