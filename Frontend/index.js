import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card"

export default function Home (){
  return (
    <div className ={styles.container}>
<Head>
  <title>POS</title>
  <meta name="description" content="sB+Mowblox = Magic" />
  <link rel ="icon" href="/favicon.ico" />
</Head>
<parent>
  <div className= 'flex text-white-font'>
  <div className = 'p-10 bg-slate-900 text-white-rounded-x1'>
    <h1 className= 'text-3xl' >Total Sold</h1>
    <h1>$126,389</h1>
  </div>
  </div>
</parent>

<h1 className={styles.title}>
  Peek <Link href="/posts/draft">at the Dash</Link>
</h1>

 
</div>
 )
}

