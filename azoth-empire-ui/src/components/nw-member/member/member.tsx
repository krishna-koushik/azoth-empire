import { Component, h, Prop } from '@stencil/core';
import Plotly from 'plotly.js-dist-min';

@Component({
    tag: 'nw-member',
    styleUrl: 'member.scss',
})
export class Member {
    @Prop() memberId: number;
    private tabElement: any;
    private chartsDiv: any;

    componentDidLoad() {
        this.tabElement.select('tab-detail');
        this.renderChart();
    }

    renderChart() {
        const data = [
            {
                x: ['Jewel crafting', 'Engineering', 'Food / Cooking', 'Tailor / Outfitting/ Armoring', 'Weaponsmithing', 'Arcane', 'Furnishing', 'Stone cutting'],
                y: [20, 250, 250, 50, 35, 40, 10, 150, 100],
                type: 'bar',
            },
        ];
        const layout = {
            showlegend: false,
            xaxis: {
                tickangle: -45,
            },
        };

        const config = { responsive: true };

        Plotly.newPlot(this.chartsDiv, data, layout, config);
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
                            <ion-card>
                                <ion-card-header>
                                    <ion-card-title>Crafting</ion-card-title>
                                </ion-card-header>
                                <div
                                    ref={el => {
                                        this.chartsDiv = el;
                                    }}
                                ></div>
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
                    </ion-tab-bar>
                </ion-tabs>
            </ion-content>,
        ];
    }
}
