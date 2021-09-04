import { Component, Event, EventEmitter, h, Host, State } from '@stencil/core';
import { createWorker, OEM, PSM } from 'tesseract.js';
import { warRoster } from '../../helpers/utils';

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

    private imageProcessor = createWorker({
        logger: m => {
            console.log(m);
            const { progress, workerId } = m;
            this.processingImages[workerId] = progress;

            this.processingImages = { ...this.processingImages };
            console.log(this.processingImages);
        },
    });

    private imageAttendenceInput: any;
    private imageReportInput: any;
    private submitButton: any;

    @Event() submitButtonClicked: EventEmitter;
    @Event() closeButtonClicked: EventEmitter;
    private nameInput: any;
    private locationInput: any;
    private reportStartDateInput: any;
    private reportEndDateInput: any;

    async startTesseract(image) {
        this.processing = true;
        await this.imageProcessor.load();
        await this.imageProcessor.loadLanguage('eng');
        await this.imageProcessor.initialize('eng');
        await this.imageProcessor.setParameters({
            tessedit_ocr_engine_mode: OEM.TESSERACT_LSTM_COMBINED,
            tessedit_pageseg_mode: PSM.SPARSE_TEXT_OSD,
        });

        const { data } = await this.imageProcessor.recognize(image, {});
        console.log(data);
        return data;
    }

    async disconnectedCallback() {
        await this.imageProcessor.terminate();
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

            // Process the report which captures players for war attendance and which group they belonged to in the war.
            const roster = warRoster(URL.createObjectURL(file));
            const dataPromiseArray: any[] = roster.map(async img => {
                return await this.startTesseract(img);
            });
            const response = await Promise.all(dataPromiseArray);
            console.log('response', response);
        });

        this.imageReportInput.addEventListener('change', async e => {
            const {
                target: { files },
            } = e;

            this.performanceReportImages = [...files];

            // Process the war report after the war which captures performance of all players
            for (const file of files) {
                await this.startTesseract(file);
            }
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
                        <ion-label position="floating">Report Name</ion-label>
                        <ion-input
                            ref={el => {
                                this.nameInput = el;
                            }}
                            required={true}
                            max="250"
                            debounce={500}
                            value={this.report.name}
                            clear-input={true}
                        ></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-label position="floating">Location</ion-label>
                        <ion-input
                            ref={el => {
                                this.locationInput = el;
                            }}
                            required={true}
                            max="250"
                            debounce={500}
                            value={this.report.location}
                            clear-input={true}
                        ></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-label>Start Date & Time</ion-label>
                        <ion-datetime
                            ref={el => {
                                this.reportStartDateInput = el;
                            }}
                            value={this.report.startDate}
                            placeholder="Select Date & Time"
                            display-timezone="America/New_York"
                            display-format="MM/DD/YYYY h:mm A"
                            picker-format="MM/DD/YYYY h:mm A"
                        ></ion-datetime>
                    </ion-item>
                    <ion-item>
                        <ion-label>End Date & Time</ion-label>
                        <ion-datetime
                            ref={el => {
                                this.reportEndDateInput = el;
                            }}
                            value={this.report.endDate}
                            placeholder="Select Date & Time"
                            display-timezone="America/New_York"
                            display-format="MM/DD/YYYY h:mm A"
                            picker-format="MM/DD/YYYY h:mm A"
                        ></ion-datetime>
                    </ion-item>
                    {Object.keys(this.processingImages).length > 0 && (
                        <ion-item>
                            <ion-progress-bar value={this.getProgress(this.processingImages)}></ion-progress-bar>
                        </ion-item>
                    )}
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
                                        War roster
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
                                        War report
                                    </ion-button>
                                </ion-col>
                                {this.performanceReportImages.length > 0 && (
                                    <ion-col>
                                        {this.performanceReportImages.map(item => (
                                            <img src={URL.createObjectURL(item.src)} style={{ height: '100px', width: '100px' }} />
                                        ))}
                                    </ion-col>
                                )}
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
