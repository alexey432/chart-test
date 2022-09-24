import React, { useState, useEffect } from "react";
import { View, StyleSheet, Button } from "react-native";
import Chart from "../Chart/Chart";
import data from "../Chart/data.json";
import axios from "axios";

console.log(data[0]);
const getDomain = (rows) => {
  const values = rows.map(({ high, low }) => [high, low]).flat();
  return [Math.min(...values), Math.max(...values)];
};

const CryptoDetail = () => {
  const [candlesNew, setCandles] = useState([]);
  const [interval, setInterval] = useState(1);

  useEffect(() => {
    async function getData() {
      const response = await axios.get(
        `https://api.poloniex.com/markets/ETH_USDT/candles?interval=MINUTE_${interval}`
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
    }

    getData();
  }, [interval]);

  console.log(candlesNew);

  const candles = candlesNew.slice(0, 10);
  const domain = getDomain(candles);
  console.log(domain);

  return (
    <View style={styles.container}>
      <Button
        onPress={() => setInterval(1)}
        title="1m"
        color="#841584"
        accessibilityLabel="1m timeframe"
      />
      <Button
        onPress={() => setInterval(5)}
        title="5m"
        color="#841584"
        accessibilityLabel="5m timeframe"
      />
      <Button
        onPress={() => setInterval(10)}
        title="10m"
        color="#841584"
        accessibilityLabel="10m timeframe"
      />
      {candles.length > 0 ? <Chart {...{ candles, domain }} /> : null}
    </View>
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
});

export default CryptoDetail;
