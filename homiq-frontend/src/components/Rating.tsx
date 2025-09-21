import { RatingIcon, FilledRatingIcon, HalfStarIcon } from "../assets/icons";
import type { RatingProps } from "../models/components";

const Rating: React.FC<RatingProps> = ({ value, max = 5 }) => {
  const stars = [];

  for (let i = 1; i <= max; i++) {
    if (value >= i) {
      // full star
      stars.push(<FilledRatingIcon key={i} className="w-5 h-5 fill-yellow-500" />);
    } else if (value >= i - 0.5) {
      // half star
      stars.push(<HalfStarIcon key={i} className="w-5 h-5 fill-yellow-500" />);
    } else {
      // empty star
      stars.push(<RatingIcon key={i} className="w-5 h-5 fill-gray-400" />);
    }
  }

  return <div className="flex items-center gap-1">{stars}</div>;
};

export default Rating;
