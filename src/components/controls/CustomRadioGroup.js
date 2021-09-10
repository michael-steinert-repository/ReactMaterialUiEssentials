import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@material-ui/core";

const CustomRadioGroup = (props) => {
    const {label, name, value, onChange, items} = props;

    return (
        <FormControl>
            <FormLabel>{label}</FormLabel>
            <RadioGroup
                row={true}
                name={name}
                value={value}
                onChange={(event) => {
                    onChange(event)
                }}
            >
                {
                    items.map(
                        (item, index) => (
                            <FormControlLabel key={index} value={item.id} control={<Radio/>} label={item.title}/>
                        )
                    )
                }
            </RadioGroup>
        </FormControl>
    );
}

export default CustomRadioGroup;