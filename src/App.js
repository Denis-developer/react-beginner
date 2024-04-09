import React from 'react';
import './index.scss';

function Collection({ name, images }) {
    return (
        <div className="collection">
            <img className="collection__big" src={images[0]} alt="Item" />
            <div className="collection__bottom">
                <img className="collection__mini" src={images[1]} alt="Item" />
                <img className="collection__mini" src={images[2]} alt="Item" />
                <img className="collection__mini" src={images[3]} alt="Item" />
            </div>
            <h4>{name}</h4>
        </div>
    );
}

function App() {

    const [collections, setCollections] = React.useState([]);
    const [categories, setCategories] = React.useState([]);
    const [categoryId, setCategoryId] = React.useState(0);
    const [page, setPage] = React.useState(1);
    const [searchPhotos, setSearchPhotos] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        setIsLoading(true);

        const categoryUrl = `${categoryId ? `category=${categoryId}` : ''}`;
        // const pageUrl = `_limit=2&_page=${page}`;

        fetch(`http://localhost:3000/collections?&${categoryUrl}`)
            .then(res => res.json())
            .then(json => {
                setCollections(json);
            })
            .catch(err => {
                console.warn(err);
            })
            .finally(() => setIsLoading(false))
    }, [categoryId, page])

    React.useEffect(() => {
        fetch('http://localhost:3000/categories')
            .then(res => res.json())
            .then(json => {
                setCategories(json);
            })
            .catch(err => {
                console.warn(err);
            })
    }, [])

    return (
        <div className="App">
            <h1>Моя коллекция фотографий</h1>
            <div className="top">
                <ul className="tags">
                    {categories.map((item, i) => <li onClick={() => setCategoryId(i)} className={categoryId === i ? 'active' : ''} key={i}>{item.name}</li>)}
                </ul>
                <input value={searchPhotos} onChange={(e) => setSearchPhotos(e.target.value)} className="search-input" placeholder="Поиск по названию" />
            </div>
            <div className="content">
                {isLoading ? <h2>loading ...</h2> :
                    (collections.filter(item => {
                        if (item.name.toLowerCase().includes(searchPhotos.toLowerCase())) {
                            return true;
                        }
                    })
                        .map((item, i) => <Collection category={item.category} key={i} name={item.name} images={item.photos} />))}
            </div>
            <ul className="pagination">
                {
                    // [...Array(5)].map((_, i) => <li key={i} className={page === i + 1 ? 'active' : ''} onClick={() => setPage(i + 1)}>{i + 1}</li>)
                }
            </ul>
        </div>
    );
}

export default App;
