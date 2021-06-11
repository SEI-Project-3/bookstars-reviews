import './App.css';
import { useEffect, useState } from 'react';
import { Link, Route } from 'react-router-dom';
import Header from './Components/Header';
import Gallery from './Components/Gallery';
import BookGrid from './Components/BookGrid';
import BookDetail from './Components/BookDetail';

function App() {

	const [books, setBooks] = useState([])

	useEffect(() => {
		fetch('http://localhost:3000/api/books')
			.then((res) => res.json())
			.then((res) => {setBooks(res)})
			.catch();
	}, []);

	return (
		<div className='App'>
			<Route path='/' render={() => <Header />} />
			<Route path='/' exact render={() => <Gallery />} />
			<Route
				path='/'
				exact
				render={() => <BookGrid books={books} setBooks={setBooks} />}
			/>
			{/* <Route
				path='/:genre'
				render={() => <BookGrid books={books} setBooks={setBooks} />}
			/> */}
			<Route
				path='/books/:title'
				render={(routerProps) => <BookDetail books={books} setBooks={setBooks} match={routerProps.match} />}
			/>
		</div>
	);
}

export default App;
