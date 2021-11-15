import Image from 'next/image'

export const ProfileWork = ({ item }) => {
  return (
    <div className="profile-portfolio__block">
      <picture className="profile-portfolio__block-img">
        <Image
          src={item.photo}
          layout={'responsive'}
          width={item.width + 'px'}
          height={item.height + 'px'}
          objectFit="contain"
        />
      </picture>
      <h2 className="title profile-portfolio__block-title">«{item.title}»</h2>
      <p className="profile-portfolio__block-info">
        {item.info} <b>{item.size}</b>
      </p>
    </div>
  )
}
