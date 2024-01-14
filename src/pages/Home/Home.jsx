import React, { useEffect } from 'react';
import './home.css';
import { getProducts } from '../redux/reducers/productsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, removeProduct } from '../redux/reducers/basketSlice';

const Home = () => {
  const dispatch = useDispatch();

	const { products, error, status } = useSelector((store) => store.products);
	
	const { basket } = useSelector((store) => store.basket);

  useEffect(() => {
    dispatch(getProducts());
  }, []);


  return (
    <section className='home'>
      <div className="container">
        <h1 className="home__title">Spend Bill Gates' Money</h1>

				<div className="home__money">$ {1000000 - basket.reduce((acc, rec) => {
					return acc + rec.price * rec.count
				}, 0)}</div>

        {status === 'loading' ? (
          <h2>Loading...</h2>
        ) : status === 'error' ? (
          <h2>{error}</h2>
        ) : (
          <div className="home__row">
            {products.map((item) => (
              <div key={item.id} className="home__card">
                <img src={item.images[0]} className="home__card-img" alt="" />
                <h3 className="home__card-title">{item.title}</h3>
                <p className="home__card-price">$ {item.price}</p>
                <div className="home__card-action">
									<button className="home__card-btn" onClick={() => {
										dispatch(removeProduct(item))
									}}>sell</button>
									<span>
										{
										basket.find(el => el.id === item.id)?.count || 0
										}
									</span>
                  <button
                    className="home__card-btn"
                    onClick={() => {
											dispatch(addProduct(item));
											console.log(item)
                    }}>
                    buy
                  </button>
                </div>
              </div>
            ))}
          </div>
				)}
				
				<div>
					<h2>Your Receipt</h2>

					<ul>
						{
							basket.map(item => (
								<li>{item.title} x {item.count} {item.price * item.count}</li>
							))
						}
					</ul>
					<br />

					Total: {basket.reduce((acc, rec) => {
						return acc + rec.price * rec.count
					}, 0)}

				</div>

      </div>
    </section>
  );
};

export default Home;
