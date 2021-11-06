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
    @State() attendanceImage: File;
    @State() performanceReportImages: File[];
    @State() standbyImages: File[];

    private imageAttendenceInput: any;
    private imageReportInput: any;

    @Event() submitButtonClicked: EventEmitter;
    @Event() closeButtonClicked: EventEmitter;

    private imageAttendenceStandbyInput: any;

    async disconnectedCallback() {
        delete this.attendanceImage;
        delete this.performanceReportImages;
        delete this.standbyImages;
    }

    async componentDidLoad() {
        this.imageAttendenceInput.addEventListener('change', async e => {
            const {
                target: { files },
            } = e;

            const file = files[0];
            this.attendanceImage = file;
        });

        this.imageReportInput.addEventListener('change', async e => {
            const {
                target: { files },
            } = e;

            const fileList = [];
            for (let i = 0; i < files.length; i++) {
                fileList.push(files[i]);
            }

            this.performanceReportImages = fileList;
        });

        this.imageAttendenceStandbyInput.addEventListener('change', async e => {
            const {
                target: { files },
            } = e;
            const fileList = [];
            for (let i = 0; i < files.length; i++) {
                fileList.push(files[i]);
            }

            this.standbyImages = fileList;
        });
    }

    private dismissModal(e: any) {
        this.closeButtonClicked.emit(e.detail);
    }
    private onSubmitButtonClick(_e) {
        this.submitButtonClicked.emit({
            roster: this.attendanceImage,
            standby: this.standbyImages,
            performance: this.performanceReportImages,
        });
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
                                        disabled={!!this.attendanceImage}
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
                                        disabled={!!this.standbyImages}
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
                            </ion-row>
                            <ion-row>
                                <ion-col>
                                    <ion-button
                                        color="secondary"
                                        fill="outline"
                                        disabled={!!this.performanceReportImages}
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
                    {!!this.attendanceImage && (
                        <ion-item>
                            <ion-label position="stacked" color={'light'}>
                                Main Roster
                            </ion-label>
                            <ion-card>
                                <img src={URL.createObjectURL(this.attendanceImage)} style={{ 'width': '150px', 'height': '150px', 'object-fit': 'cover' }} />
                            </ion-card>
                        </ion-item>
                    )}
                    {!!this.standbyImages && (
                        <ion-item-group>
                            <ion-item-divider>
                                <ion-label color={'light'}>Standby page</ion-label>
                            </ion-item-divider>
                            <ion-item>
                                {this.standbyImages.map(standby => (
                                    <ion-card>
                                        <img src={URL.createObjectURL(standby)} style={{ 'width': '150px', 'height': '150px', 'object-fit': 'cover' }} />
                                    </ion-card>
                                ))}
                            </ion-item>
                        </ion-item-group>
                    )}
                    {!!this.performanceReportImages && (
                        <ion-item-group>
                            <ion-item-divider>
                                <ion-label color={'light'}>Ranking page</ion-label>
                            </ion-item-divider>
                            <ion-item>
                                {this.performanceReportImages.map(r => (
                                    <ion-card>
                                        <img src={URL.createObjectURL(r)} style={{ 'width': '150px', 'height': '150px', 'object-fit': 'cover' }} />
                                    </ion-card>
                                ))}
                            </ion-item>
                        </ion-item-group>
                    )}
                    <ion-item>
                        <ion-button
                            slot="end"
                            disabled={!this.attendanceImage || !this.standbyImages || !this.performanceReportImages}
                            fill="solid"
                            onClick={ev => this.onSubmitButtonClick(ev)}
                        >
                            Submit
                        </ion-button>
                    </ion-item>
                </ion-content>
            </Host>
        );
    }
}
