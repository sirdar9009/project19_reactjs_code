import React, {Component} from 'react';
import 
{
Row,
Container,
Col,
Form,
Button,
Table
} from 'react-bootstrap';
import ModalPage from './ModalPage';


class TampilData extends Component{
	constructor(props){
		super(props)
		this.state={
			datakaryawan:[],
			valueSearch:'',
			inputId:'',
			inputNama:'',
			inputJabatan:'',
			inputKelamin:'',
			inputTgl:'',
			update:false		

		}
		this.panggilSemua=this.panggilSemua.bind(this)
		this.search=this.search.bind(this)
		this.hapusData=this.hapusData.bind(this)
		this.closeModal=this.closeModal.bind(this)
		this.handleInput=this.handleInput.bind(this)
		this.simpanData=this.simpanData.bind(this)

	}

	panggilByID(id){
		fetch(`http://localhost:3000/data-karyawan/${id}`)
		.then((response)=>response.json())
		.then((hasil=>{this.props.setModalShow(true)
			this.setState({
				inputId:hasil.id,
				inputNama:hasil.nama_karyawan,
				inputJabatan:hasil.jabatan,
				inputKelamin:hasil.jenis_kelamin,
				inputTgl:hasil.tanggal_lahir,
				update:true
			})
		}))
	}

	simpanData(){
		if(this.state.inputId ===""|| this.state.inputNama ===""|| this.state.inputJabatan==="" || this.state.inputKelamin==="" || this.state.inputTgl===""){
			alert("Silahkan isi data terlebihdahulu")

			}else if(this.state.update === true ){
					fetch(`http://localhost:3000/data-karyawan/${this.state.inputId}`,{
					method: 'PUT',
					body:JSON.stringify({
					id:this.state.inputId,
					nama_karyawan: this.state.inputNama,
					jabatan:this.state.inputJabatan,
					jenis_kelamin:this.state.inputKelamin,
					tanggal_lahir:this.state.inputTgl
				}),
				headers:{
					'content-type':'application/json; charset=UTF-8'
				},
				}).then((response)=>{response.json()})
					  .then((hasil=>{
					  	this.closeModal();
					  	this.panggilSemua();
					  	this.clearInput();
					  }))
					  .then((hasil=>{
					  	alert('Data Berhasil diUpdate')
					  }))
			}else{
				fetch('http://localhost:3000/data-karyawan',{
					method: 'POST',
					body: JSON.stringify({
						id:this.state.inputId,
						nama_karyawan: this.state.inputNama,
						jabatan:this.state.inputJabatan,
						jenis_kelamin:this.state.inputKelamin,
						tanggal_lahir:this.state.inputTgl
					}),
					headers:{
						'Content-type':'application/json; charset=UTF-8'
					},
					}).then((response)=>{response.json()})
					  .then((result=>{
					  	this.closeModal()
					  	this.panggilSemua()
					  }))
					  .then((result=>{
					  	alert('Data Berhasil disimpan')
					  }))

			}	
	}

	clearInput(){
		this.setState({
			inputId:'',
				inputNama:'',
				inputJabatan:'',
				inputKelamin:'',
				inputTgl:'',
				idInput:' ',
				update:false
		})
	}

	handleInput(value, e){
		
		this.setState({[value]:e.target.value})
	}

	closeModal(){
		this.props.setModalShow(false)
		this.clearInput()
	}

	hapusData(id){
		console.log(id)
		fetch(`http://localhost:3000/data-karyawan/${id}`,{
			method:'DELETE',
		}).then((response=> {
			this.panggilSemua()
			alert('Data Berhasil dihapus')			
		}))
	
	}


	search(e){
		this.setState({valueSearch:e.target.value})
	}



	panggilSemua(){
		fetch('http://localhost:3000/data-karyawan')
		.then((response)=>response.json())
		.then((hasil)=>this.setState({datakaryawan:hasil}))
	}

	componentDidMount(){
	this.panggilSemua()
	}

	render(){
		console.log(this.state.valueSearch)
		return(
			<Container>
			<ModalPage
				modalShow={this.props.modalShow}
				setModalShow={this.props.setModalShow}
				closeModal={this.closeModal}
				handleInput={this.handleInput}
				dataState={this.state}
				simpanData={this.simpanData}
			/>
				<Row style={{marginTop:'30px'}}>
					<Col>
						<Form.Control type="text" placeholder="Cari Karyawan" value={this.state.valueSearch} onChange={(e)=>this.search(e)}/>
					</Col>
					<Col lg={2}>
						<Button onClick={()=>this.props.setModalShow(true)} variant="primary">Tambah Data</Button>
					</Col>
				</Row><br/>
				<Row>						
				<Table size="sm">
				<thead>
				<tr>
				<th>No</th>
				<th>ID Karyawan</th>
				<th>Nama Karyawan</th>
				<th>Jabatan</th>
				<th>Jenis Kelamin</th>
				<th>Tanggal Lahir</th>
				<th>Aksi</th>
				</tr>
				</thead>
				<tbody>			
				{this.state.datakaryawan.filter(cari=>cari.nama_karyawan.toLowerCase().includes(this.state.valueSearch.toLowerCase())).map((value, index)=> {
					return(
						<tr key={index}>
						<td>{index+1}</td>
						<td>{value.id}</td>
						<td>{value.nama_karyawan}</td>
						<td>{value.jabatan}</td>
						<td>{value.jenis_kelamin}</td>
						<td>{value.tanggal_lahir}</td>
						<td>
						<Button onClick={()=>this.hapusData(value.id)} style={{marginRight:'5%'}} variant="outline-danger">Hapus</Button>
						<Button onClick={()=>this.panggilByID(value.id)} variant="outline-primary">Edit</Button>
						</td>							        
						</tr>
						)
				})}
				</tbody>
				</Table>					
				</Row>
			</Container>
			)
	}
}

export default TampilData;