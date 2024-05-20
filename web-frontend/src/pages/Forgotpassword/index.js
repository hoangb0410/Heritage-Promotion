import { Link } from "react-router-dom"
import { toast } from 'react-toastify';
import { useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
    
  export default function ForgotPassword() {
    const [email, setEmail] = useState('');

    const handleSubmit = (event) => {
      event.preventDefault();
      toast.success('Kiểm tra email của bạn!', {
        position: "top-center",
    }
    );
      setEmail('');
    }
    return (
      <section className="relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pt-32 pb-12 md:pt-40 md:pb-20">
  
            {/* Page header */}
            <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
              <h1 className="h1 mb-4">Bạn quên mật khẩu?</h1>
              <p className="text-xl text-gray-400">Chúng tôi sẽ gửi lại mật khẩu mới của bạn qua email.</p>
            </div>
  
            {/* Form */}
            <div className="max-w-sm mx-auto">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="email">Email</label>
                    <input id="email" type="email" className="form-input w-full text-gray-300" placeholder="you@yourcompany.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mt-6">
                  <div className="w-full px-3">
                    <button className="btn text-white bg-black hover:bg-purple-700 w-full">Đặt lại mật khẩu</button>
                  </div>
                </div>
              </form>
              <div className="text-gray-400 text-center mt-6">
                <Link to="/login" className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out">Trở lại</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
  