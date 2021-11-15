import Head from 'next/head'
import { Form } from "../components";

export default function Home() {
    return (
        <main>
            <Head>
                <title>Регистрация</title>
                <meta name="description" content="Главная страница"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Form />
        </main>
)
}
