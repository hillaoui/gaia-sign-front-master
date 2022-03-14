import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public data!: Array<any>;
  ngOnInit() {
    this.data = [
      {
        'stepname': 'preparation',
        'formFields': [
          {
            'key': 'Document upload',
            'input': 'file',
            'valids': []
          }
        ]
      },
      {
        'stepname': 'informations',
        'formFields': [
          {
          'key': 'Document title',
          'input': 'text',
          'valids': [{
              'valid': 'required',
              'error': 'Document title is required'
            },
            {
              'valid': 'minlength',
              'length': 5,
              'error': 'Document title must be at least 5 characters'
            }
          ]
          },
          {
            'key': 'Document commentaries',
            'input': 'textarea',
            'valids': []
          },
          {
          'key': 'Electronic message',
          'input': 'textarea',
          'valids': [{
              'valid': 'required',
              'error': 'Electronic message is required'
            },
            {
              'valid': 'minlength',
              'length': 5,
              'error': 'Electronic message must be at least 5 characters'
            }
          ]
          },
          {
            'key': 'Expiration Date',
            'input': 'date',
            'valids': [{
              'valid': 'required',
              'error': 'Expiration date is required'
            }]
          },
          {
            'key': 'Authentication mode',
            'input': 'select',
            'items': [{
                'name': 'push',
                'id': 0
              },
              {
                'name': 'pwd',
                'id': 1
              },
              {
                'name': 'oath',
                'id': 2
              },
              {
                'name': 'smsOtp',
                'id': 3
              }
            ],
            'valids': [{
              'valid': 'required',
              'error': 'Authentication mode is required'
            }]
          }
        ]
      },
      {
        'stepname': 'signataires',
        'formFields': [
          {
            'key': 'signataires-list',
            'input': 'drag-and-drop'
          }
        ]
      }
    ];
  }

}
