import Logo from "./assets/logo.jpg";
import { useState } from "react";
import { Button } from "@material-tailwind/react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useForm } from "react-hook-form";
import { CSVLink } from "react-csv";

interface Panel {
  id: number;
  codigo: string;
  precio: number;
}
interface desc {
  codigo: string;
  precio: number;
}

function App() {
  const [rows, setRows] = useState([
    { id: 1, codigo: "X-ATV1", precio: 325.5 },
  ]);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<desc>();
  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "codigo", headerName: "Codigo", width: 150 },
    { field: "precio", headerName: "Precio", width: 150 },
  ];

  const headers = [
    { label: "ID", key: "id" },
    { label: "Codigo", key: "codigo" },
    { label: "Precio", key: "precio" },
  ];

  const onSubmit = handleSubmit((data) => {
    const { codigo, precio } = data;
    const newRow: Panel = {
      id: rows.length + 1,
      codigo,
      precio: Number(precio),
    };
    setRows([...rows, newRow]);
    reset();
  });

  return (
    <div className="App bg-gray-900 text-base text-white min-h-screen w-full flex justify-center pt-12">
      <div className="md:w-1/2 w-full">
        <img
          className="w-72 mx-auto mb-4"
          src={Logo}
          alt="logo de la empresa"
        />
        <h1 className="text-2xl text-center mb-5">Registro de paneles</h1>
        <form className="w-full max-w-lg mx-auto" onSubmit={onSubmit}>
          <div className="flex  flex-col gap-4 f mb-6">
            <div className="w-full  mb-6 md:mb-0 px-3">
              <label
                className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Modelo
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-first-name"
                type="text"
                placeholder="PIU-001A"
                {...register("codigo", { required: true })}
              />
            </div>
            <div className="w-full  mb-6 md:mb-0 px-3">
              <label
                className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                htmlFor="grid-last-name"
              >
                Precio
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                placeholder="S/. 350"
                type="number"
                {...register("precio", { required: true })}
              />
            </div>
          </div>
          <Button type="submit">Grabar</Button>
          <Button className="ml-5" color="green">
            <CSVLink data={rows} filename="RegistroPaneles" headers={headers}>
              Excel
            </CSVLink>
          </Button>
        </form>
        <Box
          sx={{
            height: 400,
            width: "100%",
            maxWidth: "500px",
            minWidth: "300px",
            margin: "0 auto",
            marginTop: "20px",
          }}
        >
          <DataGrid
            //css
            style={{ backgroundColor: "#212121", color: "#fff" }}
            onRowClick={(e) => console.log(e.row)}
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
          />
        </Box>
      </div>
    </div>
  );
}

export default App;
