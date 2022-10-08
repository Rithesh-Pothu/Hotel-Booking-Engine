import { Box, Typography } from '@mui/material';

interface Props {
    footerContent: string
}

const Footer = ({ footerContent }: Props) => {
    return (
        <Box className='footer' sx={{ py: 2, backgroundColor: "#333333", position: "fixed", bottom: 0, width: "100%" }}>
            <Typography align="center" color="common.white">{footerContent}</Typography>
        </Box>
    );
}

export default Footer