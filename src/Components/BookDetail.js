import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

const BookDetail = ({ books, match }) => {
	const history = useHistory();
	const bookTitle = match.params.title;
	const [bookDetail, setBookDetails] = useState('');
	const [reviews, setReviews] = useState([]);
	const [ratings, setRatings] = useState([]);
	const [bookObj, setBookObj] = useState({
		title: bookTitle,
		review: '',
		rating: '',
	});
	const [error, setError] = useState(false);
	const [avgRating, setAvgRating] = useState(0);

	useEffect(() => {
		books.forEach((book, i) => {
			if (book.title == bookTitle) {
				setBookDetails(books[i]);
			}
		});

		fetch(`http://localhost:3000/api/books/title/${bookTitle}`)
			.then((res) => res.json())
			.then((res) => {
				console.log(ratings);
				if (res.ratings) {
					setRatings(res.ratings);
				}
				if (res.reviews) {
					setReviews(res.reviews);
				}
			})
			.then((res) => {
				if (res.ratings) {
					setAvgRating(ratings.reduce((a, b) => (a + b) / 2));
				}
			})
			.catch();
	}, []);

	// if (!reviews) {
	// 	return 'there are no ratings available';
	// }
	// if (!ratings) {
	// 	return 'there are no ratings available';
	// }
	// if (!avgRating) {
	// 	return 'there are no ratings available';
	// }

	const handleChange = (event) => {
		setBookObj({ ...bookObj, [event.target.name]: event.target.value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const url = `http://localhost:3000/api/books/title/${bookTitle}`;
		fetch(url, {
			method: 'PATCH',
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
			body: JSON.stringify(bookObj),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				//history.push(`/books/${data.title}`)
			})
			.catch((err) => setError(true));
	};

	return (
		<section>
			<button className='open-modal'>Leave a Review</button>
			<div className='book-detail'>
				<h1>{bookDetail.title}</h1>
				<h3>{bookDetail.author}</h3>
				<img src={bookDetail.book_image} alt={bookDetail.title} />
				<p>{bookDetail.description}</p>
				<Link to={bookDetail.amazon_product_url}>Buy on Amazon</Link>
			</div>
			<div>
				<form onSubmit={handleSubmit} className='rating-form'>
					<h3>Leave a Review</h3>
					<p>Rating:</p>
					<div className='rate'>
						<input
							type='radio'
							id='star5'
							name='rating'
							value='5'
							onChange={handleChange}
						/>
						<label for='star5' title='text'>
							5 stars
						</label>
						<input
							type='radio'
							id='star4'
							name='rating'
							value='4'
							onChange={handleChange}
						/>
						<label for='star4' title='text'>
							4 stars
						</label>
						<input
							type='radio'
							id='star3'
							name='rating'
							value='3'
							onChange={handleChange}
						/>
						<label for='star3' title='text'>
							3 stars
						</label>
						<input
							type='radio'
							id='star2'
							name='rating'
							value='2'
							onChange={handleChange}
						/>
						<label for='star2' title='text'>
							2 stars
						</label>
						<input
							type='radio'
							id='star1'
							name='rating'
							value='1'
							onChange={handleChange}
						/>
						<label for='star1' title='text'>
							1 star
						</label>
					</div>
					<div className='review'>
						<p>Your review:</p>
						<input
							name='review'
							type='text'
							className='review-text'
							value={bookObj.review}
							onChange={handleChange}
						/>
						<button type='submit'>Submit</button>
					</div>
				</form>
			</div>
			<h4>Average Rating</h4>
			<p>{avgRating}</p>
			<h4>Reviews</h4>
			{reviews.map((review) => (
				<p>{review}</p>
			))}
		</section>
	);
};

export default BookDetail;
