import { Component, h, Prop, State } from '@stencil/core';
import { GraphData } from 'd3-stencil/dist/types/interfaces';

@Component({
    tag: 'nw-member',
    styleUrl: 'member.scss',
})
export class Member {
    @Prop() memberId: number;
    private tabElement: any;

    @State() graphData: GraphData;

    componentDidLoad() {
        this.tabElement.select('tab-detail');
        // this.graphData = {
        //     pieChart: {
        //         labelFormat: 'ANY',
        //         dataFormat: 'GROUPED_TWO_DIGITS',
        //     },
        //     styles: {
        //         width: '100%',
        //         height: '500px',
        //         margin: '20px 0',
        //     },
        //     colors: [
        //         '#98abc5',
        //         '#8a89a6',
        //         '#7b6888',
        //         '#d0743c',
        //         '#ff8c00',
        //     ],
        //     labels: ['PVE', 'Crafting', 'PVP', 'Company War', 'Invasion'],
        //     data: [
        //         [2704659, 4499890, 2159981, 3853788, 16106543],
        //         [2704659, 4499890, 2159981, 3853788, 16106543],
        //         [2704659, 4499890, 2159981, 3853788, 16106543],
        //         [2704659, 4499890, 2159981, 3853788, 16106543],
        //         [2704659, 4499890, 2159981, 3853788, 16106543]
        //     ],
        // };

        this.graphData = {
            labels: ['<5', '5-13', '14-17', '18-24', '25-44', '45-64', '≥65'],
            barChart: {
                axis: {
                    x: {
                        format: 'CURRENCY',
                    },
                },
                margin: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                },
            },
            styles: {
                width: '100%',
                height: '500px',
                margin: '20px 0',
            },
            colors: ['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00'],
            data: [[1250, 200, 20, 140, 600, 3002, 5985]],
        };
    }

    render() {
        return [
            <ion-header>
                <ion-toolbar color="primary">
                    <ion-buttons slot="start">
                        <ion-back-button defaultHref="/members" />
                    </ion-buttons>
                    <ion-title>Member Details</ion-title>
                </ion-toolbar>
            </ion-header>,

            <ion-content class="ion-padding">
                <p>Members Details</p>

                <ion-tabs
                    ref={el => {
                        this.tabElement = el;
                    }}
                >
                    <ion-tab tab="tab-detail">
                        <section class="section">
                            <ion-nav></ion-nav>
                            <ion-card>
                                <ion-card-header>
                                    <ion-card-subtitle>Unbroken</ion-card-subtitle>
                                    <ion-card-title>Bodnapa</ion-card-title>
                                </ion-card-header>
                            </ion-card>
                            <ion-card>
                                <ion-item>
                                    <ion-icon name="logo-discord" slot="start"></ion-icon>
                                    <ion-label>Bodnapa#0001</ion-label>
                                </ion-item>
                                <ion-item>
                                    <div slot="start">In Game Name</div>
                                    <ion-label>Bodnapa</ion-label>
                                </ion-item>
                                <ion-card-content>Any notes about this Member.</ion-card-content>
                            </ion-card>
                            <ion-card>
                                <horizontal-bar-chart graphData={this.graphData} />
                            </ion-card>
                        </section>
                    </ion-tab>

                    <ion-tab tab="tab-level">
                        <section class="section">
                            <ion-nav></ion-nav>
                            <ion-card>
                                <ion-card-header>
                                    <ion-card-subtitle>Unbroken</ion-card-subtitle>
                                    <ion-card-title>Bodnapa</ion-card-title>
                                </ion-card-header>
                            </ion-card>
                            <ion-card>
                                <ion-item>
                                    <ion-label slot="start">Level</ion-label>
                                    <ion-badge color="primary">15</ion-badge>
                                </ion-item>
                            </ion-card>
                        </section>
                    </ion-tab>

                    <ion-tab-bar slot="top">
                        <ion-tab-button tab="tab-detail">
                            <ion-icon name="book-outline"></ion-icon>
                            <ion-label>Details</ion-label>
                        </ion-tab-button>

                        <ion-tab-button tab="tab-level">
                            <ion-icon name="speedometer-outline"></ion-icon>
                            <ion-label>Game Levels</ion-label>
                        </ion-tab-button>
                    </ion-tab-bar>
                </ion-tabs>
            </ion-content>,
        ];
    }
}
