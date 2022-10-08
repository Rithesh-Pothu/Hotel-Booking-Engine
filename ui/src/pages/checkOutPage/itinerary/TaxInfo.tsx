import React from 'react'
import { Grid, Modal, Typography, Button, Link } from '@mui/material'
import { Box } from '@mui/system'

const TaxInfo = ({selectedPlan}: any) => {
  return (
    <Box ml={1}>
        {
            selectedPlan.taxes.map((item: any)=>
                <Grid container justifyContent='space-between'>
                    <Typography>{item.name}</Typography>
                    <Typography color='black'>${Math.round(item.percent * selectedPlan.price)/100}</Typography>
                </Grid>
            )
        }
    </Box>
  )
}

export default TaxInfo