import { useBreakpoint } from "@/config";
import { NavbarMobile, Navbar, Footer } from "..";

export default function Layout({children}) {
    const breakpoint = useBreakpoint()

    return (
        <>
            {
                breakpoint === 'default' ? (
                    <NavbarMobile></NavbarMobile>
                ) : (
                    <Navbar></Navbar>
                )
            }
            <main className="px-2 py-4 mt-24">
                {children}
            </main>
            <div className="w-full">
                <Footer></Footer>
            </div>
        </>
    )
}