import Userform from "./Userform";

function CreateUser() {
    return ( 
        <>
            <div className="mb-2 mx-auto w-full md:w-2/3 bg-white m-10 rounded-lg border-none p-5 shadow-xl">
                <h1 className="font-bold text-[35px] uppercase pl-10">
                    THÊM NGƯỜI DÙNG
                </h1>
                <Userform />
            </div>
        </> 
    );
}

export default CreateUser;