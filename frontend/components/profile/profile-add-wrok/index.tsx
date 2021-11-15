import { useState } from 'react'
import Image from 'next/image'
import axios from 'axios'
import cookie from 'react-cookies'

export const ProfileAddWrok = ({ galleryItem, setGalleryItem, addWork }) => {
  async function savePhoto(event) {
    let file = await event.target.files[0]

    const formData = new FormData()
    console.log(file)
    formData.append('photo', file)
    axios
      .post('api/galleryitem/save-image', formData, {
        headers: {
          Authorization: `Bearer ${cookie.load('token')}`,
        },
      })
      .then(async (res) => {
        console.log(res.data)
        return await setGalleryItem({
          ...galleryItem,
          photo: `http://localhost:5000/${res.data.folder}/${res.data.name}`,
          width: res.data.dimensionsWidth,
          height: res.data.dimensionsHeight,
        })
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const handleChange = (type, value) => {
    console.log(value)
    switch (type) {
      case 'title':
        setGalleryItem({ ...galleryItem, title: value })
        break
      case 'info':
        setGalleryItem({ ...galleryItem, info: value })
        break
      case 'size':
        setGalleryItem({ ...galleryItem, size: value })
        break
    }
  }

  function emitAdd(e) {
    e.preventDefault()
    addWork()
  }

  return (
    <form className="add-work" onSubmit={(e) => emitAdd(e)}>
      <div className="add-work_file-preview">
        {galleryItem.photo && typeof galleryItem.photo == 'string' ? (
          <Image src={galleryItem.photo} layout={'fill'} />
        ) : null}
        <button
          className="add-work__edit-block add-work__edit-block--file edit-block"
          type="button"
        >
          <svg
            width="23"
            height="23"
            viewBox="0 0 23 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M23 11.51H0"
              stroke="white"
              strokeWidth="4"
              strokeMiterlimit="10"
            />
            <path
              d="M11.5098 0V23"
              stroke="white"
              strokeWidth="4"
              strokeMiterlimit="10"
            />
          </svg>
          <span className="edit-block__btn">Добавить работу</span>
        </button>
        <input
          className="add-work__input-file"
          type="file"
          name="work-file"
          onChange={savePhoto}
          required
        />
      </div>
      <input
        className="add-work__input"
        type="text"
        name="work-name"
        placeholder="название серии / работы"
        aria-label="название серии и/или работы"
        value={galleryItem.title}
        onChange={(e) => handleChange('title', e.target.value)}
        required
      />
      <input
        className="add-work__input"
        type="text"
        name="technique"
        placeholder="техника"
        aria-label="техника"
        value={galleryItem.info}
        onChange={(e) => handleChange('info', e.target.value)}
        required
      />
      <input
        className="add-work__input"
        type="text"
        name="dimensions"
        placeholder="размеры"
        aria-label="размеры"
        value={galleryItem.size}
        onChange={(e) => handleChange('size', e.target.value)}
        required
      />
      <button className="add-work__edit-block edit-block" type="submit">
        <span className="edit-block__btn edit-block__btn--alone">Готово</span>
      </button>
    </form>
  )
}
