import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import RNCETypingIndicator from './RNCETypingIndicator';

class RNCEMessageEntry extends Component {
	constructor(props) {
		super(props);

		this.state = {
			chatInput: '',
		};

		this.setChatInput = this.setChatInput.bind(this);
	}

	sendChat() {
		if (this.state.chatInput) {
			this.props.chat.emit('message', {
				text: this.state.chatInput
			});
			this.setState({ chatInput: '' });
		}
	}

	setChatInput(value) {
		this.setState({ chatInput: value });

		if (this.props.typingIndicator) {
			if (value !== '') {
				this.props.chat.typingIndicator.startTyping();
			} else {
				this.props.chat.typingIndicator.stopTyping();
			}
		}
	}

	onTypingIndicator() {
		if (this.props.typingIndicator) {
			return <RNCETypingIndicator chat={ this.props.chat } />;
		}
	}

	render() {
		return (
			<KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={ this.props.keyboardVerticalOffset || 0 }>
				{ this.onTypingIndicator() }
				<View style={ styles.footer }>
					<TextInput
						value={ this.state.chatInput }
						style={ styles.input }
						underlineColorAndroid='transparent'
						placeholder='Send Message'
						onChangeText={ this.setChatInput }
						onSubmitEditing={ () => {
							this.sendChat();
						}} />
					<TouchableOpacity style={{ backgroundColor: '#D02129' }} onPress={ () => { this.sendChat(); }} >
						<Text>Send</Text>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
		);
	}
}

const styles = {
	footer: {
		flexDirection: 'row',
		backgroundColor: '#eee'
	},
	input: {
		paddingHorizontal: 20,
		fontSize: 18,
		flex: 1
	},
	send: {
		alignSelf: 'center',
		padding: 10
	}
};

export default RNCEMessageEntry;