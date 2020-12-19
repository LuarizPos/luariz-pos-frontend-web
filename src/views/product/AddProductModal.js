import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Button, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { useSelector, useDispatch } from "react-redux";
import {
  addProducts,
  showLoading,
  hideLoading,
  clearError,
  showError,
  getProducts,
} from "../../store/actions/productsActions";
import { getCategories } from "../../store/actions/categoriesActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import { DropzoneArea } from "material-ui-dropzone";
import { getFileExtension, getFileName } from "../../helper/imageHelper";

function AddProductModal() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [id_category, setId_category] = useState("");
  const [image, setImage] = useState([]);
  const [disabledButton, setDisabledButton] = useState(false);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts());
  }, [dispatch]);

  const categories = useSelector((state) => state.categories.categories);

  const loading = useSelector((state) => state.products.loadingProductData);

  const error = useSelector((state) => state.products.error);

  // Uncomment code below to see the change of state flow inside this component
  // useSelector((state) => console.log("state is : ", state));

  const handleOpen = () => {
    setName("");
    setDescription("");
    setPrice("");
    setId_category("");
    setImage([]);
    setDisabledButton(false);
    dispatch(clearError());
    dispatch(hideLoading());
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onAddHandler = (file = []) => {
    // If file added, then process it to base64 and save to state
    if (file.length !== 0) {
      const imageFileName = file[0].name;
      let reader = new FileReader();
      reader.readAsDataURL(file[0]);
      reader.onload = function () {
        let fullEncodedBase64 = reader.result;
        let encodedBase64 = reader.result.split(",")[1];
        setImage({
          fullEncoded: fullEncodedBase64,
          image_blob: encodedBase64,
          type: getFileExtension(imageFileName),
          name: getFileName(imageFileName),
        });
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
    }
  };

  const validateForm = () => {
    if (name.length === 0) {
      dispatch(showError("Nama harus diisi"));
      setDisabledButton(false);
      return false;
    } else if (id_category.length === 0) {
      dispatch(showError("Kategori harus dipilih"));
      setDisabledButton(false);
      return false;
    } else if (description.length === 0) {
      dispatch(showError("Deskripsi harus diisi"));
      setDisabledButton(false);
      return false;
    } else if (price.length === 0) {
      dispatch(showError("Harga harus diisi dengan angka"));
      setDisabledButton(false);
      return false;
      // } else if (stock.length === 0) {
      //   dispatch(showError("Stok harus diisi"));
      //   return false;
    } else if (image.length === 0) {
      dispatch(showError("Gambar harus diisi"));
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
          description,
          id_category,
          price,
          image,
        };
        dispatch(showLoading());
        dispatch(addProducts(formData)).then(() => {
          if (error.length === 0) {
            setOpen(false);
            dispatch(clearError());
            dispatch(hideLoading());
          } else {
            return false;
          }
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  const onChange = (event) => {
    const regex = /^[0-9\b]+$/;
    if (event.target.value === "" || regex.test(event.target.value)) {
      setPrice(event.target.value);
    }
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      {error === "" ? null : (
        <Alert severity="error" className="mb-2">
          {error}
        </Alert>
      )}
      <h2 id="simple-modal-title">Tambah Produk</h2>
      <p id="simple-modal-description"></p>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <FormGroup>
              <Label for="name">Gambar</Label>
              <DropzoneArea
                acceptedFiles={["image/*"]}
                filesLimit={1}
                dropzoneText={"Klik untuk unggah gambar"}
                dropzoneClass={"mb-3"}
                onChange={(file) => onAddHandler(file)}
                showPreviews={true}
                showPreviewsInDropzone={false}
                previewGridProps={{
                  container: { spacing: 1, direction: "row" },
                }}
                previewText=""
                showAlerts={false}
              />
            </FormGroup>
          </Col>
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
                  <option
                    key={category.id}
                    id={category.id}
                    value={category.id}
                  >
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
                type="number"
                onKeyDown={(e) =>
                  (e.keyCode === 69 || e.keyCode === 190) && e.preventDefault()
                }
                onChange={onChange}
                name="price"
                id="price"
                value={price}
                placeholder="Harga"
                // onChange={(e) => setPrice(e.target.value)}
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
        <AddCircleOutlineIcon /> Tambah Produk
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
    width: 600,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default AddProductModal;
