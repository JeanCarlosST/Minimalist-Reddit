import React from 'react'
import Navbar from './navbar'
import {Outlet, useSearchParams} from 'react-router-dom'
import { getAccessToken } from '../services/redditApi';

const Root = () => {
    const [params, setParams] = useSearchParams();

    if(params.entries().length !== 0) {
        const state = params.get("state");
        const code = params.get("code");
        getAccessToken(state, code);
    }

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