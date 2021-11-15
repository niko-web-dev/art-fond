import axios from 'axios'
import Head from 'next/head'
import { ProfileGallerySingle, ProfileIntro } from '../../components'

export default function SingleProfile({ profile }) {
  return (
    <main className="profile">
      <Head>
        <title>Профиль {profile.name + ' ' + profile.surname}</title>
        <meta name="description" content="Главная страница" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container">
        <ProfileIntro profile={profile} />
        <ProfileGallerySingle allGallery={profile.gallery} />
      </div>
    </main>
  )
}

export async function getServerSideProps(ctx) {
  const { id } = ctx.query
  try {
    const data = await axios.get(`api/users/${id}`)
    return {
      props: { profile: data.data },
    }
  } catch (e) {
    console.log(e)
  }
}
