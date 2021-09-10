import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    makeStyles,
    Typography
} from "@material-ui/core";
import CustomButton from "./controls/CustomButton";
import {NotListedLocation} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    root: {
        position: "absolute",
        padding: theme.spacing(2),
        top: theme.spacing(5)
    },
    dialogTitle: {
        textAlign: "center"
    },
    dialogTitleIcon: {
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.secondary.main,
        "& hover": {
            backgroundColor: theme.palette.secondary.light,
            cursor: "default"
        },
        "& .MuiSvgIcon-root": {
            fontSize: "8rem"
        }
    },
    dialogContent: {
        textAlign: "center"
    },
    dialogAction: {
        justifyContent: "center"
    }
}));

const ConfirmDialog = (props) => {
    const {confirmDialog, setConfirmDialog} = props;

    const classes = useStyles();

    return (
        <Dialog
            open={confirmDialog.isOpen}
            classes={{paper: classes.root}}
        >
            <DialogTitle className={classes.dialogTitle}>
                <IconButton
                    disableRipple={true}
                    className={classes.dialogTitleIcon}
                >
                    <NotListedLocation/>
                </IconButton>
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <Typography variant={"h6"}>
                    {confirmDialog.title}
                </Typography>
                <Typography variant={"subtitle2"}>
                    {confirmDialog.subtitle}
                </Typography>
            </DialogContent>
            <DialogActions className={classes.dialogAction}>
                <CustomButton
                    text={"No"}
                    color={"default"}
                    onClick={() => {
                        setConfirmDialog({
                            ...confirmDialog,
                            isOpen: false
                        })
                    }}
                />
                <CustomButton
                    text={"Yes"}
                    color={"secondary"}
                    onClick={confirmDialog.onConfirm}
                />
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmDialog;