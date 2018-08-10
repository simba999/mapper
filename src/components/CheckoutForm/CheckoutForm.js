import React from 'react';
import PropTypes from 'prop-types';
import './checkoutform.scss';

class CheckoutForm extends React.Component {
  render() {
    const { poster, config, replaceId } = this.props;

    let textBr = '';
    if (poster.poster && poster.poster.text && poster.poster.text !== '') {
      textBr = poster.poster.text.replace(/\n/g, '<br />');
    }

    return (
      <div className="CheckoutForm" style={{ display: 'none' }}>
        <form
          ref={(c) => {
            this.form = c;
          }}
          action={`${config.config.site_url}/cart/add`}
          method="POST"
          encType="multipart/form-data"
          data-section="product-customizable-temp`late"
        >
          <input type="text" name="id" defaultValue={config.variantId} />
          <input type="text" name="properties[Code]" defaultValue={poster.poster.id} />
          <input type="text" name="properties[Date]" defaultValue={poster.poster.textDate} />
          <input type="text" name="properties[_textBr]" defaultValue={textBr} />
          <input type="text" name="properties[_replaceId]" defaultValue={replaceId} />
          <input
            type="text"
            name="properties[_posterSize]"
            defaultValue={poster.poster.layout.posterSize}
          />
          <input
            type="text"
            name="properties[_frameColor]"
            defaultValue={poster.poster.frame_color}
          />

          <input type="text" name="attributes[Code]" defaultValue={poster.poster.id} />
          <input type="text" name="attributes[Theme]" defaultValue={poster.poster.themeId} />
          <input type="text" name="attributes[Date]" defaultValue={poster.poster.textDate} />
          <input
            type="text"
            name="attributes[Location]"
            defaultValue={poster.poster.textLocation}
          />

          <input
            type="text"
            name="attributes[_posterSize]"
            defaultValue={poster.poster.layout.posterSize}
          />
          <input
            type="text"
            name="attributes[_frameColor]"
            defaultValue={poster.poster.frame_color}
          />

          {Object.keys(poster.poster).map((key) => {
            if (
              [
                'frameColor',
                'textBr',
                'replaceId',
                'sourceStore',
                'date',
                'frame_style',
                'latitude',
                'longitude',
                'constellations',
                'grid',
                'planets',
                'textTitle',
                'textLocation',
                'textDate',
                'textLatLong',
                'id',
                'themeId',
                'layoutId',
                'text',
                'moon',
              ].indexOf(key) >= 0
            ) {
              return (
                <input
                  key={key}
                  type="text"
                  name={`properties[_${key}]`}
                  value={poster.poster[key]}
                />
              );
            }

            if (['location', 'time', 'time_tz', 'highlight'].indexOf(key) >= 0) {
              return (
                <input
                  key={key}
                  type="text"
                  name={`properties[_${key}]`}
                  value={JSON.stringify(poster.poster[key])}
                />
              );
            }

            return null;
          })}

          <button type="submit" name="add" id="AddToCart-product-customizable-template">
            submit
          </button>
        </form>
      </div>
    );
  }
}

CheckoutForm.propTypes = {
  poster: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
  replaceId: PropTypes.string,
};

export default CheckoutForm;
