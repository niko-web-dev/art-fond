import s from './eventgallery.module.scss'
import Image from 'next/image'
import Link from 'next/link'

export const EventGallery = ({ events }) => {
  return (
    <section className="event">
      <div className="container">
        <div className={s.event__wrapper}>
          <h2 className="title title-ml">события</h2>

          <ul className={s.event__list}>
            {events.map((event) => (
              <li className={s.event__list_item} key={event.id}>
                <Link href={`/events/${event.id}`}>
                  <a className={s.item}>
                    <div className={s.item__img}>
                      <picture className={s.img}>
                        <Image
                          src={event.mainImage}
                          alt="Akemi Takeya - picture Lemonism"
                          width={1200}
                          height={1040}
                        />
                      </picture>
                    </div>
                    <h3 className={s.item__title}>{event.title}</h3>
                    <p
                      className={s.item__info}
                      dangerouslySetInnerHTML={{ __html: event.secondTitle }}
                    />
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
