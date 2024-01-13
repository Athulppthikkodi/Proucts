import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import './productAdd.css'

// const errorWithMessage = {
//   "UNIQUE_KEY_ERR":{
//     status:"UNIQUE_KEY_ERR",
//     message:"You fool don't repeat the id"
//   }
// }

const ProductAdd = () => {
    const [empId, setEmpId] = useState("")
    const [empName, setEmpName] = useState("")
    const [quantity, setEmpQuantiy] = useState("")
    const [status, setEmpStatus] = useState("")
    const [date, setEmpDate] = useState("")
    const [uniqueText, setUniqueText] = useState("")
    const [err, setErr] = useState(false);
    const Navigate = useNavigate()
    const handleSubmit=(e)=>{
        e.preventDefault()
    if(!empId || !empName || !quantity|| !status|| !date){
      setErr(true)
    }

        axios.post('http://localhost:3000/submit',{
          empId,
          empName,
          quantity,
          status,
          date

        }).then(()=>{
            console.log("result")
            Navigate('/productTable')

        }).catch((err)=> {
          // console.log("result")
          console.log(err+"ppppp")
          if(err.response.status === 400) {
            // console.log("ukhgf")
            // console.log(err.response.data.message)
            setUniqueText(err.response.data.message);
          }
        })
    }
  return (
    <div>
        <form action="" onSubmit={handleSubmit}>
            <div className="field">
             {err && !empId &&<p className="validation-text">This field is required</p>}<br/>
             <p className="validation-text">{uniqueText}</p>
             <br/>
            <label htmlFor="">Employ Id</label>
            <input type="number" value={empId} onChange={(e)=>setEmpId(e.target.value)} />
            </div>
            <div className="field">
            {err && !empName &&<p className="validation-text">This field is required</p>}<br/>
            <label htmlFor="">Employ Name</label>
            <input type="text" value={empName}  onChange={(e)=>setEmpName(e.target.value)} />
            </div>
            <div className="field">
            {err && !quantity &&<p className="validation-text">This field is required</p>}<br/>
            <label htmlFor="">quantity</label>
            <input type="number" value={quantity}  onChange={(e)=>setEmpQuantiy(e.target.value)} />
            </div>
            <div className="field">
            {err && !status &&<p className="validation-text">This field is required</p>}<br/>
            <label htmlFor="">Status</label>
       <select name="cars" onChange={(e)=>setEmpStatus(e.target.value)}>
            <option value="">status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
        </select>
            </div>
            <div className="field">
            {err && !date &&<p className="validation-text">This field is required</p>}<br/>
            <label htmlFor="">Date</label>
            <input type="date" value={date} onChange={(e)=>setEmpDate(e.target.value)} />
            </div>
            <div className="field">
            <input type="submit" />
            </div>
        </form>
    </div>
  )
}

export default ProductAdd