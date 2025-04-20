import { BlankLayout, Layout, SellerLayout } from "../components";
import { Playfair_Display, Poppins } from "next/font/google";
import { Provider } from "react-redux";
import store from "@/store";

const playfair = Playfair_Display({ subsets: ["latin"], weight: "700" });
import '@/assets/css/global.css'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Backdrop, CircularProgress } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const font = Poppins({
  weight: '400',
  style: ['normal'],
  subsets: ['latin']
})

const regex = {
    seller: /seller/i,
    blank: /register/i,
}

const theme = createTheme(); 

export default function MyApp({ Component, pageProps }) {
    const getLayout = Component.getLayout
    const router = useRouter()

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleStart = () => setLoading(true);
        const handleComplete = () => setLoading(false);

        router.events.on('routeChangeStart', handleStart);
        router.events.on('routeChangeComplete', handleComplete);
        router.events.on('routeChangeError', handleComplete);

        return () => {
        router.events.off('routeChangeStart', handleStart);
        router.events.off('routeChangeComplete', handleComplete);
        router.events.off('routeChangeError', handleComplete);
        };
    }, []);

    return (
        <Provider store={store}>
            <style jsx global>{`
                html {
                font-family: ${font.style.fontFamily};
                }
            `}</style>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.appBar + 1000 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
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