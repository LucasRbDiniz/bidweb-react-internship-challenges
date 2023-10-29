import "./ProductInfoCard.css"
import { AiFillShopping } from "react-icons/ai"
import Product from "../../model/product"

interface ProductInfoCardProps {
    product: Product
}

export default function ProductInfoCard({product}: ProductInfoCardProps){
    return(
        <div className="info-card-container">
            <h3 className="product-name">{product.name}</h3>
            <div className="product-icon">
                <AiFillShopping size={250} />
            </div>
            <h3 className="product-price">R$ {product.price}</h3>
            <div className="product-description">
                <h2>Descrição</h2>
                <p>{product.info}</p>
            </div>
        </div>
    )

}