import React from 'react'
import { Grid, Modal, Typography, Button, Link } from '@mui/material'
import { Box } from '@mui/system'

const DueInfo = ({selectedPlan}: any) => {
  return (
    <Box>
        <Grid container justifyContent='space-between'>
            <Typography>Due Now</Typography>
            <Typography color='black'>${selectedPlan.amountDueNow}</Typography>
        </Grid>
        <Grid container justifyContent='space-between'>
            <Typography>Due at Resort</Typography>
            <Typography color='black'>${selectedPlan.amountDueAtProperty}</Typography>
        </Grid>
    </Box>
  )
}

export default DueInfo