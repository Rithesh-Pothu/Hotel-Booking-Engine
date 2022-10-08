import { FormLabel } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { selectBeds } from '../../reducers/BedsSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';




interface Props {
    label: string
}

export default function BedsSelect({ label = "Beds" }: Props) {
    const beds = useAppSelector((state: any) => state.beds.value)
    const dispatch = useAppDispatch()


    const handleChange = (event: SelectChangeEvent) => {
        dispatch(selectBeds(event.target.value))
    };

    return (

        <FormControl fullWidth sx={{ mt: 2 }}>
            <FormLabel>{label}</FormLabel>
            <Select
                value={beds}
                onChange={handleChange}
            >
                {options.map((option) => (
                    <MenuItem
                        key={option}
                        value={option}
                    >
                        {option}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

const options = [
    "1", "2", "3", "4"
];
