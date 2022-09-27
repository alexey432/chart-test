import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const index = ({ asks, bids }) => {

    // console.log('Asks: ', asks);
    // console.log('Bids: ', bids);
    
    const showAsks = () => {
        for(let i = 0; i < asks.length; i += 2) {
            return <View key={i} style={styles.rowContainer}>
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
                    if(index % 2 === 0){
                        return <View key={index} style={{...styles.rowContainer, ...styles.bidRow}}>
                                <Text style={styles.textColor}>{array[index]}</Text>
                                <Text style={styles.textColor}>{array[index+1]}</Text>
                            </View>
                    }
                })}
            </View>

            <View style={{ flex: 1 }}> 
                <Text style={styles.textColor}>Ask</Text>
                {asks.map((item, index, array) => {
                    if(index % 2 === 0){
                        return <View key={index} style={{...styles.rowContainer, ...styles.askRow}}>
                                <Text style={styles.textColor}>{array[index]}</Text>
                                <Text style={styles.textColor}>{array[index+1]}</Text>
                            </View>
                    }
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
    bidRow: {
        backgroundColor: 'rgba(0,255,0,0.2)',
        marginBottom: 2
    },
    askRow: {
        backgroundColor: 'rgba(255,0,0,0.2)',
        marginBottom: 2
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

