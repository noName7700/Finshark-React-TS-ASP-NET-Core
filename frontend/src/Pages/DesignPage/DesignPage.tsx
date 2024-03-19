import React from 'react'
import Table from '../../Components/Table/Table'
import RatioList from '../../Components/RatioList/RatioList'
import { testIncomeStatementData } from '../../Components/Table/testData'

type Props = {}

const tableConfig = [
    {
        label: "symbol",
        render: (company: any) => company.symbol,
    },
];

const DesignPage = (props: Props) => {
    return (
        <>
            <h1>FinShark Design Page</h1>
            <RatioList data={testIncomeStatementData} config={tableConfig} />
            <Table data={testIncomeStatementData} config={tableConfig} />
        </>
    )
}

export default DesignPage