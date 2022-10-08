import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LanguageIcon from "@mui/icons-material/Language";
import { Menu, MenuItem, Select, useTheme } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { ChangeEvent, useState } from "react";
import Logo from "../assets/images/kickdrum-logo.png";
import {
    usePopupState,
    bindTrigger,
    bindMenu,
} from "material-ui-popup-state/hooks";

import { SelectChangeEvent } from "@mui/material/Select";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectCurrency } from "../reducers/CurrencyReducer";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
interface Props {
    headerInfo: string;
}

const Navbar = ({ headerInfo }: Props) => {
    const popupState = usePopupState({ variant: "popover", popupId: "demoMenu" });
    // const [currency, setCurrency] = useState<string>("USD")
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const currency: string = useAppSelector((state) => state.currency.value);
    const dispatch = useAppDispatch();
    const theme = useTheme();

    const navigate = useNavigate();

    const handleClick = () => {
        return navigate("/bookings")
    }

    const goToHomepage = () => {
        return navigate("/")
    }

    return (
        <Box
            sx={{ flexGrow: 1, display: "inline", backgroundColor: "common.white" }}
        >
            <AppBar color="default" position="fixed" elevation={0}>
                <Toolbar>
                    <img src={Logo} height="50" alt="logo" width="136" />
                    <Typography
                        fontWeight="bold"
                        variant="h5"
                        component="div"
                        sx={{ ml: 2, flexGrow: 1, lineHeight: 2 }}
                        color={theme.palette.primary.main}
                    >
                        {headerInfo}
                    </Typography>

                    <Button color="primary" sx={{ mr: 2 }} onClick={goToHomepage}>
                        <HomeOutlinedIcon sx={{ mr: 1 }} />
                        Home
                    </Button>


                    <Button color="primary" sx={{ mr: 2 }} onClick={handleClick}>
                        <Person2OutlinedIcon sx={{ mr: 1 }} />
                        My Bookings
                    </Button>

                    <Button color="primary" sx={{ mr: 2 }}>
                        <LanguageIcon sx={{ m: 1 }} />
                        En
                    </Button>

                    <Select
                        value={currency}
                        onChange={(event: SelectChangeEvent) => {
                            const currentValue: string = event.target.value;
                            dispatch(selectCurrency(currentValue));
                        }}
                        sx={{
                            color: theme.palette.primary.main,
                            border: "none",
                            boxShadow: "none",
                            ".MuiOutlinedInput-notchedOutline": { border: 0 },
                        }}
                        IconComponent={() => null}
                    >
                        <MenuItem value="USD">$ USD</MenuItem>
                        <MenuItem value="INR">₹ INR</MenuItem>
                    </Select>
                </Toolbar>
            </AppBar>
        </Box>
    );
};
export default Navbar;
