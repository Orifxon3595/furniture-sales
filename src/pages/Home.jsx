import {Link} from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
function Home() {
  const {data, isPending, error} = useFetch('https://strapi-store-server.onrender.com/api/products?featured=true')
  return (
    <section>
      <div className="grid lg:grid-cols-2 items-center gap-24">
        <div>
          <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">We are changing the way people shop</h1>
          <p className="max-w-xl mt-8 text-lg leading-8">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore repellat explicabo enim soluta temporibus asperiores aut obcaecati perferendis porro nobis.</p>        
          <div className="mt-10">
            <Link to="/Products" className='btn btn-primary'>OUR PRODUCT</Link>
          </div>
        </div>
        <div className="hidden h-[28rem] lg:carousel carousel-center p-4 space-x-4 bg-neutral rounded-box">
          <div className="carousel-item">
            <img src="https://react-vite-comfy-store-v2.netlify.app/assets/hero1-deae5a1f.webp" className="rounded-box h-full w-80 object-cover" />
          </div>
          <div className="carousel-item">
            <img src="https://react-vite-comfy-store-v2.netlify.app/assets/hero2-2271e3ad.webp" className="rounded-box h-full w-80 object-cover" />
          </div> 
          <div className="carousel-item">
            <img src="https://react-vite-comfy-store-v2.netlify.app/assets/hero3-a83f0357.webp" className="rounded-box h-full w-80 object-cover" />
          </div> 
          <div className="carousel-item">
            <img src="https://react-vite-comfy-store-v2.netlify.app/assets/hero4-4b9de90e.webp" className="rounded-box  h-full w-80 object-cover" />
          </div>
        </div>
      </div>
      <div className='pt-24'>
        <div className='border-b border-base-300 pb-5'>
          <h2 className='text-3xl font-medium tracking-wider capitalize'>Featured Products</h2>
        </div>
        <div className='pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {data && data.data.map((product) => {
            return (
              <Link to={`/products/${product.id}`} className='card w-full shadow-xl hover:shadow-2xl transition duration-300'  key={product.id}>
                <figure className='px-4 pt-4'>
                  <img className='rounded-xl h-64 md:h-48 w-full object-cover' src={product.attributes.image} alt={product.attributes.title} />
                </figure>
                <div className='card-body items-center text-center'>
                  <h2 className='card-title tracking-wider capitalize'>{product.attributes.title}</h2>
                  <span className='text-secondary'>${product.attributes.price}</span>
                </div>
              </Link>              
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Home