import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const CustomDatePicker = (props) => {
    const {label, name, value, onChange} = props;

    const convertToDefaultEventParameter = (name, value) => ({
        target: {
            name, value
        }
    });

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                label={label}
                name={name}
                value={value}
                formate={"dd/MM/yyyy"}
                disableToolbar={true}
                variant={"inline"}
                inputVariant={"outlined"}
                onChange={(date) => {
                    onChange(convertToDefaultEventParameter(name, date))
                }}
                />
        </MuiPickersUtilsProvider>
    );
}

export default CustomDatePicker;