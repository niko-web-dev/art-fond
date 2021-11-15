import s from './form.module.scss'
import Image from 'next/image'
import axios from 'axios'
import { useState } from 'react'
import { useToggle } from 'react-use'
import Router from 'next/router'

export const Form = () => {
  const [photo, setPhoto] = useState(undefined)
  const [isPersonal, togleIsPersonal] = useToggle(false)
  const [user, setUser] = useState({
    nameUser: null,
    surnameUser: null,
    emailUser: null,
    cityUser: null,
    birthdayUser: null,
    telUser: null,
    oraginationUser: ' ',
    specEducationUser: null,
    hightEducationUser: null,
    hightSecondEducationUser: null,
    infoEducationUser: null,
    loginUser: null,
    passwordUser: null,
  })

  async function savePhoto(event) {
    let file = await event.target.files[0]

    const formData = new FormData()
    console.log(file)
    formData.append('photo', file)
    axios
      .post('api/auth/save-image', formData)
      .then(async (res) => {
        console.log(res.data)
        return await setPhoto(
          `http://localhost:5000/${res.data.folder}/${res.data.name}`
        )
      })
      .catch((e) => {
        console.log(e)
      })
    console.log(photo)
  }
  const handleChange = (type, value) => {
    console.log(value)
    switch (type) {
      case 'name':
        setUser({ ...user, nameUser: value })
        break
      case 'surname':
        setUser({ ...user, surnameUser: value })
        break
      case 'email':
        setUser({ ...user, emailUser: value })
        break
      case 'city':
        setUser({ ...user, cityUser: value })
        break
      case 'birthday':
        setUser({ ...user, birthdayUser: value })
        break
      case 'tel':
        setUser({ ...user, telUser: value })
        break
      case 'oragination':
        setUser({ ...user, oraginationUser: value })
        break
      case 'specEducation':
        setUser({ ...user, specEducationUser: value })
        break
      case 'hightEducation':
        setUser({ ...user, hightEducationUser: value })
        break
      case 'hightSecondEducation':
        setUser({ ...user, hightSecondEducationUser: value })
        break
      case 'infoEducation':
        setUser({ ...user, infoEducationUser: value })
        break
      case 'login':
        setUser({ ...user, loginUser: value })
        break
      case 'password':
        setUser({ ...user, passwordUser: value })
        break
    }
  }

  const submitForm = (e) => {
    e.preventDefault()
    let data = {
      email: user.emailUser,
      login: user.loginUser,
      password: user.passwordUser,
      contacts: [
        {
          phone: user.telUser,
        },
      ],
      education: [
        {
          spec: user.specEducationUser,
          universe1: user.hightEducationUser,
          universe2: user.hightSecondEducationUser,
        },
      ],
      educationInfo: user.infoEducationUser,
      city: user.cityUser,
      birthday: new Date(user.birthdayUser).toISOString(),
      photo: photo,
    }
    axios
      .post('api/auth/registration', JSON.stringify(data))
      .then(async (res) => {
        console.log(res.data)
        return await Router.push('/')
      })
      .catch((e) => {
        console.log(e)
      })
  }

  return (
    <section className={s.form}>
      <div className="container">
        <h2 className={s.form__title}>регистрация</h2>
        <form className={s.form__inner} onSubmit={submitForm}>
          <div className={[s.form__items, s.form__items_photo].join(' ')}>
            <label className={s.form__label_photo}>
              <input
                className={s.form__input_photo}
                type="file"
                onChange={savePhoto}
              />
              {photo && typeof photo == 'string' ? (
                <Image src={photo} layout={'fill'} />
              ) : (
                <div className={s.form__input_box}>
                  <span>+</span>
                  <span>фото</span>
                  <span>профиля</span>
                </div>
              )}
            </label>
          </div>
          <div className={s.form__items}>
            <div className={s.form__item}>
              <h2 className={s.form__subtitle}>о себе</h2>
              <input
                className={s.form__input}
                type="text"
                placeholder="имя"
                value={user.nameUser}
                onChange={(e) => handleChange('name', e.target.value)}
                required
              />
              <input
                className={s.form__input}
                type="text"
                placeholder="фамилия"
                value={user.surnameUser}
                onChange={(e) => handleChange('surname', e.target.value)}
                required
              />
              <input
                className={s.form__input}
                type="text"
                placeholder="город"
                value={user.cityUser}
                onChange={(e) => handleChange('city', e.target.value)}
                required
              />
              <input
                className={s.form__input}
                type="text"
                onFocus={(e) => (e.target.type = 'date')}
                value={user.birthdayUser}
                onChange={(e) => handleChange('birthday', e.target.value)}
                placeholder="дата рожденя"
              />
            </div>
            <div className={s.form__item}>
              <h2 className={s.form__subtitle}>контакты</h2>
              <input
                className={s.form__input}
                type="number"
                value={user.telUser}
                onChange={(e) => handleChange('tel', e.target.value)}
                placeholder="контактный телефон"
                name="tel"
              />
              <input
                className={s.form__input}
                type="text"
                name="email"
                value={user.emailUser}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="эллектронный почтовый ящик"
              />
            </div>
            <div className={s.form__item}>
              <h2 className={s.form__subtitle}>
                членство в творческих организациях
              </h2>
              <input
                className={s.form__input}
                type="text"
                value={user.oraginationUser}
                onChange={(e) => handleChange('oragination', e.target.value)}
              />
            </div>
          </div>
          <div className={s.form__items}>
            <div className={s.form__item}>
              <h2 className={s.form__subtitle}>образование</h2>
              <input
                className={s.form__input}
                type="text"
                placeholder="образование среднеспециальное"
                value={user.specEducationUser}
                onChange={(e) => handleChange('specEducation', e.target.value)}
              />
              <input
                className={s.form__input}
                type="text"
                placeholder="образование  высшее"
                value={user.hightEducationUser}
                onChange={(e) => handleChange('hightEducation', e.target.value)}
              />
              <input
                className={s.form__input}
                type="text"
                placeholder="образование второе высшее"
                value={user.hightSecondEducationUser}
                onChange={(e) =>
                  handleChange('hightSecondEducation', e.target.value)
                }
              />
              <textarea
                className={s.form__textarea}
                placeholder="дополнительная информация"
                value={user.infoEducationUser}
                onChange={(e) => handleChange('infoEducation', e.target.value)}
              ></textarea>
            </div>
            <div className={s.form__item}>
              <h2
                className={[s.form__subtitle, s.form__subtitle__last].join(' ')}
              >
                безопасность
              </h2>
              <input
                className={s.form__input}
                type="text"
                placeholder="логин"
                value={user.loginUser}
                onChange={(e) => handleChange('login', e.target.value)}
                name="login"
              />
              <input
                className={s.form__input}
                type="password"
                placeholder="пароль"
                value={user.passwordUser}
                onChange={(e) => handleChange('password', e.target.value)}
              />
              <label className={s.form__label_checked}>
                <input
                  className={s.form__input_checked}
                  type="checkbox"
                  required
                  checked={isPersonal}
                  onChange={() => togleIsPersonal(!isPersonal)}
                />
                <span className={s.form__span_check}></span>
                <span className={s.form__span_text}>
                  согласен на обработку персональных данных
                </span>
              </label>
            </div>
            <button className={s.form__btn} type="submit">
              зарегистрироваться
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
