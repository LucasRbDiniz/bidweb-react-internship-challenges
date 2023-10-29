import "./Cart.css"
import { useMutation, useQuery } from "react-query"
import CartProductCard from "../../components/cartProductCard/CartProductCard"
import baseUrl from "../../constants";
import { useState } from "react";
import CartProduct from "../../model/cartProduct";
import { Link } from "react-router-dom";
import { queryClient } from "../../services/queryClient";

export default function Cart() {
    const [total, setTotal] = useState(0);
    const {
        data: cartProducts,
        isFetching,
        isError
    } = useQuery("cartProducts", async () => {
        const response = await fetch(`${baseUrl}/cart`);

        if (!response.ok) {
            throw new Error("Erro ao carregar produtos do carrinho");
        }

        return response.json();
    }, {
        onSuccess: (cartProducts) => {
            let sum = 0;
            cartProducts.forEach((cartProduct: CartProduct) => {
                sum += cartProduct.productPrice;
            });
            setTotal(sum);

            cartProducts.sort((a: CartProduct, b: CartProduct) => {
                if (a.productName > b.productName) {
                    return 1;
                } if (a.productName < b.productName) {
                    return -1;
                }
                return 0;
            })
        }
    });

    const deleteCartProduct = useMutation(async (cartProductId: number) => {
        const response = await fetch(`${baseUrl}/cart/${cartProductId}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Erro ao remover produto do carrinho");
        }

        return response.json();
    }, {
        onSuccess: () => queryClient.invalidateQueries("cartProducts"),
    });

    const clearCart = () => {
        cartProducts.forEach((cartProduct: CartProduct) => {
            deleteCartProduct.mutate(cartProduct.id);
        });
    };

    if (isFetching) {
        return <h1>Carregando...</h1>
    }

    if (isError) {
        return <h1>Algo deu errado :(</h1>
    }

    return (
        <div className="cart-container">
            <h1>Loja de Esportes</h1>
            <div className="cart-header">
                <h2>Carrinho de Compras</h2>
                <Link to="/">
                    <button className="button">
                        Voltar
                    </button>
                </Link>
            </div>
            <div className="cart-product-list">
                {cartProducts.map((cartProduct: CartProduct) => (
                    <CartProductCard key={cartProducts.indexOf(cartProduct)} cartProduct={cartProduct} />
                ))}
            </div>
            {cartProducts.length > 0
            ? (
                <div className="cart-footer-container">
                    <div className="cart-total">
                        <span>Total: R$ {total.toFixed(2)}</span>
                    </div>
                    <button className="button cart-buy-button" onClick={() => clearCart()}>
                        <h2>Comprar</h2>
                    </button>
                </div>
            )
            : <h1 className="empty-cart-label">Carrinho vazio!</h1>
            }
        </div>
    )
}
