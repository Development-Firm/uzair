import { useEffect } from 'react'
import { setPatterns } from '@/lib/store/features/textures/textureSlice'
import { useAppDispatch } from '@/lib/store/hooks'
import { useTexture } from '@react-three/drei'
import {
  RepeatWrapping,
  SRGBColorSpace
} from 'three'

const multiColorPatternsUrls = {
  flatBox: {
    Pattern_01: [
      
    ],
    Pattern_02: [
 
    ],
    Pattern_03: [
   
    ],
    Pattern_04: [
    
    ],
    Pattern_05: [

    ]
  }
}

const LoadPatternsForFlatBox = ({ modelType }) => {
  const dispatch = useAppDispatch()
  const [
    //------- Pattern_01
    front_back_01,
    left_right_01,
    top_bottom_01,
    outside_inside_01,
    //------- Pattern_02
    front_back_02,
    left_right_02,
    top_bottom_02,
    outside_inside_02,
    //------- Pattern_03
    front_back_03,
    left_right_03,
    top_bottom_03,
    outside_inside_03,
    //------- Pattern_04
    front_back_04,
    left_right_04,
    top_bottom_04,
    outside_inside_04,
    //------- Pattern_05
    front_back_05,
    left_right_05,
    top_bottom_05,
    outside_inside_05
  ] = useTexture([
    ...multiColorPatternsUrls[modelType].Pattern_01,
    ...multiColorPatternsUrls[modelType].Pattern_02,
    ...multiColorPatternsUrls[modelType].Pattern_03,
    ...multiColorPatternsUrls[modelType].Pattern_04,
    ...multiColorPatternsUrls[modelType].Pattern_05
  ])

  const textures = [
    front_back_01,
    left_right_01,
    top_bottom_01,
    outside_inside_01,
    //------- Pattern_02
    front_back_02,
    left_right_02,
    top_bottom_02,
    outside_inside_02,
    //------- Pattern_03
    front_back_03,
    left_right_03,
    top_bottom_03,
    outside_inside_03,
    //------- Pattern_04
    front_back_04,
    left_right_04,
    top_bottom_04,
    outside_inside_04,
    //------- Pattern_05
    front_back_05,
    left_right_05,
    top_bottom_05,
    outside_inside_05
  ]

  textures.forEach(texture => {
    texture.generateMipmaps = true
    texture.colorSpace = SRGBColorSpace
    texture.wrapS = RepeatWrapping
    texture.wrapT = RepeatWrapping
    texture.repeat.set(1, 1)
    texture.needsUpdate = true
  })

  useEffect(() => {
    if (modelType === 'none') {
      return
    }
    let textureMap = {
      ['multi-color']: {
        // pattern type
        ['Pattern_01']: {
          // pattern name
          ['flat']: {
            // box type
            outside_front: front_back_01,
            outside_back: front_back_01,
            outside_left: left_right_01,
            outside_right: left_right_01,
            outside_top: top_bottom_01,
            outside_bottom: top_bottom_01,
            outside: outside_inside_01,
            inside: outside_inside_01,
            inside_top: front_back_01,
            inside_bottom: top_bottom_01,
            inside_back: top_bottom_01,
            inside_front: front_back_01
          }
        },
        ['Pattern_02']: {
          // pattern name
          ['flat']: {
            // box type
            outside_front: front_back_02,
            outside_back: front_back_02,
            outside_left: left_right_02,
            outside_right: left_right_02,
            outside_top: top_bottom_02,
            outside_bottom: top_bottom_02,
            outside: outside_inside_02,
            inside: outside_inside_02,
            inside_top: front_back_02,
            inside_bottom: top_bottom_02,
            inside_back: top_bottom_02,
            inside_front: front_back_02
          }
        },
        ['Pattern_03']: {
          // pattern name
          ['flat']: {
            // box type
            outside_front: front_back_03,
            outside_back: front_back_03,
            outside_left: left_right_03,
            outside_right: left_right_03,
            outside_top: top_bottom_03,
            outside_bottom: top_bottom_03,
            outside: outside_inside_03,
            inside: outside_inside_03,
            inside_top: front_back_03,
            inside_bottom: top_bottom_03,
            inside_back: top_bottom_03,
            inside_front: front_back_03
          }
        },
        ['Pattern_04']: {
          // pattern name
          ['flat']: {
            // box type
            outside_front: front_back_04,
            outside_back: front_back_04,
            outside_left: left_right_04,
            outside_right: left_right_04,
            outside_top: top_bottom_04,
            outside_bottom: top_bottom_04,
            outside: outside_inside_04,
            inside: outside_inside_04,
            inside_top: front_back_04,
            inside_bottom: top_bottom_04,
            inside_back: top_bottom_04,
            inside_front: front_back_04
          }
        },
        ['Pattern_05']: {
          // pattern name
          ['flat']: {
            // box type
            outside_front: front_back_05,
            outside_back: front_back_05,
            outside_left: left_right_05,
            outside_right: left_right_05,
            outside_top: top_bottom_05,
            outside_bottom: top_bottom_05,
            outside: outside_inside_05,
            inside: outside_inside_05,
            inside_top: front_back_05,
            inside_bottom: top_bottom_05,
            inside_back: top_bottom_05,
            inside_front: front_back_05
          }
        }
      }
    }
    dispatch(setPatterns(textureMap))
  }, [
    dispatch,
    front_back_01,
    left_right_01,
    top_bottom_01,
    outside_inside_01,
    front_back_02,
    left_right_02,
    top_bottom_02,
    outside_inside_02,
    modelType,
    front_back_03,
    left_right_03,
    top_bottom_03,
    outside_inside_03,
    front_back_04,
    left_right_04,
    top_bottom_04,
    outside_inside_04,
    front_back_05,
    left_right_05,
    top_bottom_05,
    outside_inside_05
  ])

  return null
}



export default LoadPatternsForFlatBox
