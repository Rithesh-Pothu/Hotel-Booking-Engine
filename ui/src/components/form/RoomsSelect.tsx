import { FormLabel } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { selectRooms } from '../../reducers/RoomsSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';


interface Props {
    label: string
}

export default function RoomsSelect({ label }: Props) {


    const rooms = useAppSelector((state: any) => state.rooms.value)
    const dispatch = useAppDispatch()

    const handleChange = (event: SelectChangeEvent) => {
        const currentValue = event.target.value
        dispatch(selectRooms(currentValue));
    };

    return (

        <FormControl fullWidth sx={{ mt: 2 }}>
            <FormLabel>Rooms</FormLabel>
            <Select
                value={rooms}
                // label={label}
                onChange={(event: SelectChangeEvent) => {
                    const currentValue = event.target.value
                    dispatch(selectRooms(currentValue));
                }}

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
        </FormControl >
    );
}

const options = [
    "1", "2", "3"
];
