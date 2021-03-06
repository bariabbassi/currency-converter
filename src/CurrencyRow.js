import React from 'react'
import './CurrencyRow.css'

export default function CurrencyRow(props) {
    const {
        currencies,
        rowCurrency,
        onChangeCurrency,
        amount,
        isFromAmountSelected
    } = props

    return (
        <div className='CurrencyRow'>
            <input className='amount' type='number' value={amount} onChange={isFromAmountSelected} min='0' />
            <select className='dropdown' value={rowCurrency} onChange={onChangeCurrency} >
                {currencies.map(currency => <option key={currency}>{currency}</option>)}
            </select>
        </div>
    )
}