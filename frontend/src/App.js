
import { useState, useEffect, useCallback } from "react";
import ProductCardComponent from "./ProductCardComponent";
import axios from 'axios'
function App() {

  const [product, setProduct] = useState([])
  const [loading, setLoading] = useState(true)
  const [limit, setLimit] = useState(12)
  const[query, setQuery] = useState("")
  // console.log(product.filter(product => product.title.toLowerCase().includes(query)))
  const api_url = process.env.REACT_APP_API_URL

  useEffect(() => {
    axios.get(api_url)
      .then(res => setProduct(res.data))
      .catch(err => console.log(err))
    setLoading(false)


  }, [])

  const handleLoad = useCallback(() => {
    setLimit(limit + 4)
  }, [limit])
   
   
  return (
    <>  

      <div className="max-w-[600px] mx-auto my-10 ">
        <input  type="text" placeholder="search products here" className="w-full h-10 focus:outline-none border border-gray-400 px-7"
        
        onChange={(e)=>{setQuery(e.target.value)}}
        />

      </div>

      <div className="max-w-[1320px] mx-auto grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-1 px-2 gap-5 mt-10">
        {loading ? <h1>loading .....</h1> :

          product && product.filter(product=>product.title.toLowerCase().includes(query)).slice(0, limit).map((items, i) => (
            <ProductCardComponent data={items} key={i} />
          ))
        }
      </div>
      <div className="max-w-sm mx-auto my-10 flex items-center gap-5 px-10">
        {limit < product.length &&
          <button className="bg-gray-400 text-white px-4 py-3" onClick={handleLoad}>
            Load More
          </button>
        }
        {
          limit > 12 &&
          <button className="bg-gray-400 text-white px-4 py-3" onClick={() => setLimit(limit - 4)}>Back</button>

        }
      </div>
    </>
  );
}

export default App;
