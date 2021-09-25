export interface IGraphQLQuery {
    operationName: string;
    variables: Object;
    query: string;
}

export enum OrderDirection {
    ASC = 'ASC',
    DESC = 'DESC',
}

export enum PlayerOrderField {
    NAME = 'NAME',
    GUILD_NAME = 'GUILD_NAME',
    JOIN_DATE = 'JOIN_DATE',
    ACTIVE = 'ACTIVE',
}

export enum WarOrderField {
    WAR_TIME = 'WAR_TIME',
    WAR_TYPE = 'WAR_TYPE',
}

export interface IPlayerOrder {
    direction: OrderDirection;
    field: PlayerOrderField;
}

export interface IWarOrder {
    direction: OrderDirection;
    field: WarOrderField;
}

class NWGQLQuery {
    loginQuery(): IGraphQLQuery {
        return {
            operationName: 'loginToApp',
            variables: {},
            query: `query loginToApp {
            login
          }`,
        };
    }

    /**
     * first: Int
     * after: String
     * last: Int
     * before: String
     * orderBy: PlayerOrder
     */
    playersQuery(first: number, after: string, last: number, before: string, orderBy: IPlayerOrder): IGraphQLQuery {
        return {
            operationName: 'players',
            variables: {
                first,
                after,
                last,
                before,
                orderBy,
            },
            query: `query players(
                $first: Int
                $after: String
                $last: Int
                $before: String
                $orderBy: PlayerOrder
            ) {
                players(
                    first: $first,
                    after: $after,
                    last: $last,
                    before: $before,
                    orderBy: $orderBy,
                ) {
                    pageInfo {
                        hasNextPage
                        hasPreviousPage
                        startCursor
                        endCursor
                        total
                    }
                edges {
                    cursor
                        node {
                             _id
                             name
                             guild
                             active
                        }
                    }
                }
            }`,
        };
    }

    /**
     * returns player by id
     * @param id
     */
    playerQuery(id: string) {
        return {
            operationName: 'player',
            variables: {
                id,
            },
            query: `query player(
                $id: ID!
            ) {
                player(
                    id: $id,
                )
                {
                     _id
                    name
                    discord {
                        id
                        name
                    }
                    guild
                    gameData {
                        level
                        weapon
                        teams
                        averageGs
                        amulet
                        ring
                        earring
                        bag1
                        bag2
                        bag3
                        helm
                        chest
                        hands
                        pants
                        boots
                        shield
                        attribute {
                            primary
                            secondary
                            preferredWeightClass
                        }
                        skills {
                            trade {
                                jewel
                                engineering
                                food
                                armoring
                                weaponsmithing
                                arcana
                                furnishing
                                stone
                            }
                            gathering {
                                smelting
                                woodworking
                                weaving
                                leatherworking
                                logging
                                mining
                                harvesting
                                skinning
                                fishing
                            }
                            weapons {
                                swordAndShield
                                rapier
                                hatchet
                                spear
                                greatAxe
                                warHammer
                                bow
                                musket
                                lifeStaff
                                fireStaff
                                iceGauntlet
                            }
                        }
                    }
                    joinDate
                    notes
                    active
                }
            }`,
        };
    }

    /**
     * first: Int
     * after: String
     * last: Int
     * before: String
     * orderBy: PlayerOrder
     */
    warsQuery(first: number, after: string, last: number, before: string, orderBy: IWarOrder): IGraphQLQuery {
        return {
            operationName: 'wars',
            variables: {
                first,
                after,
                last,
                before,
                orderBy,
            },
            query: `query wars(
                $first: Int
                $after: String
                $last: Int
                $before: String
                $orderBy: WarOrder
            )
            {
                wars(
                    first: $first,
                    after: $after,
                    last: $last,
                    before: $before,
                    orderBy: $orderBy,
                )
                {
                    pageInfo {
                        hasNextPage
                        hasPreviousPage
                        startCursor
                        endCursor
                        total
                    }
                    edges {
                        cursor
                        node {
                             _id
                             companies {
                                companyId
                                name
                                faction
                                factionId
                                role
                                outcome
                            }
                             time
                             warType
                             location
                        }
                    }
                }
            }
        `,
        };
    }

    /**
     * Returns war by id
     * @param id
     */
    warQuery(id: string) {
        return {
            operationName: 'war',
            variables: {
                id,
            },
            query: `query war(
                $id: ID!
            ) {
                war(
                    id: $id,
                )
                {
                     _id
                     warType
                     location
                     companies {
                        companyId
                        name
                        faction
                        factionId
                        role
                        outcome
                     }
                     army {
                        playerId
                        name
                        group
                     }
                     performance {
                        playerId
                        name
                        rank
                        score
                        kills
                        assists
                        deaths
                        healing
                        damage
                     }
                }
            }`,
        };
    }
}

export default new NWGQLQuery();
