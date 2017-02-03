import { Injectable } from '@angular/core';

import { Http, Response, } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs';

import { Grade, Class, Teacher, Institution, Student } from '../models';
import { Subject } from 'rxjs/Subject';
import { getApiHost } from './serviceHelper';

@Injectable()
export class SchoolService {

    private _school = new Subject<Institution>();
    school = this._school.asObservable();

    private getInstitutionUrl: string = getApiHost() + '/institution/shortcode';

    constructor(private http: Http) {
        console.log('hello SchoolService');
    }

    dummyGetSchool(cb: (result: Institution) => any) {
        setTimeout(function () {
            cb(new Institution('ISS', '123456', 'InstitutionName', 'admin@sslice.com', 'blah', 'blah', 'blah', 12344, 'INDIA'));
        }, 1500);
    }

    dummyGetAllSchools(cb: (result: Institution[]) => any) {
        setTimeout(function () {
            cb([new Institution('ISS1', '1236', 'InstitutionName11', 'admin2@sslice.com', 'blah', 'blah', 'blah', 12344, 'INDIA'),
            new Institution('ISS3', '136', 'InstitutionName32', 'admin@sslice.com', 'blah', 'blah', 'blah', 12344, 'INDIA'),
            new Institution('ISS4', '1246', 'InstitutionName12', 'admin4@sslice.com', 'blah', 'blah', 'blah', 12344, 'INDIA'),
            new Institution('ISS3', '33456', 'InstitutionName12', 'admin8@sslice.com', 'blah', 'blah', 'blah', 12344, 'INDIA')
            ]);
        }, 1500);
    }

    dummyGetAllClasses(cb: (result: Class[]) => any) {
        setTimeout(function () {
            cb([
                new Class('Class17', 'CLS17', 1236, 3500),
                new Class('Class71', 'CLS71', 1236, 1500),
                new Class('Class12', 'CLS12', 1236, 2500),
                new Class('Class21', 'CLS21', 1236, 500),
            ]);
        }, 1500);
    }

    dummyGetAllGrades(cb: (result: Grade[]) => any) {
        setTimeout(function () {
            cb([
                new Grade('Grade17', 'G17', [false, false], 1236, new Date(), new Date(), 12),
                new Grade('Grade71', 'G71', [false, false], 1236, new Date(), new Date(), 12),
                new Grade('Grade12', 'G12', [false, false], 1236, new Date(), new Date(), 12),
                new Grade('Grade21', 'G21', [false, false], 1236, new Date(), new Date(), 12)
            ]);
        }, 1500);
    }

    dummyGetAllTeachers(cb: (result: Teacher[]) => any) {
        setTimeout(function () {
            cb([
                new Teacher(12, 'teacher61'),
                new Teacher(12, 'teacher12'),
                new Teacher(12, 'teacher31'),
                new Teacher(12, 'teacher11'),
            ]);
        }, 1500);
    }

    dummyGetAllStudents(cb: (result: Student[]) => any) {
        setTimeout(function () {
            cb([
                new Student(12, 'student61', 'classA'),
                new Student(2, 'student12', 'classB'),
                new Student(1, 'student31', 'classC'),
                new Student(22, 'student11', 'classD'),
            ]);
        }, 1500);
    }

    getSchool(institutionCode: string): Observable<Institution> {
        console.log('getSchool called');
        let getJSONAsObservable: () => Observable<Institution> = Rx.Observable.bindCallback(this.dummyGetSchool);
        return getJSONAsObservable();

        /*
            let headers = new Headers({ 'Content-Type': 'application/json' });
            let options = new RequestOptions({ headers: headers });
            let params: URLSearchParams = new URLSearchParams();
            let url = this.getInstitutionUrl;
            params.set('shortCode', institutionCode);
            console.log('url: ', url, 'params: ', params);
            return this.http.get(this.getInstitutionUrl, { search: params })
                .map(this.extractData)
                .catch(this.handleError);
        */
    }

    public getAllSchools(): Observable<Institution[]> {
        console.log('getSchool called');
        let getJSONAsObservable: () => Observable<Institution[]> = Rx.Observable.bindCallback(this.dummyGetAllSchools);
        return getJSONAsObservable();
    }

    public getAllClasses(): Observable<Class[]> {
        console.log('getClasses called');
        let getJSONAsObservable: () => Observable<Class[]> = Rx.Observable.bindCallback(this.dummyGetAllClasses);
        return getJSONAsObservable();
    }

    public getAllGrades(): Observable<Grade[]> {
        console.log('getClasses called');
        let getJSONAsObservable: () => Observable<Grade[]> = Rx.Observable.bindCallback(this.dummyGetAllGrades);
        return getJSONAsObservable();
    }

    public getAllTeachers(): Observable<Teacher[]> {
        console.log('getTeachers called');
        let getJSONAsObservable: () => Observable<Teacher[]> = Rx.Observable.bindCallback(this.dummyGetAllTeachers);
        return getJSONAsObservable();
    }

    public getAllStudents(): Observable<Student[]> {
        console.log('getStudents called');
        let getJSONAsObservable: () => Observable<Student[]> = Rx.Observable.bindCallback(this.dummyGetAllStudents);
        return getJSONAsObservable();
    }

    private extractData(res: Response) {
        let inst = res.json();
        this._school = inst;
        console.log('extractData: ', this._school);
        return this._school || {};
    }

    private handleError(error: any) {
        try {
            let errMsg = JSON.parse(error.json().errorMessage).message;
            console.error(errMsg); // log to console instead
            return Observable.throw(errMsg);
        } catch (err) {
            console.error('Actual error from service ', error);
            console.error('Error while parsing error', err);
            return Observable.throw('Unknown service error');
        }
    }
}