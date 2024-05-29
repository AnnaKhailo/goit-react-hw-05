import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../../movies-api";

import Loader from "../../components/Loader/Loader";

import css from "./MovieReviews.module.css";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!movieId) return;
    async function fetchReviewsById() {
      try {
        const data = await getMovieReviews(movieId);
        setReviews(data.results);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchReviewsById();
  }, [movieId]);

  return (
    <div>
      {isError && <p>Oops! There was an error! Try again!</p>}
      {isLoading && <Loader />}
      <h2>Reviews:</h2>
      <ul className={css.reviewsList}>
        {reviews.map((review) => (
          <li key={review.id}>
            <h3>Author: {review.author}</h3>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
