import { ProfileWork } from '../../index'

export const ProfileGallerySingle = ({ allGallery }) => {
  const sortCards = (a, b) => {
    if (a.order < b.order) {
      return 1
    } else {
      return -1
    }
  }
  return (
    <section className="profile-portfolio">
      <div className="profile-portfolio__column">
        {allGallery
          ?.sort(sortCards)
          .map((item) =>
            (item.order - 1) % 2 ? (
              <ProfileWork key={item.order} item={item} />
            ) : null
          )}
      </div>
      <div className="profile-portfolio__column">
        {allGallery
          ?.sort(sortCards)
          .map((item) =>
            item.order % 2 ? <ProfileWork key={item.order} item={item} /> : null
          )}
      </div>
    </section>
  )
}
