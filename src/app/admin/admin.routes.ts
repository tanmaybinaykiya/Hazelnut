import { EnrollmentCenterComponent } from './enrollment-center';
import { PeopleComponent } from './people/';
import { BillingComponent } from './billing/';
import { NotificationComponent } from './notification/';
import { AdministrationComponent } from './administration/';
import { AdminComponent } from './admin.component';
import { CanActivate,Router }    from '@angular/router';
import { LoginService } from '../shared/api.service'
import { AdminGuard } from '../security'

export const AdminRoutes = [
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AdminGuard],
        children: [
            { path: '', redirectTo: 'enrollmentCenter', terminal: true },
            { path: 'enrollmentCenter', component: EnrollmentCenterComponent, name: 'EnrollmentCenter', useAsDefault: true },
            { path: 'people', component: PeopleComponent, name: 'People' },
            { path: 'billing', component: BillingComponent, name: 'Billing' },
            { path: 'notification', component: NotificationComponent, name: 'Notification' },
            { path: 'administration', component: AdministrationComponent, name: 'Administration' },
        ]
    }

];