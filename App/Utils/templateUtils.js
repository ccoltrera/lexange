'use strict';

function templateStringer (array, text, i, string) {
  if (i === array.length) return string + '{ "$set":"' + text + '"}';

  string = string + '{"' + array[i] + '":';

  return templateStringer(array, text, i + 1, string) + '}';
}

function _handleChange(stateName, array, event) {

  var text = typeof event === 'string' ? event : event.nativeEvent.text;

  var stateUpdate = {};
  var templateUpdate = JSON.parse( templateStringer(array, text, 0, '') );

  stateUpdate[stateName] = text;

  this.setState(stateUpdate);

  this.props._updateTemplate(templateUpdate);
}

export default _handleChange;
