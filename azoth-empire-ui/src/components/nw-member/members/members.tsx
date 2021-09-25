import { Component, h, State } from '@stencil/core';
import GraphQLService from '../../../services/graphql.service';
import NWGQLQuery, { IPlayerOrder, OrderDirection, PlayerOrderField } from '../../../interfaces/graphql.interface';

@Component({
    tag: 'nw-members',
    styleUrl: 'members.scss',
})
export class Members {
    @State() memberList: any[] = [];
    @State() totalMembers: number = 0;
    @State() isLoading: boolean = false;
    @State() hasMorePlayers: boolean = true;
    @State() filters: any = {
        find: '',
        guild: 'all',
        active: 'all',
    };
    private searchInput: any;
    // private fabButton: any;
    private modalElement: any;

    private first: number = 25;
    private after: string = '';
    private before: string = '';
    private last: number;

    private orderBy: IPlayerOrder = {
        direction: OrderDirection.ASC,
        field: PlayerOrderField.NAME,
    };

    private infiniteScroll: any;
    private guildFilterInput: any;
    private activeFilterInput: any;

    async componentWillLoad() {
        const members = await this.fetchPlayers();
        this.memberList = [...members];
    }

    async fetchPlayers() {
        this.isLoading = true;
        const { data: { players: { edges: players = [], pageInfo = {} } = {} } = {} } = await GraphQLService.query(
            NWGQLQuery.playersQuery(this.first, this.after, this.last, this.before, this.orderBy),
        );

        this.totalMembers = pageInfo.total || 0;
        this.after = pageInfo.endCursor;
        this.isLoading = false;
        this.hasMorePlayers = pageInfo.hasNextPage || false;
        return players.map(p => p.node);
    }

    componentDidLoad() {
        this.searchInput.addEventListener('ionChange', e => {
            const { detail: { value = '' } = {} } = e;
            this.filters.find = value;
            this.filters = { ...this.filters };
        });

        this.guildFilterInput.addEventListener('ionChange', e => {
            const { detail: { value = '' } = {} } = e;
            this.filters.guild = value;
            this.filters = { ...this.filters };
        });

        this.activeFilterInput.addEventListener('ionChange', e => {
            const { detail: { value = '' } = {} } = e;
            this.filters.active = value;

            this.filters = { ...this.filters };
        });
    }

    async infiniteScrollMembers(_e) {
        if (!!this.hasMorePlayers) {
            const members = await this.fetchPlayers();
            (this.infiniteScroll as any).complete();
            this.memberList = [...this.memberList, ...members];
        } else {
            (this.infiniteScroll as any).disabled = true;
        }
    }

    private findMemberByCriteria(memberList: any[], filters: any = {}) {
        const { find = '', guild = 'all', active = 'all' } = filters;
        if (find.length > 0) {
            memberList = memberList.filter(m => m.name.toLowerCase().includes(find.toLowerCase()));
        }

        if (guild !== 'all') {
            memberList = memberList.filter(m => m.guild?.toLowerCase().includes(guild.toLowerCase()));
        }

        if (active !== 'all') {
            return memberList.filter(m => {
                return m.active === (active.toLowerCase() === 'active');
            });
        }
        return memberList;
    }

    async dismissModal() {
        await this.modalElement.dismiss({
            dismissed: true,
        });

        this.modalElement.remove();
    }

    renderMemberRow(member) {
        return (
            <tr>
                <td>
                    <ion-router-link href={`/member/${member._id}`} routerDirection="forward" class="underline" color="primary">
                        {member.name}
                    </ion-router-link>
                </td>
                <td>{member.guild}</td>
                <td>{member.active === true ? <ion-badge color="success">Yes</ion-badge> : <ion-badge color="danger">No</ion-badge>}</td>
            </tr>
        );
    }

    render() {
        return [
            <ion-header>
                <ion-toolbar color="primary">
                    <ion-buttons slot="start">
                        <ion-back-button defaultHref="/" />
                    </ion-buttons>
                    <ion-title>Members</ion-title>
                </ion-toolbar>
            </ion-header>,
            <ion-content class="ion-padding" overflow-scroll="false">
                <p>Members List</p>
                <section class="section is-large">
                    <h1 class="title">Member List</h1>
                    <h2 class="subtitle">List of New World members and the guilds they belong to</h2>
                    <div class="container">
                        <div class="block">
                            <ion-toolbar>
                                <ion-searchbar
                                    slot="start"
                                    ref={el => {
                                        this.searchInput = el;
                                    }}
                                    value={this.filters.find}
                                    placeholder="Find Members by Name"
                                    animated
                                    debounce={500}
                                    style={{ width: '500px' }}
                                ></ion-searchbar>
                                <ion-select
                                    slot="start"
                                    placeholder="Select Guild Filter"
                                    interface="popover"
                                    value={this.filters.guild}
                                    ref={el => {
                                        this.guildFilterInput = el;
                                    }}
                                >
                                    <ion-select-option value="all">All Guilds</ion-select-option>
                                    <ion-select-option value="PAX">PAX</ion-select-option>
                                    <ion-select-option value="Unbroken">Unbroken</ion-select-option>
                                </ion-select>
                                <ion-select
                                    slot="start"
                                    placeholder="Select Active Filter"
                                    interface="popover"
                                    value={this.filters.active}
                                    ref={el => {
                                        this.activeFilterInput = el;
                                    }}
                                >
                                    <ion-select-option value="all">All Status</ion-select-option>
                                    <ion-select-option value="active">Active</ion-select-option>
                                    <ion-select-option value="inactive">Inactive</ion-select-option>
                                </ion-select>
                            </ion-toolbar>
                        </div>
                        <div class="block notification is-primary">
                            <ion-text color="dark">
                                <h5>Total Members: {this.totalMembers}</h5>
                            </ion-text>
                            <table class="table is-fullwidth">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Guild</th>
                                        <th>Is Active</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.findMemberByCriteria(this.memberList, this.filters).map(m => {
                                        return this.renderMemberRow(m);
                                    })}
                                    <tr>
                                        <td colSpan={3}>
                                            <ion-infinite-scroll
                                                threshold="100px"
                                                ref={el => {
                                                    this.infiniteScroll = el;
                                                }}
                                                onIonInfinite={ev => {
                                                    return this.infiniteScrollMembers(ev);
                                                }}
                                            >
                                                <ion-infinite-scroll-content loading-spinner="bubbles" loading-text="Loading more members..."></ion-infinite-scroll-content>
                                            </ion-infinite-scroll>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
                {/*<ion-fab vertical="bottom" horizontal="end" slot="fixed">*/}
                {/*    <ion-fab-button*/}
                {/*        ref={el => {*/}
                {/*            this.fabButton = el;*/}
                {/*        }}*/}
                {/*    >*/}
                {/*        <ion-icon name="add"></ion-icon>*/}
                {/*    </ion-fab-button>*/}
                {/*</ion-fab>*/}
            </ion-content>,
        ];
    }
}
