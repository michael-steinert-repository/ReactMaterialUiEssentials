import {useEffect} from "react";
import {Grid} from "@material-ui/core";
import {useForm, CustomForm} from "../../components/hooks/useForm";
import CustomInput from "../../components/controls/CustomInput";
import CustomRadioGroup from "../../components/controls/CustomRadioGroup";
import CustomSelect from "../../components/controls/CustomSelect";
import CustomCheckbox from "../../components/controls/CustomCheckbox";
import CustomDatePicker from "../../components/controls/CustomDatePicker";
import CustomButton from "../../components/controls/CustomButton";
import * as employeeService from "../../services/employeeService";

const initialValues = {
    id: 0,
    fullName: "",
    email: "",
    mobile: "",
    city: "",
    gender: "",
    departmentId: "",
    hireDate: new Date(),
    isPermanent: false
}

const genderItems = [
    {id: "male", title: "Male"},
    {id: "female", title: "Female"},
    {id: "other", title: "Other"}
];

const EmployeeForm = ({recordForEdit, addOrEditEmployee}) => {
    const validate = (fieldValues = values) => {
        let temp = {...errors};

        if ("fullName" in fieldValues) {
            temp.fullName = fieldValues.fullName ? "" : "Full Name is required";
        }

        if ("email" in fieldValues) {
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid";
        }

        if ("mobile" in fieldValues) {
            temp.mobile = (fieldValues.mobile.length > 9) ? "" : "Mobile have to have minimum 10 Numbers";
        }

        if ("departmentId" in fieldValues) {
            temp.departmentId = (fieldValues.departmentId.length !== 0) ? "" : "Department ID is required";
        }

        setErrors({
            ...temp
        });

        if (fieldValues === values) {
            /* Checking if all Value have an empty String - if so then return True */
            return Object.values(temp).every(value => value === "");
        }

        return false;
    }

    const {values, setValues, errors, setErrors, resetForm, handleInputChange} = useForm(initialValues, true, validate);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (validate()) {
            addOrEditEmployee(values, resetForm);
        }
    }

    useEffect(() => {
        if (Object.keys(recordForEdit) !== 0) {
            setValues({
                ...recordForEdit
            });
        }
    }, [recordForEdit]);

    return (
        <CustomForm onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <CustomInput
                        name={"fullName"}
                        label={"Full Name"}
                        value={values.fullName}
                        onChange={handleInputChange}
                        error={errors.fullName}
                    />
                    <CustomInput
                        name={"email"}
                        label={"Email"}
                        value={values.email}
                        onChange={handleInputChange}
                        error={errors.email}
                    />
                    <CustomInput
                        name={"mobile"}
                        label={"Mobile"}
                        value={values.mobile}
                        onChange={handleInputChange}
                        error={errors.mobile}
                    />
                    <CustomInput
                        name={"city"}
                        label={"City"}
                        value={values.city}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <CustomRadioGroup
                        name={"gender"}
                        label={"Gender"}
                        value={values.gender}
                        onChange={(event) => {
                            handleInputChange(event)
                        }}
                        items={genderItems}
                    />
                    <CustomSelect
                        name={"departmentId"}
                        labe={"Department"}
                        value={values.departmentId}
                        onChange={(event) => {
                            handleInputChange(event)
                        }}
                        options={employeeService.getDepartmentOptions()}
                        error={errors.departmentId}
                    />
                    <CustomDatePicker
                        name={"hireDate"}
                        label={"Hire Date"}
                        value={values.hireDate}
                        onChange={(event) => {
                            handleInputChange(event)
                        }}
                    />
                    <CustomCheckbox
                        name={"isPermanent"}
                        label={"Permanent Employee"}
                        value={values.isPermanent}
                        onChange={(event) => {
                            handleInputChange(event)
                        }}
                    />
                    <div>
                        <CustomButton
                            text={"Submit"}
                            variant={"outlined"}
                            onClick={handleSubmit}
                        />
                        <CustomButton
                            text={"Reset"}
                            color={"default"}
                            variant={"outlined"}
                            onClick={resetForm}
                        />
                    </div>
                </Grid>
            </Grid>
        </CustomForm>
    );
}

export default EmployeeForm;