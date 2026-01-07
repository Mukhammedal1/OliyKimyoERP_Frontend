import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  description?: string;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  title = "Diqqat!",
//   description = "Bu amalni ortga qaytarib bo‘lmaydi.",
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 2,
          minWidth: 300,
          backgroundColor: "#ffffff",
        },
      }}
    >
      <DialogTitle sx={{ color: "#030303", fontSize: 25 }}>{title}</DialogTitle>

      <DialogContent></DialogContent>

      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "space-around",
          px: 0,
          //   pt: 2,
        }}
      >
        <Button
          onClick={onConfirm}
          sx={{
            backgroundColor: "#b71c1c",
            color: "#ffffff",
            fontSize: 18,
            textTransform: "none",
            // fontWeight: "",
            borderRadius: 2,
            px: 5,
            "&:hover": {
              backgroundColor: "#b71c1c",
            },
          }}
        >
          Ha
        </Button>
        <Button
          onClick={onClose}
          sx={{
            color: "#ffffff",
            backgroundColor: "#0f172a",
            textTransform: "none",
            fontWeight: "bold",
            fontSize: 18,
            borderRadius: 2,
            px: 5,
          }}
        >
          Yo'q
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
