import React, { useState, useEffect } from "react";
import { View, StyleSheet, Button, SafeAreaView, ScrollView } from "react-native";
import Chart from "../Chart/Chart";
import data from "../Chart/data.json";
import axios from "axios";
import Orders from '../Orders'

// console.log(data[0]);
const getDomain = (rows) => {
  const values = rows.map(({ high, low }) => [high, low]).flat();
  return [Math.min(...values), Math.max(...values)];
};

const CryptoDetail = () => {
  const [candlesNew, setCandles] = useState([]);
  const [orders, setOrders] = useState({
    asks: [],
    bids: []
  });
  const [timeframe, setTimeframe] = useState(1);

  useEffect(() => {
    getChartData();
    const intervalId = setInterval(getChartData, 5000);

    return () => clearInterval(intervalId);

  }, [timeframe]);

  useEffect(() => {
    const intervalId = setInterval(getOrdersData, 5000);

    return () => clearInterval(intervalId);
  }, []);
  
  
  async function getOrdersData() {
    try {
      const response = await axios.get(
        `https://api.poloniex.com/markets/ETH_USDT/orderBook?scale=1&limit=10`
      );
      //   console.log(response.data);
      // console.log(JSON.stringify(response.data, null, 2));
        const newObj = {
          asks: response.data.asks,
          bids: response.data.bids
        }

        setOrders({...newObj})
        console.log('orders updated');
        

    } catch (error) {
      console.log(error);
      
    }
  }
  
  async function getChartData() {
    try {
      const response = await axios.get(
        `https://api.poloniex.com/markets/ETH_USDT/candles?interval=MINUTE_${timeframe}&limit=50`
      );
      //   console.log(response.data);

      const newArr = [];

      response.data.map((item) => {
        const newObj = {
          low: item[0],
          high: item[1],
          open: item[2],
          close: item[3],
        };
        newArr.push(newObj);
      });

      setCandles(newArr);
      console.log('chart updated');

    } catch (error) {
      console.log(error);
      
    }
  }

  const candles = candlesNew.slice(0, 50);
  const domain = getDomain(candles);
  // console.log(domain);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.btnsContainer}>
        <Button
          onPress={() => setTimeframe(1)}
          title="1m"
          color="#841584"
          accessibilityLabel="1m timeframe"
        />
        <Button
          onPress={() => setTimeframe(5)}
          title="5m"
          color="#841584"
          accessibilityLabel="5m timeframe"
        />
        <Button
          onPress={() => setTimeframe(10)}
          title="10m"
          color="#841584"
          accessibilityLabel="10m timeframe"
        />
      </View>
      {candles.length > 0 ? <Chart {...{ candles, domain }} /> : null}

      <ScrollView>
      {orders.asks.length > 0 && orders.bids.length > 0 ? <Orders asks={orders.asks} bids={orders.bids} /> : null}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  chart: {
    borderBottomWidth: 2,
    borderBottomColor: "#fff",
  },
  btnsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
});

export default CryptoDetail;
