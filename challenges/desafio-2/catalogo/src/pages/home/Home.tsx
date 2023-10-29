import ProductCard from "../../components/product/ProductCard";
import "./Home.css"
import {AiOutlineShoppingCart} from "react-icons/ai"
import { useQuery } from "react-query"
import baseUrl from "../../constants";
import Product from "../../model/product";
import { Link } from "react-router-dom";

export default function Home(){
    const {
        data: products,
        isFetching,
        isError,
    } = useQuery("products", async () => {
        const response = await fetch(`${baseUrl}/products`);

        if (!response.ok) {
            throw new Error("Erro ao carregar produtos");
        }

        return response.json();
    });

    if(isFetching) {
        return <h1>Carregando...</h1>
    }

    if (isError) {
        return <h1>Algo deu errado :(</h1>
    }

    return(
        <>
            <div className="home-container">
                <h1 className="titulo">
                    Loja de eletronicos
                </h1>
                <div className="subtitle-container">
                    <h2 className="subtitulo">
                        Produtos
                    </h2>
                    <Link to="/cart">
                        <button className="button button-cart">
                            <span>Ver carrinho</span>
                            <AiOutlineShoppingCart/>
                        </button>
                    </Link>
                </div>
                <div className="list-container">
                    {products.map((product: Product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </>
    )
}