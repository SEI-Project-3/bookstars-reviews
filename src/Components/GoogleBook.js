import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Styles/GoogleBook.css';

const GoogleBook = ({ bookDetail, setBookDetails }) => {
	const history = useHistory();
	const bookTitle = bookDetail.title;
	const [reviews, setReviews] = useState([]);
	const [ratings, setRatings] = useState([]);
	const [formState, setFormState] = useState({ review: '', rating: '' });
	const [error, setError] = useState(false);
	const [errText, setErrText] = useState(false);
	const [avgRating, setAvgRating] = useState(0);
	const [editState, setEditState] = useState(-1);
	const [editText, setEditText] = useState('');

	useEffect(() => {
		if (localStorage.getItem('book') && !bookDetail) {
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
	}, [bookDetail]);

	useEffect(() => {
		if (ratings.length === 1) {
			setAvgRating(ratings[0]);
		} else if (ratings.length > 1) {
			setAvgRating(ratings.reduce((a, b) => (a + b) / 2));
		}
	}, [ratings, reviews]);

	const submitBook = (bookReviews, bookRatings) => {
		const payload = {
			title: bookTitle,
			reviews: [...bookReviews, formState.review],
			ratings: [...bookRatings, formState.rating],
		};
		const url = `http://localhost:3000/api/books/title/${bookTitle}`;
		fetch(url, {
			method: 'PATCH',
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
			body: JSON.stringify(payload),
		})
			.then((res) => res.json())
			.then((data) => {
				history.push(`/search/${data.title}`);
			})
			.catch((err) => setError(true));
	};

	const handleChange = (event) => {
		setFormState({ ...formState, [event.target.name]: event.target.value });
	};

	const handleSubmit = (event) => {
		if (!formState.review || !formState.rating) {
			event.preventDefault();
			setErrText(true);
			return;
		}
		submitBook(reviews, ratings);
	};

	// if there is no empty string on the end of reviews, this will create it, but not more than one
	// submitting a new review will overwrite the empty string with the created review
	const handleEdit = (reviewIndex) => {
		let newReviews = [...reviews];
		newReviews[reviewIndex] = editText;

		setReviews(newReviews);
		setEditState(-1);

		submitBook(newReviews, ratings);
	};

	const handleDelete = (reviewIndex) => {
		let newReviews = [...reviews];
		newReviews.splice(reviewIndex, 1);

		setReviews(newReviews);

		submitBook(newReviews, ratings);
	};

	return (
		<section>
			{!bookDetail ? null : (
				<>
					<img
						className='cover'
						src={bookDetail.imageLinks.thumbnail}
						alt={bookDetail.title}
					/>
					<div className='details'>
						<h1>{bookDetail.title}</h1>
						<h3>{bookDetail.authors[0]}</h3>
						<p className='desc'>{bookDetail.description}</p>
						<a
							href={bookDetail.infoLink}
							target='_blank'
							rel='noopener noreferrer'>
							Check out on Google
						</a>
					</div>
				</>
			)}
			<div className='history'>
				<h4 className='past-reviews-title'>Reviews</h4>
				<div className='one-review'>
					{!reviews.length ? (
						<p>Please leave a review</p>
					) : (
						reviews.map((review, i) =>
							editState === i ? (
								<div key={i}>
									<input
										type='text'
										value={editText}
										onChange={(e) => setEditText(e.target.value)}
									/>
									<button onClick={() => handleEdit(i)}>📨</button>
								</div>
							) : (
								<div key={i}>
									<p className='review-body'>{review}</p>
									<button
										className='edit'
										onClick={() => {
											setEditState(i);
											setEditText(review);
										}}>
										📝
									</button>
									<button
										className='delete'
										onClick={() => {
											handleDelete(i);
										}}>
										🗑️
									</button>
								</div>
							)
						)
					)}
				</div>
			</div>
			<aside className='leave-review'>
				<form onSubmit={handleSubmit} className='rating-form'>
					<h2 className='leave-review-title'>Leave a Review</h2>
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
					<br />
					<div className='average'>
						<h4 className='average-title'>Average Rating</h4>
						{!ratings.length ? (
							<p className='average-rate'>This book has not yet been rated.</p>
						) : (
							<p className='average-rate'>{avgRating}</p>
						)}
					</div>
					<div className='review'>
						<textarea
							name='review'
							type='text'
							className='review-text'
							value={formState.review}
							onChange={handleChange}
						/>
						<button type='submit'>🖋️</button>
					</div>
				</form>
			</aside>
			<br />
		</section>
	);
};

export default GoogleBook;
