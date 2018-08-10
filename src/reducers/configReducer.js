import {
  GET_CONFIG,
  GET_CONFIG_DONE,
  UPDATE_CONFIG,
  UPDATE_DEVICE,
  REDIRECT_SHOW,
  UPDATE_VARIANT_ID,
} from '../actions/types';

const INITIAL_STATE = {
  gettingConfig: false,
  device: ' - Mobile',
  redirectShow: false,
  variantId: '',
  config: {
    default_units: '',
    themes: {
      color: [],
      onWhite: [],
    },
  },
};

const configReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_CONFIG:
      return {
        ...state,
        gettingConfig: true,
      };

    case UPDATE_VARIANT_ID:
      let variantId;

      const { theme, framed, size } = action.parameter;
      if (theme.shopify_skus) {
        theme.shopify_skus.forEach((sku) => {
          if (sku.framed === framed) {
            if (sku.size === size) {
              variantId = sku.sku;
            }
          }
        });
      }

      return {
        ...state,
        variantId,
      };

    case GET_CONFIG_DONE:
      return {
        ...state,
        gettingConfig: false,
      };

    case UPDATE_CONFIG:
      return {
        ...state,
        config: action.payload,
      };

    case REDIRECT_SHOW:
      return {
        ...state,
        redirectShow: action.payload,
      };

    case UPDATE_DEVICE:
      return {
        ...state,
        device: action.parameter,
      };

    default:
      return state;
  }
};

export default configReducer;
