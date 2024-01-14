import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { authUser } from '../redux/reducers/authSlice';
import { useNavigate } from 'react-router-dom';


const Auth = () => {
  const [status, setStatus] = useState('login');
  const dispatch = useDispatch()

  const navigate = useNavigate()
	
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
	} = useForm({ mode: 'onblur' });


  const authUserFunc = (data) => {
    dispatch(authUser({user: data, params: status }))
		console.log(data)
	}
	

  return (
    <div className="auth">
      <div className="container">
        <form onSubmit={handleSubmit(authUserFunc)} noValidate className="auth__form">
          <ul>
            <li
              style={{ color: status === 'login' ? 'red' : 'black' }}
              onClick={() => setStatus('login')}>
              Login
            </li>
            <li
              style={{ color: status === 'register' ? 'red' : 'black' }}
              onClick={() => setStatus('register')}>
              Register
            </li>
          </ul>
          <label>
            <input {...register('email', {
									required: {
										message: 'Email обязательно к заполнению',
										value: true
									},
									minLength: {
										message: 'Минимум 10 символов',
										value: 10
									},
									pattern: {
										message: 'Напишите правильный свой email',
										value: /^[^ ]+@[^ ]+\.[a-z]{2,5}$/
									}
						})} type="email" placeholder="email" />
									<span>{errors?.email?.message}</span>
          </label>
          {status === 'register' && (
            <>
              <label>
                <input {...register('name', {
									required: {
										message: 'Имя обязательно к заполнению',
										value: true
									},
									minLength: {
										message: 'Минимум 3 символов',
										value: 3
									}
								})} type="text" placeholder="Name" />
              </label>
              <label>
                <input {...register('phone')} type="phone" placeholder="Phone" />
              </label>
            </>
          )}
          <label>
            <input {...register('password', {
									required: {
										message: 'Пароль обязательно к заполнению',
										value: true
									},
									pattern: {
										value: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g,
										message: 'Пароль должен содержать не менее 8 символов, заглавную букву, число!'
									}
						})} type="password" placeholder="password" />
						<span>{errors?.password?.message}</span>
          </label>

          <button type='submit'>{status === 'register' ? 'Register' : 'Login'}</button>
        </form>
        <button onClick={() => navigate('/')}>Go Back</button>
      </div>
    </div>
  );
};

export default Auth;
