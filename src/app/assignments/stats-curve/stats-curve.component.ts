import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { AssignmentsService } from 'src/app/shared/services/assignments.service';
import { Assignment } from '../models/assignments.model';

@Component({
  selector: 'app-stats-curve',
  templateUrl: './stats-curve.component.html',
  styleUrls: ['./stats-curve.component.scss']
})
export class StatsCurveComponent implements OnInit {

  data: any[] = [];
  assignments: Assignment[] | undefined;

  constructor(private assignmentsService: AssignmentsService) {
    this.assignmentsService.getAssignments().subscribe((assignments) => {
      this.assignments = assignments.docs;
      this.data = this.assignmentsService.getAssignmentsByMonth(this.assignments);
      this.chart.addSeries({
        name: 'Nombre de devoir',
        type: 'line',
        color: '#044342',
        data: this.data
      }, true, true);
    });
  }

  chart = new Chart({
    chart: {
      type: 'line',
      height: 325
    },
    title: {
      text: 'Nombre de devoir par mois'
    },
    xAxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ]
    },
    yAxis: {
      title: {
        text: 'Nombre de devoir'
      }
    },
    credits: {
      enabled: false
    },
    accessibility: {
      enabled: false
  }
  });

  ngOnInit(): void {
  }
}