import Head from 'next/head'
import axios from 'axios'
import styles from './prodile.module.scss'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Profiles({ data }) {
  const [popup, setPopup] = useState(null)
  const [popupPos, setPopupPos] = useState({
    top: 0,
    left: 0,
  })

  console.log(data)
  const popupOpen = (index, el) => {
    setPopupPos({
      top: el.target.offsetTop,
      left: el.target.offsetLeft,
    })
    setPopup(index)
  }
  return (
    <main>
      <Head>
        <title>Художники</title>
        <meta name="description" content="Главная страница" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className={styles.profiles}>
        <div className="container">
          <h1 className="title title-ml">Художники</h1>
          <ul className={styles.profiles__wrapper}>
            {data.map((item, index) => {
              return (
                <li
                  className={styles.profiles__item}
                  key={index}
                  onMouseEnter={(el) => popupOpen(index, el)}
                >
                  {item.surname + ' ' + item.name}
                </li>
              )
            })}
          </ul>
        </div>
        {popup !== null ? (
          <Link href={`/profiles/${data[popup].id}`}>
            <a
              className={styles.profiles__popup}
              style={{ top: popupPos.top + 'px', left: popupPos.left + 'px' }}
              onMouseLeave={(el) => popupOpen(null, el)}
            >
              <div className={styles.profiles__popup_user}>
                <Image
                  src={data?.[popup].photo}
                  alt={data?.[popup].surname + ' ' + data?.[popup].name}
                  width={153}
                  height={153}
                />
                <h2>
                  {data?.[popup].surname}
                  <br />
                  {data?.[popup].name}
                </h2>
              </div>
              <div className={styles.profiles__popup_info}>
                {data?.[popup].educationInfo}
              </div>
            </a>
          </Link>
        ) : null}
      </section>
    </main>
  )
}

export async function getStaticProps() {
  const data = await axios.get('api/users')
  return {
    props: { data: data.data },
  }
}
