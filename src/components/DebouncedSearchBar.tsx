import { useEffect, useState } from "react";
interface ResponseShape {
  limit: number
  products: any[];
  skip: number;
  total: number
}

const DebouncedSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("")
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<any>()


  useEffect(() => {
    const id = setTimeout(() => setDebouncedSearchTerm(searchTerm), 500)
    return () => clearInterval(id)
  }, [searchTerm])


  //then technique
  useEffect(() => {
    if (!debouncedSearchTerm) {
      setData([]);
      return;
    }
    setLoading(true)
    const controller = new AbortController();


    fetch(`https://dummyjson.com/products/search?q=${debouncedSearchTerm}&delay=1000`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("BIG ERROR in response HTTP " + res.status)
        return res.json()
      })
      .then((data: ResponseShape) => {
        console.log({ data })
        setData(data.products)
      })
      .catch((err) => {
        //set Error here
        console.error("error fetching: ", err)
      }).finally(() => {
        // if not aborted then set to false
        if (!controller.signal.aborted) setLoading(false)

      })

    return () => {
      controller.abort()
    }
  }, [debouncedSearchTerm])



  // trying with await / try 
  useEffect(() => {
    if (!debouncedSearchTerm) {
      setData([]);
      return;
    }
    setLoading(true)
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/search?q=${debouncedSearchTerm}&delay=1000`, { signal: controller.signal })
        if (!res.ok) { throw new Error("HTTP Error: " + res.status) }
        const data: ResponseShape = await res.json();
        setData(data.products)
      }
      catch (e) {
        setError(e)

      }
      finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }
    fetchData()

    return () => controller.abort()
  }, [debouncedSearchTerm])

  return <div style={{ border: "1px solid #333333", padding: "1rem" }}>
    <div><input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      {/* <div>Debounced: {debouncedSearchTerm}</div> */}

      <div>{debouncedSearchTerm.length > 0 && loading && "Loading..."}</div>
      {data.length > 0 && <> <div>List of Data: </div>
        <div>{data.map((item) => (<div key={item.id}>{item.title}</div>))}</div>
      </>}
      {debouncedSearchTerm.length > 0 && !loading && data.length === 0 && <>No Data found</>}

    </div>
  </div>
}

export default DebouncedSearchBar