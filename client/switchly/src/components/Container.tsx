import * as React from 'react';
import FormContainer from './FormContainer';
import { useState } from 'react';
import { UrlData } from '../interface/UrlData';
import { serverUrl } from '../helpers/Constants';
import DataTable from './DataTable';
import axios from 'axios';

interface IContainerProps {
}

const Container: React.FunctionComponent<IContainerProps> = () => {
    const[data, setData]=useState<UrlData[]>([]);
    const[reload, setReload]=useState<boolean>(false);
    const updateReloadState=():void=>{
        setReload(true);
    }
    const fetchTableData=async()=>{
        const response=await axios.get(`${serverUrl}/shortUrl`);
        //console.log(response);
        setData(response.data);
        console.log(data);
        setReload(false);
    };

    React.useEffect(()=>{
        fetchTableData();
    },[reload]);
  return(
    <div className="bg-cat-mantle h-screen">
    <FormContainer updateReloadState={updateReloadState}/>
    <DataTable updateReloadState={updateReloadState} data={data}/>
    </div>
  )
};

export default Container;
