import {
    Checkbox,
    FormControl,
    FormControlLabel
} from "@material-ui/core";

const CustomCheckbox = (props) => {
    const {label, name, value, onChange} = props;

    const convertToDefaultEventParameter = (name, value) => ({
        target: {
            name, value
        }
    });

    return (
        <FormControl variant={"outlined"}>
            <FormControlLabel
                control={<Checkbox
                    name={name}
                    color={"primary"}
                    checked={value}
                    onChange={(event) => {
                        onChange(convertToDefaultEventParameter(name, event.target.checked))
                    }}
                />}
                label={label}
            />
        </FormControl>
    );
}

export default CustomCheckbox;