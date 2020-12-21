import React, { useState, useEffect } from "react";
import {
  Col,
  Form,
  Label,
  ListGroup,
  ListGroupItem,
  Row,
  FormGroup,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import { getCategories } from "../../store/actions/categoriesActions";
import { useSelector, useDispatch } from "react-redux";

function CategoryList() {
  const dispatch = useDispatch();
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [categoryName, setCategoryName] = useState(false);
  const [categoryId, setCategoryId] = useState(false);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const categories = useSelector((state) => state.categories.categories);
  console.log(categories);

  function deleteCategory(id) {
    console.log("Hapus kategori dengan id ", id);
  }

  function editCategory(id) {
    console.log("Edit kategori dengan id ", id);
  }

  function handleChange(event) {
    console.log(event.target.value);
  }

  function DeleteModal(props) {
    return (
      <Modal isOpen={props.deleteModal} toggle={deletetoggle}>
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
        <ModalHeader toggle={edittoggle}>Edit {props.categoryName}</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>Nama Kategori</Label>
              <Input
                type="text"
                value={props.categoryName}
                onChange={handleChange}
                id="categoryName"
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() => editCategory(props.categoryId)}>
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
      setDeleteModal(!deleteModal);
    } else {
      targetValueDelete = targetValueDelete.split("_");
      setCategoryName(targetValueDelete[1]);
      setCategoryId(targetValueDelete[0]);
      setDeleteModal(!deleteModal);
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
        deleteModal={deleteModal}
        categoryName={categoryName}
        categoryId={categoryId}
      />

      <EditModal
        editModal={editModal}
        categoryName={categoryName}
        categoryId={categoryId}
      />

      <ListGroup>
        {categories.map((category) => (
          <ListGroupItem
            className="shadow-sm p-3 mb-3 bg-white rounded"
            key={category.id}
          >
            <Row>
              <Col className="text-left">
                <label className="d-block font-weight-bold">
                  {category.name}
                </label>
                <small>{category.total_product} Products</small>
              </Col>
              <Col className="text-right align-self-center">
                <Button
                  className="border bg-warning rounded-circle m-2"
                  onClick={edittoggle}
                  value={`${category.id}_${category.name}_Edit`}
                >
                  <CreateIcon />
                </Button>
                <Button
                  className="border bg-danger rounded-circle m-2"
                  onClick={deletetoggle}
                  value={`${category.id}_${category.name}_Delete`}
                >
                  <DeleteIcon />
                </Button>
              </Col>
            </Row>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}

export default CategoryList;
