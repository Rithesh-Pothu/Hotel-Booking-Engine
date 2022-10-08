import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { RoomDetails } from '../../components/ui/PackageCard';
import PackageCard from '../../components/ui/PackageCard';
import { PromotionType } from './RoomDetails';
import { FeeTax } from '../../reducers/RoomDetailsReducer';


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}


function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


interface AddonProps {
    mealDeals: PromotionType[],
    promotions: PromotionType[],
    roomDetails: RoomDetails,
    rates: FeeTax
}

export default function AddonTabs(props: AddonProps) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Promo: Summer" {...a11yProps(0)} />
                    <Tab label="Meal Deals " {...a11yProps(1)} />
                    <Tab label="Room upgrades" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                {props.promotions.map((promotion, ind) => (
                    <PackageCard promotionId={promotion.promotionId} rates={props.rates} roomDetails={props.roomDetails} key={ind} title={promotion.title!} desc={promotion.description!} effectivePrice={promotion.effectivePrice} />
                ))}
            </TabPanel>
            <TabPanel value={value} index={1}>
                {props.mealDeals?.map((mealDeal, ind) => (
                    <PackageCard rates={props.rates} roomDetails={props.roomDetails} title={mealDeal.title!} desc={mealDeal.description!} effectivePrice={mealDeal.effectivePrice} />
                ))}
            </TabPanel>
            <TabPanel value={value} index={2}>
            </TabPanel>
        </Box>
    );
}