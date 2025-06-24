'use client'

import { Visibility, VisibilityOff } from "@mui/icons-material"
import { createTheme, FormControl, FormControlLabel, FormHelperText, FormLabel, IconButton, InputAdornment, InputLabel, OutlinedInput, Radio, RadioGroup, TextField, ThemeProvider } from "@mui/material"
import { useState } from "react"
import { NumericFormat } from "react-number-format"

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

export const InputGender = ({style = {}, change = {}, value, ...props}) => {
    return (
        <FormControl 
            style={style}
        >
            <FormLabel>Jenis Kelamin</FormLabel>
            <RadioGroup
                row
                name="gender"
                value={value}
                onChange={change}
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