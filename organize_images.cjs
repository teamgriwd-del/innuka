const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, 'src', 'assets');

const mapping = {
  'Screenshot_20260327-103738.jpg': { cat: 'Fragrances for Women', name: 'Modern Me Range', price: '$15', desc: 'Signature perfumed products for youth and vibrancy.' },
  'Screenshot_20260327-103759.jpg': { cat: 'Fragrances for Men', name: 'Exclusive Masculine Range', price: '$20', desc: 'Bold and sophisticated scents for him.' },
  'Screenshot_20260327-103819.jpg': { cat: 'Fragrances for Women', name: 'Signature Feminine Range', price: '$35', desc: 'Timeless elegance and lasting impressions.' },
  'Screenshot_20260327-103837.jpg': { cat: 'Fragrances for Women', name: 'Classic Feminine Collection', price: '$15', desc: 'Iconic scents that define femininity.' },
  'Screenshot_20260327-103854.jpg': { cat: 'Lotions', name: 'Luxury Lotion & Body Wash', price: '$10', desc: 'Fragrance layering for soft, nourished skin.' },
  'Screenshot_20260327-103916.jpg': { cat: 'Fragrances for Men', name: 'Luxury Travel Fragrance Set (Him)', price: '$36', desc: 'Five most loved fragrances in travel bottles.' },
  'Screenshot_20260327-104110.jpg': { cat: 'Fragrances for Women', name: 'Luxury Travel Fragrance Set (Her)', price: '$36', desc: 'Five most loved fragrances for her journey.' },
  'Screenshot_20260327-104130.jpg': { cat: 'Fragrances for Women', name: 'Message in a Bottle - Peace & Hope', price: '$15', desc: 'Evocative scents to calm the heart and soul.' },
  'Screenshot_20260327-104154.jpg': { cat: 'Fragrances for Women', name: 'Message in a Bottle - Faith & Dream', price: '$15', desc: 'Scents to inspire belief and big dreams.' },
  'Screenshot_20260327-104212.jpg': { cat: 'Bathing Soaps', name: 'Reed Room Diffusers', price: '$20', desc: 'Elevate your surroundings with luxurious fragrance.' },
  'Screenshot_20260327-104228.jpg': { cat: 'Bathing Soaps', name: 'Home Care Collection', price: '$8', desc: 'Scented envelopes and room mists.' },
  'Screenshot_20260327-104248.jpg': { cat: 'Lotions', name: 'Kiddies Perfume & Lotion', price: '$15', desc: 'Gentle and adorable scents for the little ones.' },
  'Screenshot_20260327-104306.jpg': { cat: 'Fragrances for Women', name: 'Youth Collection', price: '$14', desc: 'Vibrant fragrances for the next generation.' },
  'Screenshot_20260327-104332.jpg': { cat: 'Fragrances for Women', name: 'Youth Collection Set', price: '$14', desc: 'The complete youth fragrance experience.' },
  'Screenshot_20260327-104349.jpg': { cat: 'Bathing Soaps', name: 'Kiddies Bath Time Routine', price: '$10', desc: 'Epsom soak and bubble bath for peaceful sleep.' },
  'Screenshot_20260327-104406.jpg': { cat: 'Lotions', name: 'Skincare Essentials', price: '$7', desc: 'Insect repellent and intense therapy lip balm.' },
  'Screenshot_20260327-104421.jpg': { cat: 'Hair Products', name: 'Invest In Your Hair', price: '$10', desc: 'Natural organic treatments for your crown.' },
  'Screenshot_20260327-104437.jpg': { cat: 'Hair Products', name: 'Mohlolo Hair Care Set', price: '$10', desc: 'Everything you need for healthy, shiny hair.' },
  'Screenshot_20260327-104502.jpg': { cat: 'Hair Products', name: 'Hair Growth Oil & Serum', price: '$20', desc: 'Regenerating treatments for all hair types.' },
  'Screenshot_20260327-104517.jpg': { cat: 'Hair Products', name: 'Nourishing Shampoo & Conditioner', price: '$10', desc: 'Professional salon quality formula.' },
  'Screenshot_20260327-104541.jpg': { cat: 'Lotions', name: 'Miracle Oil & Skin Clearing', price: '$8', desc: 'Natural healing moisturizers for healthy skin.' },
  'Screenshot_20260327-104557.jpg': { cat: 'Bathing Soaps', name: 'Essential Oil Blends', price: '$20', desc: 'Therapeutic blends for safe, direct application.' },
  'Screenshot_20260327-104614.jpg': { cat: 'Lotions', name: 'Relief Remedy Rub', price: '$15', desc: 'Whole body comfort on a deeper level.' },
  'Screenshot_20260327-104629.jpg': { cat: 'Bathing Soaps', name: 'Epsom Soak Duo', price: '$10', desc: 'Soothing and relaxing muscle recovery.' },
  'Screenshot_20260327-104642.jpg': { cat: 'Bathing Soaps', name: 'Sleep Well Collection', price: '$7', desc: 'Lala pillow spray for faster sleep.' },
  'Screenshot_20260327-104655.jpg': { cat: 'Lotions', name: 'Night Time Ritual Set', price: '$15', desc: 'Natural skin repair oil and pillow mist.' },
  'Screenshot_20260327-104712.jpg': { cat: 'Lotions', name: 'Youthful Beauty Tissue Oil', price: '$15', desc: 'Moisturize, tone, and reduce fine lines.' },
  'Screenshot_20260327-104727.jpg': { cat: 'Bathing Soaps', name: 'Hygiene & Room Care', price: '$10', desc: 'Hand sanitizing gel and bloom the room mist.' },
  'Screenshot_20260327-104742.jpg': { cat: 'Bathing Soaps', name: 'Luxury Bath Range', price: '$13', desc: 'Empower your emotions with refined bath products.' },
  'Screenshot_20260327-104756.jpg': { cat: 'Bathing Soaps', name: 'Amari Bath Range', price: '$15', desc: 'Vibrant and captivating notes to energize.' },
  'Screenshot_20260327-104810.jpg': { cat: 'Lotions', name: 'Foot Care Heel Balm', price: '$12', desc: 'Intense hydration for deep heel repair.' },
  'Screenshot_20260327-104828.jpg': { cat: 'Bathing Soaps', name: 'Mineral Foot Care Set', price: '$13', desc: 'Refresh and heal aching, tired feet.' },
  'Screenshot_20260327-104843.jpg': { cat: 'Makeup', name: 'Natural Beautiful Skin Care', price: '$15', desc: 'Foaming cleanser and makeup removing oil.' },
  'Screenshot_20260327-104901.jpg': { cat: 'Lotions', name: 'Multi Effect Moisturizer', price: '$20', desc: 'Multi-tasker for smoother, firmer skin.' },
  'Screenshot_20260327-104915.jpg': { cat: 'Lotions', name: 'Facial Essence & Serum', price: '$30', desc: 'Prep and treat your skin for a youthful glow.' },
  'Screenshot_20260327-104926.jpg': { cat: 'Makeup', name: 'Skin Perfecting Foundation', price: '$20', desc: 'Flawless coverage for all skin types.' },
  'Screenshot_20260327-104943.jpg': { cat: 'Makeup', name: '3 in 1 Eyebrow Pencil', price: '$15', desc: 'Everything you need for exquisite eyebrows.' },
  'Screenshot_20260327-104959.jpg': { cat: 'Makeup', name: 'Long-wear Liquid Eyeliner', price: '$9', desc: 'Create a clean line in one easy sweep.' },
  'Screenshot_20260327-105014.jpg': { cat: 'Makeup', name: 'Fibre Volumizing Mascara', price: '$18', desc: 'Voluptuous perfection for your lashes.' },
  'Screenshot_20260327-105028.jpg': { cat: 'Makeup', name: 'Eye Shadow & Blusher', price: '$20', desc: 'Highly pigmented shades for every look.' },
  'Screenshot_20260327-105042.jpg': { cat: 'Makeup', name: 'Polished Perfection Lipsticks', price: '$10', desc: 'Long lasting, smudge proof, and water resistant.' },
  'Screenshot_20260327-105054.jpg': { cat: 'Makeup', name: 'Lip Care Essentials', price: '$10', desc: 'Lipstick removing oil, gloss, and liner.' },
  'Screenshot_20260327-105107.jpg': { cat: 'Lotions', name: 'Hand & Cuticle Cream', price: '$3', desc: 'Intensive moisture treatment for soft cuticles.' },
  'Screenshot_20260327-105121.jpg': { cat: 'Makeup', name: 'Lip Scrub & Balm', price: '$6', desc: 'Conditioning and hydrating for perfect lips.' },
  'Screenshot_20260327-105140.jpg': { cat: 'Makeup', name: 'Colour Stay Nail Polish', price: '$6', desc: 'Long wear protective layer for your nails.' },
  'Screenshot_20260327-105152.jpg': { cat: 'Makeup', name: 'French Manicure Set', price: '$15', desc: 'Metallic range and professional nail care.' },
  'Screenshot_20260327-105204.jpg': { cat: 'Lotions', name: 'Solar Shield Sunscreen', price: '$14', desc: 'SPF50 protection for your daily glow.' }
};

const categoryPrefixes = {
  'Lotions': 'lotion',
  'Hair Products': 'hair',
  'Makeup': 'makeup',
  'Bathing Soaps': 'soap',
  'Fragrances for Men': 'fragrance_men',
  'Fragrances for Women': 'fragrance_women'
};

const imageMapping = [];
const categoryCounters = {};

// Clean up existing categorized files first to avoid duplicates
const existingFiles = fs.readdirSync(assetsDir);
existingFiles.forEach(file => {
    if (file.endsWith('.jpg') || file.endsWith('.png')) {
        const isCategorized = Object.values(categoryPrefixes).some(p => file.startsWith(p + '_'));
        if (isCategorized) {
            fs.unlinkSync(path.join(assetsDir, file));
        }
    }
});

Object.entries(mapping).forEach(([oldName, data]) => {
  const oldPath = path.join(assetsDir, oldName);
  if (!fs.existsSync(oldPath)) {
      console.warn(`Warning: File ${oldName} not found! Skipping.`);
      return;
  }
  
  const prefix = categoryPrefixes[data.cat];
  categoryCounters[data.cat] = (categoryCounters[data.cat] || 0) + 1;
  const newFileName = `${prefix}_${categoryCounters[data.cat]}.jpg`;
  const newPath = path.join(assetsDir, newFileName);
  
  fs.copyFileSync(oldPath, newPath);
  
  imageMapping.push({
    id: imageMapping.length + 1,
    name: data.name,
    category: data.cat,
    imageName: newFileName,
    price: data.price,
    desc: data.desc
  });
});

const manifestContent = `export const PRODUCTS_DATA = ${JSON.stringify(imageMapping, null, 2)};`;
fs.writeFileSync(path.join(assetsDir, 'products_manifest.js'), manifestContent);

console.log('Images accurately categorized and manifest created!');
