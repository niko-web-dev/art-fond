import Image from 'next/image'

export const ProFileEditWork = ({
  item,
  onDragStartHandler,
  onDragEndHandler,
  onDragOverHandler,
  onDropHandler,
}) => {
  return (
    <form
      className="profile-portfolio__block"
      draggable={true}
      onDragStart={(e) => {
        onDragStartHandler(e, item)
      }}
      onDragLeave={(e) => {
        onDragEndHandler(e)
      }}
      onDragEnd={(e) => {
        onDragEndHandler(e)
      }}
      onDragOver={(e) => {
        onDragOverHandler(e)
      }}
      onDrop={(e) => {
        onDropHandler(e, item)
      }}
    >
      <div className="profile-portfolio__block-box">
        <picture id={item.id} className="profile-portfolio__block-img">
          <Image
            src={item.photo}
            layout={'responsive'}
            width={item.width + 'px'}
            height={item.height + 'px'}
            objectFit="contain"
          />
        </picture>

        <input
          className="profile-portfolio__block-edit-img"
          type="file"
          name="work-img"
        />

        <div className="profile-portfolio__edit-block edit-block">
          <button className="edit-btn" type="button">
            <svg
              width="26"
              height="36"
              viewBox="0 0 26 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_216:4)">
                <path
                  d="M13.2694 26.0239L20.0244 22.1239L7.74941 0.862977L0.994414 4.76298L13.2694 26.0239Z"
                  stroke="white"
                  strokeMiterlimit="10"
                />
                <path
                  d="M17.8216 26.1091L21.1904 24.1641L21.2003 28.0613L21.1966 31.9548L17.8228 30.0113L14.4441 28.0591L17.8216 26.1091Z"
                  stroke="white"
                  strokeMiterlimit="10"
                />
                <path
                  d="M4.44422 10.7386L11.1992 6.83856L7.74422 0.854327L0.989221 4.75433L4.44422 10.7386Z"
                  fill="white"
                />
                <path
                  d="M19.1464 28.4041L21.1902 27.2241L21.1933 29.5894L21.1964 31.9548L19.1408 30.7744L17.0939 29.5891L19.1464 28.4041Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath>
                  <rect
                    width="9.52"
                    height="35.15"
                    fill="white"
                    transform="translate(25.8193 30.4408) rotate(150)"
                  />
                </clipPath>
              </defs>
            </svg>
            <span className="sr-only">Внести изменения в работу</span>
          </button>
          <button className="edit-btn" type="button">
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_217:42)">
                <path
                  d="M24.1513 14H3.84863"
                  stroke="white"
                  strokeMiterlimit="10"
                />
                <path
                  d="M13.9997 7.71501H9.55078L11.7752 3.84868L13.9997 0L16.2242 3.84868L18.4486 7.71501H13.9997Z"
                  fill="white"
                />
                <path
                  d="M13.9997 20.285H18.4486L16.2242 24.1513L13.9997 28L11.7752 24.1513L9.55078 20.285H13.9997Z"
                  fill="white"
                />
                <path
                  d="M20.2852 14V9.55109L24.1515 11.7756L28.0002 14L24.1515 16.2245L20.2852 18.4489V14Z"
                  fill="white"
                />
                <path
                  d="M7.71501 14V18.4489L3.84868 16.2245L0 14L3.84868 11.7756L7.71501 9.55109V14Z"
                  fill="white"
                />
                <path
                  d="M14 3.84869V24.1513"
                  stroke="white"
                  strokeMiterlimit="10"
                />
              </g>
              <defs>
                <clipPath>
                  <rect width="28" height="28" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <span className="sr-only">Поменять местоположение работы</span>
          </button>
          <button className="edit-block__btn" type="button">
            Редактировать
          </button>
        </div>
      </div>
      <h2 className="title profile-portfolio__block-title">«{item.title}»</h2>
      <p className="profile-portfolio__block-info">
        {item.info} <b>{item.size}</b>
      </p>
    </form>
  )
}
