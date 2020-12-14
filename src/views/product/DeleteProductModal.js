import React from "react";
import { Button } from "reactstrap";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DeleteIcon from "@material-ui/icons/Delete";

function DeleteProductModal(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Hapus {props.product.name} ?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Data produk yang sudah dihapus tidak bisa dikembalikan kembali.
            Pastikan Anda yakin untuk menghapus data produk :
            {props.product.name}.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="danger">
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
