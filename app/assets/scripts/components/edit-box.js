import React from 'react';

class EditBox extends React.Component {
  constructor (props) {
    super(props);
    this.state = { open: props.open || false };
  }

  toggle () {
    const open = !!this.props.open;
    this.setState({ open });
  }

  renderToggle () {
    const { open } = this.state;

    const onClick = () => {
      this.toggle();
    };

    const direction = open ? 'down' : 'right';

    return (
      <div className='edit-box-toggle' onClick={onClick}>
        <h1 style={{ marginBottom: 0 }}>
          {name}
          <span
            className={`collecticons collecticons-chevron-${direction}--small`}
            style={{ marginLeft: 4, verticalAlign: 'top', display: 'inline-block' }}
          >
          </span>
        </h1>
      </div>
    );
  }

  render () {
    const { children } = this.props;

    return (
      <section className='edit-box'>
        {this.renderToggle()}

        <div className='edit-box-content'>
          {children}
        </div>
      </section>
    );
  }
}

export default EditBox;
