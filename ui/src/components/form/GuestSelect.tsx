import { FormLabel, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import SingleSelectOption from './SingleSelectOption';


export default function GuestSelect() {

    const [totalCount, setTotalCount] = useState(0)
    const [adultCount, setAdultCount] = useState(0)
    const [teensCount, setTeensCount] = useState(0)
    const [kidsCount, setKidsCount] = useState(0)
    const [value, setValue] = useState("")

    const adults = useAppSelector((state: any) => state.guests.adultsCount)
    const teens = useAppSelector((state: any) => state.guests.teensCount)
    const kids = useAppSelector((state: any) => state.guests.kidsCount)
    const dispatch = useAppDispatch()


    interface TypeOfPerson {
        label: string,
        age_range: string
    }


    const options: TypeOfPerson[] = [
        {
            label: "Adults",
            age_range: "Ages 18+"
        },
        {
            label: "Teens",
            age_range: "Ages 13-17"
        },
        {
            label: "Kids",
            age_range: "Ages 0 -12"
        }
    ]

    return (
        <FormControl fullWidth sx={{ mt: 2 }}>
            <FormLabel>Guests</FormLabel>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", marginLeft: "10px", marginTop: "40px" }}>
                {adults > 0 ? `${adults} Adults, ` : ""}
                {teens > 0 ? `${teens} Teens, ` : ""}
                {kids > 0 ? `${kids} Kids ` : ""}
            </div>
            <TextField
                value={value}
                onChange={(e) => setValue(e.target.value)}
                select
            >
                {
                    options.map((option: TypeOfPerson, index: number) => (
                        <SingleSelectOption key={index} label={option.label} age_range={option.age_range} total_count={totalCount} setTotalCount={setTotalCount} adultCount={adultCount} teensCount={teensCount} kidsCount={kidsCount} />
                    ))
                }

            </TextField>
        </FormControl >

    );
}
