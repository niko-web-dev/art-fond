import Head from 'next/head'
import { Intro, EventGallery } from '../components'
import axios from 'axios'
import { useMemo, useState } from 'react'

export default function Home({ data }) {
  const events = useMemo(() => data.map((event) => event), [data])
  const [artEvents, setArtEvents] = useState(data)
  const sortEvents = (a, b) => {
    if (a.id < b.id) {
      return 1
    } else {
      return -1
    }
  }
  if (artEvents.length > 6) {
    setArtEvents(artEvents.sort(sortEvents).slice(0, 6))
  }

  return (
    <main>
      <Head>
        <title>Главная</title>
        <meta name="description" content="Главная страница" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Intro />
      <EventGallery events={artEvents} />
    </main>
  )
}

export async function getStaticProps() {
  const data = await axios.get('api/artevents')
  return {
    props: { data: data.data },
  }
}
