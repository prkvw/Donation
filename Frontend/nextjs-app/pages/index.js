import { Inter } from 'next/font/google'
import { Product } from '../components/product'
import styles from '../styles/Home.module.css'
import Head from 'next/head'
import Parent from '../components/parent'

const inter = Inter({ subsets: ['latin'] })

// const dummyProducts = [
//   {
//     image: "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1626&q=80",
//     price: "30",
//     title: "Bright Orange",
//     currency: "$"
//   },
//   {
//     image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1442&q=80",
//     price: "100",
//     title: "Mac x Nikon Collab",
//     currency: "$"
//   },
//   {
//     image: "https://images.unsplash.com/photo-1615655406736-b37c4fabf923?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
//     price: "12",
//     title: "Surprise Surprise",
//     currency: "eth"
//   },
//   {
//     image: "https://images.unsplash.com/photo-1612690669207-fed642192c40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1430&q=80",
//     price: "73",
//     title: "Drone Wars",
//     currency: "$"
//   },
//]

export default function Home() {
  //const products = dummyProducts
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
  <div className = 'p-10 bg-slate-900 text-blue-rounded-x1'>


  <div className = 'p-10 bg-green-900 text-blue-rounded-x1'>
    <h1 className= 'text-3xl' >Total Sales</h1>
    <h1 className = 'mt-2 text-2xl'>$126,000</h1>
  </div>
  <div className = 'p-10 bg-green-900 text-blue-rounded-x1'>
    <h1 className= 'text-3xl' >Total</h1>
    <h1 className = 'mt-2 text-2xl'>$126,389</h1>
  </div>
  <div className = 'p-10 bg-green-900 text-blue-rounded-x1'>
    <h1 className= 'text-3xl' >Total Refunds Due</h1>
    <h1 className = 'mt-2 text-2xl'>$389</h1>
  </div>
  </div>

      </div>
    </div>
    </Parent>
    </div>
  )}
      // <div className='flex w-full mt-8 gap-8'>
      //   {products.map((prod:any, index: any) => {
      //     return <Product title={prod.title} image={prod.image} price={prod.price} currency={prod.currency} />
      //   })}
      // </div>
      
    
  