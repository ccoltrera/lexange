'use strict';
import React, {
  Component,
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
  Text
} from 'react-native';

class VocabCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false
    };

    this.template = this.props._readTemplate();
    this.content = this.template[this.props.content][this.props.num];

    this._toggleShow = this._toggleShow.bind(this);

    this.desc = decodeURIComponent(this.content.desc);
    this.descTrans = decodeURIComponent(this.content.descTrans);
    this.name = decodeURIComponent(this.content.name);
  }

  _toggleShow() {
    this.setState({
      show: !this.state.show
    });
  }

  render() {
    var text = this.state.show ? (
        <Text style={[styles.cardText, {color: '#858E99'}]}>
          { this.descTrans }
        </Text>
      ) : (
        <Text style={styles.cardText}>
          { this.desc }
        </Text>
      )

    var contentBlock = this.props.content === 'people' ? (
        <View>
          <Text style={[styles.cardText, {fontWeight: 'bold'}]}>{this.name}</Text>
          {text}
        </View>
      ) : (
        {text}
      )

    return(
      <TouchableHighlight
        style={styles.card}
        onPress={this._toggleShow}
        underlayColor='#EEEEEE'>
        <View style={styles.row}>
          <Image style={styles.imageHolder} source={{uri: this.content.pictureUri}} />
          <View style={styles.textColumn}>
            {contentBlock}
          </View>
        </View>
      </TouchableHighlight>
    );
  }

}

const styles = StyleSheet.create({
  imageHolder: {
    position: 'absolute',
    top: 0,
    left: 0,
    justifyContent: 'center',
    height: 80,
    width: 80,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#979797',
    borderRadius: 15
  },
  card: {
    height: 110,
    margin: 15,
    marginBottom: 0,
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 0
    }
  },
  cardText: {
    backgroundColor: 'rgba(255,255,255,0)',
    fontSize: 18,
    fontWeight: '400',
    marginLeft: 10,
    marginBottom: 10
  },
  textColumn: {
    // height: 80,
    flexDirection: 'column',
    marginLeft: 85,
    // justifyContent: 'center',
  }
});

export default VocabCard;
