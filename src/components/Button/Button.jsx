import PropTypes from 'prop-types';
import { forwardRef } from 'react';

const ButtonLoadMore = forwardRef(({ onClick }, ref) => (
  <button type="button" className="Button" ref={ref} onClick={onClick}>
    Load more
  </button>
));

ButtonLoadMore.propTypes = {
  onClick: PropTypes.func,
};

export default ButtonLoadMore;
