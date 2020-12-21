import React, { useState } from "react";
import { Button } from "reactstrap";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DeleteIcon from "@material-ui/icons/Delete";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteProducts,
  hideLoading,
  clearError,
} from "../../store/actions/productsActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";

function DeleteProductModal(props) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const error = useSelector((state) => state.products.error);
  const [disabledButton, setDisabledButton] = useState(false);
  const [internalLoading, setInternalLoading] = useState(false);

  const handleClickOpen = () => {
    dispatch(clearError());
    dispatch(hideLoading());
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (id) => {
    try {
      setInternalLoading(true);
      setDisabledButton(true);
      dispatch(deleteProducts(id)).then(() => {
        // Check if error is exist by get its class name from <Alert> component
        let errorDeleteProduct = document.getElementsByClassName("error-product");

        setInternalLoading(false);
        // Check errorDeleteProduct is exist or not
        if (errorDeleteProduct.length === 0) {
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
  };

  return (
    <div>
      <Button
        color="danger"
        className="border rounded-circle p-3"
        onClick={handleClickOpen}
      >
        <DeleteIcon />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        disableBackdropClick={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Hapus {props.product.name} ?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {error === "" ? null : (
              <Alert severity="error" className="error-product mb-2">
                {error}
              </Alert>
            )}
            Data produk yang sudah dihapus tidak bisa dikembalikan kembali.
            Pastikan Anda yakin untuk menghapus data produk :
            {props.product.name}.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {internalLoading ? <CircularProgress className="ml-2" /> : null}
          <Button
            onClick={() => handleDelete(props.product.id)}
            color="danger"
            disabled={disabledButton}
          >
            Hapus
          </Button>
          <Button
            onClick={handleClose}
            color="primary"
            autoFocus
            disabled={disabledButton}
          >
            Batalkan
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeleteProductModal;
