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
  }

  _toggleShow() {
    this.setState({
      show: !this.state.show
    });
  }

  render() {
    var text = this.state.show ? (
        <Text style={[styles.cardText, {color: '#858E99'}]}>
          { this.content.desc }
        </Text>
      ) : (
        <Text style={styles.cardText}>
          { this.content.descTrans }
        </Text>
      )

    var contentBlock = this.props.content === 'people' ? (
        <View>
          <Text style={styles.cardText}>{this.content.name}</Text>
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
    justifyContent: 'center',
    height: 60,
    width: 60,
    marginTop: 0,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#C8C7CC',
    borderRadius: 10
  },
  card: {
    marginTop: 0,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 10,
    borderColor: '#C8C7CC',
    padding: 5
  },
  cardText: {
    backgroundColor: 'rgba(255,255,255,0)',
    fontSize: 16,
    margin: 3
  },
  row: {
    flexDirection: 'row'
  },
  textColumn: {
    height: 60,
    flexDirection: 'column',
    marginLeft: 5,
    justifyContent: 'center',
  }
});

export default VocabCard;
