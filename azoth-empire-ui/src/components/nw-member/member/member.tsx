import { Component, h, Prop, State } from '@stencil/core';
import Plotly from 'plotly.js-dist-min';
import GraphQLService from '../../../services/graphql.service';
import NWGQLQuery from '../../../interfaces/graphql.interface';
import { convertToDisplayDate } from '../../../helpers/utils';

@Component({
    tag: 'nw-member',
    styleUrl: 'member.scss',
})
export class Member {
    @Prop() memberId: string = '';
    @State() member: any = {};
    private tabElement: any;
    private craftingSkillChart: any;
    private tradeSkillChart: any;
    private warChart: any;

    async componentWillLoad() {
        const { data: { player = {} } = {} } = await GraphQLService.query(NWGQLQuery.playerQuery(this.memberId));

        this.member = { ...player };
    }

    componentDidLoad() {
        this.tabElement?.select('tab-detail');
        if (!!this.member.gameData) {
            this.renderChart();
            this.renderWarChart();
        }
    }

    renderChart() {
        const {
            gameData: {
                skills: {
                    trade: { jewel = 0, engineering = 0, food = 0, armoring = 0, weaponsmithing = 0, arcana = 0, furnishing = 0, stone = 0 } = {},
                    gathering: { smelting = 0, woodworking = 0, weaving = 0, leatherworking = 0, logging = 0, mining = 0, harvesting = 0, skinning = 0, fishing = 0 } = {},
                } = {},
            } = {},
        } = this.member;

        const data1 = [
            {
                type: 'scatterpolar',
                r: [jewel, engineering, food, armoring, weaponsmithing, arcana, furnishing, stone],
                theta: ['Jewel crafting', 'Engineering', 'Food / Cooking', 'Tailor / Outfitting/ Armoring', 'Weaponsmithing', 'Arcane', 'Furnishing', 'Stone cutting'],
                fill: 'toself',
            },
        ];
        const data2 = [
            {
                type: 'scatterpolar',
                r: [smelting, woodworking, weaving, leatherworking, logging, mining, harvesting, skinning, fishing],
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

        Plotly.newPlot(this.craftingSkillChart, data1, layout, config);
        Plotly.newPlot(this.tradeSkillChart, data2, layout, config);
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
                    <ion-title>Member Details: {this.member.name}</ion-title>
                </ion-toolbar>
            </ion-header>,

            <ion-content class="ion-padding" overflow-scroll="false">
                <ion-tabs
                    ref={el => {
                        this.tabElement = el;
                    }}
                >
                    <ion-tab tab="tab-detail">
                        <ion-content class="ion-padding" overflow-scroll="false">
                            <section class="section">
                                <ion-nav></ion-nav>
                                <ion-card>
                                    <ion-card-header>
                                        <ion-card-subtitle>{this.member.guild}</ion-card-subtitle>
                                        <ion-card-title>{this.member.name}</ion-card-title>
                                    </ion-card-header>
                                </ion-card>
                                <ion-card>
                                    {!!this.member.discord && (
                                        <ion-item>
                                            <ion-icon name="logo-discord" slot="start"></ion-icon>
                                            <ion-label>{this.member.discord.name}</ion-label>
                                        </ion-item>
                                    )}
                                    <ion-item>
                                        <div slot="start">In Game Name</div>
                                        <ion-label>{this.member.name}</ion-label>
                                    </ion-item>
                                    <ion-item>
                                        <div slot="start">Join Date</div>
                                        <ion-label>{convertToDisplayDate(this.member.joinDate)}</ion-label>
                                    </ion-item>
                                    {!!this.member.gameData && (
                                        <ion-item>
                                            {this.member.gameData.teams.map(t => (
                                                <ion-chip>
                                                    <ion-label>{t}</ion-label>
                                                </ion-chip>
                                            ))}
                                        </ion-item>
                                    )}

                                    <ion-card-content>{this.member.notes}</ion-card-content>
                                </ion-card>
                            </section>
                        </ion-content>
                    </ion-tab>
                    {!!this.member.gameData && (
                        <ion-tab tab="tab-game">
                            <ion-content class="ion-padding" overflow-scroll="false">
                                <section class="section is-large">
                                    <ion-nav></ion-nav>
                                    <ion-card>
                                        <ion-card-header>
                                            <ion-card-subtitle>{this.member.guild}</ion-card-subtitle>
                                            <ion-card-title>{this.member.name}</ion-card-title>
                                        </ion-card-header>
                                    </ion-card>
                                    <ion-grid>
                                        <ion-row>
                                            <ion-col>
                                                <ion-card>
                                                    <ion-item>
                                                        <ion-label slot="start">Level</ion-label>
                                                        <ion-badge color="primary">{this.member.gameData.level}</ion-badge>
                                                    </ion-item>
                                                </ion-card>
                                                <ion-card>
                                                    <ion-item>
                                                        <ion-label slot="start">Average GS</ion-label>
                                                        <ion-badge color="secondary">{this.member.gameData.averageGs}</ion-badge>
                                                    </ion-item>
                                                </ion-card>
                                            </ion-col>
                                        </ion-row>
                                    </ion-grid>
                                    <ion-grid>
                                        <ion-row>
                                            <ion-col>
                                                <ion-card>
                                                    {!!this.member.gameData.weapon && this.member.gameData.weapon.length > 0 && (
                                                        <ion-item>
                                                            <ion-label slot="start">Weapon 1</ion-label>
                                                            <ion-note slot="end">{this.member.gameData.weapon[0]}</ion-note>
                                                        </ion-item>
                                                    )}
                                                    {!!this.member.gameData.weapon && this.member.gameData.weapon.length > 0 && (
                                                        <ion-item>
                                                            <ion-label slot="start">Weapon 2</ion-label>
                                                            <ion-note slot="end">{this.member.gameData.weapon[1]}</ion-note>
                                                        </ion-item>
                                                    )}
                                                    <ion-item>
                                                        <ion-label slot="start">Amulet</ion-label>
                                                        <ion-note slot="end">{this.member.gameData.amulet}</ion-note>
                                                    </ion-item>
                                                    <ion-item>
                                                        <ion-label slot="start">Ring</ion-label>
                                                        <ion-note slot="end">{this.member.gameData.ring}</ion-note>
                                                    </ion-item>
                                                    <ion-item>
                                                        <ion-label slot="start">Earring</ion-label>
                                                        <ion-note slot="end">{this.member.gameData.earring}</ion-note>
                                                    </ion-item>
                                                    <ion-item>
                                                        <ion-label slot="start">Bag 1</ion-label>
                                                        <ion-note slot="end">{this.member.gameData.bag1}</ion-note>
                                                    </ion-item>
                                                    <ion-item>
                                                        <ion-label slot="start">Bag 2</ion-label>
                                                        <ion-note slot="end">{this.member.gameData.bag2}</ion-note>
                                                    </ion-item>
                                                    <ion-item>
                                                        <ion-label slot="start">Bag 3</ion-label>
                                                        <ion-note slot="end">{this.member.gameData.bag3}</ion-note>
                                                    </ion-item>
                                                </ion-card>
                                            </ion-col>
                                            <ion-col>
                                                <ion-card>
                                                    <ion-item>
                                                        <ion-label slot="start">Helm</ion-label>
                                                        <ion-note slot="end">{this.member.gameData.helm}</ion-note>
                                                    </ion-item>
                                                    <ion-item>
                                                        <ion-label slot="start">Chest</ion-label>
                                                        <ion-note slot="end">{this.member.gameData.chest}</ion-note>
                                                    </ion-item>
                                                    <ion-item>
                                                        <ion-label slot="start">Hands</ion-label>
                                                        <ion-note slot="end">{this.member.gameData.hands}</ion-note>
                                                    </ion-item>
                                                    <ion-item>
                                                        <ion-label slot="start">Pants</ion-label>
                                                        <ion-note slot="end">{this.member.gameData.pants}</ion-note>
                                                    </ion-item>
                                                    <ion-item>
                                                        <ion-label slot="start">Boots</ion-label>
                                                        <ion-note slot="end">{this.member.gameData.boots}</ion-note>
                                                    </ion-item>
                                                    <ion-item>
                                                        <ion-label slot="start">Sheild</ion-label>
                                                        <ion-note slot="end">{this.member.gameData.sheild}</ion-note>
                                                    </ion-item>
                                                </ion-card>
                                            </ion-col>
                                        </ion-row>

                                        {!!this.member.gameData.attribute && (
                                            <ion-row>
                                                <ion-col>
                                                    <ion-card>
                                                        <ion-item>
                                                            <ion-label slot="start">Primary</ion-label>
                                                            <ion-note slot="end">{this.member.gameData.attribute.primary}</ion-note>
                                                        </ion-item>
                                                        <ion-item>
                                                            <ion-label slot="start">Secondary</ion-label>
                                                            <ion-note slot="end">{this.member.gameData.attribute.secondary}</ion-note>
                                                        </ion-item>
                                                    </ion-card>
                                                </ion-col>
                                                <ion-col>
                                                    <ion-card>
                                                        <ion-item>
                                                            <ion-label slot="start">Preferred Weight Class</ion-label>
                                                            <ion-note slot="end">{this.member.gameData.attribute.preferredWeightClass}</ion-note>
                                                        </ion-item>
                                                    </ion-card>
                                                </ion-col>
                                            </ion-row>
                                        )}
                                    </ion-grid>
                                </section>
                            </ion-content>
                        </ion-tab>
                    )}

                    {!!this.member.gameData && (
                        <ion-tab tab="tab-stats">
                            <ion-content class="ion-padding" overflow-scroll="false">
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
                                                            this.craftingSkillChart = el;
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
                                                            this.tradeSkillChart = el;
                                                        }}
                                                    ></ion-card-content>
                                                </ion-card>
                                            </ion-col>
                                        </ion-row>
                                    </ion-grid>
                                </section>
                            </ion-content>
                        </ion-tab>
                    )}

                    {!!this.member.gameData && (
                        <ion-tab tab="tab-war">
                            <ion-content class="ion-padding" overflow-scroll="false">
                                <section class="section is-large">
                                    <ion-card>
                                        <ion-card-header>
                                            <ion-card-title>Last few war stats</ion-card-title>
                                        </ion-card-header>
                                        <ion-card-content
                                            ref={el => {
                                                this.warChart = el;
                                            }}
                                        ></ion-card-content>
                                    </ion-card>
                                </section>
                            </ion-content>
                        </ion-tab>
                    )}

                    <ion-tab-bar slot="top">
                        <ion-tab-button tab="tab-detail">
                            <ion-icon name="book-outline"></ion-icon>
                            <ion-label>Details</ion-label>
                        </ion-tab-button>
                        {!!this.member.gameData && (
                            <ion-tab-button tab="tab-game">
                                <ion-icon name="speedometer-outline"></ion-icon>
                                <ion-label>Game</ion-label>
                            </ion-tab-button>
                        )}
                        {!!this.member.gameData && (
                            <ion-tab-button tab="tab-stats">
                                <ion-icon name="stats-chart-outline"></ion-icon>
                                <ion-label>Stats</ion-label>
                            </ion-tab-button>
                        )}
                        {!!this.member.gameData && (
                            <ion-tab-button tab="tab-war">
                                <ion-icon name="game-controller-outline"></ion-icon>
                                <ion-label>War</ion-label>
                            </ion-tab-button>
                        )}
                    </ion-tab-bar>
                </ion-tabs>
            </ion-content>,
        ];
    }
}
