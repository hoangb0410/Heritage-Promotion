import { Link } from "react-router-dom";
import ScrollToTarget from "./scrolltarget";

function Body() {
    return (
      <div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">

          {/* Hero content */}
          <div className="relative pt-32 pb-10 md:pt-60 md:pb-20">
            <div className="max-w-6xl mx-auto text-center pb-12 md:pb-16">
              <h1 className="h1 text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl mb-6" data-aos="fade-up">Di sản văn hóa Việt Nam</h1>
              <p className="text-xs sm:text-sm md:text-lg xl:text-xl 2xl:text-2xl text-gray-500 my-10" data-aos="fade-up" data-aos-delay="200">Hãy đóng góp dữ liệu về di sản văn hóa Việt Nam cho chúng tôi.</p>
              <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center">
                <div data-aos="fade-up" data-aos-delay="400">
                  <Link className="btn text-white text-xl bg-black hover:bg-gray-700 w-full mb-4 sm:w-auto sm:mb-0 rounded-lg mt-0 sm:mt-10" to="/contribute">Đóng góp</Link>
                </div>
                <div data-aos="fade-up" data-aos-delay="600">
                  <ScrollToTarget />
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
      );
}
export default Body;