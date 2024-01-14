import React from 'react';
import './header.css'
import { useNavigate } from 'react-router-dom';

const Header = () => {

	const navigate = useNavigate()

  return (
    <section className="header">
			<div className="container">
				<div className='header__item'>
					<h2>Your Logo</h2>
					<div>
						<button onClick={() => navigate('/auth')} className='header__logo'>Login</button>
					</div>
				</div>
			</div>
    </section>
  );
};

export default Header;
