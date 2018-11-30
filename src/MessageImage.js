/* eslint no-use-before-define: ["error", { "variables": false }] */

import PropTypes from 'prop-types';
import React from 'react';
import { Image, StyleSheet, View, ViewPropTypes } from 'react-native';
import Lightbox from 'react-native-lightbox';

export default class MessageImage extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      isOpened: false,
    };
  }

  render() {
    const {
      containerStyle,
      lightboxProps,
      imageProps,
      imageStyle,
      currentMessage,
      children,
    } = this.props;
    return (
      <View style={[styles.container, containerStyle]}>
        <Lightbox
          activeProps={{
            style: styles.imageActive,
          }}
          {...lightboxProps}
          onOpen={() => this.setState({ isOpened: true })}
          onClose={() => this.setState({ isOpened: false })}
        >
          {children ?
            (typeof children === 'function' ? children({ isOpened: this.state.isOpened }) : children)
            :
            <Image
              {...imageProps}
              style={[styles.image, imageStyle]}
              source={{ uri: currentMessage.image }}
            />
          }
        </Lightbox>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  image: {
    width: 150,
    height: 100,
    borderRadius: 13,
    margin: 3,
    resizeMode: 'cover',
  },
  imageActive: {
    flex: 1,
    // resizeMode: 'contain',
  },
});

MessageImage.defaultProps = {
  currentMessage: {
    image: null,
  },
  containerStyle: {},
  imageStyle: {},
  imageProps: {},
  lightboxProps: {},
};

MessageImage.propTypes = {
  currentMessage: PropTypes.object,
  containerStyle: ViewPropTypes.style,
  imageStyle: Image.propTypes.style,
  imageProps: PropTypes.object,
  lightboxProps: PropTypes.object,
};
