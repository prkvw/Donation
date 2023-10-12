import Image from 'next/image'
import React from 'react'

const Product = ({title, image, price, currency}: any) => {
  return (
    <div className='w-[25%] relative h-[400px]'>
        <div className='relative h-[50%]'>

        <Image src={image} alt={title} fill={true} />
        </div>
        <h4 className='font-semibold text-xl my-2'>{title}</h4>
        <span className='text-md font-normal'>{`${currency}${price}`}</span>
        <button className='bg-white text-black w-full rounded mt-3 py-3 font-semibold'>Buy</button>
    </div>
  )
}

export {Product}