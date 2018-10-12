import React, { Component } from 'react';
import { View, Text } from 'react-native';
// import { Avatar } from 'react-native-elements';
import ChatEngineGravatar from 'chat-engine-gravatar';
import HTMLView from 'react-native-htmlview';

class RNCEMessage extends Component {

  render() {
	if (this.props.message.sender.name === "Me") {
		return (
			<View style={ styles.myMessageContainer }>
				<View style={ styles.myMessages }>
					<HTMLView value={ `<p> ${ this.props.message.data.text } </p>` } stylesheet={ styles } />
				</View>
			</View>
		);
	}

	return (
			<View style={ styles.messageContainer }>
				// <View style={ styles.avatar }>
					// <Avatar small rounded source={{ uri: "http://busybridgeng.com/wp-content/uploads/2017/05/generic-avatar.png" }} activeOpacity={ 0.7 } />
				// </View>
					<View style={{ flexDirection: "column" }}>
						<Text style={ styles.messageUID }>{ this.props.message.sender.uuid } </Text>
						<View style={ styles.recievedMessages }>
							<HTMLView value={ this.props.message.data.text } stylesheet={ styles } />
						</View>
				</View>
			</View>
		);
	}
};

const styles = {
	recievedMessages: {
		borderRadius: 15,
		backgroundColor: "#f0f0f0",
		marginRight: 60,
		minHeight: 30,
		justifyContent: "center",
		padding: 5,
		alignItems:'flex-start',
	},
	myMessages: {
		borderRadius: 15,
		backgroundColor: "#D02129",
		marginLeft: 60,
		minHeight: 30,
		justifyContent: "center",
		padding: 5,
		alignItems:'flex-end',
	},
	myMessageContainer: {
		flex: 1,
		flexDirection: "row",
		alignSelf: 'flex-end',
		margin: 3,
	},
	messageContainer: {
		flex: 1,
		flexDirection: "row",
		alignSelf: 'flex-start',
		margin: 3,
	},
	avatar: {
		flexDirection: "column",
		justifyContent: "flex-end",
		marginRight: 3
	},
	messageUID: {
		color: "#C5C0B1"
	},
	// This is for styling HTMLview
	p: {
		color:'#FFFFFF'
	}
};

export default RNCEMessage;