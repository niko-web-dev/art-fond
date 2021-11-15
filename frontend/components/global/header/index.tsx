import s from './header.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import axios from 'axios'
import cookie from 'react-cookies'
import { useToggle } from 'react-use'

export const Header = () => {
  const [login, setLogin] = useState(null)
  const [password, setPassword] = useState(null)
  const [token, setToken] = useState(cookie.load('token'))
  const [errorMessage, setErrorMessage] = useState(null)
  const [navOpen, setNavOpen] = useToggle(false)
  const handleChange = (type, value) => {
    setErrorMessage(null)
    switch (type) {
      case 'login':
        setLogin(value)
        break
      case 'password':
        setPassword(value)
        break
    }
  }
  function logout(e) {
    e.preventDefault()
    setToken(null)
    document.cookie = `token=${token}`
  }
  const auth = (e) => {
    e.preventDefault()
    let data = {
      login: login,
      password: password,
    }
    axios
      .post('api/auth/login', JSON.stringify(data))
      .then(async (res) => {
        console.log(res.data)
        console.log(axios)
        setLogin(null)
        setPassword(null)
        setToken(res.data.token)
        document.cookie = `token=${res.data.token}`
        // return await Router.push('/')
      })
      .catch((e) => {
        setErrorMessage(1)
      })
  }
  return (
    <header className={s.header}>
      <div className="container">
        <div className={s.header__wrapper}>
          <button
            onClick={() => setNavOpen(!navOpen)}
            className={s.header__burger}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.9911 27.9821C21.7181 27.9821 27.9821 21.7181 27.9821 13.9911C27.9821 6.26401 21.7181 0 13.9911 0C6.26401 0 0 6.26401 0 13.9911C0 21.7181 6.26401 27.9821 13.9911 27.9821Z"
                fill="black"
              />
              <path
                d="M23.8725 7.93362H4.10986V9.72048H23.8725V7.93362Z"
                fill="white"
              />
              <path
                d="M23.8725 13.1155H4.10986V14.9024H23.8725V13.1155Z"
                fill="white"
              />
              <path
                d="M23.8725 18.2795H4.10986V20.0664H23.8725V18.2795Z"
                fill="white"
              />
            </svg>
          </button>
          <Link href={'/'}>
            <a className={s.header__logo}>
              <picture className={[s.header__logo_img, s.img].join(' ')}>
                <source
                  media="(max-width: 799px)"
                  srcSet="/static/img/logo 1.png"
                />
                <source
                  media="(min-width: 800px)"
                  srcSet="/static/img/logo 1@2x.png"
                />
                <source
                  media="(min-width: 2000px)"
                  srcSet="/static/img/logo 1@3x.png"
                />
                <Image
                  src="/static/img/logo 1.png"
                  alt="lgotype"
                  layout="fill"
                />
              </picture>
            </a>
          </Link>
          <nav
            className={[s.header__nav, s.nav, navOpen ? s.nav_open : null].join(
              ' '
            )}
          >
            <ul className={s.nav__wrapper}>
              <li className={s.nav__wrapper_item}>
                <Link href={'/events'}>
                  <a href="#" className={s.nav__wrapper_link}>
                    события
                  </a>
                </Link>
              </li>
              <li className={s.nav__wrapper_item}>
                <Link href={`/profiles`}>
                  <a href="#" className={s.nav__wrapper_link}>
                    художники
                  </a>
                </Link>
              </li>
              <li className={s.nav__wrapper_item}>
                <Link href={'/profile'}>
                  <a href="#" className={s.nav__wrapper_link}>
                    информация
                  </a>
                </Link>
              </li>
            </ul>
          </nav>
          <a href="#" className={s.header__social} target="_blank">
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0)">
                <path
                  d="M29.9999 15.0007C29.9999 23.3841 23.3556 30.0244 14.9904 29.9991C6.63459 29.9739 -0.0254051 23.2862 -0.000141989 14.9439C0.0251212 6.6395 6.80828 -0.0608451 15.1293 -0.000851465C23.4156 0.0591422 29.9999 6.69949 29.9999 15.0007ZM15.0409 5.79012C13.7778 5.79012 12.5146 5.78064 11.2514 5.79327C7.94512 5.82485 5.76617 8.02251 5.74091 11.3727C5.72196 13.7945 5.72196 16.2132 5.74091 18.6351C5.76617 21.9221 7.79038 24.1419 11.0588 24.2808C13.6862 24.3913 16.323 24.3913 18.9504 24.2808C22.0451 24.1513 24.1451 21.9979 24.243 18.9098C24.3251 16.3332 24.3251 13.7503 24.243 11.1769C24.1388 7.90884 21.9283 5.82801 18.6725 5.79643C17.463 5.78064 16.2504 5.79012 15.0409 5.79012Z"
                  fill="black"
                />
                <path
                  d="M22.4716 15.0647C22.4716 16.4319 22.5031 17.796 22.4621 19.1632C22.4052 21.1241 21.0284 22.5292 19.0673 22.5639C16.3894 22.6113 13.7084 22.605 11.0305 22.5671C8.98419 22.5387 7.53787 21.2188 7.45892 19.138C7.35787 16.4098 7.35787 13.6722 7.45261 10.9441C7.52524 8.80643 8.98419 7.46763 11.1284 7.42973C13.7021 7.38553 16.2789 7.38237 18.8526 7.42973C21.0852 7.47078 22.44 8.89169 22.4716 11.1209C22.4873 12.4376 22.4747 13.7512 22.4716 15.0647ZM14.9747 10.2621C12.3947 10.2715 10.2126 12.3903 10.1684 14.9289C10.1242 17.4708 12.4231 19.7442 15.0252 19.7316C17.5673 19.719 19.8031 17.5339 19.8347 15.0363C19.8663 12.4566 17.6242 10.2526 14.9747 10.2621ZM21.3252 9.9621C20.7379 9.52004 20.3147 8.97062 20.0116 9.03062C19.5947 9.11271 19.2726 9.65582 18.9094 10.0031C19.2821 10.3568 19.6137 10.9031 20.0431 10.9946C20.3242 11.0546 20.7442 10.4547 21.3252 9.9621Z"
                  fill="black"
                />
                <path
                  d="M18.0505 14.9763C18.0537 16.7414 16.7432 18.0834 15.0063 18.0897C13.2884 18.096 11.9147 16.7225 11.9147 14.9984C11.9147 13.2744 13.2695 11.9072 14.9874 11.8977C16.7147 11.8914 18.0474 13.227 18.0505 14.9763Z"
                  fill="black"
                />
              </g>
              <defs>
                <clipPath id="clip0">
                  <rect width="30" height="30" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </a>
          {token == null ? (
            <div className={s.header__login}>
              <button className={s.header__login_button}>вход</button>
              <form
                className={[s.header__login_form, s.login].join(' ')}
                onSubmit={(e) => auth(e)}
              >
                <input
                  type="text"
                  name="login"
                  placeholder="логин"
                  value={login}
                  onChange={(e) => handleChange('login', e.target.value)}
                  className={s.login__input}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="пароль"
                  value={password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  className={s.login__input}
                />
                {errorMessage != null ? (
                  <p className={s.login__error}>Логин или пароль неверный.</p>
                ) : null}

                <button className={s.login__button}>востановить пароль</button>
                <Link href={'/registration'}>
                  <a className={[s.login__link, s.login__button].join(' ')}>
                    зарегистрироваться
                  </a>
                </Link>
              </form>
            </div>
          ) : (
            <div className={s.header__login}>
              <button
                onClick={(e) => logout(e)}
                className={s.header__login_button}
              >
                выход
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
