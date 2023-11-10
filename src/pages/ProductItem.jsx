import React from 'react'
import { NavLink, useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch'

function ProductItem() {
    const {id} = useParams()
    const url = 'https://strapi-store-server.onrender.com/api/products/' + id;
    const {data:product, isPending, error} = useFetch(url)
    // console.log(product.data.attributes.image);

  return (
    <div>
        <div className='text-md breadcrumbs'>
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li> 
                    <NavLink to="/Products">Products</NavLink>
                </li>
            </ul>
        </div>
        {product && 
        <div product={product} className='mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16'>
            <img className='w-96 h-96 object-cover rounded-lg lg:w-full' src={product.data.attributes.image} alt="" />
            <div>
                <h1 className='text-3xl capitalize font-bold'>{product.data.attributes.title}</h1>
                <h4 className='text-xl text-neutral-content font-bold mt-2'>{product.data.attributes.company}</h4>
                <p className='mt-3 text-xl'>${product.data.attributes.price}</p>
                <p className='mt-6 leading-8'>{product.data.attributes.description}</p>
                <div className='mt-6'>
                    <h4 className='text-md font-medium tracking-wider capitalize'>Colors</h4>
                    <div className='mt-2'>
                        {product.data.attributes.colors.map((color) => {
                            return <button key={product.data.id} type='button' className='badge w-6 h-6 mr-2' style={{background: color}}></button>
                        })}
                    </div>
                </div>
                <div className='form-control w-full max-w-xs'>
                    <label htmlFor="amount">
                        <h4 className='text-md font-medium tracking-wider capitalize'>Amount</h4>
                    </label>
                    <select className='select select-primary select-bordered select-md' name="amount" id="amount">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        {/* <tbody>
                            for(let i = 1; i < 20; i++) {
                                // const options = (<option value={i}>i</option>);
                            }
                        </tbody> */}
                    </select>
                </div>
                <div className='mt-10'>
                    <button className='btn btn-primary btn-md'>ADD TO BAG</button>
                </div>
            </div>
        </div>}
    </div>
  )
}

export default ProductItem