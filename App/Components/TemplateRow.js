'use strict';
import React, {
  Component,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  LayoutAnimation
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

class TemplateRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetails: false
    }

    this._toggleDetails = this._toggleDetails.bind(this);
  }

  _toggleDetails() {
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({
      showDetails: !this.state.showDetails
    })
  }

  render() {
    var detailAreas = ['dialogue', 'people', 'places', 'items'];

    var details = detailAreas.map((area) => {
      if (this.props.rowData[area].length > 0) {
        return (
          <Text
            key={this.props.sectionID + this.props.rowID + area}
            style={styles.templateText}>
              <Text style={styles.details}>
                - {area != 'dialogue' ? area.toUpperCase() : 'PHRASES'}
              </Text>
              : {this.props.rowData[area].length}
            </Text>
        )
      }
    })

    var rowText = this.state.showDetails ? (
      <View>
        <Text style={styles.templateLabel}>{this.props.rowData['name']}</Text>
        <TouchableWithoutFeedback
          onPress={this._toggleDetails}>
          <Text style={styles.details}>HIDE DETAILS</Text>
        </TouchableWithoutFeedback>
        {details}
      </View>
    ) : (
      <View>
        <Text style={styles.templateLabel}>{this.props.rowData['name']}</Text>
        <TouchableWithoutFeedback
          onPress={this._toggleDetails}>
          <Text style={styles.details}>SHOW DETAILS</Text>
        </TouchableWithoutFeedback>
      </View>
    )

    return(
      <View style={styles.row}>
        {rowText}
        <TouchableOpacity
          onPress={this.props._goLanguages.bind(null, this.props.rowData)}
          underlayColor='rgba(22,159,173,1)'
          style={styles.chevronButton}
          >
          <View>
            <View style={styles.chevronBack}></View>
            <Icon name='chevron-circle-right' style={styles.chevron} />
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    // marginTop: 5,
    // marginLeft: 15,
    // marginRight: 15,
    paddingLeft: 15,
    paddingRight: 30,
    paddingTop: 20,
    paddingBottom: 20,
    // borderRadius: 15,
    backgroundColor: '#C6DCDF',
    borderColor: '#FFF',
    // borderTopWidth: 1,
    borderBottomWidth: 0.5,
    // shadowColor: '#000000',
    // shadowOpacity: 0.2,
    // shadowRadius: 2,
    // shadowOffset: {
    //   height: 2,
    //   width: 0,
    // },
  },
  rowTextBlock: {
    // marginRight:
  },
  templateLabel: {
    fontWeight: '700',
    fontFamily: 'System',
    fontSize: 18,
    color: 'rgba(22,159,173,1)'
  },
  templateText: {
    marginLeft: 15,
    fontFamily: 'System',
    fontSize: 14 ,
    marginTop: 5,
  },
  details: {
    fontWeight: '700',
    fontFamily: 'System',
    fontSize: 14,
    color: 'rgba(22,159,173,1)',
    marginTop: 5,
    marginLeft: 1,
  },
  chevronButton: {
    position: 'absolute',
    top: 20,
    right: 40,
    borderRadius: 100,
    backgroundColor: 'transparent'
  },
  chevronBack: {
    position: 'absolute',
    top: 3,
    left: 2,
    height: 25,
    width: 25,
    borderRadius: 100,
    backgroundColor: 'rgba(22,159,173,1)',
  },
  chevron: {
    position: 'absolute',
    top: 0,
    left: 0,
    fontSize: 35,
    color: '#FFFFFF',
    // borderRadius: 10,
  }
});

export default TemplateRow;
