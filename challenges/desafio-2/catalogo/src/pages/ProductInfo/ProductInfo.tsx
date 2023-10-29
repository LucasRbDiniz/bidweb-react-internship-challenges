import "./ProductInfo.css";
import { Link, useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import baseUrl from "../../constants";
import ProductInfoCard from "../../components/productInfoCard/ProductInfoCard";
import ProductReviewCard from "../../components/productRatingCard/ProductReviewCard";
import { MdOutlineArrowBackIosNew } from "react-icons/md"
import { useState } from "react";
import Review from "../../model/review";
import CartProduct from "../../model/cartProduct";

export default function ProductInfo() {
    const { productId } = useParams();
    const [reviews, setReviews] = useState([]);
    const {
        data: product,
        isFetching,
        isError,
    } = useQuery("product", async() => {
        const response = await fetch(`${baseUrl}/products/${productId}`);

        if (!response.ok) {
            throw new Error("Erro ao carregar informações do produto");
        }

        return response.json();
    }, {
        onSuccess: (product) => setReviews(product.reviews),
    });

    const addToCart = useMutation(async () => {
        const newCartProduct: CartProduct = {
            id: new Date().getTime(),
            productName: product.name,
            productPrice: product.price,
        };

        const response = await fetch(`${baseUrl}/cart`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newCartProduct),
        });

        if (!response.ok) {
            throw new Error("Erro ao adicionar produto ao carrinho");
        }

        return response.json();
    }, {
        onSuccess: () => window.alert("Produto adicionado ao carrinho com sucesso"),
    });

    if (isFetching) {
        return <h1>Carregando...</h1>
    }

    if (isError) {
        return <h1>Algo deu errado :(</h1>
    }

    return (
        <>
            <div className="product-info-container">
                <h1 className="titulo">
                    Loja de eletronicos
                </h1>
                <h2>
                    Detalhes do produto
                </h2>
                <div className="product-info-card-container">
                    <div>
                        <ProductInfoCard product={product} />
                        <div className="product-info-buttons-wrapper">
                            <button className="button product-info-buy-button" onClick={() => addToCart.mutate()}>
                                <h2>Comprar</h2>
                            </button>
                            <Link to="/">
                                <button className="button product-info-back-button">
                                    <MdOutlineArrowBackIosNew size={25} />
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div>
                        {reviews.map((review: Review) => (
                            <ProductReviewCard key={review.id} review={review} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
