import { Typography, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridValueGetterParams, GridComparatorFn  } from '@mui/x-data-grid';
import { cyrb53 } from './Bank'; 
import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { fetchAllBanks } from '../ApiHelper';
dayjs.extend(customParseFormat)

const customDateComparator: GridComparatorFn<string> = (v1, v2) =>
    dayjs(v1, 'DD/MM/YYYY', true).toDate().getTime() - dayjs(v2, 'DD/MM/YYYY', true).toDate().getTime();

const columns: GridColDef[] = [
    {
        field: 'date',
        headerName: 'Date',
        editable: false,
        sortComparator: customDateComparator,
    },
    {
        field: 'count',
        headerName: 'Done',
        editable: false,
        width: 55,
    },
    {
        field: 'goal',
        headerName: 'Goal',
        type: 'number',
        width: 55,
        editable: false,
    },
    {
        field: 'percent',
        headerName: '%',
        sortable: false,
        width: 40,
        valueGetter: (params: GridValueGetterParams) =>
            `${Math.round(((params.row.count || 0) / params.row.goal) * 100)}`,
    },
    {
        field: 'message',
        headerName: '',
        sortable: false,
        width: 40,
        valueGetter: (params: GridValueGetterParams) =>
            `${params.row.count >= params.row.goal ? ':D' : ':('}`,
    },
];


function Stats() {

    const [banks, setBanks] = useState<any[]>([]);

    useEffect(() => {
        fetchBanks();
    }, []);    

    async function fetchBanks() {
        const BanksFromAPI  = await fetchAllBanks();        
        setBanks(organiseBanks(BanksFromAPI.map((bank: any) => {
            return {
                goal: cyrb53(bank.date),
                ...bank
            }
        })));
    }

    function organiseBanks(banks: any[]): any[] {
        // Get first day of banks
        // For days since that bank, add 0 or from Map
        const first = convertDatesAndGetFirst(banks);
        var banksToDisplay: any[] = [];
        var it = dayjs(first.dayJsDate);
        const today = dayjs();
        while (it.isBefore(today)) {
            banksToDisplay.push(banks.find(d => it.isSame(d.dayJsDate)) || emptyBank(it));
            it = it.add(1, 'day');
        }
        return banksToDisplay;
    }

    function emptyBank(date: Dayjs): any {
        var formatted = date.format('DD/MM/YYYY');
        return {
            count: 0,
            createdAt: null,
            date: formatted,
            dayJsDate: dayjs(date),
            goal: cyrb53(formatted),
            id: formatted,
            owner: null,
            updatedAt: null
        };
    }

    // Gets first bank, poplating dayJsDate while at it.
    function convertDatesAndGetFirst(banks: any[]): any {
        var first: any = undefined;
        banks.forEach(bank => {
            if (!first) { 
                first = bank;
            }
            bank.dayJsDate = dayJsDate(bank.date);
            if (bank.dayJsDate.isBefore(first?.dayJsDate)) {
                first = bank;                                
            }
        })
        return first;
    }
    
    function dayJsDate(stringDate): Dayjs {
        return dayjs(stringDate, "DD/MM/YYYY");
    }

    return (
        <Box>
            <Typography variant="h3"> History </Typography>
            <Box sx={{ height: '100%', width: '100%' }}>
                <DataGrid
                    rows={banks}
                    columns={columns}
                    columnThreshold={1}
                    initialState={{
                        // pagination: {
                        //     paginationModel: {
                        //         pageSize: 5,
                        //     },
                        // },
                        sorting: {
                            sortModel: [{ field: 'date', sort: 'desc'}]
                        }
                    }}
                    // pageSizeOptions={[5]}
                    disableRowSelectionOnClick
                    disableColumnMenu
                />
            </Box>


        </Box>
    );
}

export default Stats;