import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import type Product from "../interfaces/Product"

export default function Products() {
    const { isError, isLoading, data: queryData } = useQuery<Product[]>({
        queryKey: ["products"],
        queryFn: async (): Promise<Product[]> => {
            const { data } = await axios.get<Product[]>("http://localhost:8080/sql?sql=select * from products")
            const formater = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" })
            return data.map(register => ({ ...register, product_price: formater.format(register.product_price) }))
        }
    })
    if (isLoading) {
        return <>Loading</>
    }
    if (isError) {
        return <>Error</>
    }
    return <table className="table">
        <thead>
            <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Precio</th>
            </tr>
        </thead>
        <tbody>
            {queryData?.map((product: Product) => <tr>
                <td>{product.product_id}</td>
                <td>{product.product_name}</td>
                <td align="right">{product.product_price}</td>
            </tr>)}
        </tbody>
    </table>
}