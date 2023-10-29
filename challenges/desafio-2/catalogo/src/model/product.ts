import Review from "./review";

type Product = {
    id: number,
    name: string,
    price: number,
    info: string,
    reviews: Review[],
}

export default Product;