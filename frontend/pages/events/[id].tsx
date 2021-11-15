import Head from 'next/head'
import axios from 'axios'
import Image from 'next/image'

export default function Event({ event }) {
  console.log(event.content[1])
  console.log(typeof event.content[1])
  const CONTENT = []
  event.content.map((item) => {
    if (item.indexOf('image') > 0) {
      console.log(item)
      let a = JSON.parse(`${item}`)
      CONTENT.push(a)
    } else {
      CONTENT.push(item)
    }
  })

  return (
    <main>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content="Главная страница" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <article>
        <header className="event-intro">
          <div className="container">
            <div className="event-intro__wrapper">
              <div className="event-intro__info">
                <h1 className="event-intro__title">
                  {event.title}
                  <br />
                  <br />
                  <div dangerouslySetInnerHTML={{ __html: event.subtitle }} />
                </h1>
                <time className="event-intro__date">{event.dateEvent}</time>
              </div>
              <picture className="event-intro__img">
                <Image
                  src={event.mainImage}
                  alt={event.title}
                  width={1200}
                  height={1040}
                />
              </picture>
            </div>
          </div>
        </header>
        <section className="event-content">
          <div className="container">
            <div className="event-content__wrapper">
              <h2 className="event-content__title">{event.secondTitle}</h2>
              {CONTENT.map((item, index) => {
                if (item.image) {
                  console.log(item.image.src)
                  return (
                    <figure key={index} className="event-content__picture">
                      <picture className="event-content__picture-img">
                        <Image
                          src={item.image.src}
                          alt={item.image.name}
                          width={1200}
                          height={1040}
                        />
                      </picture>
                      <figcaption
                        className="event-content__picture-text"
                        dangerouslySetInnerHTML={{ __html: item.image.name }}
                      />
                    </figure>
                  )
                }
                return (
                  <p key={index} className="event-content__text">
                    {item}
                  </p>
                )
              })}
            </div>
          </div>
        </section>
      </article>
    </main>
  )
}

export async function getServerSideProps(ctx) {
  const { id } = ctx.query
  try {
    const data = await axios.get(`api/artevents/${id}`)
    return {
      props: { event: data.data },
    }
  } catch (e) {
    console.log(e)
  }
}
