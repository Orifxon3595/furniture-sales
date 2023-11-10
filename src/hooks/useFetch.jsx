import { useState, useEffect } from "react";

export function useFetch(url, method = "GET") {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [postData, setPostData] = useState(null);

  const getNewProduct = (newProduct) => {
    setPostData({
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
  };

  useEffect(() => {
    setIsPending(true);
    const getData = async (fetchHeaders) => {
      try{
        const req = await fetch(url, {...fetchHeaders});
        if(!req.ok){
          throw new Error(req.statusText);
        }
        const data = await req.json();
        setData(data);
        setIsPending(false);
        setError(null);
      } catch(error) {
        setError(error.message);
        setIsPending(false);
      }
    }

    if(method == 'POST' && postData) {
      getData(postData)
    }

    if(method == 'GET') {
      getData()
    }

  }, [url, method, postData])

  return {data, isPending, error, getNewProduct}
}