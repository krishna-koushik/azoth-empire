/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';
export namespace Components {
    interface AddMember {}
    interface AppHome {}
    interface AppLogin {}
    interface AppRoot {}
    interface DiscordCallback {}
    interface EditMember {}
    interface NwMember {
        memberId: string;
    }
    interface NwMembers {}
    interface NwWar {
        warId: string;
    }
    interface NwWars {}
    interface ServerInfo {}
    interface WarReport {}
}
declare global {
    interface HTMLAddMemberElement extends Components.AddMember, HTMLStencilElement {}
    var HTMLAddMemberElement: {
        prototype: HTMLAddMemberElement;
        new (): HTMLAddMemberElement;
    };
    interface HTMLAppHomeElement extends Components.AppHome, HTMLStencilElement {}
    var HTMLAppHomeElement: {
        prototype: HTMLAppHomeElement;
        new (): HTMLAppHomeElement;
    };
    interface HTMLAppLoginElement extends Components.AppLogin, HTMLStencilElement {}
    var HTMLAppLoginElement: {
        prototype: HTMLAppLoginElement;
        new (): HTMLAppLoginElement;
    };
    interface HTMLAppRootElement extends Components.AppRoot, HTMLStencilElement {}
    var HTMLAppRootElement: {
        prototype: HTMLAppRootElement;
        new (): HTMLAppRootElement;
    };
    interface HTMLDiscordCallbackElement extends Components.DiscordCallback, HTMLStencilElement {}
    var HTMLDiscordCallbackElement: {
        prototype: HTMLDiscordCallbackElement;
        new (): HTMLDiscordCallbackElement;
    };
    interface HTMLEditMemberElement extends Components.EditMember, HTMLStencilElement {}
    var HTMLEditMemberElement: {
        prototype: HTMLEditMemberElement;
        new (): HTMLEditMemberElement;
    };
    interface HTMLNwMemberElement extends Components.NwMember, HTMLStencilElement {}
    var HTMLNwMemberElement: {
        prototype: HTMLNwMemberElement;
        new (): HTMLNwMemberElement;
    };
    interface HTMLNwMembersElement extends Components.NwMembers, HTMLStencilElement {}
    var HTMLNwMembersElement: {
        prototype: HTMLNwMembersElement;
        new (): HTMLNwMembersElement;
    };
    interface HTMLNwWarElement extends Components.NwWar, HTMLStencilElement {}
    var HTMLNwWarElement: {
        prototype: HTMLNwWarElement;
        new (): HTMLNwWarElement;
    };
    interface HTMLNwWarsElement extends Components.NwWars, HTMLStencilElement {}
    var HTMLNwWarsElement: {
        prototype: HTMLNwWarsElement;
        new (): HTMLNwWarsElement;
    };
    interface HTMLServerInfoElement extends Components.ServerInfo, HTMLStencilElement {}
    var HTMLServerInfoElement: {
        prototype: HTMLServerInfoElement;
        new (): HTMLServerInfoElement;
    };
    interface HTMLWarReportElement extends Components.WarReport, HTMLStencilElement {}
    var HTMLWarReportElement: {
        prototype: HTMLWarReportElement;
        new (): HTMLWarReportElement;
    };
    interface HTMLElementTagNameMap {
        'add-member': HTMLAddMemberElement;
        'app-home': HTMLAppHomeElement;
        'app-login': HTMLAppLoginElement;
        'app-root': HTMLAppRootElement;
        'discord-callback': HTMLDiscordCallbackElement;
        'edit-member': HTMLEditMemberElement;
        'nw-member': HTMLNwMemberElement;
        'nw-members': HTMLNwMembersElement;
        'nw-war': HTMLNwWarElement;
        'nw-wars': HTMLNwWarsElement;
        'server-info': HTMLServerInfoElement;
        'war-report': HTMLWarReportElement;
    }
}
declare namespace LocalJSX {
    interface AddMember {
        onCloseButtonClicked?: (event: CustomEvent<any>) => void;
        onSubmitButtonClicked?: (event: CustomEvent<any>) => void;
    }
    interface AppHome {}
    interface AppLogin {}
    interface AppRoot {}
    interface DiscordCallback {}
    interface EditMember {}
    interface NwMember {
        memberId?: string;
    }
    interface NwMembers {}
    interface NwWar {
        warId?: string;
    }
    interface NwWars {}
    interface ServerInfo {}
    interface WarReport {
        onCloseButtonClicked?: (event: CustomEvent<any>) => void;
        onSubmitButtonClicked?: (event: CustomEvent<any>) => void;
    }
    interface IntrinsicElements {
        'add-member': AddMember;
        'app-home': AppHome;
        'app-login': AppLogin;
        'app-root': AppRoot;
        'discord-callback': DiscordCallback;
        'edit-member': EditMember;
        'nw-member': NwMember;
        'nw-members': NwMembers;
        'nw-war': NwWar;
        'nw-wars': NwWars;
        'server-info': ServerInfo;
        'war-report': WarReport;
    }
}
export { LocalJSX as JSX };
declare module '@stencil/core' {
    export namespace JSX {
        interface IntrinsicElements {
            'add-member': LocalJSX.AddMember & JSXBase.HTMLAttributes<HTMLAddMemberElement>;
            'app-home': LocalJSX.AppHome & JSXBase.HTMLAttributes<HTMLAppHomeElement>;
            'app-login': LocalJSX.AppLogin & JSXBase.HTMLAttributes<HTMLAppLoginElement>;
            'app-root': LocalJSX.AppRoot & JSXBase.HTMLAttributes<HTMLAppRootElement>;
            'discord-callback': LocalJSX.DiscordCallback & JSXBase.HTMLAttributes<HTMLDiscordCallbackElement>;
            'edit-member': LocalJSX.EditMember & JSXBase.HTMLAttributes<HTMLEditMemberElement>;
            'nw-member': LocalJSX.NwMember & JSXBase.HTMLAttributes<HTMLNwMemberElement>;
            'nw-members': LocalJSX.NwMembers & JSXBase.HTMLAttributes<HTMLNwMembersElement>;
            'nw-war': LocalJSX.NwWar & JSXBase.HTMLAttributes<HTMLNwWarElement>;
            'nw-wars': LocalJSX.NwWars & JSXBase.HTMLAttributes<HTMLNwWarsElement>;
            'server-info': LocalJSX.ServerInfo & JSXBase.HTMLAttributes<HTMLServerInfoElement>;
            'war-report': LocalJSX.WarReport & JSXBase.HTMLAttributes<HTMLWarReportElement>;
        }
    }
}
