import { BlankLayout, Layout, SellerLayout } from "../components";
import { Playfair_Display, Poppins } from "next/font/google";
import { Provider } from "react-redux";
import store from "@/store";

const playfair = Playfair_Display({ subsets: ["latin"], weight: "700" });
import '@/assets/css/global.css'
import { useRouter } from "next/router";

const font = Poppins({
  weight: '400',
  style: ['normal'],
  subsets: ['latin']
})

const regex = {
    seller: /seller/i,
    blank: /register/i,
}

export default function MyApp({ Component, pageProps }) {
    const getLayout = Component.getLayout
    const router = useRouter()

    return (
        <Provider store={store}>
            <style jsx global>{`
                html {
                font-family: ${font.style.fontFamily};
                }
            `}</style>
            {
                regex.seller.test(router.route) ?
                    <SellerLayout>
                        <Component {...pageProps} />
                    </SellerLayout>
                : regex.blank.test(router.route) ?
                    <BlankLayout>
                        <Component {...pageProps} />
                    </BlankLayout>
                : getLayout ? (
                    getLayout(<Component {...pageProps} />)
                ) : (<Layout>
                    <Component {...pageProps} />
                </Layout>)
            }
        </Provider>
    )
}