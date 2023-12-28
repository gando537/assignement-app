import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { AssignmentsService } from 'src/app/shared/services/assignments.service';
import { Assignment } from '../models/assignments.model';

@Component({
  selector: 'app-stats-diagram',
  templateUrl: './stats-diagram.component.html',
  styleUrls: ['./stats-diagram.component.scss']
})
export class StatsDiagramComponent implements OnInit {

  data: any[] = [];
  assignments: Assignment[] | undefined;
  constructor(private assignmentsService: AssignmentsService) { }

  chart = new Chart({
    chart: {
      type: 'pie',
      height: 325
    },
    title: {
      text: 'Nombre de devoir rendu par matière'
    },
    xAxis: {
      categories: [
        'Web(Angular)',
        'BD',
        'Outils d\'ingénierie',
        'Diagnostic et gestion financière',
        'Cadrage d\'un projet SI',
        'Composants logiciels pour l\'entreprise',
        'Communication'
      ]
    },
    credits: {
      enabled: false
    },
    accessibility: {
      enabled: false
  }
  })

  ngOnInit(): void {
    this.assignmentsService.getAssignments().subscribe((assignments) => {
      this.assignments = assignments.docs;
      this.data = this.assignmentsService.getAssignmentsByMatiere(this.assignments);
      this.chart.addSeries({
        name: 'Nombre de devoir',
        type: 'pie',
        data: this.data
      }, true, true);
    });
  }

}
