import FormControl from '@mui/material/FormControl';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import { alpha, styled } from '@mui/material/styles';
import { addPromoCode } from '../../reducers/PromoCodeReducer';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';



export const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
        marginTop: theme.spacing(3),
        fontSize: 30
    },
    '& .MuiInputBase-input': {
        borderRadius: 4,
        position: 'relative',
        // backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
        border: '1px solid #ced4da',
        fontSize: 18,
        width: '100%',
        padding: '10px 12px',
        transition: theme.transitions.create([
            'border-color',
            'background-color',
            'box-shadow',
        ]),
        '&:focus': {
            boxShadow: `${alpha(theme.palette.primary.main, 0.2)} 0 0 0 0.1rem`,
            borderColor: theme.palette.primary.main,
        },
    },
}));

interface Props {
    label: string
}


export default function BootstrapInputField({ label }: Props) {
    const promo_code_value = useAppSelector((state: any) => state.promoCode.value)
    const dispatch = useAppDispatch()
    return (
        <FormControl variant="standard" sx={{ mt: 2 }} fullWidth>
            <InputLabel shrink htmlFor="bootstrap-input">
                {label}
            </InputLabel>
            <BootstrapInput id="bootstrap-input" value={promo_code_value} onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => dispatch(addPromoCode(e.target.value))} />
        </FormControl>
    );
}
