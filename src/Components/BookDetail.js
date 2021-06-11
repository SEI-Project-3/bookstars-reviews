import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

const BookDetail = ({ books, match, setBooks }) => {

    const [bookDetail, setBookDetails] = useState('')

    const bookTitle = match.params.title

	useEffect(() => {
		fetch(`http://localhost:3000/api/books/${bookTitle}`)
			.then((res) => res.json())
			.then((res) => {
				setBookDetails(res);
			})
			.catch();
	}, []);

	return (
		<section>
			<div>
				<h1>{bookDetail.title}</h1>
				<h3>{bookDetail.author}</h3>
				<img src={bookDetail.book_image} alt={bookDetail.title} />
				<p>{bookDetail.description}</p>
				<Link to={bookDetail.amazon_product_url}>Buy on Amazon</Link>
			</div>
            <div>
                <form>
                    <h4>Leave a Review</h4>
                </form>
            </div>
            <div>
                <h4>Average Rating</h4>
            </div>
            <div>
                <h4>Reviews</h4>
            </div>
		</section>
	);
};

export default BookDetail;
