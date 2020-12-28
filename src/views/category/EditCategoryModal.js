import React, { useState } from "react";
import {
  FormGroup,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Label,
} from "reactstrap";
import CreateIcon from "@material-ui/icons/Create";
import Alert from "@material-ui/lab/Alert";
import {
  editCategories,
  showLoading,
  hideLoading,
  showError,
  clearError,
} from "../../store/actions/categoriesActions";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@material-ui/core";

function EditCategoryModal(props) {
  const dispatch = useDispatch();
  const [disabledButton, setDisabledButton] = useState(false);

  const [open, setOpen] = useState(false);
  const [name, setName] = useState(props.category.name);
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

  function handleChange(event) {
    setName(event.target.value);
  }

  const validateForm = () => {
    if (name.length === 0) {
      dispatch(showError("Nama harus diisi"));
      setDisabledButton(false);
      return false;
    } else {
      dispatch(clearError());
      return true;
    }
  };

  function editCategory(data) {
    if (validateForm()) {
      try {
        const formData = {
          id_product: id,
          name,
        };
        dispatch(showLoading());
        setDisabledButton(true);
        dispatch(editCategories(formData)).then(() => {
          dispatch(hideLoading());

          // Check if error is exist by get its class name from <Alert> component
          let errorEditProduct = document.getElementsByClassName(
            "error-category"
          );

          // Check errorEditProduct is exist or not
          if (errorEditProduct.length === 0) {
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
  }

  return (
    <>
      <Modal isOpen={open} fade={false}>
        {error === "" ? null : (
          <Alert severity="error" className="error-category m-2">
            {error}
          </Alert>
        )}
        <ModalHeader>Edit {props.category.name}</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>Nama Kategori</Label>
              <Input type="text" onChange={handleChange} id="name" />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          {loadingCategoryData ? <CircularProgress className="ml-2" /> : null}
          <Button
            color="primary"
            disabled={disabledButton}
            onClick={() => editCategory()}
            autoFocus
          >
            Simpan
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
        className="border bg-warning rounded-circle p-3 m-2"
        onClick={handleOpen}
      >
        <CreateIcon />
      </Button>
    </>
  );
}

export default EditCategoryModal;
