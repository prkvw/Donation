import React from 'react'
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import Head from 'next/head'
import Parent from '/components/parent'

function poser() {
    return (
        <Parent>
        <div className= 'flex flex-row space-x-4 place-items-center'>
            <div>
                <h1 className= 'text-3xl font-bold' > Product Name</h1>
                <input className ='mt-4 text-2x p-4 rounded-x1 border-2 '  placeholder='Connect to Retail Therapy server' />
            </div>
            <div>
                <h1 className= 'text-3xl font-bold' > Product Details</h1>
                <input className ='mt-4 text-2x p-4 rounded-x1 border-2 '  placeholder='Connect to Retail Therapy server' />
            </div>
            <div>
                <h1 className= 'text-3xl font-bold' > Customer</h1>
                <input className ='mt-4 text-2x p-6 rounded-x1 border-2 '  placeholder='Johnny Latest' />
            </div>
        </div>
        </Parent>
    )
}

export default poser