# GalleryImageCard vs GalleryVideoCard - Detailed Comparison

## Structure Difference

### GalleryImageCard (Current)

```
<div wrapper>
  <motion.div (shadow-lg shadow-gray-700 rounded-lg)>
    {content}
  </motion.div>
</div>
```

### GalleryVideoCard (Current)

```
<motion.div (shadow-lg shadow-gray-700 rounded-lg)>
  {content}
</motion.div>
```

---

## Side-by-Side Styling Comparison

| Aspect           | GalleryImageCard                            | GalleryVideoCard                     | Issue                                      |
| ---------------- | ------------------------------------------- | ------------------------------------ | ------------------------------------------ |
| **Container**    | Outer `<div>` + inner `<motion.div>`        | Single `<motion.div>`                | ❌ Different structure                     |
| **Height**       | Outer div: `height: ${maxHeightValue}vh`    | Direct: `height: getHeight() + 'vh'` | ⚠️ Should align                            |
| **Border**       | `border-black border-8` on outer            | None                                 | ❌ **Missing border**                      |
| **Inset Shadow** | `boxShadow: 'inset 0em 1em black'` on outer | None                                 | ❌ **Missing inset shadow** - This is KEY! |
| **Max Height**   | `max-h-[75vh]` on outer                     | None                                 | ⚠️ Missing constraint                      |
| **Perspective**  | `perspective: '1000px'` on outer            | None                                 | ℹ️ For 3D effects                          |
| **Overflow**     | Not specified                               | `overflow-hidden`                    | ⚠️ Images more flexible?                   |
| **Inner Shadow** | `shadow-lg shadow-gray-700` on inner        | `shadow-lg shadow-gray-700`          | ✅ Same                                    |
| **Rounded**      | `rounded-lg` on inner                       | `rounded-lg`                         | ✅ Same                                    |

---

## Root Causes of Visual Difference

### 1. **INSET SHADOW** (Most Noticeable)

The image card has an **inset shadow** that creates depth:

```css
boxshadow: 'inset 0em 1em black';
```

This dark inset at the bottom makes images look more "framed" and unified.

### 2. **Border Styling**

Images have `border-black border-8` which creates a distinct frame.
Videos have no border.

### 3. **Max Height Constraint**

Images: `max-h-[75vh]` keeps cards from getting too tall
Videos: No constraint - could grow larger

### 4. **Container Nesting**

Images have a wrapper div that adds structural definition.
Videos are flat - less visual hierarchy.

### 5. **Additional Styling on Wrapper**

Images have transitions and background color changes on the outer wrapper.
Videos don't have this layer.

---

## Visual Explanation

```
GalleryImageCard:
┌─────────────────────────┐  ← Outer wrapper (border, inset shadow, transitions)
│ ┌───────────────────┐   │
│ │ Image Content     │   │  ← Inner motion.div (shadow-lg shadow-gray-700)
│ │ (with 3D effects) │   │
│ └───────────────────┘   │
└─────────────────────────┘

GalleryVideoCard:
┌───────────────────────────┐  ← Single motion.div (shadow-lg shadow-gray-700)
│ Video Content             │
│ (no outer wrapper)        │
└───────────────────────────┘
```

---

## Why Videos Appear Wider

1. **No border** - Videos don't have the visual "frame" that confines the content
2. **No inset shadow** - Images have visual depth that makes them feel more compact
3. **Flat structure** - Videos lack the nested container layering
4. **Different overflow handling** - `overflow-hidden` on video vs softer on image

---

## Recommendations

To make videos match images visually, we should:

1. **Add inset shadow** to video cards
2. **Add border styling** to video cards
3. **Add max-height constraint** to video cards
4. **Consider wrapper structure** or additional styling layer
5. **Match overflow behavior** if needed

This would make them visually consistent while maintaining their different interaction patterns (images: flip/selection, videos: play button).
