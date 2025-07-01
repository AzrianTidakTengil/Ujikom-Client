'use client'

import { CalendarMonth, Visibility, VisibilityOff } from "@mui/icons-material"
import { createTheme, FormControl, FormControlLabel, FormHelperText, FormLabel, IconButton, InputAdornment, InputLabel, OutlinedInput, Popover, Radio, RadioGroup, TextField, ThemeProvider, Box } from "@mui/material"
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { useRef, useState } from "react"
import { Calendar } from "react-date-range"
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { NumericFormat } from "react-number-format"
import dayjs from "dayjs"

export const InputEmail = ({fullWidth, placeholder = "", value, label, style = {}, error, ...props}) => {
    return (
        <TextField
            style={style}
            label={label}
            type="email"
            variant="outlined"
            // defaultValue={value}
            value={value}
            defaultValue={value}
            error={error ? true : false}
            helperText={error ? error : undefined}
            autoFocus
            fullWidth={fullWidth ? true : false}
            {...props}
        />
    )
}

export const InputPassword = ({type, placeholder = "", defaultValue, label, ...props}) => {
    const [showPassword, isShow] = useState(false)
    return (
        <FormControl
            variant="outlined"
            {...props}
        >
            <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
            <OutlinedInput
                name="password"
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                aria-label={
                    showPassword ? 'hide the password' : 'display the password'
                }
                endAdornment={
                    <InputAdornment position="end" sx={{margin: 0, paddingRight: 1}}>
                        <IconButton
                            onClick={() => isShow((show) => !show)}
                            edge='end'
                        >
                            {showPassword ? <VisibilityOff sx={{margin: 0}}/> : <Visibility sx={{margin: 0}}/>}
                        </IconButton>
                    </InputAdornment>
                }
                label={label}
                defaultValue={defaultValue}
            />
            <FormHelperText>
                {...props.helperText}
            </FormHelperText>
        </FormControl>
    )
}

export const InputText = ({placeholder = "", value, label, style = {}, ...props}) => {
    return(
        <TextField
            style={style}
            label={label}
            type="text"
            variant="outlined"
            {...props}
        />
    )
}

export const InputOTP = ({style = {}, value, ...props}) => {
    const theme = createTheme({
        components: {
            MuiInputBase: {
                styleOverrides: {
                    input:{
                        textAlign: 'center',
                        fontSize: '2rem',
                        letterSpacing: '1.125rem'
                    }
                }
            }
        }
    })

    return(
        <ThemeProvider theme={theme}>
            <TextField
            type="text"
            variant="standard"
            autoFocus
            value={value}
            style={style}
            {...props}
            inputProps={{
                maxLength: 6
            }}
        />
        </ThemeProvider>
    )
}

export const InputGender = ({style = {}, value, label, showLabel, ...props}) => {
    return (
        <FormControl 
            style={style}
        >
            <FormLabel>{showLabel ? label || "Jenis Kelamin" : ""}</FormLabel>
            <RadioGroup
                row
                name="gender"
                value={value}
                {...props}
            >
                <FormControlLabel value="1" control={<Radio/>} label="Perempuan"/>
                <FormControlLabel value="2" control={<Radio/>} label="Laki Laki"/>
                <FormControlLabel value="3" control={<Radio/>} label="Saya tidak ingin memberi tau"/>
            </RadioGroup>
        </FormControl>
    )
}

export const InputPrice = ({style = {}, value, ...props}) => {
    return (
        <NumericFormat
            thousandSeparator="."
            decimalSeparator=","
            prefix="Rp "
            customInput={TextField}
            variant="outlined"
            fullWidth
            {...props}
        />
    )
}

export const InputDate = ({style = {}, value, label, onChange, ...props}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const dateValue = value ? dayjs(value, 'DD-MM-YYYY') : null;

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDateChange = (newValue) => {
        onChange?.(dayjs(newValue).format('DD-MM-YYYY'));
        handleClose();
    };


    return (
        <>
            <TextField
                variant="outlined"
                style={style}
                value={value}
                label={label}
                InputProps={{
                    startAdornment: (
                    <InputAdornment position="start">
                        <CalendarMonth />
                    </InputAdornment>
                    ),
                    readOnly: true,
                }}
                {...props}
                onClick={handleOpen}
            />
            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar value={dateValue} onChange={handleDateChange} />
                </LocalizationProvider>
            </Popover>
        </>
    )
}

