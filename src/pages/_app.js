import { Layout } from "../components";
import { Playfair_Display, Poppins } from "next/font/google";
import { Provider } from "react-redux";
import store from "@/store";

const playfair = Playfair_Display({ subsets: ["latin"], weight: "700" });
import '@/assets/css/global.css'

const font = Poppins({
  weight: '400',
  style: ['normal'],
  subsets: ['latin']
})



export default function MyApp({ Component, pageProps }) {
    const getLayout = Component.getLayout
    return (
        <Provider store={store}>
            <style jsx global>{`
                html {
                font-family: ${font.style.fontFamily};
                }
            `}</style>
            {
                getLayout ? (
                    getLayout(<Component {...pageProps} />)
                ) : (<Layout>
                    <Component {...pageProps} />
                </Layout>)
            }
        </Provider>
    )
}