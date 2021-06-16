import './App.css';
import { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import Header from './Components/Header';
import Gallery from './Components/Gallery';
import BookGrid from './Components/BookGrid';
import BookDetail from './Components/BookDetail';
import GoogleBook from './Components/GoogleBook';

function App() {
	const [books, setBooks] = useState([]);
	const [bookDetail, setBookDetails] = useState('');
	const [extra, setExtra] = useState('');

	useEffect(() => {
		fetch(
			'https://api.nytimes.com/svc/books/v3/lists/current/combined-print-fiction.json?api-key=Har2JGxlbuOpjx3lnsMAWb4MPCzfGO3u'
		)
			.then((res) => res.json())
			.then((res) => {
				console.log(res.results);
				setBooks(res.results.books);
			})
			.catch();
	}, []);

	return (
		<div className='App'>
			<Route
				path='/'
				render={(routerProps) => (
					<Header
						bookDetail={bookDetail}
						setBookDetails={setBookDetails}
						{...routerProps}
					/>
				)}
			/>
			<main>
				{/* <Route path='/' exact render={() => <Gallery />} /> */}
				<Route
					path='/'
					exact
					render={() => (
						<BookGrid
							books={books}
							setBooks={setBooks}
							extra={extra}
							setExtra={setExtra}
						/>
					)}
				/>
				<Route
					path='/:genre'
					exact
					render={(routerProps) => (
						<BookGrid
							match={routerProps.match}
							books={books}
							setBooks={setBooks}
							extra={extra}
							setExtra={setExtra}
						/>
					)}
				/>
				<Route
					path='/books/:title'
					render={(routerProps) => (
						<BookDetail
							books={books}
							bookDetail={bookDetail}
							setBookDetails={setBookDetails}
							match={routerProps.match}
						/>
					)}
				/>
				<Route
					exact
					path='/search/:title'
					render={(routerProps) => (
						<GoogleBook
							bookDetail={bookDetail}
							setBookDetails={setBookDetails}
							match={routerProps.match}
						/>
					)}
				/>
			</main>
		</div>
	);
}

export default App;
