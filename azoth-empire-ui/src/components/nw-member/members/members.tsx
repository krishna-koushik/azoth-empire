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
    @State() findMember: string = '';
    @State() findBy: string = 'name';
    @State() isLoading: boolean = false;
    @State() hasMorePlayers: boolean = true;
    private searchInput: any;
    private findByInput: any;
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
            this.findMember = value;
        });

        this.findByInput.addEventListener('ionChange', e => {
            const { detail: { value = '' } = {} } = e;
            this.findBy = value;
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

    private findMemberByCriteria(memberList: any[]) {
        if (this.findBy === 'name') {
            return memberList.filter(m => m.name.toLowerCase().includes(this.findMember.toLowerCase()));
        } else if (this.findBy === 'guild') {
            return memberList.filter(m => m.guild.toLowerCase().includes(this.findMember.toLowerCase()));
        } else if (this.findBy === 'isActive') {
            return memberList.filter(m => {
                return m.active === (this.findMember.toLowerCase() === 'yes');
            });
        }
        return memberList;
    }

    openAddMemberModal() {
        // create the modal with the `modal-page` component
        this.modalElement = document.createElement('ion-modal');
        this.modalElement.component = 'add-member';

        this.modalElement.addEventListener('closeButtonClicked', async _e => {
            await this.dismissModal();
        });

        this.modalElement.addEventListener('submitButtonClicked', async _e => {
            await this.dismissModal();
        });

        // present the modal
        document.body.appendChild(this.modalElement);
        return this.modalElement.present();
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
                            <ion-grid>
                                <ion-row>
                                    <ion-col>
                                        <ion-searchbar
                                            ref={el => {
                                                this.searchInput = el;
                                            }}
                                            placeholder="Find Members"
                                            animated
                                            debounce={500}
                                        ></ion-searchbar>
                                    </ion-col>
                                    <ion-col>
                                        <ion-list>
                                            <ion-item>
                                                <ion-label>Filter By</ion-label>
                                                <ion-select
                                                    placeholder="Select One"
                                                    value={this.findBy}
                                                    ref={el => {
                                                        this.findByInput = el;
                                                    }}
                                                >
                                                    <ion-select-option value="name">Name</ion-select-option>
                                                    <ion-select-option value="guild">Guild</ion-select-option>
                                                    <ion-select-option value="isActive">Is Active</ion-select-option>
                                                </ion-select>
                                            </ion-item>
                                        </ion-list>
                                    </ion-col>
                                </ion-row>
                            </ion-grid>
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
                                    {this.findMember.length > 0
                                        ? this.findMemberByCriteria(this.memberList).map(m => {
                                              return this.renderMemberRow(m);
                                          })
                                        : this.memberList.map(m => {
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
