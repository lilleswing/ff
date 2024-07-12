import * as React from 'react';
import { connect } from 'react-redux';
import { IPick, ITeam } from '../lib/models/Team';
import { setTrackedTeam, undoPick } from '../lib/store/actions/teams';
import { IStoreState } from '../lib/store/store';
import PickHistory from './PickHistory';
import {picksUntilActiveTeam} from "../lib/store/reducers/teams";

interface IPickHistoryContainerProps {
  activeTeam: number;
  currentPick: number;
  numberOfTeams: number;
  picks: IPick[];
  setTrackedTeam: (team: number) => void;
  teams: ITeam[];
  trackedTeam: number;
  undoPick: (pick: IPick) => void;
}

interface IPickHistoryContainerState {
  cardLength: number;
  open: boolean;
}

class PickHistoryContainer extends React.Component<IPickHistoryContainerProps, IPickHistoryContainerState> {
  public pickRowRef: any = React.createRef();

  constructor(props: any) {
    super(props);

    this.state = {
      cardLength: 45,
      open: true,
    };
  }

  public componentDidMount = () => {
    this.setState({
      cardLength: this.getCardLength(this.props.numberOfTeams),
    });

    window.addEventListener('resize', () =>
      this.setState({
        cardLength: this.getCardLength(this.props.numberOfTeams),
      })
    );
  };

  public componentDidUpdate = () => {
    // scroll the pick row back to the left
    if (this.pickRowRef.current) {
      this.pickRowRef.current.scrollLeft = 0;
    }
  };

  public toggleOpen = () => {
    this.setState({ open: !this.state.open });
  };

  private getCardLength = (numberOfTeams: number): number => {
    if (typeof window === 'undefined') {
      return 45;
    }
    const thisWidth = window.innerWidth * 0.65; // ~30px padding, 70% width of total window size
    const cardLength = Math.floor(thisWidth / numberOfTeams); // 8 == 2px border, 6px margin
    return Math.min(cardLength, 75);
  };

  public render() {
    const { currentPick, numberOfTeams , trackedTeam} = this.props;

    // round tracker message
    const headerMessage = `Round ${Math.ceil((currentPick + 1) / numberOfTeams)} – Pick ${currentPick + 1}`;
    const picksToGoMessage =  "You Are Up In: " + picksUntilActiveTeam(trackedTeam, currentPick, numberOfTeams)


    return (
      <PickHistory
        {...this.props}
        {...this.state}
        refProp={this.pickRowRef}
        headerMessage={headerMessage}
        yourUpMessage={picksToGoMessage}
        toggleOpen={this.toggleOpen}
      />
    );
  }
}

const mapStateToProps = ({ activeTeam, currentPick, numberOfTeams, picks, teams, trackedTeam }: IStoreState) => ({
  activeTeam,
  currentPick,
  numberOfTeams,
  picks,
  teams,
  trackedTeam,
});

const mapDispatchToProps = (dispatch: any) => ({
  setTrackedTeam: (teamToTrack: number) => dispatch(setTrackedTeam(teamToTrack)),
  undoPick: (pick: IPick) => dispatch(undoPick(pick)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PickHistoryContainer);
