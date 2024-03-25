import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";



interface StarRatingProps {
  setRating: Dispatch<SetStateAction<number | undefined>>;
  rating: number | undefined;
}

export function StarRating({ rating, setRating }: StarRatingProps) {
//   const [rating, setRating] = useState<number | undefined>();
  const [hover, setHover] = useState<number | null>(null);

  return(
    <div>
      <h1>Star rating</h1>
      <>
        {[...Array(5)].map((star, index) => {
          const currentRating = index + 1;

          return (
            <label key={index}>
              <input
                key={star}
                type="radio"
                className="hidden"
                name="rating"
                value={currentRating}
                onChange={() => setRating(currentRating)}

              />
              <span
                className="text-2xl"
                // TODO: get rid of the exclamation
                style={{
                  color:
                  currentRating <= (hover || rating!) ? "#ffc107" : "#e4e5e9",
                }}
                onMouseEnter={() => setHover(currentRating)}
                onMouseLeave={() => setHover(null)}
              >
              &#9733;
              </span>
            </label>
          );
        })}
      </>
    </div>
  );
}
