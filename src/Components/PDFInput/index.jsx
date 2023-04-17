// components/PDFInput.js
import { Box, Button, Typography } from "@mui/material";

function PDFInput({ handleFileUpload, pdfFile }) {
  return (
    <Box
      component="label"
      htmlFor="pdf"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
        mt: 2,
      }}
    >
      <Typography>Upload PDF:</Typography>
      <input
        type="file"
        id="pdf"
        accept="application/pdf"
        style={{ display: "none" }}
        onChange={handleFileUpload}
      />
      <Button variant="contained" component="span">
        {pdfFile ? 'File Uploaded!' : 'Choose File'}
      </Button>
    </Box>
  );
}

export default PDFInput;
