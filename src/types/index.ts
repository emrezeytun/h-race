export interface Horse {
  id: number;
  name: string;
  condition: number;
  color: string;
  position?: number;
}

export interface LapItem {
  itemName: string;
  rowData: Horse[];
  distance?: number;
}

export interface State {
  horseList: Horse[];
  lapItems?: {
    program: LapItem[];
    results: LapItem[];
  };
  isRaceStarted: boolean;
  isRaceFinished: boolean;
  currentLapIndex: number;
}
