/* eslint-disable import/no-dynamic-require, global-require */
import React from 'react';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';
import './themeselector.scss';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import CollapsiblePanel from '../common/CollapsiblePanel';

class ThemeSelector extends React.Component {
  state = { open: false };

  toggleOpen = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  updateConstellations = (val) => {
    ReactGA.event({
      category: 'Constellations',
      action: 'Total Clicks',
      label: this.props.config.device,
      value: 1,
    });

    if (val === true) {
      ReactGA.event({
        category: 'Constellations',
        action: 'Constellations True',
        label: this.props.config.device,
        value: 1,
      });
    } else {
      ReactGA.event({
        category: 'Constellations',
        action: 'Constellations False',
        label: this.props.config.device,
        value: 1,
      });
    }

    this.props.actions.updatePosterConstellations(val);
  };

  updateGrid = (val) => {
    ReactGA.event({
      category: 'Grid',
      action: 'Total Clicks',
      label: this.props.config.device,
      value: 1,
    });

    if (val === true) {
      ReactGA.event({
        category: 'Grid',
        action: 'Grid True',
        label: this.props.config.device,
        value: 1,
      });
    } else {
      ReactGA.event({
        category: 'Grid',
        action: 'Grid False',
        label: this.props.config.device,
        value: 1,
      });
    }
    this.props.actions.updatePosterGrid(val);
  };

  updateOnWhite = (isEnabled, themeId = this.props.poster.theme.themeId) => {
    this.props.actions.updatePosterOnWhite(isEnabled);

    ReactGA.event({
      category: 'On White',
      action: 'Total Clicks',
      label: this.props.config.device,
      value: 1,
    });

    if (isEnabled) {
      this.props.themes.onWhite.some((theme) => {
        const themeIndex = theme.themeId.indexOf('_', 0);
        const colorThemeId = theme.themeId.slice(0, themeIndex);
        if (colorThemeId === themeId) {
          this.updatePosterTheme(theme);
          ReactGA.event({
            category: 'On White',
            action: `On White True${theme.label}`,
            label: this.props.config.device,
            value: 1,
          });
          return true;
        }
        return null;
      });
    } else {
      this.props.themes.color.some((theme) => {
        const themeIndex = themeId.indexOf('_', 0);
        const onWhiteThemeId = themeId.slice(0, themeIndex);
        if (onWhiteThemeId === theme.themeId) {
          this.updatePosterTheme(theme);
          ReactGA.event({
            category: 'On White',
            action: `On White False${theme.label}`,
            label: this.props.config.device,
            value: 1,
          });
          return true;
        }
        return null;
      });
    }
  };

  trackTheme = (theme) => {
    ReactGA.event({
      category: 'Themes',
      action: theme.label,
      label: this.props.config.device,
      value: 1,
    });
  };

  updateTheme = (theme) => {
    if (this.props.poster.onWhite) {
      this.updateOnWhite(true, theme.themeId);
    } else {
      this.updatePosterTheme(theme);
    }
  };

  updatePosterTheme = (theme) => {
    this.props.updateVariantId({
      theme,
      framed: this.props.poster.framed || false,
      size: this.props.poster.layout.posterSize,
    });
    this.props.updatePosterTheme(theme);
  };

  updateMoon = (val) => {
    ReactGA.event({
      category: 'Moon',
      action: 'Total Clicks',
      label: this.props.config.device,
      value: 1,
    });

    ReactGA.event({
      category: 'Moon',
      action: `Moon: ${val}`,
      label: this.props.config.device,
      value: 1,
    });

    this.props.actions.updatePosterMoon(val);
  };

  render() {
    const { poster, themes } = this.props;

    const carousel = (
      <div className="theme-selector-component">
        <div className="panel-body">
          <div style={{ marginTop: '10px' }} />
          <ul className="themes flex">
            {themes.color.map(theme => (
              <li
                key={theme.themeId}
                className={
                  poster.theme.themeId === theme.themeId ||
                  poster.theme.themeId === `${theme.themeId}_white`
                    ? `selected theme ${theme.themeId}`
                    : `theme ${theme.themeId}`
                }
                onClick={() => {
                  this.updateTheme(theme);
                  this.trackTheme(theme);
                }}
              >
                <img src={require(`../../assets/images/${theme.themeId}.png`)} alt="" />
                <p>{theme.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );

    return (
      <CollapsiblePanel
        headerText="Choose your theme"
        headerNode={carousel}
        isOpen={this.state.open}
        headerOnClick={this.toggleOpen}
      >
        <div className="theme-selector-component">
          {/* Toggles */}
          <ul className="toggles">
            <li>
              <div
                className="panel-body flex label-toggle"
                style={{ borderTopLeftRadius: '6px', borderTopRightRadius: '6px' }}
              >
                <label className="toggle-label">On White</label>
                <ToggleSwitch
                  poster={poster}
                  checkbox={{
                    checked: this.props.poster.onWhite,
                    onChange: this.updateOnWhite,
                  }}
                />
              </div>
            </li>
            <li>
              <div className="panel-body flex label-toggle">
                <label className="toggle-label">Constellations</label>
                <ToggleSwitch
                  poster={poster}
                  checkbox={{
                    checked: this.props.poster.constellations,
                    onChange: this.updateConstellations,
                  }}
                />
              </div>
            </li>
            <li>
              <div className="panel-body flex label-toggle">
                <label className="toggle-label">Grid</label>
                <ToggleSwitch
                  poster={poster}
                  checkbox={{
                    checked: this.props.poster.grid,
                    onChange: this.updateGrid,
                  }}
                />
              </div>
            </li>
            <li>
              <div className="panel-body flex label-toggle">
                <label className="toggle-label">Moon</label>
                <ToggleSwitch
                  poster={poster}
                  checkbox={{
                    checked: this.props.poster.moon,
                    onChange: this.updateMoon,
                  }}
                />
              </div>
            </li>
          </ul>
        </div>
      </CollapsiblePanel>
    );
  }
}

ThemeSelector.propTypes = {
  poster: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
  updateVariantId: PropTypes.func.isRequired,
  actions: PropTypes.shape({
    updatePosterGrid: PropTypes.func.isRequired,
    updatePosterOnWhite: PropTypes.func.isRequired,
    updatePosterConstellations: PropTypes.func.isRequired,
    updatePosterMoon: PropTypes.func.isRequired,
  }),
  themes: PropTypes.object.isRequired,
  updatePosterTheme: PropTypes.func.isRequired,
};

export default ThemeSelector;
