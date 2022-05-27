import React from "react";


function CrudTableRow({el,setDataToEdit,deleteData}){
  let {nameProduct, Precio_product, Unidades_dispnibles, _id}=el;
  return(
    <tr>
      <td>{nameProduct}</td>
      <td>{Precio_product} $</td>
      <td >{Unidades_dispnibles}</td>
      <td>
          <button onClick={()=>setDataToEdit(el)}>Editar</button>
          <button onClick={()=>deleteData(_id)}>Eliminar</button>
      </td>
    </tr>    
  )
}
export default CrudTableRow