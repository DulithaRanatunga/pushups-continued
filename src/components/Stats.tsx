import { Typography, Box } from '@mui/material';
import { listBanks } from "../graphql/queries";
import { API } from "aws-amplify";
import { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { cyrb53 } from './Bank'; 

const columns: GridColDef[] = [
    {
        field: 'date',
        headerName: 'Date',
        editable: true,
    },
    {
        field: 'count',
        headerName: 'Banked',
        editable: false,
        width: 70,
    },
    {
        field: 'goal',
        headerName: 'Goal',
        type: 'number',
        width: 70,
        editable: true,
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
        const apiData: any = await API.graphql({ query: listBanks });
        const BanksFromAPI = apiData.data.listBanks.items;
        setBanks(BanksFromAPI.map((bank: any) => {
            return {
                goal: cyrb53(bank.date),
                ...bank
            }
        }));
    }

    return (
        <Box>
            <Typography variant="h3"> History </Typography>
            <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={banks}
                    columns={columns}
                    columnThreshold={1}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                        sorting: {
                            sortModel: [{ field: 'date', sort: 'desc'}]
                        }
                    }}
                    pageSizeOptions={[5]}
                    disableRowSelectionOnClick
                    disableColumnMenu
                />
            </Box>


        </Box>
    );
}

export default Stats;