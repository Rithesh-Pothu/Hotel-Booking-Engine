import { FormControl, FormLabel } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import "../../index.css";
import { selectProperty } from '../../reducers/PropertyNameSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

export default function PropertyField() {

    const property_name = useAppSelector((state) => state.propertyName.value)
    const dispatch = useAppDispatch()

    return (

        <FormControl fullWidth>
            <FormLabel>Property Name</FormLabel>
            <Autocomplete
                defaultValue={property_name}
                openOnFocus={false}
                disablePortal
                id="combo-box-demo"
                options={properties}
                value={property_name}
                onChange={async (event: any, newValue: string) => {
                    await dispatch(selectProperty(newValue));
                    console.log(property_name)
                }}

                disableClearable
                renderInput={(params) => <TextField  {...params} />}
            />
        </FormControl>

    );
}


const properties = [
    "Property 1",
    "Property 2",
    "Property 3",
];
