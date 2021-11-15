import Head from 'next/head'
import axios from 'axios'
import { ProfileGalery, ProfileIntro } from '../components'
import { useState } from 'react'
import cookie from 'react-cookies'

export default function Profile({ data }) {
  const [profile, setProfile] = useState(data)
  console.log(profile)
  function getProfile() {
    axios
      .get('api/users/profiled', {
        headers: {
          Authorization: `Bearer ${cookie.load('token')}`,
        },
      })
      .then(async (res) => {
        console.log(res.data)
        return await setProfile(res.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }
  return (
    <main className="profile">
      <Head>
        <title>Профиль</title>
        <meta name="description" content="Главная страница" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container">
        <ProfileIntro profile={profile} />
        <ProfileGalery allGallery={profile.gallery} getProfile={getProfile} />
      </div>
    </main>
  )
}

export async function getServerSideProps(context) {
  function getCookie(name) {
    let matches = context.req.headers.cookie.match(
      new RegExp(
        '(?:^|; )' +
          name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
          '=([^;]*)'
      )
    )
    return matches ? decodeURIComponent(matches[1]) : undefined
  }
  const token = await getCookie('token')
  const data = await axios.get('api/users/profiled', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return {
    props: { data: data.data },
  }
}
