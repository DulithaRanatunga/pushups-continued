import { Typography, Box } from '@mui/material';
import { listBanks } from "../graphql/queries";
import { API } from "aws-amplify";
import { useEffect, useState } from 'react';

function Stats() {    

    const [banks, setBanks] = useState(['Fetching Banks']);

    useEffect(() => {
      fetchBanks();
    }, []);
  
    async function fetchBanks() {
      const apiData:any = await API.graphql({ query: listBanks });
      const BanksFromAPI = apiData.data.listBanks.items;
      setBanks(BanksFromAPI);
    }

    const itemsTest = banks.length > 0 ? banks.map(v => <li>{JSON.stringify(v)}</li>) : 'No banks recorded. Go bank today!';

  return (
    <Box>
       <Typography variant="h3"> Leaderboard </Typography>
       <ul>{itemsTest}</ul>
    </Box>
  );
}

export default Stats;