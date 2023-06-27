import { Button, Typography, Box } from '@mui/material';
import { useState } from 'react';
import {
    CircularInput,
    CircularTrack,
    CircularProgress,
    CircularThumb,
  } from "react-circular-input"; 

function Bank() {    
//   const classes = useStyles();
  const [value, setValue] = useState(0);
  const [prevValue, setPrevValue] = useState(0);
  const [sumValue, setSumValue] = useState(0);
  const stepValue = (v: number) => Math.round(v * 10) / 10

  function updateValue(newVal: number) {
  
    // const prevValue = Math.round(prev * 10);
    // const actualValue = Math.round(newVal * 10);
    // // if actual = 0 and prev was 10
    // // add 10 to Sum
    // // if actual = 10 and prev was 0
    // // - 10 from Sum

    if (value != newVal) {
      var total = sumValue;
      if (newVal === 0 && prevValue === 1) {
        total += 1;
      } 
      if (newVal === 1 && prevValue === 0) {
        total -= 1;
      }
      total += newVal;
      setSumValue(stepValue(total))
      setPrevValue(value);
    }
    setValue(newVal);    
  }

  return (
    <Box>
       <Typography variant="h3"> Todays Goal: 100</Typography>
       <CircularInput
          value={stepValue(value)}
          onChange={v => updateValue(stepValue(v))}
        >
          <CircularTrack />
          <CircularProgress />
          <CircularThumb />

          <text x={200} y={100} textAnchor="middle" dy="0.3em" fontWeight="bold">
            Value: {value}
            _PrevValue: {prevValue} 
            _SumValue: {stepValue(sumValue*10)}  
            _Display: {stepValue(value*10)} 
          </text>
        </CircularInput>
        <Button variant="contained" color="primary">
          Bank!
        </Button>
        <Button variant="contained" color="secondary">
          Remove
        </Button>
    </Box>
  );
}

export default Bank;