import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const EditProduct = () => {
  const [empId, setEmpId] = useState("");
  const [empName, setEmpName] = useState("");
  const [quantity, setEmpQuantiy] = useState("");
  const [status, setEmpStatus] = useState("");
  const [date, setEmpDate] = useState("");
  const { id } = useParams();
  const Navigate = useNavigate();
  // const [err, setErr]= useState(false)
  const [uniqueText, setUniqueText] = useState("");
  const [err, setErr] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .get(`http://localhost:3000/getproduct/${id}`)
          .then((result) => {
            setEmpId(result.data.empId);
            setEmpName(result.data.empName);
            setEmpQuantiy(result.data.quantity);
            setEmpStatus(result.data.status);
            setEmpDate(result.data.date);
          });
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3000/update/${id}`, {
        empId: parseFloat(empId),
        empName,
        quantity: parseFloat(quantity),
        status,
        date,
      })
      .then((response) => {
        console.log(response);
        Navigate("/productTable");
      })
      .catch((err) => {
        if (err.response.status === 400) {
          setUniqueText(err.response.data.message);
        }
        if( !empId || !empName || !quantity || !status || !date){
            setErr(true);
            console.log(err);
        }
    
       
      });
 
  };

  let date1 = [];
  if (date) {
    date1 = new Date(date).toLocaleDateString().split("/").reverse();
    if (date1[1].length === 1) date1[1] = "0" + date1[1];
    console.log(date1);
  }

  return (
    <div>
      <form action="" onSubmit={handleUpdate}>
        <div className="field">
          {/* {err && !empId &&<p className="validation-text">This field is required</p>}<br/> */}
          <p className="validation-text">{uniqueText}</p>
          <br />
          <label htmlFor="">Employ Id</label>
          <input
            type="number"
            value={empId}
            onChange={(e) => setEmpId(e.target.value)}
          />
        </div>
        <div className="field">
          {err && !empName && (
            <p className="validation-text">This field is required</p>
          )}
          <br />
          <label htmlFor="">Employ Name</label>
          <input
            type="text"
            value={empName}
            onChange={(e) => setEmpName(e.target.value)}
          />
        </div>
        <div className="field">
        {console.log(quantity + "tt")}
          {err && quantity<0 && (
            <p className="validation-text">This field is required</p>
          )}
          <br />
          
          <label htmlFor="">quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setEmpQuantiy(e.target.value)}
          />
        </div>
        <div className="field">
          {err && !status && (
            <p className="validation-text">This field is required</p>
          )}
          <br />
          <label htmlFor="">Status</label>
          <select
            name="cars"
            value={status}
            onChange={(e) => setEmpStatus(e.target.value)}
          >
            <option value="">status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div className="field">
          {err && !date && (
            <p className="validation-text">This field is required</p>
          )}
          <br />
          <label htmlFor="">Date</label>
          {console.log()}
          {console.log(date)}
          <input
            type="date"
            value={date1.join("-")}
            onChange={(e) => setEmpDate(e.target.value)}
          />
        </div>
        <div className="field">
          <input type="submit" />
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
