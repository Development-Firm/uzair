import React from 'react'
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks'
import { selectSelectedModel } from '@/lib/store/features/general/generalSlice'
import { ChevronLeft, X } from 'lucide-react'
import { selectSelectedShirtLayer, setSelectedShirtLayer } from '@/lib/store/features/shirt/shirtSlice'
import { useRouter } from 'next/navigation'
import IconButton from '@/components/ui/icon-button'
import { selectCurrentLayer } from '@/lib/store/features/table/tableSlice'
import { selectCurrentSofaLayer } from '@/lib/store/features/sofa/sofaSlice'


const TopBar = () => {
    const selectedModel = useAppSelector(selectSelectedModel)
    const selectedShirtLayer = useAppSelector(selectSelectedShirtLayer)
    const tableCurrentLayer = useAppSelector(selectCurrentLayer)
    const currentSofaLayer = useAppSelector(selectCurrentSofaLayer);
    
    const dispatch = useAppDispatch()
    const router = useRouter()
    return (
        <section className="bg-transparent flex w-full left-0 z-10">
            <div className='w-full flex justify-between items-start'>
                <div style={{ width: "320px" }} className='flex gap-4 items-center'>
                    <IconButton onClick={() => router.push('/')}>
                        <ChevronLeft />
                    </IconButton>
                    <h1 className='text-2xl text-primary dark:text-primary-foreground capitalize'>{selectedModel?.replace(/-/g, " ") || ""}</h1>
                </div>
                <div>
                    {
                        selectedModel === 'collarless-shirt' &&
                        (<IconButton className='px-4'>
                            <span>
                                {selectedShirtLayer}
                            </span>
                            {selectedShirtLayer !== 'base' &&
                                <X onClick={() => dispatch(setSelectedShirtLayer('base'))} />
                            }
                        </IconButton>)
                    }
                    {
                        selectedModel === 'table' &&
                        (<IconButton className='px-4'>
                            <span>
                                {tableCurrentLayer}
                            </span>
                        </IconButton>)
                    }
                    {
                        selectedModel === 'sofa' &&
                        (<IconButton className='px-4'>
                            <span>
                                {currentSofaLayer}
                            </span>
                        </IconButton>)
                    }
                </div>
                <div style={{ width: "420px" }}></div>
            </div>
        </section>
    )
}

export default TopBar