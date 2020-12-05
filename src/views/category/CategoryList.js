import React, { useState } from "react";
import { Col, ListGroup, ListGroupItem, Row } from "reactstrap";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function CategoryList() {
  const [deletemodal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [categoryName, setCategoryName] = useState(false);
  const [categoryId, setCategoryId] = useState(false);

  function deleteCategory(id) {
    console.log("Hapus kategori dengan id ", id);
  }

  function DeleteModal(props) {
    return (
      <Modal isOpen={props.deletemodal} toggle={deletetoggle}>
        <ModalHeader toggle={deletetoggle}>Konfirmasi</ModalHeader>
        <ModalBody>
          Apakah Anda yakin untuk menghapus kategori dengan nama "
          {props.categoryName}
          "?
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            onClick={() => deleteCategory(props.categoryId)}
          >
            Ya
          </Button>
          <Button color="secondary" onClick={deletetoggle}>
            Batal
          </Button>
        </ModalFooter>
      </Modal>
    );
  }

  function EditModal(props) {
    return (
      <Modal isOpen={props.editModal} toggle={edittoggle}>
        <ModalHeader toggle={edittoggle}>Edit</ModalHeader>
        <ModalBody>
          Apakah Anda yakin untuk mengubah kategori dengan nama "
          {props.categoryName}
          "?
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            onClick={() => deleteCategory(props.categoryId)}
          >
            Ya
          </Button>
          <Button color="secondary" onClick={edittoggle}>
            Batal
          </Button>
        </ModalFooter>
      </Modal>
    );
  }

  const deletetoggle = (event) => {
    console.log(event.currentTarget.value);
    let targetValueDelete = event.currentTarget.value;
    if (targetValueDelete === undefined) {
      setDeleteModal(!deletemodal);
    } else {
      targetValueDelete = targetValueDelete.split("_");
      setCategoryName(targetValueDelete[1]);
      setCategoryId(targetValueDelete[0]);
      setDeleteModal(!deletemodal);
    }
  };

  const edittoggle = (event) => {
    console.log(event.currentTarget.value);
    let targetValueEdit = event.currentTarget.value;
    if (targetValueEdit === undefined) {
      setEditModal(!editModal);
    } else {
      targetValueEdit = targetValueEdit.split("_");
      setCategoryName(targetValueEdit[1]);
      setCategoryId(targetValueEdit[0]);
      setEditModal(!editModal);
    }
  };

  return (
    <div style={{ height: "70vh", overflow: "scroll" }}>
      <DeleteModal
        deletemodal={deletemodal}
        categoryName={categoryName}
        categoryId={categoryId}
      />

      <EditModal
        editModal={editModal}
        categoryName={categoryName}
        categoryId={categoryId}
      />

      <ListGroup>
        <ListGroupItem className="shadow-sm p-3 mb-3 bg-white rounded">
          <Row>
            <Col className="text-left">
              <label className="d-block font-weight-bold">Makanan</label>
              <small>4 Products</small>
            </Col>
            <Col className="text-right align-self-center">
              <Button
                className="border bg-warning rounded-circle m-2"
                onClick={edittoggle}
                value="1_MakananEdit"
              >
                <CreateIcon />
              </Button>
              <Button
                className="border bg-danger rounded-circle m-2"
                onClick={deletetoggle}
                value="1_Makanan"
              >
                <DeleteIcon />
              </Button>
            </Col>
          </Row>
        </ListGroupItem>
        <ListGroupItem className="shadow-sm p-3 mb-3 bg-white rounded">
          <Row>
            <Col className="text-left">
              <label className="d-block font-weight-bold">Minuman</label>
              <small>6 Products</small>
            </Col>
            <Col className="text-right align-self-center">
              <Button
                className="border bg-warning rounded-circle m-2"
                onClick={edittoggle}
                value="2_MinumanEdit"
              >
                <CreateIcon />
              </Button>
              <Button
                className="border bg-danger rounded-circle m-2"
                onClick={deletetoggle}
                value="2_Minuman"
              >
                <DeleteIcon />
              </Button>
            </Col>
          </Row>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}

export default CategoryList;
