import {AppBar, Badge, Grid, IconButton, InputBase, makeStyles, Toolbar} from "@material-ui/core";
import {ChatBubbleOutline, NotificationsNone, PowerSettingsNew, Search} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#fff",
        transform: "translateZ(0)"
    },
    searchInput: {
        opacity: "0.6",
        padding: `0px ${theme.spacing(1)}px`,
        fontSize: "0.8rem",
        "&:hover": {
            backgroundColor: "#f2f2f2"
        },
        "& .MuiSvgIcon-root": {
            marginRight: theme.spacing(1)
        }
    }
}));

const Header = () => {
    const classes = useStyles();

    return (
        <AppBar position={"static"} className={classes.root}>
            <Toolbar>
                <Grid container alignItems={"center"}>
                    <Grid item>
                        <InputBase
                            placeholder={"Search Topics"}
                            startAdornment={<Search fontSize={"small"}/>}
                            className={classes.searchInput}
                        />
                    </Grid>
                    <Grid item sm/>
                    <Grid item>
                        <IconButton>
                            <Badge badgeContent={4} color={"secondary"}>
                                <NotificationsNone fontSize={"small"}/>
                            </Badge>
                        </IconButton>
                        <IconButton>
                            <Badge badgeContent={3} color={"primary"}>
                                <ChatBubbleOutline fontSize={"small"}/>
                            </Badge>
                        </IconButton>
                        <IconButton>
                            <PowerSettingsNew fontSize={"small"}/>
                        </IconButton>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}

export default Header;