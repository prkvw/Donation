import { Inter } from 'next/font/google'
import styles from '../styles/Home.module.css'
import Head from 'next/head'
import Parent from './Components/parent'

import Link from 'next/link';


export default function Home (){

      return (
        <div>
    <Head>
      <title>POS</title>
      <meta name="description" content="sB+Mowblox = Magic" />
      <link rel ="icon" href="/favicon.ico" />
    </Head>
    <Parent>
    <div className= 'flex text-blue flex-col space-y-8 font-bold'>
      <div className = 'space-y-6'>
      <h1 className= 'text-4xl text-black'>Today's Data</h1>
      <div className = 'p-10 bg-white-400 text-blue-rounded-x1'>
    
    
      <div className = 'p-10 bg-white-400 text-blue-rounded-x1'>
        <h1 className= 'text-3xl' >Total Sales</h1>
        <h1 className = 'mt-2 text-2xl'>$126,000</h1>
      </div>
      <div className = 'p-10 bg-white-400 text-blue-rounded-x1'>
        <h1 className= 'text-3xl' >Total</h1>
        <h1 className = 'mt-2 text-2xl'>$126,389</h1>
      </div>
      <div className = 'p-10 bg-white-400 text-blue-rounded-x1'>
        <h1 className= 'text-3xl' >Total Refunds Due</h1>
        <h1 className = 'mt-2 text-2xl'>$389</h1>
      </div>
      </div>
         
          </div>
        </div>
        </Parent>
        </div>
      )}
        
//className = {styles.container}