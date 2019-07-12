import { Button } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import { resetDraft } from '../store/actions/players';
import { toggleScoringFormatting } from '../store/actions/scoring';
import { toggleRosterFormatting, undoLast } from '../store/actions/teams';
import './MobileSettings.css';

interface IProps {
  undoPick: () => void;
  resetDraft: () => void;
  toggleRosterFormatting: () => void;
  toggleScoringFormatting: () => void;
}

class MobileSettings extends React.Component<IProps> {
  public render() {
    return (
      <div className="MobileSettings">
        <header>
          <h2>ffdraft.app</h2>
          <div className="draft-dot">
            <div className="dot green-dot" />
            <p className="small">Will be drafted soon</p>
          </div>
        </header>
        <div className="buttons">
          <Button
            size="small"
            onClick={this.props.toggleScoringFormatting}
            style={{ marginRight: 10 }}>
            Scoring
          </Button>
          <Button size="small" onClick={this.props.toggleRosterFormatting}>
            Roster
          </Button>
          <Button
            size="small"
            type="dashed"
            onClick={this.props.resetDraft}
            style={{ marginLeft: 'auto', marginRight: 10 }}>
            Reset
          </Button>
          <Button size="small" type="dashed" onClick={this.props.undoPick}>
            Undo
          </Button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  resetDraft: () => dispatch(resetDraft()),
  toggleRosterFormatting: () => dispatch(toggleRosterFormatting()),
  toggleScoringFormatting: () => dispatch(toggleScoringFormatting()),
  undoPick: () => dispatch(undoLast())
});

export default connect(
  null,
  mapDispatchToProps
)(MobileSettings);