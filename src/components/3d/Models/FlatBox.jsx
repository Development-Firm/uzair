'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { metersToMillimeters, preloadAllMaterials } from '@/lib/utils/index'
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks'
import { selectBoxCoating, selectBoxColor, selectBoxPattern, setBoxDimensions } from '@/lib/store/features/box/boxSlice'
import useBoxDimensionHandler from '@/lib/hooks/useBoxDimensionHandler'
import useBaseManipulator from '@/lib/hooks/useBaseManipulator'

export function FlatBox({ scale = 1, ...props }) {
  const group = useRef(null)
  const { nodes, materials } = useGLTF('/assets/models/flat-box/flat_box.glb')
  const [originalSize, setOriginalSize] = useState(new THREE.Vector3())
  const boxPattern = useAppSelector(selectBoxPattern)
  const boxColor = useAppSelector(selectBoxColor)
  const boxCoating = useAppSelector(selectBoxCoating)

  const dispatch = useAppDispatch()

  useEffect(() => {
    setTimeout(() => {
      preloadAllMaterials()
    }, 0)
  }, [])

  const outsideTopPatternPath = boxPattern !== 'none'
    ? `/assets/models/flat-box/patterns/${boxPattern}/outside_top.jpg`
    : `/assets/models/flat-box/patterns/base.jpg`

  const outsideRightPatternPath = boxPattern !== 'none'
    ? `/assets/models/flat-box/patterns/${boxPattern}/outside_right.jpg`
    : `/assets/models/flat-box/patterns/base.jpg`

  const outsideLeftPatternPath = boxPattern !== 'none'
    ? `/assets/models/flat-box/patterns/${boxPattern}/outside_left.jpg`
    : `/assets/models/flat-box/patterns/base.jpg`

  const outsideFrontPatternPath = boxPattern !== 'none'
    ? `/assets/models/flat-box/patterns/${boxPattern}/outside_front.jpg`
    : `/assets/models/flat-box/patterns/base.jpg`

  const outsideBackPatternPath = boxPattern !== 'none'
    ? `/assets/models/flat-box/patterns/${boxPattern}/outside_back.jpg`
    : `/assets/models/flat-box/patterns/base.jpg`

  const outsideBottomPatternPath = boxPattern !== 'none'
    ? `/assets/models/flat-box/patterns/${boxPattern}/outside_bottom.jpg`
    : `/assets/models/flat-box/patterns/base.jpg`

  const insideBackPatternPath = boxPattern !== 'none'
    ? `/assets/models/flat-box/patterns/${boxPattern}/inside_back.jpg`
    : `/assets/models/flat-box/patterns/base.jpg`

  const insideBottomPatternPath = boxPattern !== 'none'
    ? `/assets/models/flat-box/patterns/${boxPattern}/inside_bottom.jpg`
    : `/assets/models/flat-box/patterns/base.jpg`

  const insideFrontPatternPath = boxPattern !== 'none'
    ? `/assets/models/flat-box/patterns/${boxPattern}/inside_front.jpg`
    : `/assets/models/flat-box/patterns/base.jpg`

  const insideTopPatternPath = boxPattern !== 'none'
    ? `/assets/models/flat-box/patterns/${boxPattern}/inside_top.jpg`
    : `/assets/models/flat-box/patterns/base.jpg`

  const boxCoatingTexturePath = boxCoating !== 'none'
    ? `/assets/models/flat-box/coatings/${boxCoating}.jpg`
    : `/assets/models/flat-box/patterns/base.jpg`

  const outsideTopPattern = useTexture(outsideTopPatternPath)
  const outsideRightPattern = useTexture(outsideRightPatternPath)
  const outsideLeftPattern = useTexture(outsideLeftPatternPath)
  const outsideFrontPattern = useTexture(outsideFrontPatternPath)
  const outsideBackPattern = useTexture(outsideBackPatternPath)
  const outsideBottomPattern = useTexture(outsideBottomPatternPath)
  const insideBackPattern = useTexture(insideBackPatternPath)
  const insideBottomPattern = useTexture(insideBottomPatternPath)
  const insideFrontPattern = useTexture(insideFrontPatternPath)
  const insideTopPattern = useTexture(insideTopPatternPath)

  const clearcoatMapTexture = useTexture(boxCoatingTexturePath)
  clearcoatMapTexture.flipY = false

  let clearcoatRoughness = 0
  let clearcoat = 0

  if (boxCoating !== 'none') {
    if (boxCoating === 'matt') {
      clearcoatRoughness = 0.3
      clearcoat = 0.7
    } else if (boxCoating === 'gloss') {
      clearcoatRoughness = 0.3
      clearcoat = 1
    } else if (boxCoating !== 'gloss_aqueous') {
      clearcoatRoughness = 0.4
      clearcoat = 0.6
    }
  }

  const allTextures = [
    outsideTopPattern, outsideRightPattern, outsideLeftPattern,
    outsideFrontPattern, outsideBackPattern, outsideBottomPattern,
    insideBackPattern, insideBottomPattern, insideFrontPattern, insideTopPattern
  ]

  allTextures.forEach(texture => {
    texture.flipY = false
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.colorSpace = THREE.SRGBColorSpace
  })

  useEffect(() => {
    if (group.current) {
      const box = new THREE.Box3().setFromObject(group.current)
      const size = new THREE.Vector3()
      box.getSize(size)

      setOriginalSize(size)
      dispatch(
        setBoxDimensions({
          length: metersToMillimeters(size.x * scale),
          breadth: metersToMillimeters(size.z * scale),
          height: metersToMillimeters(size.y * scale),
          unit: 'mm'
        })
      )
    }
  }, [])

  const positionYAdjustmentFactor = 0.05
  useBoxDimensionHandler({ groupRef: group, scale, originalSize, positionYAdjustmentFactor })
  useBaseManipulator()

  return (
    <group ref={group} key={boxPattern} scale={scale} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" scale={0.026}>
          <group name="box">
            <skinnedMesh
              name="outside"
              geometry={nodes.material_print001.geometry}
              material={materials.Material_color_outside}
              skeleton={nodes.material_print001.skeleton}
            >
              <meshPhysicalMaterial
                map={boxPattern !== 'none' ? outsideTopPattern : null}
                color={new THREE.Color(boxColor)}
              />
            </skinnedMesh>
            <skinnedMesh
              name="outside_top"
              geometry={nodes.material_print001_2.geometry}
              material={materials.out_top}
              skeleton={nodes.material_print001_2.skeleton}
            >
              <meshPhysicalMaterial
                map={boxPattern !== 'none' ? outsideTopPattern : null}
                color={new THREE.Color(boxColor)}
                clearcoatMap={clearcoatMapTexture}
                clearcoat={clearcoat}
                clearcoatRoughness={clearcoatRoughness}
              />
            </skinnedMesh>
            <skinnedMesh
              name="outside_right"
              geometry={nodes.material_print001_3.geometry}
              material={materials.out_right}
              skeleton={nodes.material_print001_3.skeleton}
            >
              <meshPhysicalMaterial
                map={boxPattern !== 'none' ? outsideRightPattern : null}
                color={new THREE.Color(boxColor)}
              />
            </skinnedMesh>
            <skinnedMesh
              name="outside_left"
              geometry={nodes.material_print001_4.geometry}
              material={materials.out_left}
              skeleton={nodes.material_print001_4.skeleton}
            >
              <meshPhysicalMaterial
                map={boxPattern !== 'none' ? outsideLeftPattern : null}
                color={new THREE.Color(boxColor)}
              />
            </skinnedMesh>
            <skinnedMesh
              name="outside_front"
              geometry={nodes.material_print001_5.geometry}
              material={materials.out_front}
              skeleton={nodes.material_print001_5.skeleton}
            >
              <meshPhysicalMaterial
                map={boxPattern !== 'none' ? outsideFrontPattern : null}
                color={new THREE.Color(boxColor)}
              />
            </skinnedMesh>
            <skinnedMesh
              name="outside_back"
              geometry={nodes.material_print001_6.geometry}
              material={materials.out_back}
              skeleton={nodes.material_print001_6.skeleton}
            >
              <meshPhysicalMaterial
                map={boxPattern !== 'none' ? outsideBackPattern : null}
                color={new THREE.Color(boxColor)}
              />
            </skinnedMesh>
            <skinnedMesh
              name="outside_bottom"
              geometry={nodes.material_print001_7.geometry}
              material={materials.out_bottom}
              skeleton={nodes.material_print001_7.skeleton}
            >
              <meshPhysicalMaterial
                map={boxPattern !== 'none' ? outsideBottomPattern : null}
                color={new THREE.Color(boxColor)}
              />
            </skinnedMesh>
            <skinnedMesh
              name="inside_back"
              geometry={nodes.material_print001_8.geometry}
              material={materials.inside_top}
              skeleton={nodes.material_print001_8.skeleton}
            >
              <meshPhysicalMaterial
                map={boxPattern !== 'none' ? insideBackPattern : null}
                color={new THREE.Color(boxColor)}
              />
            </skinnedMesh>
            <skinnedMesh
              name="inside_bottom"
              geometry={nodes.material_print001_9.geometry}
              material={materials.inside_bottom}
              skeleton={nodes.material_print001_9.skeleton}
            >
              <meshPhysicalMaterial
                map={boxPattern !== 'none' ? insideBottomPattern : null}
                color={new THREE.Color(boxColor)}
              />
            </skinnedMesh>
            <skinnedMesh
              name="inside_front"
              geometry={nodes.material_print001_10.geometry}
              material={materials.inside_bottom_front}
              skeleton={nodes.material_print001_10.skeleton}
            >
              <meshPhysicalMaterial
                map={boxPattern !== 'none' ? insideFrontPattern : null}
                color={new THREE.Color(boxColor)}
              />
            </skinnedMesh>
            <skinnedMesh
              name="inside_top"
              geometry={nodes.material_print001_11.geometry}
              material={materials.inside_toplid}
              skeleton={nodes.material_print001_11.skeleton}
            >
              <meshPhysicalMaterial
                map={boxPattern !== 'none' ? insideTopPattern : null}
                color={new THREE.Color(boxColor)}
              />
            </skinnedMesh>
          </group>
          <primitive object={nodes.main} />
          <primitive object={nodes.neutral_bone} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/flat-box/flat_box.glb')
