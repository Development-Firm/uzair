import { useEffect } from 'react';
import { useAppSelector } from '@/lib/store/hooks';
import * as THREE from 'three';
import { selectBoxDimensions } from '../store/features/box/boxSlice';

function useBoxDimensionHandler({
  groupRef,
  originalSize,
  positionYAdjustmentFactor
}) {
  const boxDimensions = useAppSelector(selectBoxDimensions);
  const { length, breadth, height, unit } = boxDimensions;

  // Scale and adjust position based on input dimensions
  useEffect(() => {
    if (
      groupRef.current &&
      originalSize.x > 0 &&
      originalSize.y > 0 &&
      originalSize.z > 0
    ) {
      const currentScale = {
        x: groupRef.current.scale.x,
        y: groupRef.current.scale.y,
        z: groupRef.current.scale.z,
      };

      const conversionFactor = unit === 'in' ? 39.37 : 1000;
      const newScale = {
        x: length / conversionFactor / originalSize.x,
        y: height / conversionFactor / originalSize.y,
        z: breadth / conversionFactor / originalSize.z,
      };

      groupRef.current.scale.set(newScale.x, newScale.y, newScale.z);

      const scaleYChange = newScale.y - currentScale.y;
      const positionYAdjustment =
        scaleYChange * originalSize.y * positionYAdjustmentFactor;

      groupRef.current.position.y += positionYAdjustment;
    }
  }, [
    length,
    breadth,
    height,
    unit,
    originalSize,
    groupRef,
    positionYAdjustmentFactor,
  ]);
}

export default useBoxDimensionHandler;
