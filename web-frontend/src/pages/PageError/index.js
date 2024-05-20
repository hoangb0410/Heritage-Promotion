import { Link } from "react-router-dom";

function PageError() {
    return ( 
        <section className="bg-white dark:bg-grey-900">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div className="mx-auto max-w-screen-sm text-center">
            <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-blue-600 dark:text-blue-500">404</h1>
            <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">Không tìm thấy trang.</p>
            <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Xin lỗi, chúng tôi không thể tìm thấy trang đó. Bạn sẽ tìm thấy rất nhiều điều để khám phá trên trang chủ.</p>
            <Link to="/" className="inline-flex text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-900 my-4">Quay lại trang chủ</Link>
        </div>   
    </div>
</section>
     );
}

export default PageError;