import Footer from "../../../pages/Home/Footer";
import Header from "./Header";

function DefaultLayout({ children }) {
    return ( 
        <div>
            <div className="">
                <Header />
            </div>
            <div className="">
                <div className="min-h-screen overflow-y-auto">{children}</div>
                <Footer />
            </div>
        </div>
     );
}

export default DefaultLayout;