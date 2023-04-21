// components/InputMethodSelect.js
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

function InputMethodSelect({ inputType, handleInputTypeChange }) {
  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel id="input-method-label">Input Method</InputLabel>
      <Select
        labelId="input-method-label"
        value={inputType}
        onChange={handleInputTypeChange}
        label="Input Method"
      >
        <MenuItem value="pdf">Enter as PDF</MenuItem>
        <MenuItem value="text">Enter as text</MenuItem>
      </Select>
    </FormControl>
  );
}

export default InputMethodSelect;
