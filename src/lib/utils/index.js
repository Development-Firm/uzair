/* eslint-disable react-hooks/rules-of-hooks */
import { useTexture } from '@react-three/drei';

// Material URLs object
const MaterialUrls = {
  flatBox: {
    patterns: [
      '/assets/models/flat-box/patterns/pattern_01/inside_back.jpg',
      '/assets/models/flat-box/patterns/pattern_01/inside_bottom.jpg',
      '/assets/models/flat-box/patterns/pattern_01/inside_front.jpg',
      '/assets/models/flat-box/patterns/pattern_01/inside_top.jpg',
      '/assets/models/flat-box/patterns/pattern_01/outside_back.jpg',
      '/assets/models/flat-box/patterns/pattern_01/outside_bottom.jpg',
      '/assets/models/flat-box/patterns/pattern_01/outside_front.jpg',
      '/assets/models/flat-box/patterns/pattern_01/outside_left.jpg',
      '/assets/models/flat-box/patterns/pattern_01/outside_right.jpg',
      '/assets/models/flat-box/patterns/pattern_01/outside_top.jpg',
      '/assets/models/flat-box/patterns/pattern_02/inside_back.jpg',
      '/assets/models/flat-box/patterns/pattern_02/inside_bottom.jpg',
      '/assets/models/flat-box/patterns/pattern_02/inside_front.jpg',
      '/assets/models/flat-box/patterns/pattern_02/inside_top.jpg',
      '/assets/models/flat-box/patterns/pattern_02/outside_back.jpg',
      '/assets/models/flat-box/patterns/pattern_02/outside_bottom.jpg',
      '/assets/models/flat-box/patterns/pattern_02/outside_front.jpg',
      '/assets/models/flat-box/patterns/pattern_02/outside_left.jpg',
      '/assets/models/flat-box/patterns/pattern_02/outside_right.jpg',
      '/assets/models/flat-box/patterns/pattern_02/outside_top.jpg',
      '/assets/models/flat-box/patterns/pattern_03/inside_back.jpg',
      '/assets/models/flat-box/patterns/pattern_03/inside_bottom.jpg',
      '/assets/models/flat-box/patterns/pattern_03/inside_front.jpg',
      '/assets/models/flat-box/patterns/pattern_03/inside_top.jpg',
      '/assets/models/flat-box/patterns/pattern_03/outside_back.jpg',
      '/assets/models/flat-box/patterns/pattern_03/outside_bottom.jpg',
      '/assets/models/flat-box/patterns/pattern_03/outside_front.jpg',
      '/assets/models/flat-box/patterns/pattern_03/outside_left.jpg',
      '/assets/models/flat-box/patterns/pattern_03/outside_right.jpg',
      '/assets/models/flat-box/patterns/pattern_03/outside_top.jpg',
      '/assets/models/flat-box/patterns/pattern_04/inside_back.jpg',
      '/assets/models/flat-box/patterns/pattern_04/inside_bottom.jpg',
      '/assets/models/flat-box/patterns/pattern_04/inside_front.jpg',
      '/assets/models/flat-box/patterns/pattern_04/inside_top.jpg',
      '/assets/models/flat-box/patterns/pattern_04/outside_back.jpg',
      '/assets/models/flat-box/patterns/pattern_04/outside_bottom.jpg',
      '/assets/models/flat-box/patterns/pattern_04/outside_front.jpg',
      '/assets/models/flat-box/patterns/pattern_04/outside_left.jpg',
      '/assets/models/flat-box/patterns/pattern_04/outside_right.jpg',
      '/assets/models/flat-box/patterns/pattern_04/outside_top.jpg',
      '/assets/models/flat-box/patterns/pattern_05/inside_back.jpg',
      '/assets/models/flat-box/patterns/pattern_05/inside_bottom.jpg',
      '/assets/models/flat-box/patterns/pattern_05/inside_front.jpg',
      '/assets/models/flat-box/patterns/pattern_05/inside_top.jpg',
      '/assets/models/flat-box/patterns/pattern_05/outside_back.jpg',
      '/assets/models/flat-box/patterns/pattern_05/outside_bottom.jpg',
      '/assets/models/flat-box/patterns/pattern_05/outside_front.jpg',
      '/assets/models/flat-box/patterns/pattern_05/outside_left.jpg',
      '/assets/models/flat-box/patterns/pattern_05/outside_right.jpg',
      '/assets/models/flat-box/patterns/pattern_05/outside_top.jpg',
    ],
    textures: ['/assets/models/flat-box/coatings/matt.jpg'],
    coatings: [
      '/assets/models/flat-box/coatings/gloss_aqueous.jpg',
      '/assets/models/flat-box/coatings/gloss.jpg',
      '/assets/models/flat-box/coatings/matt.jpg',
    ],
  },
};

// Function to preload all materials
export const preloadAllMaterials = () => {
  Object.keys(MaterialUrls).forEach((model) => {
    const materialUrls = MaterialUrls[model];
    Object.keys(materialUrls).forEach((material) => {
      materialUrls[material].forEach((url) => {
        requestIdleCallback(() => {
          useTexture.preload(url);
        });
      });
    });
  });
};

// Function to preload materials of a single model
export const preloadSingleModelMaterial = (modelName) => {
  const materialUrls = MaterialUrls[modelName];
  if (materialUrls) {
    Object.keys(materialUrls).forEach((material) => {
      materialUrls[material].forEach((url) => {
        requestIdleCallback(() => {
          useTexture.preload(url);
        });
      });
    });
  } else {
    console.warn(`Model "${modelName}" not found in MaterialUrls.`);
  }
};

// Convert meters to millimeters
export const metersToMillimeters = (meters) => {
  const millimeters = meters * 1000;
  return Math.round(millimeters * 10000) / 10000; // Rounding to four decimal places
};

