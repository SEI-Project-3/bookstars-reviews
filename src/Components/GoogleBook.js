import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

const GoogleBook = ({ match, bookDetail, setBookDetails }) => {
	const history = useHistory();
	const bookTitle = match.params.title;
	const [reviews, setReviews] = useState([]);
	const [ratings, setRatings] = useState([]);
	const [bookObj, setBookObj] = useState({
		title: bookTitle,
		review: '',
		rating: '',
	});
	const [error, setError] = useState(false);
	const [errText, setErrText] = useState(false);
	const [avgRating, setAvgRating] = useState(0);

	useEffect(() => {
		// if (books.length) {
		// 	books.forEach((book, i) => {
		// 		if (book.title === bookTitle) {
		// 			setBookDetails(books[i]);
		// 		}
		// 	});

		if (localStorage.getItem('book')) {
			const newBook = localStorage.getItem('book');
			setBookDetails(JSON.parse(newBook));
		}
		fetch(`http://localhost:3000/api/books/title/${bookTitle}`)
			.then((res) => res.json())
			.then((res) => {
				if (res?.ratings) {
					setRatings(res.ratings);
				}
				if (res?.reviews) {
					setReviews(res.reviews);
				}
			})
			.catch();
	}, []);

	useEffect(() => {
		if (ratings.length === 1) {
			setAvgRating(ratings[0]);
		} else if (ratings.length > 1) {
			setAvgRating(ratings.reduce((a, b) => (a + b) / 2));
		}
	}, [ratings, reviews]);

	const handleChange = (event) => {
		setBookObj({ ...bookObj, [event.target.name]: event.target.value });
	};

	const handleSubmit = (event) => {
		if (!bookObj.review || !bookObj.rating) {
			setErrText(true);
			return;
		}
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
				history.push(`/books/${data.title}`);
			})
			.catch((err) => setError(true));
	};

	return (
		<section>
			<button className='open-modal'>Leave a Review</button>
			{!bookDetail ? null : (
				<div className='book-detail'>
					<h1>{bookDetail.title}</h1>
					<h3>{bookDetail.authors[0]}</h3>
					<img src={bookDetail.imageLinks.thumbnail} alt={bookDetail.title} />
					<p>{bookDetail.description}</p>
					<a
						href={bookDetail.infoLink}
						target='_blank'
						rel='noopener noreferrer'>
						Check out on Google
					</a>
				</div>
			)}
			<div>
				<form onSubmit={handleSubmit} className='rating-form'>
					<h3>Leave a Review</h3>
					{errText ? (
						<p>Please leave a rating and review before submitting</p>
					) : null}
					<p>Rating:</p>
					<div className='rate'>
						<input
							type='radio'
							id='star5'
							name='rating'
							value='5'
							onChange={handleChange}
						/>
						<label title='text'>5 stars</label>
						<input
							type='radio'
							id='star4'
							name='rating'
							value='4'
							onChange={handleChange}
						/>
						<label title='text'>4 stars</label>
						<input
							type='radio'
							id='star3'
							name='rating'
							value='3'
							onChange={handleChange}
						/>
						<label title='text'>3 stars</label>
						<input
							type='radio'
							id='star2'
							name='rating'
							value='2'
							onChange={handleChange}
						/>
						<label title='text'>2 stars</label>
						<input
							type='radio'
							id='star1'
							name='rating'
							value='1'
							onChange={handleChange}
						/>
						<label title='text'>1 star</label>
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
			{!ratings.length ? (
				<p>This book has not yet been rated.</p>
			) : (
				<p>{avgRating}</p>
			)}
			<h4>Reviews</h4>
			{!reviews.length ? (
				<p>Please leave a review</p>
			) : (
				reviews.map((review, i) => <p key={i}>{review}</p>)
			)}
		</section>
	);
};

export default GoogleBook;
