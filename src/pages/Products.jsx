import { useState } from 'react'
import {Link} from 'react-router-dom'
import { useFetch } from '../hooks/useFetch';

function Products() {
    const formFilters = {
        search: "",
        company: "all",
        category: "all",
        sort: "a-z",
        price: 100000,
        shipping: false,
    };
    const [filters, setFilters] = useState(formFilters);
    const url = `https://strapi-store-server.onrender.com/api/products?search=${filters.search}&category=${filters.category}&company=${filters.company}&order=${filters.sort}&price=${filters.price}&shipping=${filters.shipping}`;
    
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [company, setCompany] = useState("all");
    const [order, setOrder] = useState("a-z")
    const [price, setPrice] = useState(100000)
    const [freeShip, setFreeShip] = useState()
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const selectedFilters = {
            search: search,
            company: company,
            category: category,
            shipping: freeShip,
            order: order,
            price: price,
        };
        handleFilterSubmit(selectedFilters);
    };
    
    const handleFilterSubmit = (selectedFilters) => {
        setFilters(selectedFilters);
    };
    
    const {data:products, isPending, error} = useFetch(url)
    return (
    <div>
        <form onSubmit={handleSubmit} className='bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center'>
            <div className='form-control flex-col'>
                <label htmlFor="search" className='label'>
                    <span className='label-text capitalize'>Search Product</span>
                </label>
                <input onChange={(e) => setSearch(e.target.value)} id='search' type="search" name='search' className='input input-bordered input-sm'/>
            </div>
            <div className='form-control flex-col'>
                <label htmlFor="category" className='label'>
                    <span className='label-text capitalize'>Select Category</span>
                </label>
                <select onChange={(e) => setCategory(e.target.value)} id='category' name='category' className='select select-bordered select-sm'>
                    {products && products.meta.categories.map((category) => {
                        return <option value={category}>{category}</option>
                    })}
                </select>
            </div>
            <div className='form-control flex-col'>
                <label htmlFor="company" className='label'>
                    <span className='label-text capitalize'>Select Company</span>
                </label>
                <select onChange={(e) => setCompany(e.target.value)} id='company' name='company' className='select select-bordered select-sm'>
                {products && products.meta.companies.map((company) => {
                        return <option value={company}>{company}</option>
                    })}
                </select>
            </div>
            <div className='form-control flex-col'>
                <label htmlFor="order" className='label'>
                    <span className='label-text capitalize'>Sort By</span>
                </label>
                <select onChange={(e) => setOrder(e.target.value)} id='order' name='order' className='select select-bordered select-sm'>
                    <option value="a-z">a-z</option>
                    <option value="z-a">z-a</option>
                    <option value="high">high</option>
                    <option value="low">low</option>
                </select>
            </div>
            <div className='form-control flex-col'>
                <label htmlFor='price' className="label cursor-pointer">
                    <span className="label-text">Select Price</span>
                    <span className="label-text-alt">${price}</span>
                </label>
                <input onChange={(e) => setPrice(e.target.value)} id='price' type="range" min="0" max={100000} value={price} className="range range-primary range-sm" step={1000}/>
                <div className="w-full flex justify-between text-xs px-2 mt-2">
                    <span className="font-bold text-md">0</span>
                    <span className="font-bold text-md">Max : $1,000.00</span>
                </div>
            </div>
            <div className='form-control flex-col items-center'>
                <label htmlFor='checkbox' className="label cursor-pointer">
                    <span className="label-text">Free Shipping</span> 
                </label>
                <input onChange={(e) => setFreeShip(e.target.checked)}  type="checkbox" name='checkbox' className="checkbox checkbox-primary checkbox-sm" />
            </div>
            <button type='submit' className='btn btn-primary btn-sm'>SEARCH</button>
            <Link to="/Products" className='btn btn-secondary btn-sm'>RESET</Link>
        </form>
        <div className='flex justify-between items-center mt-8 border-b border-base-300 pb-5'>
            <h4 className='font-medium text-md'>{products && (products.data).length} products</h4>
            <div className='flex gap-x-2'>
                <button type='button' className='text-xl btn btn-cricle btn-sm btn-primary text-primary-content'>
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M0 32h214.6v214.6H0V32zm233.4 0H448v214.6H233.4V32zM0 265.4h214.6V480H0V265.4zm233.4 0H448V480H233.4V265.4z"/></svg>
                </button>
                <button type='button' className='text-xl btn btn-circle btn-sm btn-ghost text-base-content'>
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>
                </button>
            </div>
        </div>
        <div className='pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {products && products.data.map((product) => {
                // console.log(product.id);
                return(
                    <Link to={`/products/${product.id}`} className='card w-full shadow-xl hover:shadow-2xl transition duration-300' key={product.id}>
                        <figure className='px-4 pt-4'>
                        <img className='rounded-xl h-64 md:h-48 w-full object-cover' src={product.attributes.image} alt={product.attributes.title} />
                        </figure>
                        <div className='card-body items-center text-center'>
                        <h2 className='card-title tracking-wider capitalize'>{product.attributes.title}</h2>
                        <span className='text-secondary'>${(product.attributes.price)}</span>
                        </div>
                    </Link>       
                )
            })}
        </div>
    </div>
  )
}

export default Products 