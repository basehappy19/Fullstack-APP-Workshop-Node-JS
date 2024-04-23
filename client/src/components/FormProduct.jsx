import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { toast } from 'react-toastify';


import { Box, TextField, Button } from "@mui/material";

import { getData, create, remove } from "../functions/ProductFunction";

const FormProduct = () => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    getData()
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    if (e.target.name === "file") {
      setForm({
        ...form,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    const formWithImageData = new FormData();
    for (const key in form) {
      formWithImageData.append(key, form[key]);
    }
    console.log(formWithImageData);
    create(formWithImageData)
      .then((res) => {
        console.log(res.data);
        loadData();
      })
      .catch((err) => console.log(err));
  };
  const handleRemove = async (id) => {
    remove(id)
      .then((res) => {
        toast.success("Delete : "+res.data.name + " Successfully")
        loadData();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <p>FormProduct</p>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <TextField
            id="outlined-basic"
            label="Name"
            onChange={(e) => handleChange(e)}
            name="name"
            variant="outlined"
          />
        </div>
        <div className="mb-3">
          <TextField
            id="outlined-basic"
            label="Detail"
            onChange={(e) => handleChange(e)}
            name="detail"
            variant="outlined"
          />
        </div>
        <div className="mb-3">
          <TextField
            id="outlined-basic"
            label="Price"
            onChange={(e) => handleChange(e)}
            name="price"
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
          <Button
            type="submit"
            variant="contained"
            color="success"
            endIcon={<SendIcon />}
          >
            Send
          </Button>
        </div>
      </form>
      {data.length != 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">#</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Detail&nbsp;(g)</TableCell>
                <TableCell align="right">Price&nbsp;(g)</TableCell>
                <TableCell align="right">Img&nbsp;(g)</TableCell>
                <TableCell align="right">Action&nbsp;(g)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right">{index + 1}</TableCell>
                  <TableCell align="right">{item.name}</TableCell>
                  <TableCell align="right">{item.detail}</TableCell>
                  <TableCell align="right">{item.price}</TableCell>
                  <TableCell align="right">{item.file}</TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={2}>
                      <Link to={"/edit/" + item._id}>
                        <Button
                          onClick={() => handleChange(item._id)}
                          variant="contained"
                        >
                          Edit
                        </Button>
                      </Link>
                      <Button
                        onClick={() => handleRemove(item._id)}
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        color="error"
                      >
                        Delete
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default FormProduct;
