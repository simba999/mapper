/* global window */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { PosterGenerator } from 'thenightsky-poster';
import './textselector.scss';
import CollapsiblePanel from '../common/CollapsiblePanel';

const TextArea = styled.textarea`
  text-transform: uppercase;
  resize: none;
  border-color: gray;
  width: 100%;
  border-radius: 5px;
  border: none;
  font-size: 15px;
  padding: 15px;
  :focus {
    outline: none;
  }
`;

const LineIndicator = styled.div`
  text-align: right;
  color: ${props => (props.excess ? 'red' : 'black')};
`;

class TextSelector extends React.Component {
  constructor(props) {
    super(props);

    this.updateText = this.updateText.bind(this);

    this.toggleOpen = this.toggleOpen.bind(this);

    this.maxLineWidth = PosterGenerator.getMaximumTextWidth;

    this.state = {
      open: false,
      text: '',
      lineCount: 0,
    };
  }

  componentWillMount() {
    const maxLineWidth = PosterGenerator.getMaximumTextWidth(this.props.poster.layout);
    const maxQuoteLines = PosterGenerator.getMaximumQuoteLines(this.props.poster.layout);
    this.setState({
      text: this.props.poster.text,
      maxQuoteLines,
      maxLineWidth,
    });
  }

  // TODO: fix this, it's not a good way to do things
  // TODO: in general, we really shouldn't be waiting for props updates from the API the whole time
  componentDidMount() {
    let count = 0;
    const intervalHandle = setInterval(() => {
      // Quit after 5 attempts
      if (count > 4) {
        clearInterval(intervalHandle);
      }
      // if mainCanvas loaded, update text
      if (window.mainCanvas) {
        this.updateText(this.props.poster.text);
        clearInterval(intervalHandle);
      } else {
        count += 1;
      }
    }, 500);
  }

  toggleOpen() {
    const open = !this.state.open;
    this.setState({ open });
  }

  updateText(text) {
    if (!text) {
      // eslint-disable-next-line
      text = '';
    }

    this.setState({ text });
    const lines = text.toUpperCase().split('\n');

    // Format lines
    // TODO: fix this
    // eslint-disable-next-line
    for (const [lineIndex, line] of lines.entries()) {
      // get the width of each line
      const lineWidth = PosterGenerator.calculateQuoteTextWidth(
        line,
        window.mainCanvas,
        this.props.poster.layout,
      );

      // Handle line that is too long
      if (lineWidth >= this.state.maxLineWidth) {
        // Split line into words array
        const words = line.split(' ');

        let wordsTest = ''; // store words string for testing length
        let currentLine = ''; // store current line for assignment at end of loop
        let nextLine = ''; // store words in excess of max for next line assignment

        // Loop through concating words in the line and test length until max is reached
        // TODO: fix this
        // eslint-disable-next-line
        for (const [wordIndex, word] of words.entries()) {
          // concat new word to wordsTest
          wordsTest = `${wordsTest} ${word}`;

          // get width
          const wordsWidth = PosterGenerator.calculateQuoteTextWidth(
            wordsTest,
            window.mainCanvas,
            this.props.poster.layout,
          );

          // check for excess of max width
          if (wordsWidth < this.state.maxLineWidth) {
            // no excess so concat to current line
            currentLine = `${currentLine} ${word}`;
          } else {
            // excess so concat to next line
            nextLine = `${nextLine} ${word}`;
          }
        }

        // Assign current line
        lines[lineIndex] = currentLine;

        // Assign next line (if any)
        if (nextLine) {
          lines.splice(lineIndex + 1, 0, nextLine);
        }
      }
    }

    // concat lines to give to poster
    let formattedText = '';
    // TODO: fix this
    // eslint-disable-next-line
    for (const [lineIndex, line] of lines.entries()) {
      if (lineIndex < this.state.maxQuoteLines) {
        formattedText += `${line}\n`;
      }
    }

    // Update text on poster
    this.props.updatePosterText(formattedText);

    // Update line count
    this.setState({ lineCount: lines.length });

    if (lines.length > this.state.maxQuoteLines) {
      this.props.updateMaxLines(true);
    } else {
      this.props.updateMaxLines(false);
    }
  }

  render() {
    return (
      <CollapsiblePanel
        headerText="Write your message"
        headerOnClick={this.toggleOpen}
        isOpen={this.state.open}
      >
        <div style={{ marginTop: '10px' }}>
          <TextArea
            value={this.state.text}
            onChange={(input) => {
              this.updateText(input.target.value);
            }}
            rows={4}
          />
          <LineIndicator excess={this.state.lineCount > this.state.maxQuoteLines}>
            {this.state.lineCount} / {this.state.maxQuoteLines} Lines
          </LineIndicator>
        </div>
      </CollapsiblePanel>
    );
  }
}

TextSelector.propTypes = {
  poster: PropTypes.object.isRequired,
  updateMaxLines: PropTypes.func.isRequired,
  updatePosterText: PropTypes.func.isRequired,
};

export default TextSelector;
