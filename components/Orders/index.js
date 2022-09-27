import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const index = ({ asks, bids }) => {

    console.log('Asks: ', asks);
    console.log('Bids: ', bids);
    
    const showAsks = () => {
        for(let i = 0; i < asks.length; i++) {
            return <View key={i}>
                <Text style={styles.textColor}>{asks[i]}</Text>
                <Text style={styles.textColor}>{asks[i+1]}</Text>
            </View>
        }
    }

    return (
        <View style={styles.container}>
            {/* {showAsks()} */}
            <View style={{ flex: 1, marginRight: 20 }}>
                <Text style={styles.textColor}>Bid</Text>
                {bids.map((item, index, array) => {
                    return <View key={index} style={styles.rowContainer}>
                    <Text style={styles.textColor}>{array[index]}</Text>
                    <Text style={styles.textColor}>{array[index+1]}</Text>
                </View>
                })}
            </View>

            <View style={{ flex: 1 }}> 
                <Text style={styles.textColor}>Ask</Text>
                {asks.map((item, index, array) => {
                    return <View key={index} style={styles.rowContainer}>
                    <Text style={styles.textColor}>{array[index]}</Text>
                    <Text style={styles.textColor}>{array[index+1]}</Text>
                </View>
                })}
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    textColor: {
        color: 'white',
        // marginRight: 10
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // flex: 1
    },
    container: {
        marginTop: 30,
        borderTop: 10,
        borderTopColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})

export default index

