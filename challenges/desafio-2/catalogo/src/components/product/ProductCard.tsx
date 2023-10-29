import "./ProductCard.css"
import { AiOutlineShoppingCart } from "react-icons/ai"
import { AiFillShopping } from "react-icons/ai"
import Product from "../../model/product"
import { Link } from "react-router-dom"
import baseUrl from "../../constants"
import { useMutation } from "react-query"
import CartProduct from "../../model/cartProduct"

interface ProductCardProps {
    product: Product
}

export default function ProductCard({product}: ProductCardProps) {
    const addToCart = useMutation(async () => {
        const newCartProduct: CartProduct = {
            id: new Date().getTime(),
            productName: product.name,
            productPrice: product.price,
        }

        const response = await fetch(`${baseUrl}/cart`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newCartProduct),
        });

        if (!response.ok) {
            throw new Error("Erro ao adicionar item ao carrinho");
        }

        return response.json();
    }, {
        onSuccess: () => window.alert("Produto adicionado ao carrinho com sucesso!"),
    });

    return(
        <div className="card-container">
            <div className="icon-container">
                <AiFillShopping size={100} />
            </div>
            <div className="info-container">
                <p>{product.name}</p>
                <p>R$ {product.price.toFixed(2)}</p>
            </div>
            <div className="buttons-container">
                <Link to={`/product/${product.id}`}>
                    <button className="button">
                        Sobre
                    </button>
                </Link>
                <button className="button button-info" onClick={() => addToCart.mutate()}>
                    <AiOutlineShoppingCart />
                </button>
            </div>
        </div>
    )

}