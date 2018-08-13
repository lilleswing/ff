import { IPlayer } from "../../Player";
import { ACTION_TYPES } from "./index";

/**
 * Set the list of players in the store
 *
 * @param playerList The list of ranked players
 */
export const setPlayers = (playerList: IPlayer[]) => ({
  players: playerList,
  type: ACTION_TYPES.SET_PLAYERS
});

/**
 * undoes the last player pick
 */
export const undoPlayerPick = () => ({
  type: ACTION_TYPES.UNDO_PICK_PLAYER
});