import React from 'react'
import { Grid, Modal, Typography, Button, Link } from '@mui/material'
import { Box } from '@mui/system'

const FeeInfo = ({selectedPlan}: any) => {
  return (
    <>
        <Typography variant="h6" >Taxes and Fees (Per Room)</Typography>
        <Box ml={1}>
            {
                selectedPlan.fees.map((item: any)=>
                    <Grid container justifyContent='space-between'>
                        <Typography>{item.name}</Typography>
                        <Typography color='black'>${item.amount}</Typography>
                    </Grid>
                )
            }
        </Box>
    </>
  )
}

export default FeeInfo