import React from 'react'
import { useAppSelector } from '@/lib/store/hooks'
import { selectSelectedModel } from '@/lib/store/features/general/generalSlice'
import { FlatBoxMenu, TableMenu, WatchMenu } from '../Menus'
import ShirtMenu from '../Menus/ShirtMenu'
import SofaMenu from '../Menus/SofaMenu'

const MenuBuilder = () => {
    const selectedModel = useAppSelector(selectSelectedModel)

    if (selectedModel === 'flat-box') {
        return <FlatBoxMenu />
    } 
    else if (selectedModel === 'watch') {
        return <WatchMenu />
    } 
    else if (selectedModel === 'table') {
        return <TableMenu />
    } 
    else if (selectedModel === 'sofa') {
        return <SofaMenu />
    } 
    else if (selectedModel === 'collarless-shirt') {
        return <ShirtMenu />
    } 
    else {
        return <h1>No menu available for this model</h1>
    }

}

export default MenuBuilder