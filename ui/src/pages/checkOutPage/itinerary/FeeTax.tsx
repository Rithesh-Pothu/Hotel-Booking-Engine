import React from 'react'
import TaxInfo from "./TaxInfo";
import FeeInfo from "./FeeInfo";

const FeeTax = ({selectedPlan}:any) => {
  return (
    <>
        <FeeInfo selectedPlan={selectedPlan}/>
        <TaxInfo selectedPlan={selectedPlan}/>
    </>
  )
}

export default FeeTax