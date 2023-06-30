import { Button, Typography, Box, Stack } from '@mui/material';
import { useState } from 'react';
import {
    CircularInput,
    CircularTrack,
    CircularProgress,
    CircularThumb,
} from "react-circular-input";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
    createBank as createBankMutation,
    deleteBank as deleteBankMutation,
} from "../graphql/mutations";
import { API } from "aws-amplify";

function Bank() {
    //   const classes = useStyles();
    const [value, setValue] = useState(0); // Raw Value used in Slider
    const [prevStep, setPrevStep] = useState(0); // Previous Step
    const [sumValue, setSumValue] = useState(0);   // Current Step
    const [date, setDate] = useState<Dayjs>(dayjs());   // Current Step
    const stepValue = (v: number) => Math.round(v * 10) / 10

    function updateValue(newVal: number) {

        // const prevStep = Math.round(prev * 10);
        // const actualValue = Math.round(newVal * 10);
        // // if actual = 0 and prev was 10
        // // add 10 to Sum
        // // if actual = 10 and prev was 0
        // // - 10 from Sum
        var newValueAsStep = stepValue(newVal);
        if (prevStep != newValueAsStep) {
            var total = sumValue;
            if (newValueAsStep === 0 && prevStep === 1) {
                total += 1;
            }
            if (newValueAsStep === 1 && prevStep === 0) {
                total -= 1;
            }
            setSumValue(stepValue(total))
            setPrevStep(newValueAsStep);
        }
        setValue(newVal);
    }

    function getBankValue() {
        return stepValue((sumValue + prevStep) * 10);
    }


    async function addBank() {
        const data = {
            date: getDate(),
            count: getBankValue(),
        };
        await API.graphql({
            query: createBankMutation,
            variables: { input: data },
        });
    }

    function bank() {
        var intToBank = getBankValue();
        var getSelectedDate = getDate();
        addBank();
    }

    function getDate() {
        return date.format('DD/MM/YYYY');
    }

    function getGoal() {
        // Goal is a function of Date
        return cyrb53(getDate()) % 80 + 80;
    }

    // From: https://stackoverflow.com/a/52171480
    function cyrb53(str: String, seed = 0) {
        let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
        for (let i = 0, ch; i < str.length; i++) {
            ch = str.charCodeAt(i);
            h1 = Math.imul(h1 ^ ch, 2654435761);
            h2 = Math.imul(h2 ^ ch, 1597334677);
        }
        h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
        h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
        h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
        h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);

        return 4294967296 * (2097151 & h2) + (h1 >>> 0);
    }

    return (
        <Stack spacing={2} alignItems="center">
            <Box>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Choose Date"
                        format="DD/MM/YYYY"
                        value={date}
                        onChange={newDate => setDate(newDate || dayjs())}
                    /> </LocalizationProvider>
            </Box>
            <Typography variant="h3"> Todays Goal: {getGoal()}</Typography>
            <CircularInput
                value={stepValue(value)}
                onChange={v => updateValue(stepValue(v))}
            >
                <CircularTrack />
                <CircularProgress />
                <CircularThumb />

                <text x={100} y={100} textAnchor="middle" dy="0.3em" fontWeight="bold" fontSize="64px">
                    {getBankValue()}
                </text>
            </CircularInput>
            <Button variant="contained" color="primary" onClick={() => { bank() }}>
                Bank!
            </Button>
            <Button variant="contained" color="secondary">
                Remove
            </Button>
        </Stack>
    );
}

export default Bank;