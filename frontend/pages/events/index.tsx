import Head from 'next/head'
import { EventGallery } from '../../components'
import axios from 'axios'
import { useMemo } from 'react'

export default function Home({ data }) {
  const events = useMemo(() => data.map((event) => event), [data])

  return (
    <main className="fix-padding-menu">
      <Head>
        <title>Все события</title>
        <meta name="description" content="Главная страница" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <EventGallery events={events} />
    </main>
  )
}

export async function getStaticProps() {
  const data = await axios.get('api/artevents')
  return {
    props: { data: data.data },
  }
}
