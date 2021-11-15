import Image from 'next/image'

export const ProfileIntro = ({ profile }) => {
  return (
    <section className="profile-intro">
      <h1 className="profile-intro__title title">
        {profile.name + profile.surname}
      </h1>
      <div className="profile-intro__wrapper">
        <div className="profile-intro__info">
          <picture className="profile-intro__img">
            <Image
              src={profile.photo}
              alt={profile.name + profile.surname}
              width={357}
              height={357}
            />
          </picture>

          <p className="profile-intro__text">{profile.educationInfo}</p>
        </div>
        <div className="profile-intro__contact">
          <h2 className="title profile-intro__contact-title">контакты</h2>
          <a href="#" className="profile-intro__contact-link">
            facebook
          </a>
          <a href="#" className="profile-intro__contact-link">
            instagram
          </a>
          <a href="#" className="profile-intro__contact-link">
            mail
          </a>
        </div>
      </div>
    </section>
  )
}
