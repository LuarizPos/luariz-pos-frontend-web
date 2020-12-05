import React, { useState } from "react";
import {
  Form,
  Label,
  FormGroup,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import CategoryList from "./CategoryList";

function Category() {
  const [addModal, setAddModal] = useState(false);
  const addtoggle = () => setAddModal(!addModal);

  function addCategory() {
    console.log("Simpan kategori");
  }

  function handleChange(event) {
    console.log(event.target.value);
  }

  function AddModal(props) {
    return (
      <Modal isOpen={props.addModal} toggle={addtoggle}>
        <ModalHeader toggle={addtoggle}>Tambah</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>Nama Kategori</Label>
              <Input type="text" id="categoryName" onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <Label>Deskripsi</Label>
              <Input type="textarea" name="text" id="categoryDescription" />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() => addCategory(props.categoryId)}>
            Ya
          </Button>
          <Button color="secondary" onClick={addtoggle}>
            Batal
          </Button>
        </ModalFooter>
      </Modal>
    );
  }

  return (
    <div>
      <Button
        color="primary"
        onClick={addtoggle}
        className="shadow my-3 rounded"
      >
        <AddCircleOutlineIcon /> Tambah Kategori
      </Button>
      <AddModal addModal={addModal} />
      <CategoryList />
    </div>
  );
}

export default Category;
