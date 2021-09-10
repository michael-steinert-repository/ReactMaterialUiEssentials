import {useState} from "react";
import EmployeeForm from "./EmployeeForm";
import PageHeader from "../../components/PageHeader";
import {Add, Close, EditOutlined, PeopleAltTwoTone, Search} from "@material-ui/icons";
import {InputAdornment, makeStyles, Paper, TableBody, TableCell, TableRow, Toolbar} from "@material-ui/core";
import useTable from "../../components/hooks/useTable";
import * as employeeService from "../../services/employeeService";
import CustomInput from "../../components/controls/CustomInput";
import CustomButton from "../../components/controls/CustomButton";
import Popup from "../../components/Popup";
import CustomActionButton from "../../components/controls/CustomActionButton";
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";

const useStyles = makeStyles((theme) => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: "75%"
    },
    addButton: {
        position: "absolute",
        right: "10px",
    }
}));

const headCells = [
    {id: "fullName", label: "Employee Name"},
    {id: "email", label: "Email"},
    {id: "mobile", label: "Mobile Number"},
    {id: "department", label: "Department"},
    {id: "actions", label: "Actions", disableSorting: true}
];

const Employees = () => {
    const classes = useStyles();

    const [records, setRecords] = useState(employeeService.getEmployees());
    const [recordForEdit, setRecordForEdit] = useState({});
    const [filterFunction, setFilterFunction] = useState({
        filter: (items) => {
            return items;
        }
    });
    const [openPopup, setOpenPopup] = useState(false);
    const [notify, setNotify] = useState({
        isOpen: false,
        message: "",
        type: ""
    });
    const [confirmDialog, setConfirmDialog] = useState({
        isOpen: false,
        title: "",
        subtitle: ""
    });

    const {
        TableContainer,
        TableHead,
        TablePagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFunction);

    const handleSearch = (event) => {
        let target = event.target;
        setFilterFunction({
            filter: (items) => {
                if (target.value === "") {
                    return items;
                } else {
                    return items.filter(x => x.fullName.includes(target.value));
                }
            }
        });
    }

    const addOrEditEmployee = (employee, resetForm) => {
        if (employee.id === 0) {
            employeeService.insertEmployee(employee);
        } else {
            employeeService.updateEmployee(employee);
        }
        resetForm();
        setRecordForEdit({});
        setOpenPopup(false);
        setRecords(employeeService.getEmployees());
        setNotify({
            isOpen: true,
            message: "Submitted successfully",
            type: "success"
        });
    }

    const openInPopup = (item) => {
        setRecordForEdit(item);
        setOpenPopup(true);
    }

    const handleDelete = (id) => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        });
        employeeService.deleteEmployee(id);
        setRecords(employeeService.getEmployees());
        setNotify({
            isOpen: true,
            message: "Deleted successfully",
            type: "error"
        });
    }

    return (
        <>
            <PageHeader
                title={"New Employee"}
                subtitle={"Form design with Validation"}
                icon={<PeopleAltTwoTone fontSize={"large"}/>}
            />
            <Paper className={classes.pageContent}>
                <Toolbar>
                    <CustomInput
                        className={classes.searchInput}
                        label={"Search Employees"}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position={"start"}>
                                    <Search/>
                                </InputAdornment>
                            )
                        }}
                        onChange={handleSearch}
                    />
                    <CustomButton
                        className={classes.addButton}
                        text={"Add new Employee"}
                        variant={"outlined"}
                        startIcon={<Add/>}
                        onClick={() => {
                            setOpenPopup(true);
                            setRecordForEdit({});
                        }}
                    />
                </Toolbar>
                <TableContainer>
                    <TableHead/>
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{item.fullName}</TableCell>
                                    <TableCell>{item.email}</TableCell>
                                    <TableCell>{item.mobile}</TableCell>
                                    <TableCell>{item.department}</TableCell>
                                    <TableCell>
                                        <CustomActionButton
                                            color={"primary"}
                                            onClick={() => {
                                                openInPopup(item);
                                            }}
                                        >
                                            <EditOutlined fontSize={"small"}/>
                                        </CustomActionButton>
                                        <CustomActionButton
                                            color={"secondary"}
                                            onClick={() => {
                                                setConfirmDialog({
                                                    isOpen: true,
                                                    title: "Are your sure to delete this Record?",
                                                    subtitle: "You can not undo this Operation",
                                                    onConfirm: () => {
                                                        handleDelete(item.id);
                                                    }
                                                })
                                            }}
                                        >
                                            <Close fontSize={"small"}/>
                                        </CustomActionButton>
                                    </TableCell>
                                </TableRow>))
                        }
                    </TableBody>
                </TableContainer>
                <TablePagination/>
            </Paper>
            <Popup
                title={"Employee Form"}
                open={openPopup}
                setOpen={setOpenPopup}
            >
                <EmployeeForm
                    addOrEditEmployee={addOrEditEmployee()}
                    recordForEdit={recordForEdit}
                />
            </Popup>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </>
    );
}

export default Employees;