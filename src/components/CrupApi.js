import React,{useEffect, useState}from 'react';
import CrupForm from './CrupForm';
import CrupTable from './CrupTable';
import { helpHttp } from './helpers/helpHttp';
import Loader from './Loader';
import Message from './Message';


function CrudApi(){
  const [db, setDb] = useState(null);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);
  
  let url="http://localhost:5000/api/products"; // Api local con NodeJs code: https://github.com/fidelRamos/NodeJS-API
  let api= helpHttp();


  useEffect(() => {
    setLoader(true)
    api.get(url).then((res)=>{
       if(!res.err){
        setDb(res.body)
        setError(null)
      }else{
        setDb(null)
        setError(res)
      } 
    })
    setLoader(false)
  }, [url]);

  const createData=(data)=>{
    let option={
      body:data,
      headers:{"content-type":"application/json"} 
    }

    api.post(url,option).then((res)=>{
        if(!res.err){
          setDb([...db,res])
        }else{
          setError(res);
        }
    })
  
  }
  const updateData=(data)=>{
    let endpoint=`${url}/${data._id}`
    delete data._id; 
    const newData={...data};
    let option={
      body:newData,
      headers:{"content-type":"application/json"} 
    }
  
    api.put(endpoint,option).then((res)=>{
        //console.log(res)
        if(!res.err){
          let dataRender=db.map((el)=>(el._id===data._id ? data : el ));
          console.log(dataRender)
          setDb(dataRender)
        }else{
          setError(res);
        }
      }) 
  }
  const deleteData=(_id)=>{
    let isDelete = window.confirm(
      `¿Estás seguro de eliminar el registro con el id '${_id}'?`
    );

    if (isDelete) {
      let endpoint=`${url}/${_id}`
      let option={
        headers:{"content-type":"application/json"} 
      }
      api.del(endpoint,option).then((res)=>{
        if(!res.err){
          let newData = db.filter((el) => el._id !== _id);
          setDb(newData);
        }else{
          setError(res);
        }
      })
      
    } else {
      return;
    }
  }

  return(
    <div>
      <h3>NodeJS-API con Mongodb</h3>
      <article className='grid-1-2'>
      <CrupForm
        setDataToEdit={setDataToEdit}
        dataToEdit={dataToEdit}
        createData={createData}
        updateData={updateData}
      />
      {loader && <Loader/>}
      {error && ( 
      <Message 
        msg={`Error ${error.status}: ${error.statusText}`}
        bgColor="#dc3545"
      />
      )}
      {db && (
      <CrupTable 
        data={db} 
        setDataToEdit={setDataToEdit}
        deleteData={deleteData}
      />
      )}
      </article>
    </div>
  )
}
export default CrudApi