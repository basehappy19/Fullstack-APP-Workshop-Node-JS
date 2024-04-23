import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { read, update } from "../functions/ProductFunction";
import SendIcon from "@mui/icons-material/Send";
import { Box, TextField, Button } from "@mui/material";

const FormEditProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const [fileold, setFileOld] = useState();

  useEffect(() => {
    loadData(params.id);
  }, []);

  const loadData = async (id) => {
    read(id)
      .then((res) => {
        setData(res.data);
        setFileOld(res.data.file);
      })
      .catch((err) => console.log(err));
  };
  const handleChange = (e) => {
    if (e.target.name === "file") {
      console.log(e.target.files);
      setData({
        ...data,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setData({
        ...data,
        [e.target.name]: e.target.value,
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formWithImageData = new FormData();
    for (const key in data) {
      formWithImageData.append(key, data[key]);
    }
    formWithImageData.append("fileold", fileold);
    update(params.id, formWithImageData)
      .then((res) => {
        console.log(res.data);
        navigate("/admin/viewtable");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <TextField
            id="outlined-basic"
            onChange={(e) => handleChange(e)}
            name="name"
            value={data?.name}
            variant="outlined"
          />
        </div>
        <div className="mb-3">
          <TextField
            id="outlined-basic"
            onChange={(e) => handleChange(e)}
            name="detail"
            variant="outlined"
            value={data?.detail}
          />
        </div>
        <div className="mb-3">
          <TextField
            id="outlined-basic"
            onChange={(e) => handleChange(e)}
            name="price"
            value={data?.price}
            variant="outlined"
          />
        </div>
        <div className="mb-3">
          <TextField
            id="outlined-basic"
            type="file"
            label="File"
            onChange={(e) => handleChange(e)}
            name="file"
            variant="outlined"
            focused
          />
        </div>
        <div className="mb-3">
          <Button type="submit" variant="contained" color="success" endIcon={<SendIcon />}>
            Send
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormEditProduct;
