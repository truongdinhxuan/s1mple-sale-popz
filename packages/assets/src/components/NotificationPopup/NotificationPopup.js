import React from 'react';
import './NoticationPopup.scss';
/* eslint-disable react/prop-types */

const NotificationPopup = ({
  firstName = 'John Doe',
  city = 'Ha Noi',
  country = 'Viet Nam',
  productName = 'Nike Jumpking KKKKKKKK',
  timestamp = 'a day ago',
  DateTime = 'July 7th, 2025',
  productImage = 'https://baohanam-fileserver.nvcms.net/IMAGES/2021/02/28/tay-deo-cong-so-8-van-boi-gan-9-km-lap-ky-luc-guin-56-0.jpeg',
  // truyền settings xuống cho hidetimeago và truncate text
  settings = {}
}) => {
  return (
    <div className="Avava-SP__Wrapper fadeInUp animated">
      <div className="Avava-SP__Inner">
        <div className="Avava-SP__Container">
          <a href="#" className={'Avava-SP__LinkWrapper'}>
            <div
              className="Avava-SP__Image"
              style={{
                backgroundImage: `url(${productImage})`
              }}
            ></div>
            <div className="Avada-SP__Content">
              <div className={'Avada-SP__Title'}>
                {firstName} in {city}, {country}
              </div>

              {settings.truncateProductName ? (
                <div className={'Avada-SP__Subtitle'}>
                  purchased{' '}
                  {productName.length > 20 ? productName.slice(0, 20) + '...' : productName}
                </div>
              ) : (
                <div className={'Avada-SP__Subtitle'}>purchased {productName}</div>
              )}

              <div className={'Avada-SP__Footer'}>
                {/* {timestamp}{' '} */}
                {settings.hideTimeAgo ? DateTime : timestamp}
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
