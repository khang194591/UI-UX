import { Box, styled } from "@mui/material";
import { blueGrey } from "@mui/material/colors";

const DashedBox = styled(Box)({
  borderWidth: 2,
  borderStyle: "dashed",
  borderColor: blueGrey[500],
});

export default DashedBox;
