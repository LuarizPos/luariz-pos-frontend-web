import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Button, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import CreateIcon from "@material-ui/icons/Create";
import { useSelector, useDispatch } from "react-redux";
import {
  editCategories,
  hideLoading,
  showError,
  clearError,
} from "../../store/actions/categoriesActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";

function EditCategoryModal(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);
  const [internalLoading, setInternalLoading] = useState(false);

  const [name, setName] = useState(props.category.name);
  const [id_category] = useState(props.category.id_category);

  const error = useSelector((state) => state.categories.error);

  // Uncomment code below to see the change of state flow inside this component
  // useSelector((state) => console.log("state is : ", state));

  const handleOpen = () => {
    dispatch(clearError());
    dispatch(hideLoading());
    setInternalLoading(false);
    setOpen(true);
  };

  const handleClose = () => {
    setInternalLoading(false);
    setOpen(false);
  };

  const validateForm = () => {
    if (name.length === 0) {
      dispatch(showError("Nama harus diisi"));
      return false;
    } else {
      dispatch(clearError());
      return true;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        const formData = {
          id_category,
          name,
        };
        setInternalLoading(true);
        setDisabledButton(true);

        // Check if error is exist by get its class name from <Alert> component
        let errorEditCategory = document.getElementsByClassName(
          "error-category"
        );

        function checkError() {
          setDisabledButton(false);
          setInternalLoading(false);
          if (errorEditCategory.length === 0) {
            setOpen(false)
            return true;
          } else {
            return false;
          }
        }

        async function editNow() {
          await dispatch(editCategories(formData));
          await checkError();
        }

        editNow();
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
      <h2 id="simple-modal-title">Edit {props.category.name}</h2>
      <p id="simple-modal-description">{props.category.text}</p>
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
              {internalLoading ? <CircularProgress className="ml-2" /> : null}
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
    <span className="edit-category" key={props.category.id}>
      <Button
        color="warning"
        className="border rounded-circle p-3"
        onClick={handleOpen}
      >
        <CreateIcon />
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        disableBackdropClick={true}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </span>
  );
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 600,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default EditCategoryModal;
