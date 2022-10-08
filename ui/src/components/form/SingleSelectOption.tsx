import { Button, Grid, Typography } from '@mui/material';
import { useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { decrementAdult, decrementKids, decrementTeens, incrementAdult, incrementKids, incrementTeens } from '../../reducers/GuestsReducer';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';



interface Props {
    label: string,
    age_range: string,
    key: number,
    total_count: number,
    setTotalCount: React.Dispatch<React.SetStateAction<number>>
    adultCount: number,
    teensCount: number,
    kidsCount: number
}



const SingleSelectOption = (props: Props) => {

    const [count, setCount] = useState<number>(0)
    const adults = useAppSelector((state: any) => state.guests.adultsCount)
    const teens = useAppSelector((state: any) => state.guests.teensCount)
    const kids = useAppSelector((state: any) => state.guests.kidsCount)
    const dispatch = useAppDispatch()


    const currentOption = props.label;

    switch (currentOption) {
        case "Adults":

            break;
        case "Teens":
            break;

        case "Kids":
            break;

        default:
            break;
    }


    // useEffect(() => {
    //     props.setTotalCount(props.adultCount + props.kidsCount + props.teensCount)
    // }, [props.adultCount, props.kidsCount, props.teensCount])


    const handleIncrement = () => {
        switch (currentOption) {
            case "Adults":
                dispatch(incrementAdult())
                break;
            case "Teens":
                dispatch(incrementTeens())
                break;

            case "Kids":
                dispatch(incrementKids())
                break;

            default:
                break;
        }
    }

    const handleDecrement = () => {
        switch (currentOption) {
            case "Adults":
                dispatch(decrementAdult())
                break;
            case "Teens":
                dispatch(decrementTeens())
                break;

            case "Kids":
                dispatch(decrementKids())
                break;

            default:
                break;
        }
    }

    return (
        <Grid container direction="row" alignItems="center" justifyContent="space-evenly">
            <Grid item md={4} sx={{ my: 1 }}>
                <Grid container direction="column">
                    <Grid item>
                        {props.label}
                    </Grid>
                    <Grid item >
                        {props.age_range}
                    </Grid>
                </Grid>
            </Grid>

            <Grid item >
                <Button variant="outlined" onClick={handleDecrement}>
                    <RemoveIcon />
                </Button>
            </Grid>
            <Grid item>
                <Typography>{
                    currentOption == "Adults" ? adults : "" || currentOption == "Teens" ? teens : "" || currentOption == "Kids" ? kids : ""
                }</Typography>
            </Grid>
            <Grid item >
                <Button variant="outlined" onClick={handleIncrement}>
                    <AddIcon />
                </Button>
            </Grid>
        </Grid>

    )
}

export default SingleSelectOption