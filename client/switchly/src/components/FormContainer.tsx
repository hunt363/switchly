import * as React from "react";
import { useState } from "react";
import axios from "axios";
import { serverUrl } from "../helpers/Constants";

interface IFormContainerProps {updateReloadState: ()=>void;}

const FormContainer: React.FunctionComponent<IFormContainerProps> = (props:IFormContainerProps) => {
  const [fullUrl, setFullUrl] = useState<string>("");
  const {updateReloadState}=props;
  const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    try{
        await axios.post(`${serverUrl}/shortUrl`,{
            fullUrl: fullUrl
        });
        setFullUrl("");
        updateReloadState();

    }catch(error){
        console.log(error);
    }
  };
  return (
    <div className="container padding-2">
      <div className="bg-cover w-screen bg-cat-mantle ">
        <div className="w-full h-full rounded-xl p-20">
          <h2 className="text-cat-lavender text-4xl text-center pb-4">Switchly</h2>
          <p className="text-cat-text text-center pb-2 text-xl font-extralight">
            Shorten your links!
          </p>
          <form onSubmit={handleSubmit}>
            <div className="flex">
              <div className="relative w-full">
                <div className="absolute inset-y-0  text-cat-lavender start-0 flex items-center ps-2 pointer-events-none ml-1">
                  switch.ly/
                </div>
                <input
                  type="text"
                  placeholder="paste link here"
                  className="block w-full p-5 text-sm ps-24 text-cat-text border border-cat-surface0 rounded-lg bg-cat-surface0 focus:outline-none"
                  value={fullUrl}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFullUrl(e.target.value)
                  }
                />
                <button
                  type="submit"
                  className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-cat- bg-cat-lavender rounded-r-lg focus:outline-none"
                >
                  Shorten
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormContainer;
