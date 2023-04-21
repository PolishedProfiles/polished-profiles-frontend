// components/TextInput.js
import { TextField } from "@mui/material";

function TextInput({ handleChange }) {
  return (
    <TextField
      label="Resume Info"
      variant="outlined"
      multiline
      rows={16}
      fullWidth
      onChange={handleChange}
    />
  );
}

export default TextInput;
