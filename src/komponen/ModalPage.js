import React from 'react';
import 
{

Form,
Button,
Modal

} from 'react-bootstrap';

function ModalPage(props){
	return(
		<Modal size="lg" centered 
		 show={props.modalShow} 
		 onHide={()=>props.setModalShow(true)}>
			<Modal.Header>
				<Modal.Title>Detail Data</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form.Control value={props.dataState.inputId} onChange={(e)=>props.handleInput('inputId',e)} style={{marginTop:'20px', marginBottom:'20px'}} type="text" placeholder="Id Karyawan" readOnly={props.dataState.update}/>
				<Form.Control value={props.dataState.inputNama} onChange={(e)=>props.handleInput('inputNama',e)} type="text" placeholder="Masukan Nama"/>
				<Form.Control as="select" onChange={(e)=>props.handleInput('inputKelamin',e)} style={{marginTop:'20px', marginBottom:'20px'}} type="text">
					<option value="">Pilih Jenis Kelamin</option>
					<option value="Laki-laki">Laki-Laki</option>
					<option value="Perempuan">Perempuan</option>
				</Form.Control>
				<Form.Control value={props.dataState.inputJabatan} onChange={(e)=>props.handleInput('inputJabatan',e)}  type="text" placeholder="Jabatan"/>
				<Form.Control value={props.dataState.inputTgl} onChange={(e)=>props.handleInput('inputTgl',e)} style={{marginTop:'20px', marginBottom:'20px'}} type="date" placeholder="Tanggal Lahir"/>
				
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={()=>props.closeModal()} variant="secondary">Batal</Button>
				<Button onClick={()=>props.simpanData()} variant="success">Simpan</Button>
			</Modal.Footer>
		</Modal>


		)
}
export default ModalPage;