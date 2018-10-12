import React, { Component } from 'react';
import { View, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import RNCEMessage from './RNCEMessage';

class RNCEMessageList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			messages: [],
			loading: true,
		};
	}

	_keyExtractor = (item, index) => index;

	componentDidMount() {
		let searchy = this.props.chat.search({
			event: 'message',
			limit: 50
		});

		searchy.on('message', (data) => {
			this.setState({ messages: [...this.state.messages, data] });
		});

		searchy.on('$.search.finish', () => {
			this.setState({loading:false, messages: this.state.messages.reverse()});

			this.props.chat.on("message", payload => {
				this.setState({ messages: [...this.state.messages, payload] });
			});
		});
	}

	componentWillUpdate(newProps){
		if(this.props.chat !== newProps.chat) {
			this.setState({ messages: [], loading:true });

			let searchy = newProps.chat.search({
				event: 'message',
				limit: 50
			});

			searchy.on('message', (data) => {
				this.setState({ messages: [...this.state.messages, data] });
			});

			searchy.on('$.search.finish', () => {
				this.setState({ loading:false, messages: this.state.messages.reverse() });

				newProps.chat.on("message", payload => {
					this.setState({ messages: [...this.state.messages, payload] });
				});
			});
		}
	}

	render() {
		if (this.state.loading) {
			return (
				<View style={{ flex:1, justifyContent: "center", alignItems: "center" }}>
					<ActivityIndicator size="large" />
				</View>
			)
		}

		return (
			<FlatList
				ref={ el => (this.flatList = el) }
				data={ this.state.messages }
				extraData={ this.state }
				keyExtractor={ this._keyExtractor }
				renderItem={ ({ item }) => <RNCEMessage message={ item } /> }
			/>
		);
	}
}

const styles = StyleSheet.create({
  messageList: {
    flex: 1,
  }
});

export default RNCEMessageList;
