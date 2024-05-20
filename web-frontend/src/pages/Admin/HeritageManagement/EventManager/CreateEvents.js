import FormEvent from "./EventForm";

function CreateEvent() {
    return ( 
        <div className="pb-10 px-5">
            <div className="mb-2 mx-auto w-full m-5 rounded-lg border-none p-5">
                <h1 className="font-bold text-[35px] uppercase pl-10">
                    THÊM SỰ KIỆN
                </h1>
                <FormEvent />
            </div>
        </div> 
    );
}

export default CreateEvent;