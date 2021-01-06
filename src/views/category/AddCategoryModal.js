import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Button, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import { useSelector, useDispatch } from "react-redux";
import {
  addCategories,
  clearError,
  showError,
  showLoading,
  hideLoading,
} from "../../store/actions/categoriesActions";

function AddCategoryModal() {
  const dispatch = useDispatch();
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);

  const [name, setName] = useState("");
  const loading = useSelector((state) => state.products.loadingCategoryData);

  const error = useSelector((state) => state.products.error);

  const handleOpen = () => {
    setDisabledButton(false);
    setName("");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  const handleSubmit = (event) => {
    event.preventDefault();
    setDisabledButton(true);
    if (validateForm()) {
      try {
        const formData = {
          name,
        };
        dispatch(showLoading());
        dispatch(addCategories(formData)).then(() => {
          // Check if error is exist by get its class name from <Alert> component
          let errorAddCategories = document.getElementsByClassName(
            "error-category"
          );
          if (errorAddCategories.length === 0) {
            setOpen(false);
            dispatch(clearError());
            dispatch(hideLoading());
          } else {
            setDisabledButton(false);
            return false;
          }
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      {error === "" ? null : (
        <Alert severity="error" className="error-category mb-2">
          {error}
        </Alert>
      )}
      <h2 id="simple-modal-title">Tambah Kategori</h2>
      <p id="simple-modal-description"></p>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <FormGroup>
              <Label for="name">Nama</Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={name}
                placeholder="Nama"
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>

            <FormGroup className="d-flex justify-content-between">
              <Button color="primary" type="submit" disabled={disabledButton}>
                Simpan
              </Button>
              {loading ? <CircularProgress className="ml-2" /> : null}
              <Button
                color="danger"
                type="button"
                onClick={handleClose}
                disabled={disabledButton}
              >
                Tutup
              </Button>
            </FormGroup>
          </Col>
        </Row>
      </Form>
    </div>
  );

  return (
    <div>
      <Button
        color="primary"
        onClick={handleOpen}
        className="shadow my-3 rounded"
      >
        <AddCircleOutlineIcon /> Tambah Kategori
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default AddCategoryModal;
