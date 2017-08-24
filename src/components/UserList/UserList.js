import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader'
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import CircularProgress from 'material-ui/CircularProgress';

import defaultAvatar from './defautAvatar.png';

const UserList = ({ users = [], loading = false }) => (
  <List>
    <Subheader>
      Users
    </Subheader>
    {
      loading && !users.length ? (
        <CircularProgress size={60} thickness={3} />
      ) : (
        users.map((user, key) => (
          <ListItem key={user.id || key}
                    primaryText={user.name}
                    leftAvatar={<Avatar src={user.avatar || defaultAvatar} />}
                    rightIcon={<CommunicationChatBubble />}
          />
        ))
      )
    }
  </List>
);

export default UserList;