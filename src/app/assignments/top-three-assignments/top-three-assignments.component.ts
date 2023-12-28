import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { Assignment } from '../models/assignments.model';
import { AssignmentsService } from 'src/app/shared/services/assignments.service';

@Component({
  selector: 'app-top-three-assignments',
  templateUrl: './top-three-assignments.component.html',
  styleUrls: ['./top-three-assignments.component.scss']
})
export class TopThreeAssignmentsComponent implements OnInit {

  data: any[] = [];
  assignments: Assignment[] | undefined;
  constructor(private assignmentsService: AssignmentsService) { }

  chart = new Chart({
    chart: {
      type: 'bar',
      height: 325
    },
    title: {
      text: 'Moyenne des notes par matière'
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
      ],
      labels: {
        rotation: -45, // Angle de rotation des étiquettes en degrés
        align: 'right' // Alignement des étiquettes
      }
    },
    yAxis: {
      title: {
        text: ''
      }
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
      this.data = this.assignmentsService.getAssignmentsMoyenneNote(this.assignments);
      const colors = this.generateRandomColors(this.data.length);
      this.chart.addSeries({
        name: 'Moyenne',
        type: 'bar',
        data: this.data.map((value, index) => ({
          y: value[1],
          color: colors[index] // Associe une couleur à chaque valeur
        })),
        dataLabels: {
          enabled: true,
          format: '{point.y:.2f}'
        },
      }, true, true);
    });
  }

  generateRandomColors(count: number): string[] {
    // Générez des couleurs aléatoires
    const colors = [];
    for (let i = 0; i < count; i++) {
      colors.push(`#${Math.floor(Math.random()*16777215).toString(16)}`);
    }
    return colors;
  }
}