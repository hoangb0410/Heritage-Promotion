import FormHeritage from "./HeritageForm"; 

function CreateHeritage() {
    return ( 
        <div className="pb-10 px-5">
            <div className="mb-2 mx-auto w-full m-5 rounded-lg border-none p-5">
                <h1 className="font-bold text-[35px] uppercase pl-10">
                    THÊM DI SẢN
                </h1>
                <FormHeritage />
            </div>
        </div> 
    );
}

export default CreateHeritage;