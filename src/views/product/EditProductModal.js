import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import CreateIcon from "@material-ui/icons/Create";
import { useSelector, useDispatch } from "react-redux";
import {
  updateProducts,
  showLoading,
  hideLoading,
  clearError,
  showError,
} from "../../store/actions/productsActions";
import { getCategories } from "../../store/actions/categoriesActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";

function EditProductModal(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [id_category, setId_category] = useState("");

  useEffect(() => {
    dispatch(hideLoading());
    dispatch(getCategories());
  }, [dispatch]);

  const categories = useSelector((state) => state.categories.categories);

  const loading = useSelector((state) => state.products.loading);

  const error = useSelector((state) => state.products.error);

  // Uncomment code below to see the change of state flow inside this component
  // useSelector((state) => console.log("state is : ", state));

  const handleOpen = () => {
    dispatch(clearError());
    dispatch(hideLoading());
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const validateForm = () => {
    if (name.length === 0) {
      dispatch(showError("Nama harus diisi"));
      return false;
    } else if (id_category.length === 0) {
      dispatch(showError("Kategori harus dipilih"));
      return false;
    } else if (description.length === 0) {
      dispatch(showError("Deskripsi harus diisi"));
      return false;
    } else if (price.length === 0) {
      dispatch(showError("Harga harus diisi"));
      return false;
      // } else if (stock.length === 0) {
      //   dispatch(showError("Stok harus diisi"));
      //   return false;
      // } else if (image.length === 0) {
      //   dispatch(showError("Gambar harus diisi"));
      //   return false;
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
          name,
          description,
          id_category,
          price,
          id_product: props.product.id,
        };
        dispatch(showLoading());
        dispatch(updateProducts(formData)).then(() => {
          if (error.length === 0) {
            return false;
          } else {
            setOpen(false);
            dispatch(clearError());
            dispatch(hideLoading());
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
        <Alert severity="error" className="mb-2">
          {error}
        </Alert>
      )}
      <h2 id="simple-modal-title">Edit {props.product.name}</h2>
      <p id="simple-modal-description">{props.product.text}</p>
      <Form onSubmit={handleSubmit}>
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
        <FormGroup>
          <Label for="id_category">Kategori</Label>
          <Input
            type="select"
            name="id_category"
            id="id_category"
            onChange={(e) => setId_category(e.target.value)}
          >
            <option id="" value="">
              --Pilih Kategori--
            </option>
            {categories.map((category) => (
              <option key={category.id} id={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="description">Deskripsi</Label>
          <Input
            type="textarea"
            name="description"
            id="description"
            value={description}
            placeholder="Deskripsi"
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="price">Harga</Label>
          <Input
            type="text"
            name="price"
            id="price"
            value={price}
            placeholder="Harga"
            onChange={(e) => setPrice(e.target.value)}
          />
        </FormGroup>
        <FormGroup className="d-flex justify-content-between">
          <Button color="primary" type="submit">
            Simpan
          </Button>
          {loading ? <CircularProgress className="ml-2" /> : null}
          <Button color="danger" type="button" onClick={handleClose}>
            Tutup
          </Button>
        </FormGroup>
      </Form>
    </div>
  );

  return (
    <div>
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
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
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
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default EditProductModal;
