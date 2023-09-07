import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ProductDetailComponent = () => {
    const [product, setProduct] = useState([])
    const params = useParams()
    const pid = params.id

    useEffect(() => {
        axios.get(`https://fakestoreapi.com/products/${pid}`)
            .then(res => setProduct(res.data))
            .catch(err => console.log(err))
    }, [pid])

    const addToCart = () => {

        const cart = JSON.parse(localStorage.getItem('newcart')) || []
        const CartDetail = {
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            category: product.category,
            rating: product.rating,
            quantity: 1
        }

        // checking if product is exists in the cart

        const CheckItem = cart.find(item => item.id === product.id)
        if (CheckItem) {
            toast.error(`${product.title} is already in your cart`)
        }
        else {
            cart.push(CartDetail)
            localStorage.setItem('newcart', JSON.stringify(cart))
            toast.success(`${product.title} is added to your cart`)
        }
    }
    return (
        <>
            <ToastContainer theme='colored' position='top-center' />
            <div className='max-w-[1200px] mx-auto grid sm:grid-cols-2 grid-cols-1 gap-10 px-7 mt-10'>


                <div className='border border-gray-200 w-full h-[70%] '>
                    <img src={product.image} alt={product.title} className='w-full h-full object-contain' />
                </div>

                <div >
                    <p className='text-center'>{product.title}</p>
                    <div className='flex items-center justify-between'>
                        <p>{product.price}</p>
                        <p>{product.category}</p>
                        <p>{product.rating && product.rating.rate}</p>

                    </div>
                    <h3 className='text-center'>Description</h3>
                    <p>{product.description}</p>



                    <button className='w-full bg-gray-300 px-6 py-4 rounded-lg text-white'
                        onClick={addToCart}


                    >ADD TO CART</button>
                </div>








            </div>


        </>
    )
}

export default ProductDetailComponent