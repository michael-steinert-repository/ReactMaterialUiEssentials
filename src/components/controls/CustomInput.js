import {TextField} from "@material-ui/core";

const CustomInput = (props) => {
    const {label, name, value, error = null, onChange, ...other} = props;

    return (
        <TextField
            variant={"outlined"}
            label={label}
            name={name}
            value={value}
            onChange={(event) => {
                onChange(event)
            }}
            {...other}
            {...(error && {
                error: true,
                helperText: error
            })}
        />
    );
}

export default CustomInput;