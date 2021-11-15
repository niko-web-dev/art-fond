import s from './intro.module.scss'
import Image from 'next/image'

export const Intro = () => {
    return (
        <section className={s.intro}>
            <div className={s.intro__info}>
                <h1 className={s.intro__title}>
                    <i>ХУДОЖЕСТВЕННЫЙ</i>
                    <br />
                    <span className={[s.intro__title_help, 'w500'].join(' ')}>ФОНД</span>
                    <br />
                    <i>СОДЕЙСТВИЯ
                        РАЗВИТИЮ
                        ИСКУССТВА.</i>
                </h1>
                <p className={[s.intro__text, s.intro__text_top].join(' ')}>Мы живем в мире, который требует непрерывного улучшения. Мы
                    не можем
                    сказать - все прекрасно!</p>
                <p className={[s.intro__text, s.intro__text_bot].join(' ')}>Мы живем в мире, который требует непрерывного улучшения. Мы
                    не можем
                    сказать - все прекрасно!</p>
            </div>
            <div className={s.intro__img}>
                <picture className="img">
                    <source media="(max-width: 799px)"
                            srcSet="/static/img/15_AkemiTakeya_LemonismXActionism_mumok_33(c)KarolinaMiernik.jpg" />
                    <source media="(min-width: 800px)"
                            srcSet="/static/img/15_AkemiTakeya_LemonismXActionism_mumok_33(c)KarolinaMiernik@2x.jpg" />
                    <source media="(min-width: 2000px)"
                            srcSet="/static/img/15_AkemiTakeya_LemonismXActionism_mumok_33(c)KarolinaMiernik@3x.jpg" />
                    <Image src="/static/img/15_AkemiTakeya_LemonismXActionism_mumok_33(c)KarolinaMiernik@3x.jpg"
                         alt="Akemi Takeya - picture Lemonism" width={1200} height={1040} />
                </picture>
            </div>
        </section>
    )
}