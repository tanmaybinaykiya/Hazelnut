import { format } from 'util';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { CookieService } from 'angular2-cookie/core';

import { Observable } from 'rxjs/Observable';
import * as _throw from 'rxjs/observable/throw';

import { EnrollableStudent, EnrolledStudent } from '../models';
import {
    getApiHost, getAuthorizationHeader, getInstitutionShortCodeFromTokenObject, getSchoolCodeFromTokenObject,
    getUserEmailFromTokenObject
} from './serviceHelper';

@Injectable()
export class StudentService {

    private enrollStudentUrl = '%s/student/institution/%s/school/%s/';
    private getEnrolledStudentsUrl = '%s/student/institution/%s/school/%s/';

    constructor(private http: Http, private cookieService: CookieService) {
        console.log('hello login service: ', cookieService);
    }

    enrollStudent(enrollableStudent: EnrollableStudent): Observable<string> {
        let self = this;
        let body = JSON.stringify(enrollableStudent);
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': getAuthorizationHeader(self.cookieService)
        });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(format(this.enrollStudentUrl, getApiHost(), getInstitutionShortCodeFromTokenObject(self.cookieService),
            getSchoolCodeFromTokenObject(self.cookieService)), body, options)
            .map(this.extractStudentId)
            .catch(this.handleError);
    }

    getEnrolledStudentsForParent(): Observable<EnrolledStudent[]> {
        let self = this;
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': getAuthorizationHeader(self.cookieService)
        });
        let params: URLSearchParams = new URLSearchParams();
        params.set('parentEmail', getUserEmailFromTokenObject(self.cookieService));
        let options = new RequestOptions({ headers: headers, search: params });
        return this.http.get(format(self.getEnrolledStudentsUrl, getApiHost(), getInstitutionShortCodeFromTokenObject(self.cookieService),
            getSchoolCodeFromTokenObject(self.cookieService)), options)
            .map(this.extractEnrolledStudent)
            .catch(this.handleError);
    }

    getEnrolledStudentsForAdmin(): Observable<EnrolledStudent[]> {
        let self = this;
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': getAuthorizationHeader(self.cookieService)
        });
        let options = new RequestOptions({ headers: headers });
        console.log('getEnrolledStudentsForAdmin: ', self.getEnrolledStudentsUrl);
        return this.http.get(format(self.getEnrolledStudentsUrl, getApiHost(), getInstitutionShortCodeFromTokenObject(self.cookieService),
            getSchoolCodeFromTokenObject(self.cookieService)), options)
            .map(this.extractEnrolledStudent)
            .catch(this.handleError);
    }

    private extractEnrolledStudent(res: Response): EnrolledStudent[] {
        let body = res.json();
        console.log('extractData: ', body);
        return body;
    }

    private extractStudentId(res: Response): string {
        let body = res.json();
        let studentId = body.studentId;
        console.log('extractData: ', body);
        return studentId;
    }

    private handleError(error: any) {
        try {
            console.error('LALALA:', error.statusText); // log to console instead
            return _throw._throw(error.statusText);
        } catch (err) {
            console.error('LALALA1:', 'Actual error from server: ', error);
            console.error('LALALA2:', 'Error while parsing error: ', err);
            return _throw._throw('Unknown service error');
        }
    }

}