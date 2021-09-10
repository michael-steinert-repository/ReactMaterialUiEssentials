import {
    FormControl, FormHelperText,
    InputLabel,
    MenuItem,
    Select
} from "@material-ui/core";

const CustomSelect = (props) => {
    const {label, name, value, error = null, onChange, options} = props;

    return (
        <FormControl
            variant={"outlined"}
            {...(error && {
                error: true
            })}
        >
            <InputLabel>{label}</InputLabel>
            <Select
                label={label}
                name={name}
                value={value}
                onChange={(event) => {
                    onChange(event)
                }}>
                <MenuItem value={"none"}>None</MenuItem>
                {
                    options.map(
                        (option, index) => (
                            <MenuItem key={index} value={option.id}>
                                {option.title}
                            </MenuItem>
                        )
                    )
                }
            </Select>
            {error && (
                <FormHelperText>{error}</FormHelperText>
            )}
        </FormControl>
    );
}

export default CustomSelect;