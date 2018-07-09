import { Component } from 'react';
import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader'
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import CircularProgress from 'material-ui/CircularProgress';

import defaultAvatar from './defautAvatar.png';

class MessageList extends Component
{
  componentDidMount() {
    this.props.subscribeToMore();
  }

  render() {
    const { messages = [], loading = false } = this.props;

    return (
      <List>
        <Subheader>
          Message
        </Subheader>
        {
          loading && !messages.length ? (
            <CircularProgress size={60} thickness={3} />
          ) : (
            messages.map((message, key) => (
              <ListItem key={message.id || key}
                        primaryText={message.content.text}
                        leftAvatar={<Avatar src={message.user.avatar.url || defaultAvatar} />}
              />
            ))
          )
        }
      </List>
    );
  }
};

export default MessageList;
