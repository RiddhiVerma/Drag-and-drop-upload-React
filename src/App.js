import React, { Component } from 'react';
import react from 'react-dom';
import DropToUpload from 'react-drop-to-upload';
import './App.css';
import Dropzone from 'react-dropzone';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from 'react-modal';

class App extends Component {
  constructor() {
    super()
    this.state = {
      accept: '',
      multiple: true,
      files: [],
      dropzoneActive: false,
      startDate: moment(),
      modalIsOpen: false,
      formValues: [],
      editzone: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  onDragEnter() {
    this.setState({
      dropzoneActive: true
    });
  }

  openModal() {
    this.setState({modalIsOpen: true,formValues:[]});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#000';
  }
  formHandler(event){
    event.preventDefault();
    const name = this.refs.name.value.trim();
    const surname = this.refs.surname.value.trim();
    const address = this.refs.address.value.trim();
    const phone = this.refs.phone.value.trim();
    if (!name || !surname || !address || !phone) {
      return;
    }
    this.state.formValues.push(name,surname, address, phone);
    console.log(this.state.formValues);
    this.setState({editzone: true});
    this.closeModal();
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  componentWillMount() {
    Modal.setAppElement('body');
  }
  

  onDragLeave() {
    this.setState({
      dropzoneActive: false,
      editzone:false
    });
  }

  onDrop(files) {
    this.setState({
      files,
      dropzoneActive: false,
      editzone:false
    });

    
    
    files.forEach(file => {
        const reader = new FileReader();
        reader.onload = () => {
            const fileAsBinaryString = reader.result;
            
        };
        reader.onabort = () => console.log('file reading was aborted');
        reader.onerror = () => console.log('file reading has failed');

        reader.readAsBinaryString(file);
    });
  }

  applyMimeTypes(event) {
    this.setState({
      accept: event.target.value
    });
  }


  render() {
    const { accept, files, dropzoneActive, startDate } = this.state;
    const editzone=this.state.editzone;
    const formValuesArr = this.state.formValues;
    const customStyles = {
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        width                 : '500px',
        height                : '500px'
      }
    };
    function Fileinfo(props) {
      const editzone = props.editzone;
      
      if (editzone == true) {
        return (
            <div>
              <h3>Recipient Info:</h3>
              <div className="recipient_info">
                <span> Full Name: </span>
                <span>{formValuesArr[0]+''+formValuesArr[1]}</span>
              </div>
              <div className="recipient_info">
                <span> Address: </span>
                <span className="ellipseaddress">{formValuesArr[2]}</span>
              </div>
            </div>

          );
      }
      return false;
    }
    return (
      <div className="wrapper">
         <div className="App-header">
              <h1>Upload Files</h1>
            </div>
        <section>
        <aside>
          <div>
            <ul className="filelist">
              {
                files.map(f => <li key={f} className="row">
                  <div className="column">
                    <label htmlFor="invoiceamount">Invoice amount</label>
                    <div>
                      <input type="text" id="invoiceamount"/>
                    </div>
                  </div>
                  <div className="column">
                    <label>Payment(date)</label>
                    <DatePicker  onChange={(event) => this.handleChange(event)} selected={this.state.inputValue}/>
                  </div>
                  <div className="lastcolumn">
                    <label>Invoice file:</label>
                      <span className="filename">{f.name}</span>
                    <div>
                      <div>
                        <div>
                          <Fileinfo editzone={editzone} />
                          <button onClick={this.openModal} className="recipientbtn">Add recipient</button>
                        </div>
                        
                        <Modal
                          isOpen={this.state.modalIsOpen}
                          onAfterOpen={this.afterOpenModal}
                          onRequestClose={this.closeModal}
                          style={customStyles}
                          contentLabel="Add Recipient Modal"
                        >

                          <h2 ref={subtitle => this.subtitle = subtitle}>Add recipient</h2>
                          
                          <form onSubmit={this.formHandler.bind(this)}>
                            <div className="formdiv">
                             <label htmlFor="name">Name</label>
                             <input type="text" id="name" name="name" placeholder="Name" ref="name"/>
                            </div>
                            <div className="formdiv">
                             <label htmlFor="surname">Surname</label>
                             <input type="text" id="surname" placeholder="Surname" ref="surname"/>
                            </div>
                            <div className="formdiv">
                             <label htmlFor="address">Address</label>
                             <textarea id="address" placeholder="Address" ref="address"></textarea>
                            </div>
                            <div className="formdiv">
                             <label htmlFor="phone">Phone</label>
                             <input type="number" id="phone" placeholder="Phone" ref="phone"/>
                            </div>
                            <input type="Submit"/>
                            <button onClick={this.closeModal} className="closebtn">Close</button>
                          </form>
                          
                          
                        </Modal>
                      </div>
                    </div>
                  </div>
                  </li>)
              }
            </ul>
            </div>
        </aside>
        <div className="dropzone">
          <Dropzone onDrop={this.onDrop.bind(this)}>
            <p>Drop files here</p>
          </Dropzone>
        </div>
        <button className="proceedbtn">Proceed</button>
      </section>
      </div>
    );
  }

  updatevalue(value){
    console.log(this.setState.formValues);
  }

  handleChange(value) {
    this.setState({inputValue: value});
  }
}

<App />

export default App;
