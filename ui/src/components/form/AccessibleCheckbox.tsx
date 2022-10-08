import AccessibleIcon from '@mui/icons-material/Accessible';
import { Grid } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { updateAccessibility } from '../../reducers/AccessibleReducer';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';


interface Props {
    label?: string
}

export default function AccessibleCheckbox({ label }: Props) {

    const checked = useAppSelector((state: any) => state.isAccessible.value)
    const dispatch = useAppDispatch()

    return (

        <Grid container direction="row" alignItems="center" >
            <Grid item>
                <Checkbox
                    size="small"
                    style={{ width: "20px", padding: 0 }}
                    checked={checked}
                    onChange={() => dispatch(updateAccessibility())}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
            </Grid>
            <Grid item>
                <AccessibleIcon fontSize="small" onClick={() => dispatch(updateAccessibility())} />
            </Grid>
            {label ? <Grid item onClick={() => dispatch(updateAccessibility())}>
                {label}
            </Grid> : ""}

        </Grid>
    )
}

