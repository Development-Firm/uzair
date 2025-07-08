import { useEffect } from 'react'
import { useAppDispatch } from '@/lib/store/hooks'
import { useTexture } from '@react-three/drei'
import { setCoatings } from '@/lib/store/features/textures/textureSlice'

const coatingsUrls = [

]

const LoadCoatings = ({ modelType }) => {
  const dispatch = useAppDispatch()

  const [Gloss_aqueous, Gloss_lamination, Matte_aqueous] =
    useTexture(coatingsUrls)

  Gloss_aqueous.flipY = false
  Gloss_lamination.flipY = false
  Matte_aqueous.flipY = false
  useEffect(() => {
    if (modelType === 'none') {
      return
    }
    let textureMap = {
      Gloss_aqueous: {
        base: Gloss_aqueous,
        clearcoatRoughness: 0.3,
        clearcoat: 0.7
      },
      Gloss_lamination: {
        base: Gloss_lamination,
        clearcoatRoughness: 0.3,
        clearcoat: 1
      },
      Matte_aqueous: {
        base: Matte_aqueous,
        clearcoatRoughness: 0.4,
        clearcoat: 0.6
      }
    }
    dispatch(setCoatings(textureMap))
  }, [Gloss_aqueous, Gloss_lamination, Matte_aqueous, dispatch, modelType])

  return null
}

export default LoadCoatings
