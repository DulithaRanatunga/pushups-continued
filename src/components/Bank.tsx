import { Button, Typography, Box, Stack } from '@mui/material';
import { useState, useEffect } from 'react';
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
    updateBank as updateBankMutation,
    deleteBank as deleteBankMutation,
    createLeaderboard as createLeaderboardMutation,
    updateLeaderboard as updateLeaderboardMutation,
    deleteLeaderboard,
} from "../graphql/mutations";
import { listLeaderboards } from "../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";
import { fetchAllBanks } from '../ApiHelper';


const MIN_GOAL = 80
const MAX_GOAL = 80;

// From: https://stackoverflow.com/a/52171480
export function cyrb53(str: String, seed = 0) {
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

    return (4294967296 * (2097151 & h2) + (h1 >>> 0)) % MAX_GOAL + MIN_GOAL;
}

function Bank(props: { user }) {
    //   const classes = useStyles();
    const [value, setValue] = useState(0); // Raw Value used in Slider
    const [prevStep, setPrevStep] = useState(0); // Previous Step
    const [sumValue, setSumValue] = useState(0);   // Current Step
    const [date, setDate] = useState<Dayjs>(dayjs());   // Current Step
    const [banked, setBanked] = useState(0); // Raw Value used in Slider
    const [storedBanks, setStoredBanks] = useState<any>({});
    const stepValue = (v: number) => Math.round(v * 10) / 10

    useEffect(() => {
        fetchBanks();
    }, []);


    async function fetchBanks() {        
        const BanksFromAPI = await fetchAllBanks();
        const stored = {};
        var totalBanked = 0;
        BanksFromAPI.forEach(bank => {
            if (stored[bank.date] != undefined) {
                // If somehow we already have duplicate
                // delete the smaller one.
                console.log("Duplicate detected on " + bank.date)
                if (bank.count > stored[bank.count]) {
                    // Delete stored one.
                    // updateBank(stored[bank.date], (-1*stored[bank.date].count)-1);
                } else {
                    // Delete this entry
                    // updateBank(bank, (-1*bank.count)-1)
                    return;
                }
            }
            stored[bank.date] = bank;
            totalBanked += bank.count;
        });
        updateLeaderboard(totalBanked);
        setStoredBanks(stored);
        if (!!stored[getFormattedDate(date)]) {
            setBanked(stored[getFormattedDate(date)].count);
        } else {
            setBanked(0);
        }
    }

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


    function getGoal() {
        return cyrb53(getFormattedDate(date));
    }


    async function addBank(intToBank, dateToAdd) {
        const data = {
            date: dateToAdd,
            count: intToBank,
        };
        await API.graphql(graphqlOperation(createBankMutation,
            { input: data },
        ));
    }

    async function updateBank(objToUpdate, countToAdd) {
        objToUpdate.count += countToAdd;
        if (objToUpdate.count <= 0) {
            await API.graphql({
                query: deleteBankMutation,
                variables: { input: { id: objToUpdate.id } },
            })
            storedBanks[objToUpdate.date] = undefined;
            setStoredBanks(storedBanks);
        } else {    
            const data = {
                id: objToUpdate.id,
                count: objToUpdate.count,
            };
            await API.graphql({
                query: updateBankMutation,
                variables: { input: data },
            });
        }
    }

    async function bank() {
        var intToBank = getBankValue();
        var getSelectedDate = getFormattedDate(date);
        if (!!storedBanks[getSelectedDate]) {
            await updateBank(storedBanks[getSelectedDate], intToBank);
        } else {
            await addBank(intToBank, getSelectedDate);
        }
        reset();
    }

    function reset() {
        setValue(0);
        setPrevStep(0);
        setSumValue(0);
        fetchBanks();
    }

    function getFormattedDate(date) {
        return date.format('DD/MM/YYYY');
    }

    function updateDate(newDate) {
        setDate(newDate || dayjs());
        if (!!storedBanks[getFormattedDate(newDate)]) {
            setBanked(storedBanks[getFormattedDate(newDate)].count);
        } else {
            setBanked(0);
        }
    }

    async function updateLeaderboard(totalBanked) {        
        console.log("Total:" + totalBanked + " for user: " + props.user.username);
        const currentLeaderboardsForMe: any = await API.graphql(graphqlOperation(listLeaderboards, {
            filter: {
                user: {
                    eq: props.user.username
                }
            }
        }));
        var existingLeaderboards = currentLeaderboardsForMe.data.listLeaderboards.items;
        if (existingLeaderboards.length > 1) {
            // Just delete them all.
            existingLeaderboards.forEach(existing => {
                API.graphql(graphqlOperation(deleteLeaderboard,
                    { input: { id: existing.id }},
                ));
            })

            existingLeaderboards = [];
        }
        if (existingLeaderboards.length > 0) {
            console.log("updating existing: " + existingLeaderboards);
            // Update existing
            await API.graphql(graphqlOperation(updateLeaderboardMutation,
                { input: {
                    id: existingLeaderboards[0].id,
                    user: props.user.username,
                    count: totalBanked
                } },
            ));
        } else {
            console.log("creating new");
            // Create new one
            await API.graphql(graphqlOperation(createLeaderboardMutation,
                { input: {
                    user: props.user.username,
                    count: totalBanked,
                }},
            ));
        }
    }

    return (
        <Stack spacing={2} alignItems="center">
            <Box>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Choose Date"
                        format="DD/MM/YYYY"
                        value={date}
                        onChange={newDate => updateDate(newDate)}
                    /> </LocalizationProvider>
            </Box>
            <Typography variant="h3"> Banked: {banked}</Typography>
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
        </Stack>
    );
}

export default Bank;
