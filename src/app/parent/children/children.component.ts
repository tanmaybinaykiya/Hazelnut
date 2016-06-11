import { Component, OnInit } from '@angular/core';
import { ParentService } from '../../shared';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon/icon';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card/card';
import { ManageChildProfileComponent } from './manage-child-profile/'
import { PayTuitionFeesComponent } from './pay-tuition-fees/'
import { UnenrollComponent } from './unenroll/'

@Component({
    selector: 'my-children',
    directives: [ MdIcon, MD_CARD_DIRECTIVES, ManageChildProfileComponent, PayTuitionFeesComponent, UnenrollComponent ],
    providers: [ ParentService, MdIconRegistry ],
    template: require('./children.component.html'),
    styles: [require('./children.component.scss')]
})
export class ChildrenComponent implements OnInit {

    isInstitutionPanelOpen: Boolean = false;
    isManageChildProfileModalOpen: Boolean = false;
    
    institution = {
        name: 'Loyola High School',
        details: ['Pashan Road,', 'Pune 411008']
    };

    billingHistory = [
        {
            date: '1/1/16',
            institution: 'DSF Lombard',
            amount: '$123',
            invoiceLink: '/lalala1'
        }, {
            date: '1/2/16',
            institution: 'DSF Lombard',
            amount: '$123',
            invoiceLink: '/lalala2'
        }, {
            date: '3/1/16',
            institution: 'DSF Lombard',
            amount: '$123',
            invoiceLink: '/lalala3'
        }, {
            date: '1/4/16',
            institution: 'DSF Lombard',
            amount: '$123',
            invoiceLink: '/lalala4'
        }
    ];

    enrolledStudents = [
        {
            name: 'Barack Obama',
            class: '1A',
            teacher: 'Putin'
        }, {
            name: 'Manmohan Singh',
            class: '1A',
            teacher: 'Putin'
        }, {
            name: 'Nicolaus Sarcozhy',
            class: '1A',
            teacher: 'Putin'
        }, {
            name: 'Agnela Merkel',
            class: '1A',
            teacher: 'Putin'
        }
    ];

    constructor(private parentService: ParentService, mdIconRegistry: MdIconRegistry) {
        mdIconRegistry
            .addSvgIcon('thumb-up', '/icon/assets/thumbup-icon.svg')
            .addSvgIconSetInNamespace('core', '/icon/assets/core-icon-set.svg')
            .registerFontClassAlias('fontawesome', 'fa');
    }

    toggleInstitutionDetails() {
        this.isInstitutionPanelOpen = !this.isInstitutionPanelOpen;
        console.log("cliekced", this.isInstitutionPanelOpen);
    }

    ngOnInit() {
        console.log('Children');
    }

}
