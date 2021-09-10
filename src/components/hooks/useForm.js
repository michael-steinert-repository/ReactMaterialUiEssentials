import {useState} from "react";
import {makeStyles} from "@material-ui/core";

const useForm = (initialValues, validateOnChange = false, validate) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const handleInputChange = (event) => {
        const {name, value} = event.target;

        setValues({
            ...value,
            [name]: value
        });

        if (validateOnChange) {
            validate({
                [name]: value
            });
        }
    }
    const resetForm = () => {
        setValues(initialValues);
        setErrors({})
    }
    return {
        values: values,
        setValues: setValues,
        errors: errors,
        setErrors: setErrors,
        resetForm: resetForm,
        handleInputChange: handleInputChange
    }
}

const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiFormControl-root": {
            width: "80%",
            margin: theme.spacing(1),
        }
    },
}));

const CustomForm = (props) => {
    const classes = useStyles();

    const {children, ...other} = props;

    return (
        <form className={classes.root} autoComplete={"off"} {...other}>
            {props.children}
        </form>
    );
}

export {useForm, CustomForm};