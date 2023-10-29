import Review from "../../model/review";
import "./ProductReviewCard.css";

interface ProductReviewCardProps {
    review: Review
}

export default function ProductReviewCard({review}: ProductReviewCardProps) {
    return (
            <div className="rating-card-container">
                <div className="rating-card-header">
                    <h3>{review.user}</h3>
                    <div><b>Nota: {review.rating}/10</b></div>
                </div>
                <p className="rating-card-comment">"{review.comment}"</p>
            </div>
        )
}
