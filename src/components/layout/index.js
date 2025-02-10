import Navbar from "../nabar";
import Footer from "../footer";

export default function Layout({children}) {
    return (
        <>
            <Navbar></Navbar>
            <main style={{
                marginTop: '4.5rem',
                padding: '1rem 0.5rem'
            }}>
                {children}
            </main>
            <div style={{
                width: '100%'
            }}>
                <Footer></Footer>
            </div>
        </>
    )
}