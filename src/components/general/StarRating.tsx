import { Star } from "lucide-react";

const StarRatingView = ({ value = 0, maxStars = 5 }) => {
  return (
    <div className="flex space-x-1">
      {[...Array(maxStars)].map((_, index) => {
        const isFilled = index < value;

        return (
          <Star
            key={index}
            size={16}
            className={`${
              isFilled ? "fill-warning text-warning" : "text-gray-300"
            }`}
          />
        );
      })}
    </div>
  );
};

export default StarRatingView;
