import React from 'react';
import './NoticationPopup.scss';
import moment from 'moment';

const NotificationPopup = ({
  firstName = 'John Doe',
  city = 'New York',
  country = 'United States',
  productName = 'Puffer Jacket With Hidden Hood',
  timestamp = '',
  productImage = 'http://paris.mageplaza.com/images/shop/single/big-1.jpg',
  settings = {}
}) => {
  let displayedTime;
  // console.log('settings: ', settings);
  if (timestamp) {
    if (settings.hideTimeAgo) {
      const day = moment().diff(timestamp, 'days');
      displayedTime = day === 0 ? 'today' : day === 1 ? 'a day ago' : `${day} days ago`;
    } else {
      displayedTime = moment(timestamp).format('MMMM D, YYYY');
    }
  } else {
    // Default fallback if timestamp is empty or invalid
    displayedTime = '';
  }

  return (
    <div className={`Avava-SP__Wrapper fadeInUp animated  ${settings.position || 'bottom-left'}`}>
      <div className="Avava-SP__Inner">
        <div className="Avava-SP__Container">
          <a href="#" className={'Avava-SP__LinkWrapper'}>
            <div
              className="Avava-SP__Image"
              style={{
                backgroundImage: `url(${productImage})`
              }}
            />
            <div className="Avada-SP__Content">
              <div className={'Avada-SP__Title'}>
                {firstName} in {city}, {country}
              </div>
              {settings.truncateProductName ? (
                <div className={'Avada-SP__Subtitle'}>
                  purchased{' '}
                  {productName.length > 10 ? productName.slice(0, 10) + '...' : productName}
                </div>
              ) : (
                <div className={'Avada-SP__Subtitle'}>purchased {productName}</div>
              )}
              <div className={'Avada-SP__Footer'}>
                {displayedTime}{' '}
                <span className="uni-blue">
                  <i className="fa fa-check" aria-hidden="true" /> by Avada
                </span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

NotificationPopup.propTypes = {};

export default NotificationPopup;
