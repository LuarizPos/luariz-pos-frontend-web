import React from "react";
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
  showLoading,
  hideLoading,
  clearError,
} from "../../store/actions/productsActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";

function DeleteProductModal(props) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);
  console.log(error);

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
      dispatch(clearError());
      dispatch(showLoading());
      dispatch(deleteProducts(id)).then(() => {
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
  };

  useSelector((state) => console.log("state is : ", state));

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
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Hapus {props.product.name} ?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {error === "" ? null : (
              <Alert severity="error" className="mb-2">
                {error}
              </Alert>
            )}
            Data produk yang sudah dihapus tidak bisa dikembalikan kembali.
            Pastikan Anda yakin untuk menghapus data produk :
            {props.product.name}.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {loading ? <CircularProgress className="mr-2" /> : null}
          <Button onClick={() => handleDelete(props.product.id)} color="danger">
            Hapus
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Batalkan
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeleteProductModal;
