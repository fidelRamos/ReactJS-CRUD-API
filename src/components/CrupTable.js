import React from "react";
import CrupTableRow from "./CrudTableRow"


function CrupTable({data, setDataToEdit, deleteData}){
  return(
    <div>
      <h3>Tabla de datos</h3>
      <table>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Unidades disponibles </th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ?(
          data.map((el)=>(
          <CrupTableRow 
            key={el._id}
            el={el}
            setDataToEdit={setDataToEdit}
            deleteData={deleteData}
          />
          ))
        )  :(
          <tr>
            <td colSpan="4">Sin datos</td>
          </tr>
          
         )}  
        </tbody>
      </table>
    </div>
  )
}
export default CrupTable