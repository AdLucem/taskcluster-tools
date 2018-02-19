import React from 'react';
import { oneOfType, instanceOf, string, oneOf } from 'prop-types';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import moment from 'moment';
import { v4 } from 'slugid';

export default class DateView extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      id: v4()
    };
  }

  render() {
      const { date, since, placement, format, iso_format } = this.props;
    const tooltip = (
      <Tooltip id={this.state.id}>{moment(date).format(iso_format)}</Tooltip>
    );

      return (
      <OverlayTrigger placement={placement} overlay={tooltip}>
        <span id={this.state.id}>
          {moment(date).fromNow()}{' '}
          {since && `(${moment(date).from(since, true)} later)`}
        </span>
      </OverlayTrigger>
    );
  }
}

DateView.propTypes = {
  date: oneOfType([instanceOf(Date), string]).isRequired,
  since: oneOfType([instanceOf(Date), string]),
  placement: oneOf(['left', 'top', 'right', 'bottom']),
  format: string,
  iso_format: string
};

DateView.defaultProps = {
  format: 'Do of MMMM YYYY, H:mm:ss',
  iso_format: 'YYYY-MM-DDTHH:mm:ss.sssZ', 
  placement: 'top'
};
