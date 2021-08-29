import { Component, h, Prop } from '@stencil/core';
import Plotly from 'plotly.js-dist-min';

@Component({
    tag: 'nw-member',
    styleUrl: 'member.scss',
})
export class Member {
    @Prop() memberId: number;
    private tabElement: any;
    private chartsDiv1: any;
    private chartsDiv2: any;
    private warChart: any;

    componentDidLoad() {
        this.tabElement.select('tab-detail');
        this.renderChart();
        this.renderWarChart();
    }

    renderChart() {
        const data1 = [
            {
                type: 'scatterpolar',
                r: [20, 250, 250, 50, 35, 40, 10, 150, 100],
                theta: ['Jewel crafting', 'Engineering', 'Food / Cooking', 'Tailor / Outfitting/ Armoring', 'Weaponsmithing', 'Arcane', 'Furnishing', 'Stone cutting'],
                fill: 'toself',
            },
        ];
        const data2 = [
            {
                type: 'scatterpolar',
                r: [175, 200, 170, 50, 250, 150, 50, 150, 100, 0],
                theta: ['Smelting', 'Woodworking', 'Weaving', 'Leatherworking', 'Logging', 'Mining', 'Harvesting', 'Tracking & Skinning', 'Fishing'],
                fill: 'toself',
            },
        ];
        const layout = {
            polar: {
                radialaxis: {
                    visible: true,
                    range: [0, 250],
                },
            },
            showlegend: false,
        };

        const config = { responsive: true };

        Plotly.newPlot(this.chartsDiv1, data1, layout, config);
        Plotly.newPlot(this.chartsDiv2, data2, layout, config);
    }

    renderWarChart() {
        const trace1 = {
            x: ['Wednesday(Everfall)', 'Wednesday(Windsward)', "Thursday(Monarch's Bluff)", 'Friday(First Light)'],
            y: [5255, 63257, 20423, 10565],
            type: 'scatter',
            name: 'Damage',
        };

        const trace2 = {
            x: ['Wednesday(Everfall)', 'Wednesday(Windsward)', "Thursday(Monarch's Bluff)", 'Friday(First Light)'],
            y: [1600765, 783389, 644622, 597697],
            type: 'scatter',
            name: 'Healing',
        };

        const data = [trace1, trace2];

        Plotly.newPlot(this.warChart, data);
    }

    render() {
        return [
            <ion-header>
                <ion-toolbar color="primary">
                    <ion-buttons slot="start">
                        <ion-back-button defaultHref="/members" />
                    </ion-buttons>
                    <ion-title>Member Details</ion-title>
                    <ion-buttons slot="secondary">
                        <ion-button href={`/member/${this.memberId}/edit`}>
                            <ion-icon name="pencil-outline"></ion-icon>
                        </ion-button>
                    </ion-buttons>
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
                                <ion-item>
                                    <ion-chip>
                                        <ion-icon name="skull-outline"></ion-icon>
                                        <ion-label>PVP</ion-label>
                                    </ion-chip>
                                    <ion-chip>
                                        <ion-icon name="pizza-outline"></ion-icon>
                                        <ion-label>Crafter</ion-label>
                                    </ion-chip>
                                    <ion-chip>
                                        <ion-icon name="rocket-outline"></ion-icon>
                                        <ion-label>Siege Team</ion-label>
                                    </ion-chip>
                                </ion-item>
                                <ion-card-content>Any notes about this Member.</ion-card-content>
                            </ion-card>
                        </section>
                    </ion-tab>

                    <ion-tab tab="tab-level">
                        <section class="section is-large">
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
                            <ion-card>
                                <ion-item>
                                    <ion-label slot="start">Weapon 1</ion-label>
                                    <ion-note slot="end">Musket</ion-note>
                                </ion-item>
                                <ion-item>
                                    <ion-label slot="start">Weapon 2</ion-label>
                                    <ion-note slot="end">Raipier</ion-note>
                                </ion-item>
                            </ion-card>
                        </section>
                    </ion-tab>

                    <ion-tab tab="tab-stats">
                        <section class="section is-large">
                            <ion-grid>
                                <ion-row>
                                    <ion-col>
                                        <ion-card>
                                            <ion-card-header>
                                                <ion-card-title>Crafting</ion-card-title>
                                            </ion-card-header>
                                            <ion-card-content
                                                ref={el => {
                                                    this.chartsDiv1 = el;
                                                }}
                                            ></ion-card-content>
                                        </ion-card>
                                    </ion-col>
                                    <ion-col>
                                        <ion-card>
                                            <ion-card-header>
                                                <ion-card-title>Tradeskill</ion-card-title>
                                            </ion-card-header>
                                            <ion-card-content
                                                ref={el => {
                                                    this.chartsDiv2 = el;
                                                }}
                                            ></ion-card-content>
                                        </ion-card>
                                    </ion-col>
                                </ion-row>
                            </ion-grid>
                        </section>
                    </ion-tab>

                    <ion-tab tab="tab-war">
                        <section class="section is-large">
                            <ion-card>
                                <ion-card-header>
                                    <ion-card-title>Last 4 war stats</ion-card-title>
                                </ion-card-header>
                                <ion-card-content
                                    ref={el => {
                                        this.warChart = el;
                                    }}
                                ></ion-card-content>
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
                            <ion-label>Game</ion-label>
                        </ion-tab-button>

                        <ion-tab-button tab="tab-stats">
                            <ion-icon name="stats-chart-outline"></ion-icon>
                            <ion-label>Stats</ion-label>
                        </ion-tab-button>

                        <ion-tab-button tab="tab-war">
                            <ion-icon name="game-controller-outline"></ion-icon>
                            <ion-label>War</ion-label>
                        </ion-tab-button>
                    </ion-tab-bar>
                </ion-tabs>
            </ion-content>,
        ];
    }
}
