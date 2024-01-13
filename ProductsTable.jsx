import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const ProductsTable = () => {
  const [productData, setProductData] = useState([]);
  const [employ, setEmploySearch] = useState("");
  const [status, setStatus] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [availableStatus, setAvailableStatus] = useState("");
  // const Navigate = useNavigate()
  // const [empId. setEmpId] = useState("")
  useEffect(() => {
    axios
      .get(
        `http://localhost:3000?employ=${employ}&status=${status}&fromDate=${fromDate}&toDate=${toDate}&availableStatus=${availableStatus}`
      )
      .then((result) => {
        console.log(result.data);
        setProductData(result.data);
      });
  }, [employ, status, fromDate, toDate, availableStatus]);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/delete/${id}`)
      .then((res) => {
        console.log(res);
        setProductData(productData.filter((x) => x._id !== id));
        window.location.reload();
      })
      .catch((err) => console.log(err.message));
  };
  return (
    <div>
      <Link to="/">Back</Link>
      <input
        type="search"
        placeholder="Employ Search"
        onChange={(e) => setEmploySearch(e.target.value)}
      />
      <select name="cars" onChange={(e) => setStatus(e.target.value)}>
        <option value="">status</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
      <input
        type="date"
        placeholder="from date"
        onChange={(e) => setFromDate(e.target.value)}
      />
      <input
        type="date"
        placeholder="to date"
        onChange={(e) => setToDate(e.target.value)}
      />
      <select name="" onChange={(e) => setAvailableStatus(e.target.value)}>
        <option value="">All</option>
        <option value="Available">Available</option>
        <option value="Out of Stock">Out of Stock</option>
      </select>
      <table>
        <tr>
          <th>Emp Name</th>
          <th>Emp Id</th>
          <th>Quandity</th>
          <th>Status</th>
          <th>Date</th>
        </tr>

        {console.log(productData + "yiuhj")}
        {productData.map((a) => (
          
            <tr key={a._id}>
              <td>{a.empName}</td>
              <td>{a.empId}</td>
              <td>{a.quantity}</td>
              <td>{a.status}</td>
              <td>{new Date(a.date).toLocaleDateString()}</td>
              <Link to={`/update/${a._id}`}>Edit</Link>
              <button onClick={() => handleDelete(a._id)}>Delete</button>
            </tr>
          
        ))}
      </table>
    </div>
  );
};

export default ProductsTable;
