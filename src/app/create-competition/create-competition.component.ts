import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { CompetitionService } from '../competition.service';
import Competition from '../comp/Competition';
import { ApiService } from '../api.service';
import Protocol from '../comp/Protocol';

export type ProtocolData = [number, string];

export interface ProtocolGroup {
  state: string;
  protocols: ProtocolData[];
}

@Component({
  selector: 'app-create-competition',
  templateUrl: './create-competition.component.html',
  styleUrls: ['./create-competition.component.scss']
})
export class CreateCompetitionComponent implements OnInit {
  protocols: ProtocolGroup[] = [
    {
      state: 'ISU',
      protocols: [
        [0, 'LT World Cup'],
        [1, 'LT World Cup Final'],
        [2, 'LT Junior World Cup'],
        [3, 'LT Junior World Cup Final'],
        [4, 'LT Olympics'],
        [5, 'LT Youth Olympics'],
        [6, 'ST World Cup'],
        [7, 'ST Olympics'],
        [8, 'ST Youth Olympics'],
        [9, 'ST Special Olympics']
      ]
    },
    {
      state: '🇨🇦 Canada',
      protocols: [
        [10, 'ST Canada Games'],
        [11, 'LT Canada Games'],
        [12, 'ST BC Provincials'],
        [13, 'ST BC Interclub Format'],
        [14, 'ST BC Games'],
        [15, 'LT BC Provincials'],
        [16, 'LT BC Games']
      ]
    }
  ];
  fgCompetition: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private competitionService: CompetitionService,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.fgCompetition = this.formBuilder.group({
      fc1ProtocolId: ['', [Validators.required]],
      fc2Name: ['', [Validators.required, Validators.pattern]],
      fc3Start: ['', [Validators.required]],
      fc4End: ['', [Validators.required]],
      fc5Location: ['', [Validators.required, Validators.pattern]],
    });

  }

  private async create() {

    if (!this.fgCompetition.valid) { return; }

    CompetitionService.competition = new Competition(
      0,
      ApiService.user,
      [],
      [],
      new Protocol(this.fgCompetition.value.fc1ProtocolId),
      this.fgCompetition.value.fc2Name,
      Math.random().toString(36).substr(2, 5),
      new Date(Date.now()),
      this.fgCompetition.value.fc3Start,
      this.fgCompetition.value.fc4End,
      this.fgCompetition.value.fc5Location
    );

    this.competitionService.create()
      .subscribe( (result) => {
        if (result) {
          console.log('result');
        }
      });
  }

  private async test() {
    // console.log('test()');
    // const competition = {
    //   division: [
    //     {
    //       name: 'Open Men',
    //       states: [
    //         {
    //           races: [
    //             { num: 1, distance: 500, records: [] },
    //             { num: 2, distance: 500, records: [] },
    //             { num: 3, distance: 1000, records: [] }
    //           ],
    //           skaters: [
    //             { name: 'Thomas' },
    //             { name: 'William' },
    //             { name: 'Robert' }
    //           ]
    //         }
    //       ]
    //     },
    //     {
    //       name: 'Open Women',
    //       states: [
    //         {
    //           races: [
    //             { num: 1, distance: 500, records: [] },
    //             { num: 2, distance: 500, records: [] },
    //             { num: 3, distance: 1000, records: [] }
    //           ],
    //           skaters: [
    //             { name: 'Alice' },
    //             { name: 'Beatrice' },
    //             { name: 'Catherine' }
    //           ]
    //         }
    //       ]
    //     }
    //   ]
    // };

    // class E {
    //   public data = [{ key: 'a' }, { key: 'b' }, { key: 'c' }, { key: 'd' }];
    //   private dat_index = 0;
    //   get currentData() { return this.data[this.dat_index]; } // {key:c}
    //   set currentData(obj: { key: string }) { this.data[this.dat_index] = obj; }
    //   // get index() { return this.dat_index; }
    //   set index(dat_index) { this.dat_index = dat_index; }
    // }
    // const e = new E();
    // console.log(JSON.stringify(e.data));
    // e.index = e.data.length;
    // e.currentData = { key: 'x' }; // a => x
    // e.data.push({ key: 'y' });
    // console.log(JSON.stringify(e.data));
    // console.log(JSON.stringify(e.currentData));
  }

}
