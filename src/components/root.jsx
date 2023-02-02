import React from 'react'
import Navbar from './navbar'
import {Outlet} from 'react-router-dom'

const Root = () => {
    return (
        <>
            <Navbar />
            <main>
                <Outlet/>
            </main>
        </>
    )
}

export default Root;