import React, { useState } from "react";
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
import Alert from "@material-ui/lab/Alert";
import {
  getCategories,
  deleteCategories,
  hideLoading,
} from "../../store/actions/categoriesActions";
import { useDispatch, useSelector } from "react-redux";
import LoadingData from "../../general_components/LoadingData";
import { CircularProgress } from "@material-ui/core";

function CategoryList() {
  const dispatch = useDispatch();
  const [disabledButton, setDisabledButton] = useState(false);
  const [internalLoading, setInternalLoading] = useState(false);

  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [categoryName, setCategoryName] = useState(false);
  const [categoryId, setCategoryId] = useState(false);

  const error = useSelector((state) => state.categories.error);

  const loadingCategoryData = useSelector(
    (state) => state.categories.loadingCategoryData
  );
  const categories = useSelector((state) => state.categories.categories);
  // console.log(categories);

  function deleteCategory(id) {
    // console.log("Hapus kategori dengan id ", id);
    try {
      setInternalLoading(true);
      setDisabledButton(true);
      dispatch(deleteCategories(id)).then(() => {
        // Check if error is exist by get its class name from <Alert> component
        let errorDeleteProduct = document.getElementsByClassName(
          "error-category"
        );

        setInternalLoading(false);
        // Check errorDeleteProduct is exist or not
        if (errorDeleteProduct.length === 0) {
          dispatch(hideLoading()).then(() => {
            setDisabledButton(false);
            setDeleteModal(false);
            dispatch(getCategories());
          });
        } else {
          setDisabledButton(false);
          return false;
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  function editCategory(id) {
    console.log("Edit kategori dengan id ", id);
  }

  function handleChange(event) {
    console.log(event.target.value);
  }

  function DeleteModal(props) {
    return (
      <Modal isOpen={props.deleteModal} fade={false} toggle={deletetoggle}>
        {error === "" ? null : (
          <Alert severity="error" className="error-category m-2">
            {error}
          </Alert>
        )}
        <ModalHeader toggle={deletetoggle}>Konfirmasi</ModalHeader>
        <ModalBody>
          Apakah Anda yakin untuk menghapus kategori dengan nama "
          {props.categoryName}
          "?
        </ModalBody>
        <ModalFooter>
          {internalLoading ? <CircularProgress className="ml-2" /> : null}
          <Button
            color="danger"
            disabled={disabledButton}
            onClick={() => deleteCategory(props.categoryId)}
          >
            Hapus
          </Button>
          <Button
            color="secondary"
            onClick={deletetoggle}
            disabled={disabledButton}
          >
            Batal
          </Button>
        </ModalFooter>
      </Modal>
    );
  }

  function EditModal(props) {
    return (
      <Modal isOpen={props.editModal} fade={false} toggle={edittoggle}>
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
          <Button
            color="primary"
            disabled={disabledButton}
            onClick={() => editCategory(props.categoryId)}
            autoFocus
          >
            Simpan
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
      {loadingCategoryData === true ? (
        <LoadingData />
      ) : (
        <>
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
                  <Col className="text-left align-self-center">
                    <h4 className="d-block font-weight-bold mb-0 text-dark">
                      {category.name}
                    </h4>
                    <small>{category.total_product} Products</small>
                  </Col>
                  <Col className="text-right align-self-center">
                    <Button
                      className="border bg-warning rounded-circle p-3 m-2"
                      onClick={edittoggle}
                      value={`${category.id}_${category.name}_Edit`}
                    >
                      <CreateIcon />
                    </Button>
                    <Button
                      className="border bg-danger rounded-circle p-3 m-2"
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
        </>
      )}
    </div>
  );
}

export default CategoryList;
