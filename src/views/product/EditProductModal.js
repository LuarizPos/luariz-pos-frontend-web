import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Button, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import CreateIcon from "@material-ui/icons/Create";
import { useSelector, useDispatch } from "react-redux";
import {
  updateProducts,
  hideLoading,
  clearError,
  showError,
} from "../../store/actions/productsActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import { DropzoneArea } from "material-ui-dropzone";
import { getFileExtension, getFileName } from "../../helper/imageHelper";

function EditProductModal(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);
  const [internalLoading, setInternalLoading] = useState(false);

  const [name, setName] = useState(props.product.name);
  const [description, setDescription] = useState(props.product.description);
  const [price, setPrice] = useState(props.product.price);
  const [id_category, setId_category] = useState(props.product.id_category);
  const [image, setImage] = useState([]);

  const categories = useSelector((state) => state.categories.categories);

  const error = useSelector((state) => state.products.error);

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

  const onChange = (event) => {
    const regex = /^[0-9\b]+$/;
    if (event.target.value === "" || regex.test(event.target.value)) {
      setPrice(event.target.value);
    }
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
    } else if (image.length === 0) {
      dispatch(showError("Gambar harus diisi"));
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
          id_product: props.product.id,
          name,
          description,
          id_category,
          price,
          image,
        };
        setInternalLoading(true);
        setDisabledButton(true);
        dispatch(updateProducts(formData)).then(() => {
          // Check if error is exist by get its class name from <Alert> component
          let errorEditProduct = document.getElementsByClassName(
            "error-product"
          );

          setInternalLoading(false);
          // Check errorEditProduct is exist or not
          if (errorEditProduct.length === 0) {
            dispatch(hideLoading()).then(() => {
              setDisabledButton(false);
              setOpen(false);
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
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      {error === "" ? null : (
        <Alert severity="error" className="error-product mb-2">
          {error}
        </Alert>
      )}
      <h2 id="simple-modal-title">Edit {props.product.name}</h2>
      <p id="simple-modal-description">{props.product.text}</p>
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
                value={id_category}
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
    <div className="edit-modal" key={props.product.id}>
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

export default EditProductModal;
