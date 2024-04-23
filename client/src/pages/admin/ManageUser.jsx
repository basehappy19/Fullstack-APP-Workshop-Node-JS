import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { list, changeRole } from "../../functions/UserFunction";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, TextField, Button, Select, MenuItem } from "@mui/material";

export default function ManageUser() {
  const [data, setData] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadData(user.user.token);
  }, []);

  const loadData = async (authtoken) => {
    await list(authtoken)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  };

  const role = ["admin", "user"];

  const handleChangeRole = async (id, e) => {
    const value = {
      id: id,
      role: e.target.value,
    };
    await changeRole(user.user.token, value)
      .then((res) => {
        loadData(user.user.token);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {data.length != 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">#</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Role</TableCell>
                <TableCell align="right">IP</TableCell>
                <TableCell align="right">UpdatedAt</TableCell>
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
                  <TableCell align="right">
                    <Select
                      defaultValue={item.role}
                      onChange={(e) => handleChangeRole(item._id, e)}
                      style={{ width: "200px" }}
                    >
                      {role.map((item) => (
                        <MenuItem value={item}>{item}</MenuItem>
                      ))}
                    </Select>
                  </TableCell>
                  <TableCell align="right">{item.ip}</TableCell>
                  <TableCell align="right">{item.updatedAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
}
