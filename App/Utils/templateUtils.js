'use strict';

function templateStringer (array, text, i, string) {
  if (i === array.length) return string + '{ "$set":"' + text + '"}';

  string = string + '{"' + array[i] + '":';

  return templateStringer(array, text, i + 1, string) + '}';
}

function _handleChange(stateName, array, event, unmounted) {

  var text = typeof event === 'string' ? event : event.nativeEvent.text;

  var stateUpdate = {};
  var templateUpdate = JSON.parse( templateStringer(array, text, 0, '') );

  stateUpdate[stateName] = text;

  if (!unmounted) {
    this.setState(stateUpdate);
  }

  this.props._updateTemplate(templateUpdate);

  if(this.props._completenessCheck) {
    this.props._completenessCheck();
  }
}

export default _handleChange;
