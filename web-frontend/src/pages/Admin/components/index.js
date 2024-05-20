import Sidebar from "./sideBar";
import HeaderAdmin from "./header";
import { useState } from "react";

function DefaultLayoutAdmin({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return ( 
        <div className="flex flex-row h-dvh">
            <aside className={`basis-1/5 md:w-full md:max-h-max border-gray-800 text-[15px] ${isSidebarOpen ? 'block' : 'hidden'}`} aria-label="Sidebar" >
                <Sidebar />
            </aside>
            <div className={`${isSidebarOpen ? 'basis-4/5' : 'w-full mx-auto'} bg-green-50`}>
                <div>
                    <HeaderAdmin styles={ isSidebarOpen ? 'fixed top-0 right-0 w-4/5 bg-white' : 'fixed top-0 right-0 w-full bg-white' } toggleSidebar={toggleSidebar}/>
                </div>
                <main>
                    <div className="bg-green-50 pt-20">
                        {children}
                    </div>
                </main>
            </div>
        </div>
     );
}

export default DefaultLayoutAdmin;