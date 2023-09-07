import React from 'react'
import { Link } from 'react-router-dom'

const ProductCardComponent = (props) => {
    const {id, image, title, price,} = props.data
    return (
        <>  <Link to={`/productdetail/${id}`}>
            <div className='shadow-md h-[90%] border border-gray-200 p-2'>
                <img src={image} alt={title.slice(0,10)} className="w-full h-[70%] object-contain" />

                <div className='flex flex-col items-center justify-center my-4'>
                    <p>{title.slice(0, 25)}...</p>
                    <p>{price}</p>
                </div>
            </div>
            </Link>
        </>
    )
}

export default ProductCardComponent