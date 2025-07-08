'use client';

import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import * as Fabric from 'fabric';
import { SRGBColorSpace, TextureLoader } from 'three';
import { selectUpdatedModelAt } from '../store/features/general/generalSlice';
import { selectBoxColor, selectBoxPattern, selectCustomFacesForBox } from '../store/features/box/boxSlice';

const useBaseManipulator = () => {
  const patternType = useAppSelector(selectBoxPattern);
  const color = useAppSelector(selectBoxColor);
  const customBoxFaces = useAppSelector(selectCustomFacesForBox);
  const modelUpdateAt = useAppSelector(selectUpdatedModelAt);
  const dispatch = useAppDispatch();
  const { scene } = useThree();

  useEffect(() => {
    console.log('Base Manipulator Called', customBoxFaces);

    if (customBoxFaces) {
      Object.keys(customBoxFaces).forEach((face) => {
        const faceData = customBoxFaces[face];
        if (faceData) {
          const canvas = new Fabric.Canvas(null, {
            width: faceData?.dimensions?.width,
            height: faceData?.dimensions?.height,
          });

          console.log('------------------', faceData);
          canvas.loadFromJSON(faceData.canvasTexture, () => {
            // Render the canvas after loading the JSON
            canvas.renderAll();

            // Export the canvas to a data URL (image)
            const dataURL = canvas.toDataURL({
              format: 'png',
              multiplier: 1,
              quality: 1,
            });

            console.log('dataURL.............123', dataURL);

            new TextureLoader().load(dataURL, (texture) => {
              texture.colorSpace = SRGBColorSpace;

              // Find the mesh corresponding to the face
              const mesh = scene.getObjectByName(face);
              if (mesh && mesh.material) {
                mesh.material.map = texture;
                mesh.material.needsUpdate = true;

                // Dispatch the updated texture to the Redux store (if needed)
                // dispatch(updateSpecificCustomFaceOfBox({ face, texture }));
              }
            });
          });
        }
      });
    }
  }, [scene, color, patternType, modelUpdateAt, customBoxFaces, dispatch]);

  return {};
};

export default useBaseManipulator;
