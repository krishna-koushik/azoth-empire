import { Component, Event, EventEmitter, h, Host, State } from '@stencil/core';
// import { createWorker, OEM, PSM } from 'tesseract.js';
// import { warRoster } from '../../helpers/utils';

@Component({
    tag: 'war-report',
    styleUrl: 'war-report.scss',
    shadow: true,
})
export class WarReport {
    @State() report: any = {
        name: '',
        location: '',
        startDate: Date.now().toString(),
        endDate: Date.now().toString(),
    };
    @State() processingImages: any = {};
    @State() processing: boolean = false;
    @State() attendanceImage: any;
    @State() performanceReportImages: any[] = [];

    private imageAttendenceInput: any;
    private imageReportInput: any;
    private submitButton: any;

    @Event() submitButtonClicked: EventEmitter;
    @Event() closeButtonClicked: EventEmitter;
    private nameInput: any;
    private locationInput: any;
    private reportStartDateInput: any;
    private reportEndDateInput: any;

    private imageAttendenceStandbyInput: any;

    async disconnectedCallback() {
        // await this.imageProcessor.terminate();
    }

    async componentDidLoad() {
        this.submitButton.addEventListener('click', e => {
            this.onSubmitButtonClick(e);
        });

        this.imageAttendenceInput.addEventListener('change', async e => {
            const {
                target: { files },
            } = e;

            const file = files[0];

            this.attendanceImage = { ...file };
        });

        this.imageReportInput.addEventListener('change', async e => {
            const {
                target: { files },
            } = e;

            this.performanceReportImages = [...files];

            // Process the war report after the war which captures performance of all players
            // for (const file of files) {
            //     await this.startTesseract(file);
            // }
        });

        this.nameInput.addEventListener('ionChange', e => {
            const { detail: { value = '' } = {} } = e;
            this.report.name = value;
            this.report = { ...this.report };
        });

        this.locationInput.addEventListener('ionChange', e => {
            const { detail: { value = '' } = {} } = e;
            this.report.location = value;
            this.report = { ...this.report };
        });

        this.reportStartDateInput.addEventListener('ionChange', e => {
            const { detail: { value = '' } = {} } = e;
            console.log(value);
            this.report.startDate = value;
            this.report = { ...this.report };
        });

        this.reportEndDateInput.addEventListener('ionChange', e => {
            const { detail: { value = '' } = {} } = e;
            console.log(value);
            this.report.endDate = value;
            this.report = { ...this.report };
        });
    }

    private dismissModal(e: any) {
        this.closeButtonClicked.emit(e.detail);
    }
    private onSubmitButtonClick(_e) {
        this.submitButtonClicked.emit(this.report);
    }

    getProgress(processingImages) {
        const keys = Object.keys(processingImages);
        let progress: number[] = [];
        keys.forEach(k => {
            progress.push(processingImages[k]);
        });
        this.processing = Math.min(...progress) < 1;
        return Math.min(...progress);
    }

    render() {
        return (
            <Host>
                <ion-header>
                    <ion-toolbar>
                        <ion-title>Modal Header</ion-title>
                        <ion-buttons slot="primary">
                            <ion-button onClick={ev => this.dismissModal(ev)}>
                                <ion-icon slot="icon-only" name="close"></ion-icon>
                            </ion-button>
                        </ion-buttons>
                    </ion-toolbar>
                </ion-header>
                <ion-content class="ion-padding" overflow-scroll="false">
                    <ion-item>
                        <ion-grid>
                            <ion-row>
                                <ion-col>
                                    <ion-button
                                        color="secondary"
                                        fill="outline"
                                        onClick={_ev => {
                                            this.imageAttendenceInput.click();
                                        }}
                                    >
                                        <ion-icon slot="start" name="image-outline"></ion-icon>
                                        War Army roster
                                    </ion-button>
                                    <input
                                        hidden
                                        type="file"
                                        accept="image/*"
                                        ref={el => {
                                            this.imageAttendenceInput = el;
                                        }}
                                    />
                                </ion-col>
                            </ion-row>
                            <ion-row>
                                <ion-col>
                                    <ion-button
                                        color="secondary"
                                        fill="outline"
                                        onClick={_ev => {
                                            this.imageAttendenceStandbyInput.click();
                                        }}
                                    >
                                        <ion-icon slot="start" name="image-outline"></ion-icon>
                                        War Standby roster
                                    </ion-button>
                                    <input
                                        hidden
                                        type="file"
                                        accept="image/*"
                                        multiple={true}
                                        ref={el => {
                                            this.imageAttendenceStandbyInput = el;
                                        }}
                                    />
                                </ion-col>
                                {!!this.attendanceImage && Object.keys(this.attendanceImage).length > 0 && (
                                    <ion-col>
                                        <img src={URL.createObjectURL(this.attendanceImage)} style={{ height: '100px', width: '100px' }} />
                                    </ion-col>
                                )}
                            </ion-row>
                            <ion-row>
                                <ion-col>
                                    <ion-button
                                        color="secondary"
                                        fill="outline"
                                        onClick={_ev => {
                                            this.imageReportInput.click();
                                        }}
                                    >
                                        <ion-icon slot="start" name="image-outline"></ion-icon>
                                        <input
                                            hidden
                                            type="file"
                                            accept="image/*"
                                            multiple={true}
                                            ref={el => {
                                                this.imageReportInput = el;
                                            }}
                                        />
                                        War Performance
                                    </ion-button>
                                </ion-col>
                            </ion-row>
                        </ion-grid>
                    </ion-item>
                    <ion-item>
                        <ion-button
                            slot="end"
                            disabled={this.processing}
                            ref={el => {
                                this.submitButton = el;
                            }}
                            fill="solid"
                        >
                            Submit
                        </ion-button>
                    </ion-item>
                </ion-content>
            </Host>
        );
    }
}
