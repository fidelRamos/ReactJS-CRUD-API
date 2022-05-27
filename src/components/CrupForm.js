import React,{useState,useEffect} from 'react';

const initialForm={
  _id:null,
  nameProduct: "",
  Precio_product: "",
  Unidades_dispnibles:""
}

function CrupForm ({createData,updateData,setDataToEdit,dataToEdit}){
  const [form, setForm] = useState(initialForm);
  useEffect(() => {
    if(dataToEdit){
      setForm(dataToEdit)
    }else{
      setForm(initialForm)
    }
  }, [dataToEdit]);

  const handleChange=(e)=>{
    setForm({
      ...form,
      [e.target.name]:e.target.value
    }) 
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(!form.nameProduct || !form.Precio_product || !form. Unidades_dispnibles){
      alert("Datos insuficientes");
      return;
    }
    if(form._id===null){
      createData(form)
    }else{
      updateData(form)
    }
    handleReset();
  }
  const handleReset=(e)=>{
    setForm(initialForm);
    setDataToEdit(null);
  }
  return(
    <div>
      <h3>{dataToEdit?"Editar": "Agregar"}</h3>
    <form onSubmit={handleSubmit}>
      <input type="text" name="nameProduct" placeholder='Producto'onChange={handleChange} value={form.nameProduct}/>
      <input type="text" name="Precio_product" placeholder='Precio'onChange={handleChange} value={form.Precio_product}/>
      <input type="text" name="Unidades_dispnibles" placeholder='Unidades disponibles'onChange={handleChange} value={form.Unidades_dispnibles}/>
      <input type="submit" value="Enviar" />
      <input type="reset" value="Limpiar" onClick={handleReset}/>
    </form>
    </div>
      
  )

}
export default CrupForm