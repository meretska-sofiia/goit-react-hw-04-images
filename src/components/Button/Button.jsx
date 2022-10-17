import PropTypes from 'prop-types';

export const ButtonLoadMore = ({ onClick }) => (
  <button type="button" className="Button" onClick={onClick}>
    Load more
  </button>
);

ButtonLoadMore.propTypes = {
  onClick: PropTypes.func,
};
