import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import DeleteIcon from "@material-ui/icons/Delete";
import Alert from "@material-ui/lab/Alert";
import {
  deleteCategories,
  hideLoading,
  showLoading,
  clearError,
} from "../../store/actions/categoriesActions";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@material-ui/core";

function DeleteCategoryModal(props) {
  const dispatch = useDispatch();
  const [disabledButton, setDisabledButton] = useState(false);

  const [open, setOpen] = useState(false);
  const [name] = useState(props.category.name);
  const [id] = useState(props.category.id);

  const error = useSelector((state) => state.categories.error);
  const loadingCategoryData = useSelector(
    (state) => state.categories.loadingCategoryData
  );

  function handleOpen() {
    dispatch(clearError());
    dispatch(hideLoading());
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function deleteCategory(id) {
    try {
      dispatch(showLoading());
      setDisabledButton(true);
      dispatch(deleteCategories(id)).then(() => {
        dispatch(hideLoading());

        // Check if error is exist by get its class name from <Alert> component
        let errorDeleteProduct = document.getElementsByClassName(
          "error-category"
        );
        // Check errorDeleteProduct is exist or not
        if (errorDeleteProduct.length === 0) {
          return true;
        } else {
          setDisabledButton(false);
          return false;
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <Modal isOpen={open} fade={false}>
        {error === "" ? null : (
          <Alert severity="error" className="error-category m-2">
            {error}
          </Alert>
        )}
        <ModalHeader>Konfirmasi</ModalHeader>
        <ModalBody>
          Apakah Anda yakin untuk menghapus kategori dengan nama "{name}
          "?
        </ModalBody>
        <ModalFooter>
          {loadingCategoryData ? <CircularProgress className="ml-2" /> : null}
          <Button
            color="danger"
            disabled={disabledButton}
            onClick={() => deleteCategory(id)}
          >
            Hapus
          </Button>
          <Button
            color="secondary"
            onClick={handleClose}
            disabled={disabledButton}
          >
            Batal
          </Button>
        </ModalFooter>
      </Modal>

      <Button
        className="border bg-danger rounded-circle p-3 m-2"
        onClick={handleOpen}
        value={"dasda"}
      >
        <DeleteIcon />
      </Button>
    </>
  );
}

export default DeleteCategoryModal;