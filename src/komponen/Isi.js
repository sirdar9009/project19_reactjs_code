import React from 'react';

import 
{

Container,
Row,
Col,
Tabs,
Tab,
Jumbotron
}
from 'react-bootstrap';
import TampilData from './TampilData';



function Isi() {
	const [modalShow, setModalShow]=React.useState(false)
	return(
		<>
		<Container>
		<center>
		  <Row>
		  <Col sm={12}>
				<Tabs defaultActiveKey="awal" id="uncontrolled-tab-example">
				  <Tab eventKey="awal" title="Info"><br/>
				    <Jumbotron fluid>
					  <Container>
					    <h1>Selamat Datang di Aplikasi Pengelolaan Karyawan</h1>
					    <p>
					      Aplikasi ini dibangun menggunakan React JS dan react-bootstrap, yang dihubungkan dengan database lokal.
					    </p>
					  </Container>
					</Jumbotron>
				  </Tab>
				  <Tab eventKey="data_karyawan" title="Kelola Data Karyawan">
				    <Container>
				    	<TampilData
				    		modalShow={modalShow}
						    setModalShow={setModalShow}
				    	/>
				    </Container>
				  </Tab>
				  </Tabs>				  
			</Col>				
			</Row>			
			</center>		 
		</Container>
		</>
		)
}
export default Isi;