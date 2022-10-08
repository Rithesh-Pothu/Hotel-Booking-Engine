import Button from '@mui/material/Button';

interface Props {
    buttonText: string,
    handleSubmit?: any,
    OnClick?: (e: any) => void | unknown
}

const CustomButton = ({ buttonText, handleSubmit }: Props) => {
    return (
        <Button sx={{ mt: 2, py: 2, px: 6 }} disableElevation variant="contained" onClick={handleSubmit}>{buttonText}</Button>
    )
}

export default CustomButton