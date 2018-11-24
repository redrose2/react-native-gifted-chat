import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, View, ViewPropTypes } from 'react-native';
import GiftedAvatar from './GiftedAvatar';
import { isSameUser, isSameDay } from './utils';

const styles = {
  left: StyleSheet.create({
    container: {
      marginRight: 8,
    },
    onTop: {
      alignSelf: 'flex-start',
    },
    onBottom: {},
    image: {
      height: 36,
      width: 36,
      borderRadius: 18,
    },
  }),
  right: StyleSheet.create({
    container: {
      marginLeft: 8,
    },
    onTop: {
      alignSelf: 'flex-start',
    },
    onBottom: {},
    image: {
      height: 36,
      width: 36,
      borderRadius: 18,
    },
  }),
};

export default class Avatar extends React.PureComponent {

  renderAvatar() {
    const avatarStyle = StyleSheet.flatten([
      styles[this.props.position].image,
      this.props.imageStyle[this.props.position],
    ]);
    return (
      <GiftedAvatar
        avatarStyle={avatarStyle}
        user={this.props.currentMessage.user}
        onPress={() => this.props.onPressAvatar && this.props.onPressAvatar(this.props.currentMessage.user)}
        onLongPress={() => this.props.onLongPressAvatar && this.props.onLongPressAvatar(this.props.currentMessage.user)}
        children={typeof this.props.children === 'function' ? this.props.children({ style: avatarStyle }) : this.props.children}
      />
    );
  }

  render() {
    const { renderAvatarOnTop, showAvatarForEveryMessage } = this.props;
    const messageToCompare = renderAvatarOnTop ? this.props.previousMessage : this.props.nextMessage;
    const computedStyle = renderAvatarOnTop ? 'onTop' : 'onBottom';

    if (this.props.renderAvatar === null) {
      return null;
    }

    if (
      !showAvatarForEveryMessage &&
      isSameUser(this.props.currentMessage, messageToCompare) &&
      isSameDay(this.props.currentMessage, messageToCompare)
    ) {
      return (
        <View style={[styles[this.props.position].container, this.props.containerStyle[this.props.position]]}>
          <GiftedAvatar
            avatarStyle={StyleSheet.flatten([
              styles[this.props.position].image,
              this.props.imageStyle[this.props.position],
            ])}
          />
        </View>
      );
    }

    return (
      <View
        style={[
          styles[this.props.position].container,
          styles[this.props.position][computedStyle],
          this.props.containerStyle[this.props.position],
        ]}
      >
        {this.renderAvatar()}
      </View>
    );
  }

}

Avatar.defaultProps = {
  renderAvatarOnTop: false,
  showAvatarForEveryMessage: false,
  position: 'left',
  currentMessage: {
    user: null,
  },
  previousMessage: {},
  nextMessage: {},
  containerStyle: {},
  imageStyle: {},
  onPressAvatar: () => { },
  onLongPressAvatar: () => { },
};

Avatar.propTypes = {
  renderAvatarOnTop: PropTypes.bool,
  showAvatarForEveryMessage: PropTypes.bool,
  position: PropTypes.oneOf(['left', 'right']),
  currentMessage: PropTypes.object,
  previousMessage: PropTypes.object,
  nextMessage: PropTypes.object,
  onPressAvatar: PropTypes.func,
  onLongPressAvatar: PropTypes.func,
  renderAvatar: PropTypes.func,
  containerStyle: PropTypes.shape({
    left: ViewPropTypes.style,
    right: ViewPropTypes.style,
  }),
  imageStyle: PropTypes.shape({
    left: ViewPropTypes.style,
    right: ViewPropTypes.style,
  }),
};
