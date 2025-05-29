// src/utils/images.js

const imageModules = import.meta.glob('../assets/**/*.{png,jpg,jpeg,svg,webp}', {
  eager: true,
  import: 'default',
});

// Optional: Clean the keys to get file names only (like "logos/logo.png")
const images = {};

for (const path in imageModules) {
  // Extract the part after ../assets/
  const cleanPath = path.replace('../assets/', '');
  images[cleanPath] = imageModules[path];
}

export default images;
