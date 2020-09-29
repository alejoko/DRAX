import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

interface ModalProps {
    open: boolean;
    children?: JSX.Element,
    onConfirm?: () => void,
    onDiscard: () => void
};

const Modal = ({open, children, onConfirm, onDiscard}: ModalProps) => {
    // TODO: Cambiar texto de los botones
    // TODO: Poner acciones como opcionales
    // TODO: Añadir boolean para permitir cerrar ventana si click fuera
    return (
        <Dialog open={open}>
            <DialogContent>
                {children}
            </DialogContent>
            <DialogActions>
                {onConfirm && <Button onClick={onConfirm}>Ok</Button>}
                <Button onClick={onDiscard}>Discard</Button>
            </DialogActions>
        </Dialog>
    );
};

export default Modal;