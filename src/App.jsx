import {createTheme, CssBaseline, makeStyles, ThemeProvider} from "@material-ui/core";
import SideMenu from "./components/SideMenu";
import Header from "./components/Header";
import Employees from "./pages/Employees/Employees";

const theme = createTheme({
    palette: {
        primary: {
            main: "#333996",
            light: "#3c44b126"
        },
        secondary: {
            main: "#f83245",
            light: "#f8324526"
        },
        background: {
            default: "#f4f5fd"
        }
    },
    overrides: {
        MuiAppBar: {
            root: {
                transform: "translateZ(0)"
            }
        }
    },
    props: {
        MuiIconButton: {
            disableRipple: true
        }
    }
});

const useStyles = makeStyles({
    appMain: {
        paddingLeft: "320px",
        width: "100%"
    }
});

const App = () => {
    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <SideMenu/>
            <div className={classes.appMain}>
                <Header/>
                <Employees/>
            </div>
            <CssBaseline/>
        </ThemeProvider>
    );
};

export default App;