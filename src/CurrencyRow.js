import React from 'react'

export default function CurrencyRow(props) {
    const {
        currencies,
        rowCurrency,
        onChangeCurrency,
        amount,
        onChangeAmount
    } = props

    return (
        <div className='CurrencyRow'>
            <input className='amount' type='number' value={amount} onChange={onChangeAmount} min='0' />
            <select className='dropdown' value={rowCurrency} onChange={onChangeCurrency} >
                {currencies.map(currency => <option key={currency}>{currency}</option>)}
            </select>
        </div>
    )
}