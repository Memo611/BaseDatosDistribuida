import React, { useEffect, useRef, useState, useTransition } from "react";
import { Button } from 'react-bootstrap';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MUIDataTable from "mui-datatables";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, getUsers2, deleteUser, deleteUser2 } from "../../../../Redux/Actions/Actions.js";
import Swal from 'sweetalert2';
import FormClientes from './FormClientes';
import '../../../Styles/Catalogos/FormClientes.css';

function Clientes({ idUserEdit }) {
    const dispatch = useDispatch();
    const { users } = useSelector((state) => state.getUsers);
    const [userSelected, setUserSelected] = useState(false);
    const [selectedRowIds, setSelectedRowIds] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formId, setFormId] = useState(0);
    const [selectedSucursal, setSelectedSucursal] = useState("");
    const tableRef = useRef(null);

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    const columns = [
        { name: "idCliente", label: "ID" },
        { name: "rfc", label: "RFC" },
        { name: "rSocial", label: "Razon Social" },
        { name: "regFiscal", label: "Registro Fiscal" },
        { name: "cfdi", label: "CFDI" },
        { name: "calle", label: "Calle" },
        { name: "iD_Gorca", label: "Sucursal" },
        // { name: "numero_Cli", label: "Direccion" },
        // { name: "colonia_Cli", label: "Colonia" },
        // { name: "ciudad_Cli", label: "Ciudad" },
        // { name: "cp", label: "CP" },
        // { name: "dirPais", label: "Pais" },
    ];

    const sucursales = [
        { id: 1, nombre: "Sucursal 1" },
        { id: 2, nombre: "Sucursal 2" },
    ];
    
    const options = {
        filterType: 'checkbox',
        onRowSelectionChange: (currentRowsSelected, allRowsSelected, rowsSelected) => {
            setSelectedRowIds(allRowsSelected.map(row => users[row.index]?.idCliente));
            setUserSelected(allRowsSelected.length > 0);
            if (allRowsSelected.length > 0) {
                idUserEdit(users[allRowsSelected[0].index]?.idCliente);
            }
        },
    };

    // Este useEffect se dispara cuando la sucursal cambia
    useEffect(() => {
        if (selectedSucursal === "1") {
            // Si se selecciona la primera sucursal, se usa getUsers
            dispatch(getUsers());
        } else if (selectedSucursal === "2") {
            // Si se selecciona la segunda sucursal, se usa getUsers2
            dispatch(getUsers2());
            
        } else {
            // Si no hay sucursal seleccionada, se pueden usar todos los usuarios
            dispatch(getUsers());
        }
    }, [dispatch, selectedSucursal]); // Dependemos de selectedSucursal

    const handleNew = () => {
        setFormId(0);
        setShowModal(true);
    };

    const handleEdit = () => {
        if (userSelected && selectedRowIds.length > 0) {
            const idUserEdit = selectedRowIds[0];
            setShowModal(true);
            setFormId(idUserEdit);
        } else {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Seleccione un Empleado para editar",
            });
        }
        console.log(idUserEdit);
    };
    
    const handleDelete = () => {
        if (userSelected) {
            const idUserDelete = selectedRowIds[0];

            if (selectedSucursal) {
                Swal.fire({
                    title: '¿Está seguro?',
                    text: "No podrá revertir esto!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sí, eliminarlo!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        // Verificar la sucursal seleccionada y usar el endpoint adecuado
                        const actionToDispatch = selectedSucursal === '1'
                            ? deleteUser(idUserDelete)  // Acción para la sucursal 1
                            : deleteUser2(idUserDelete); // Acción para la sucursal 2

                        dispatch(actionToDispatch)
                            .then(() => {
                                Swal.fire({
                                    icon: "success",
                                    title: "Cliente eliminado",
                                    showConfirmButton: false,
                                    timer: 1500,
                                }).then(() => {
                                    // Filtrar y obtener usuarios de la sucursal seleccionada
                                    dispatch(getUsers(selectedSucursal));
                                });
                            })
                            .catch((error) => {
                                Swal.fire({
                                    icon: "error",
                                    title: "Error",
                                    text: "Error al eliminar Cliente",
                                });
                            });
                    }
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Seleccione una Sucursal para proceder",
                });
            }
        } else {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Seleccione un Cliente para eliminar",
            });
        }
    };


    const handleClose = () => {
        setShowModal(false);
    };

    const handleSucursalChange = (event) => {
        setSelectedSucursal(event.target.value);
    };

    return (
        <>
            <div className="Botones">
                <Button className="NewUser" variant="primary" onClick={handleNew}>Nuevo</Button>
                <Button className="NewUser" variant="warning" onClick={handleEdit}>Editar</Button>
                <Button className="NewUser" variant="danger" onClick={handleDelete}>Eliminar</Button>

                {/* Select para las sucursales */}
                <label htmlFor="sucursal">Seleccionar Sucursal:</label>
                <select id="sucursal" value={selectedSucursal} onChange={handleSucursalChange}>
                    <option value="">Seleccione una sucursal</option>
                    {sucursales.map((sucursal) => (
                        <option key={sucursal.id} value={sucursal.id}>
                            {sucursal.nombre}
                        </option>
                    ))}
                </select>

            </div>



            <ThemeProvider theme={darkTheme}>
                <MUIDataTable
                    title={"Lista de Clientes"}
                    data={users || []}
                    columns={columns}
                    options={options}
                    ref={tableRef}
                />
            </ThemeProvider>
            <FormClientes showModal={showModal} handleClose={handleClose} id={formId} showForm={() => setShowModal(false) } selectedSucursal={selectedSucursal}  />
        </>
    );
}

export default Clientes;
