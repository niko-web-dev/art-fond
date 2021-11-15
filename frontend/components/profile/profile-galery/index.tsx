import { ProfileAddWrok } from '../profile-add-wrok'
import { useState } from 'react'
import axios from 'axios'
import cookie from 'react-cookies'
import { ProFileEditWork } from '../profile-edit-work'

export const ProfileGalery = ({ allGallery, getProfile }) => {
  const [galleryItem, setGalleryItem] = useState({
    photo: null,
    title: null,
    info: null,
    size: null,
    height: null,
    width: null,
    order: null,
  })
  const [currentItem, setCurrentItem] = useState(null)

  function addWork() {
    let data = {
      photo: galleryItem.photo,
      title: galleryItem.title,
      info: galleryItem.info,
      size: galleryItem.size,
      width: galleryItem.width,
      height: galleryItem.height,
      order: allGallery.length + 1,
    }
    axios
      .post('api/galleryitem', JSON.stringify(data), {
        headers: {
          Authorization: `Bearer ${cookie.load('token')}`,
        },
      })
      .then(async (res) => {
        console.log(res.data)
        return await getProfile()
      })
      .catch((e) => {
        console.log(e)
      })
  }

  function onDragStartHandler(e, item) {
    setCurrentItem(item)
  }
  function onDragEndHandler(e) {
    e.target.style.border = 'none'
  }
  function onDragOverHandler(e) {
    e.preventDefault()
    e.target.style.border = '1px solid black'
  }
  function onDropHandler(e, item) {
    e.preventDefault()
    e.target.style.border = 'none'
    allGallery.map((c) => {
      if (c.id === currentItem.id) {
        updateItem({ ...c, order: item.order })
      }
      if (c.id === item.id) {
        updateItem({ ...c, order: currentItem.order })
      }
    })
  }

  function updateItem(item) {
    let myData = {
      photo: item.photo,
      title: item.title,
      info: item.info,
      size: item.size,
      width: item.width,
      height: item.height,
      order: item.order,
    }
    let data = JSON.stringify(myData)
    axios
      .post(`api/galleryitem/update/${item.id}`, data, {
        headers: {
          Authorization: `Bearer ${cookie.load('token')}`,
        },
      })
      .then(async (res) => {
        console.log(res.data)
        return getProfile()
      })
      .catch((e) => {
        console.log(e)
      })
  }

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
        <ProfileAddWrok
          galleryItem={galleryItem}
          setGalleryItem={setGalleryItem}
          addWork={addWork}
        />
        {allGallery
          ?.sort(sortCards)
          .map((item) =>
            (item.order - 1) % 2 ? (
              <ProFileEditWork
                key={item.order}
                item={item}
                onDragStartHandler={onDragStartHandler}
                onDragEndHandler={onDragEndHandler}
                onDragOverHandler={onDragOverHandler}
                onDropHandler={onDropHandler}
              />
            ) : null
          )}
      </div>
      <div className="profile-portfolio__column">
        {allGallery
          ?.sort(sortCards)
          .map((item) =>
            item.order % 2 ? (
              <ProFileEditWork
                key={item.order}
                item={item}
                onDragStartHandler={onDragStartHandler}
                onDragEndHandler={onDragEndHandler}
                onDragOverHandler={onDragOverHandler}
                onDropHandler={onDropHandler}
              />
            ) : null
          )}
      </div>
    </section>
  )
}
