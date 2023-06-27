import { Button, Typography, Box, Stack } from '@mui/material';
import { useState } from 'react';
import {
    CircularInput,
    CircularTrack,
    CircularProgress,
    CircularThumb,
  } from "react-circular-input"; 

function Bank() {    
//   const classes = useStyles();
  const [value, setValue] = useState(0); // Raw Value used in Slider
  const [prevStep, setPrevStep] = useState(0); // Previous Step
  const [sumValue, setSumValue] = useState(0);   // Current Step
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

  return (
       <Stack spacing={2} alignItems="center">
        <Typography variant="h3"> Todays Goal: 100</Typography>
        <CircularInput
            value={stepValue(value)}
            onChange={v => updateValue(stepValue(v))}
            >
            <CircularTrack />
            <CircularProgress />
            <CircularThumb />

            <text x={100} y={100} textAnchor="middle" dy="0.3em" fontWeight="bold" fontSize="64px">
                {stepValue((sumValue + prevStep)*10)} 
            </text>
            </CircularInput>
            <Button variant="contained" color="primary">
            Bank!
            </Button>
            <Button variant="contained" color="secondary">
            Remove
            </Button>
        </Stack>
  );
}

export default Bank;