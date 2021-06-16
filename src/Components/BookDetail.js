import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Styles/BookDetail.css';

const BookDetail = ({ books, match, bookDetail, setBookDetails }) => {
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
		if (books.length) {
			books.forEach((book, i) => {
				if (book.title === bookTitle) {
					setBookDetails(books[i]);
					localStorage.setItem('book', JSON.stringify(books[i]));
				}
			});

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
		} else if (localStorage.getItem('book')) {
			const newBook = localStorage.getItem('book');
			setBookDetails(JSON.parse(newBook));
		}
	}, [books]);

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
			{!bookDetail ? null : (
				<>
					<img
						className='cover'
						src={bookDetail.book_image}
						alt={bookDetail.title}
					/>
					<div className='book-detail'>
						<h1>{bookDetail.title}</h1>
						<h3>{bookDetail.author}</h3>
						<p>{bookDetail.description}</p>
						<a
							href={bookDetail.amazon_product_url}
							target='_blank'
							rel='noopener noreferrer'>
							Buy on Amazon
						</a>
					</div>

					<aside className='leave-review'>
						<h2>Leave a Review</h2>
						<form onSubmit={handleSubmit} className='rating-form'>
							{errText ? (
								<p>Please leave a rating and review before submitting</p>
							) : null}

							<wrapper className='stars'>
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
							</wrapper>
							<br />
							<div className='Average'>
								<h4>Average Rating</h4>
								{!ratings.length ? <p>Rate me!</p> : <p>{avgRating}</p>}
							</div>
							<div className='review'>
								<textarea
									name='review'
									className='review-text'
									value={bookObj.review}
									onChange={handleChange}
								/>
								<br />
								<button type='submit'> 🖋️ </button>
							</div>
						</form>
					</aside>
				</>
			)}
			{/* <container className='bottom'> */}
			<div className='past-reviews'>
				<h3>Reviews</h3>
				{!reviews.length ? (
					<p>Please leave a review</p>
				) : (
					reviews.map((review, i) => <p key={i}>{review}</p>)
				)}
			</div>
			{/* </container> */}
		</section>
	);
};

export default BookDetail;
