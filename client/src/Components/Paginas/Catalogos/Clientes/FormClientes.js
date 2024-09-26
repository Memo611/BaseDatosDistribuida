import { Modal,Col, Button, Row, Form, Card, CardHeader, CardBody, CardFooter } from 'react-bootstrap'
import '../../../Styles/Catalogos/FormClientes.css'
import React from 'react';
import { useState, useEffect } from 'react';
import { addUser, getUserUnique, editUSer, getUsers} from '../../../../Redux/Actions/Actions.js';
import { addUser2, getUserUnique2, editUSer2, getUsers2} from '../../../../Redux/Actions/Actions.js';
import { useDispatch } from 'react-redux';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';

function FormClientes({ showForm, id, showModal, handleClose, selectedSucursal}) {
    const initialUserState = {
        idCliente: 0,
        rfc: '',
        rSocial: '',
        regFiscal: '',
        cfdi: '',
        calle: '',
        dirNumero: 0,
        dirColonia: '',
        dirCiudad: '',
        cp: '',
        dirPais: '',
        iD_Gorca: selectedSucursal || '',
    };

    const dispatch = useDispatch();
    const [user, setUser] = useState(initialUserState);   

    useEffect(() => {
        if (id > 0) {
            const fetchUser = selectedSucursal === "1" ? getUserUnique : getUserUnique2;
            dispatch(fetchUser(id))
                .then((response) => {
                    if (response.payload) {
                        setUser(response.payload);
                    } else {
                        console.error('No se encontró el usuario:', response);
                        setUser(initialUserState); // Resetear en caso de no encontrar datos
                    }
                }).catch((error) => {
                    console.error('Error fetching user:', error);
                    setUser(initialUserState);
                });
        } else {
            setUser(initialUserState);
        }
    }, [dispatch, id, selectedSucursal]);
    

    const handleCancel = () => {
        setUser(initialUserState);
        showForm();
        handleClose();
    };

    const handleGuardar = async () => {
        try {
            if (user.idCliente > 0) { // Si el ID del usuario es mayor que 0, es una edición
                user.idCliente = id;
                if (selectedSucursal === "1") {
                    await dispatch(editUSer(user));
                } else if (selectedSucursal === "2") {
                    await dispatch(editUSer2(user));
                }
            } else {
                if(selectedSucursal === "1"){
                    await dispatch(addUser(user));
                }else if(selectedSucursal === "2"){
                    await dispatch(addUser2(user));
                }
                
            }
            Swal.fire({
                icon: "success",
                title: "Cliente guardado",
                showConfirmButton: false,
                timer: 1500,
            });
            handleCancel();
            // Actualiza la lista de usuarios en la sucursal correcta
            if (selectedSucursal === "1") {
                dispatch(getUsers());
            } else if (selectedSucursal === "2") {
                dispatch(getUsers2());
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Error al guardar Cliente",
            });
        }
    };


    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Registro de Cliente</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row sm={7}>
                    <Card className='estilo'>
                        <CardHeader className='Titulo'> Registro de Cliente </CardHeader>

                        <CardBody className='cuerpo'>

                            <Row>
                                <Col>
                                    <Form.Label htmlFor='rfc'> RFC </Form.Label>
                                </Col>
                                <Col>
                                    <input type="text" id="rfc" name='rfc' className='form-control' required value={user?.rfc || ''}
                                        onChange={(e) => setUser({ ...user, rfc: e.target.value })} />
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <Form.Label htmlFor='rSocial'>Razon Social: </Form.Label>
                                </Col>
                                <Col>
                                    <input type="text" id="rSocial" name='rSocial' className='form-control' required value={user.rSocial}
                                        onChange={(e) => setUser({ ...user, rSocial: e.target.value })} />
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <Form.Label htmlFor='regFiscal'>Registro Fiscal: </Form.Label>
                                </Col>
                                <Col>
                                    <input type="text" id="regFiscal" name='regFiscal' className='form-control' required value={user.regFiscal}
                                        onChange={(e) => setUser({ ...user, regFiscal: e.target.value })} />
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <Form.Label htmlFor='cfdi'>CFDI: </Form.Label>
                                </Col>
                                <Col>
                                    <input type="text" id="cfdi" name='cfdi' className='form-control' required value={user.cfdi}
                                        onChange={(e) => setUser({ ...user, cfdi: e.target.value })} />
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <Form.Label htmlFor='calle'>Calle: </Form.Label>
                                </Col>
                                <Col>
                                    <input type="text" id="calle" name='calle' className='form-control' required value={user.calle}
                                        onChange={(e) => setUser({ ...user, calle: e.target.value })} />
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <Form.Label htmlFor='dirNumero'>Numero: </Form.Label>
                                </Col>
                                <Col>
                                    <input type="number" id="dirNumero" name='dirNumero' className='form-control' required value={user.dirNumero}
                                        onChange={(e) => setUser({ ...user, dirNumero: e.target.value })} />
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <Form.Label htmlFor='dirColonia'>Colonia:  </Form.Label>
                                </Col>
                                <Col>
                                    <input type="text" id="dirColonia" name='dirColonia' className='form-control' required value={user.dirColonia}
                                        onChange={(e) => setUser({ ...user, dirColonia: e.target.value })} />
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <Form.Label htmlFor='dirCiudad'>Ciudad:  </Form.Label>
                                </Col>
                                <Col>
                                    <input type="text" id="dirCiudad" name='dirCiudad' className='form-control' required value={user.dirCiudad}
                                        onChange={(e) => setUser({ ...user, dirCiudad: e.target.value })} />
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <Form.Label htmlFor='cp'>CP:  </Form.Label>
                                </Col>
                                <Col>
                                    <input type="text" id="cp" name='cp' className='form-control' required value={user.cp}
                                        onChange={(e) => setUser({ ...user, cp: e.target.value })} />
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <Form.Label htmlFor='dirPais'>Pais:  </Form.Label>
                                </Col>
                                <Col>
                                    <input type="text" id="dirPais" name='dirPais' className='form-control' required value={user.dirPais}
                                        onChange={(e) => setUser({ ...user, dirPais: e.target.value })} />
                                </Col>
                            </Row>
                            
                            <Row>
                                <Col>
                                    <Form.Label htmlFor='iD_Gorca'>Sucursal:  </Form.Label>
                                </Col>
                                <Col>
                                    <input type="text" id="iD_Gorca" name='iD_Gorca' className='form-control' required disabled value={selectedSucursal || user.iD_Gorca}
                                        onChange={(e) => setUser({ ...user, iD_Gorca: e.target.value })} />
                                </Col>
                            </Row>

                        </CardBody>

                        <CardFooter>
                            <Col>
                                <Button variant='primary' onClick={handleGuardar}> Guardar</Button>
                                <Button variant="danger" onClick={handleCancel}> Cancelar</Button>
                            </Col>
                        </CardFooter>
                    </Card>
                </Row>
            </Modal.Body>
        </Modal>
    );
}

export default FormClientes;