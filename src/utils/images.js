const imageModules = import.meta.glob('../assets/product/*.{png,jpg,jpeg,webp,svg}', {
  eager: true,
  import: 'default',
});

const productImages = [];

for (const path in imageModules) {
  productImages.push(imageModules[path]);
}

// Optional: Sort by filename for consistent order
productImages.sort();

export default productImages;
