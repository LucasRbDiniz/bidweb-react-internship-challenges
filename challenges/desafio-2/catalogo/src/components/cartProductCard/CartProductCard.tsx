import "./CartProductCard.css"
import { AiFillShopping } from "react-icons/ai"
import { BsFillTrashFill } from "react-icons/bs"
import CartProduct from "../../model/cartProduct"
import { useMutation } from "react-query"
import baseUrl from "../../constants"
import { queryClient } from "../../services/queryClient"

interface CartProductCardProps {
    cartProduct: CartProduct
}

export default function CartProductCard({cartProduct}: CartProductCardProps) {
    const deleteProductFromCart = useMutation(async () => {
        const response = await fetch(`${baseUrl}/cart/${cartProduct.id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Erro ao remover item do carrinho");
        }

        return response.json();
    }, {
        onSuccess: () => queryClient.invalidateQueries("cartProducts"),
    })

    return (
        <div className="cart-product-card-container">
            <AiFillShopping size={75} />
            <div>
                <p>Nome do produto</p>
                <p>{cartProduct.productName}</p>
            </div>
            <div>
                <p>Preço</p>
                <p>R$ {cartProduct.productPrice.toFixed(2)}</p>
            </div>
            <button className="cart-delete-button" onClick={() => deleteProductFromCart.mutate()}>
                <BsFillTrashFill size={25} />
            </button>
        </div>
    )
}
