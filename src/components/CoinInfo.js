import { CircularProgress, createTheme, makeStyles, ThemeProvider } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { useCrypto } from '../CryptoContext'
import { HistoricalChart } from './Banner/config/api'
import { Chart as ChartJS } from 'chart.js/auto'
import { chartDays } from './Banner/config/data'
import Select from './Select'

const CoinInfo = ({ coin }) => {
    const [historicalData, sethistoricalData] = useState()
    const [days, setdays] = useState(1)
    const { currency, symbol } = useCrypto()

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios(HistoricalChart(coin.id, days, currency))
            sethistoricalData(data)
        }
        fetchData()
    }, [days, currency, coin])

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff",
            },
            type: "dark",
        },
    });
    const useStyles = makeStyles(() => ({

    }))
    const classes = useStyles()
    console.log(historicalData)
    return (
        <ThemeProvider theme={darkTheme}>
            <div className={classes.container}>
                {
                    !historicalData ? (
                        <CircularProgress
                            size={250}
                            thickness={1} />
                    ) : (
                        <>
                            <Line
                                style={{ width: '800px' }}
                                data={{
                                    labels: historicalData.prices.map(coin => {
                                        let date = new Date(coin[0])
                                        let time = date.getHours() > 12 ? `${date.getHours() - 12}:${date.getMinutes()}PM` : `${date.getHours()}:${date.getMinutes()}AM`
                                        return days === 1 ? time : date.toLocaleDateString()
                                    }),
                                    datasets: [{
                                        label: `Price (Past ${days} Days) in ${currency}`,
                                        data: historicalData.prices.map(coin => coin[1]),
                                        borderColor: '#EEBC1D'
                                    }]
                                }}
                                options={{
                                    elements: {
                                        point: {
                                            radius: 1,
                                        }
                                    }
                                }}
                            />
                            <div style={{
                                display: 'flex',
                                marginTop: 20,
                                justifyContent: 'space-around',
                                width: '100%'
                            }}>
                                {chartDays.map(day => {
                                    return <Select
                                    selected={day.value===days}
                                    onClick={()=>setdays(day.value)}>
                                        {day.label}
                                    </Select>
                                })}
                            </div>
                        </>
                    )
                }
            </div>
        </ThemeProvider>
    )
}

export default CoinInfo