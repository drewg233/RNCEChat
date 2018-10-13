import React, { Component } from 'react';
import { View, Text } from 'react-native';
import ChatEngineCore from 'chat-engine';
import typingIndicator from 'chat-engine-typing-indicator';
import RNCEMessageList from './RNCEMessageList';
import RNCEMessageEntry from './RNCEMessageEntry';

var ChatEngine;
const now = new Date().getTime();
const username = ['user', now].join('-');

class RNCEChatView extends Component {

	constructor(props) {
		super(props);

		this.state = {
			chat: null,
			renderChat: false,
			me: null, 
		};

		ChatEngine = ChatEngineCore.create({
			publishKey: this.props.publishKey,
			subscribeKey: this.props.subscribeKey
		});
	}

	componentDidMount() {
		ChatEngine.connect(username, {
			signedOnTime: now
		}, 'auth-key');

		ChatEngine.on('$.ready', data => {
			const me = data.me;
			let chat = new ChatEngine.Chat(this.props.chatRoomName);

			chat.plugin(typingIndicator({ timeout: 5000 }));
			chat.on('$.connected', () => {
				this.setState({ chat: chat, renderChat: true, me: data.me });
			})
		});
	}

	render() {
		return(
			<View style={{ flex: 1 }}>
				{ !this.state.renderChat ? ( 
						<Text>Loading</Text>
					) : (
						<View style={{ flex:1 }}>
							<RNCEMessageList chat={ this.state.chat } />
							<RNCEMessageEntry chat={ this.state.chat } typingIndicator />
						</View>
					)
				}
			</View>
		)
	}
}

export default RNCEChatView;