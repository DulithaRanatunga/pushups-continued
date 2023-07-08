import { Typography, Box } from '@mui/material';
import { listLeaderboards } from "../graphql/queries";
import { API } from "aws-amplify";
import { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
    {
        field: 'user',
        headerName: 'User',
        editable: true,
    },
    {
        field: 'count',
        headerName: 'Total',
        editable: false,
    }
];

function Leaderboard() {

    const [Leaderboard, setLeaderboard] = useState<any[]>([]);

    useEffect(() => {
        fetchLeaderboard();
    }, []);

    async function fetchLeaderboard() {
        const apiData: any = await API.graphql({ query: listLeaderboards });
        const LeaderboardFromAPI = apiData.data.listLeaderboards.items;
        setLeaderboard(LeaderboardFromAPI);
    }

    return (
        <Box>
            <Typography variant="h3"> Everyones Totals </Typography>
            <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={Leaderboard}
                    columns={columns}
                    columnThreshold={1}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                        sorting: {
                            sortModel: [{ field: 'count', sort: 'desc'}]
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

export default Leaderboard;