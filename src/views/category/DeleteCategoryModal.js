import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import DeleteIcon from "@material-ui/icons/Delete";
import Alert from "@material-ui/lab/Alert";
import {
  deleteCategories,
  clearError,
} from "../../store/actions/categoriesActions";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@material-ui/core";

function DeleteCategoryModal(props) {
  const dispatch = useDispatch();
  const [disabledButton, setDisabledButton] = useState(false);
  const [internalLoading, setInternalLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [name] = useState(props.category.name);
  const [id] = useState(props.category.id_category);

  const error = useSelector((state) => state.categories.error);

  function handleOpen() {
    dispatch(clearError());
    setInternalLoading(false);
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function deleteCategory(id) {
    try {
      setInternalLoading(true);
      setDisabledButton(true);

      // Check if error is exist by get its class name from <Alert> component
      let errorDeleteCategory = document.getElementsByClassName(
        "error-category"
      );

      function checkError() {
        if (errorDeleteCategory.length === 0) {
          return true;
        } else {
          setDisabledButton(false);
          setInternalLoading(false);
          return false;
        }
      }

      async function deleteNow() {
        await dispatch(deleteCategories(id));
        await checkError();
      }

      deleteNow();
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
          {internalLoading ? <CircularProgress className="ml-2" /> : null}
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
      >
        <DeleteIcon />
      </Button>
    </>
  );
}

export default DeleteCategoryModal;
