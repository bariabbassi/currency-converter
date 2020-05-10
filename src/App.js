import React, {useState, useEffect} from 'react';
import CurrencyRow from './CurrencyRow'
import axios from 'axios';
import './App.css';

function App() {
  const [currencies, setCurrencies] = useState([])
  const [fromCurrency, setFromCurrency] = useState('EUR')
  const [toCurrency, setToCurrency] = useState('USD')
  const [fromAmount, setFromAmount] = useState(0)
  const [toAmount, setToAmount] = useState(0)
  const [isFromAmountSelected, setOnChangeAmount] = useState(true)

  useEffect(() => {
    axios({
      method: 'GET',
      url: 'https://api.exchangeratesapi.io/latest',
      params: {
        base: 'EUR'
      }
    }).then(res => {
      setCurrencies(['EUR', ...Object.keys(res.data.rates)])
    })
  }, [])

  useEffect(() => {
    if (isFromAmountSelected) {
      updateToAmount()
    }
  }, [fromAmount])

  useEffect(() => {
    if (!isFromAmountSelected) {
      updateFromAmount()
    }
  }, [toAmount])

  useEffect(() => {
    updateToAmount()
  }, [fromCurrency])

  useEffect(() => {
    updateFromAmount()
  }, [toCurrency])

  function updateFromAmount() {
    axios({
      method: 'GET',
      url: 'https://api.exchangeratesapi.io/latest',
      params: {
        base: toCurrency
      }
    }).then(res => {
      setFromAmount((toAmount * res.data.rates[fromCurrency]).toFixed(2))
    })
  }

  function updateToAmount() {
    axios({
      method: 'GET',
      url: 'https://api.exchangeratesapi.io/latest',
      params: {
        base: fromCurrency
      }
    }).then(res => {
      setToAmount((fromAmount * res.data.rates[toCurrency]).toFixed(2))
    })
  }

  return (
    <div className="App">

      <header className='title'>
        <h1>Currency Converter</h1>
        <p>Powered by <a href="http://exchangeratesapi.io/">Exchange rates API</a>
        </p>
      </header>

      <CurrencyRow
        currencies={currencies}
        rowCurrency={fromCurrency}
        onChangeCurrency={e => setFromCurrency(e.target.value)}
        amount={fromAmount}
        isFromAmountSelected={e => {
          setOnChangeAmount(true)
          setFromAmount(e.target.value)
        }}
      />

      <CurrencyRow
        currencies={currencies}
        rowCurrency={toCurrency}
        onChangeCurrency={e => setToCurrency(e.target.value)}
        amount={toAmount}
        isFromAmountSelected={e => {
          setOnChangeAmount(false)
          setToAmount(e.target.value)
        }}
      />

    </div>
  );
}

export default App;
