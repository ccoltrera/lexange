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
          <Text style={[styles.cardText, {fontWeight: 'bold'}]}>{this.content.name}</Text>
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
    height: 80,
    width: 80,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#C8C7CC',
    borderRadius: 10
  },
  card: {
    marginTop: 5,
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 15,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
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
    fontWeight: '300',
    margin: 5
  },
  row: {
    flexDirection: 'row'
  },
  textColumn: {
    height: 80,
    flexDirection: 'column',
    marginLeft: 5,
    justifyContent: 'center',
  }
});

export default VocabCard;
