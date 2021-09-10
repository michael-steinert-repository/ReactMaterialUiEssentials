import {Dialog, DialogContent, DialogTitle, makeStyles, Typography} from "@material-ui/core";
import CustomActionButton from "./controls/CustomActionButton";
import {Close} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        position: "absolute",
        top: theme.spacing(5)
    },
    dialogTitle: {
        paddingRight: 0
    }
}));

const Popup = (props) => {
    const {title, children, open, setOpen} = props;

    const classes = useStyles();

    return (
        <Dialog
            open={open}
            maxWidth={"md"}
            classes={{paper: classes.root}}
        >
            <DialogTitle className={classes.dialogTitle}>
                <div style={{display: "flex"}}>
                    <Typography
                        variant={"h6"}
                        component={"div"}
                        style={{flexGrow: 1}}
                    >
                        {title}
                    </Typography>
                    <CustomActionButton
                        color={"secondary"}
                        onClick={()=>{setOpen(false)}}
                    >
                        <Close/>
                    </CustomActionButton>
                </div>
            </DialogTitle>
            <DialogContent dividers={true}>
                {children}
            </DialogContent>
        </Dialog>
    );
}

export default Popup;